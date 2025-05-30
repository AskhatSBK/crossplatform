import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, db } from '../firebase/config';
import { 
  User, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { useSettingsStore } from '../store/useSettingsStore';

interface AuthContextType {
  user: User | null;
  loading: boolean;
   isGuest: boolean;
  register: (email: string, password: string, name: string, surname: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
   enterGuestMode: () => void; 
  exitGuestMode: () => void; 
  updateUserPreferences: (prefs: UserPreferences) => Promise<void>;
}

interface UserPreferences {
  theme: 'light' | 'dark';
  language: 'en' | 'ru' | 'kk';
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isGuest, setIsGuest] = useState(false);
  const setLanguage = useSettingsStore((s) => s.setLanguage);
  const setThemeMode = useSettingsStore((s) => s.setThemeMode);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      setLoading(false);
      if (user) {
        // Fetch preferences from Firestore
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          const prefs = userDoc.data().preferences;
          if (prefs) {
            setLanguage(prefs.language);
            setThemeMode(prefs.theme === 'dark' ? 'dark' : 'light');
          }
        }
      }
    });
    return unsubscribe;
  }, [setLanguage, setThemeMode]);

  const register = async (email: string, password: string, name: string, surname: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        email,
        name,
        surname,
        preferences: {
          theme: 'light',
          language: 'en'
        }
      });
      console.log('User registered and Firestore document created:', email, name, surname);
    } catch (error: any) {
      console.error('Registration error:', error.code, error.message, error);
      throw new Error(error.message);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log('User logged in:', email);
    } catch (error: any) {
      console.error('Login error:', error.code, error.message, error);
      throw new Error(error.message);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error: any) {
      console.error('Logout error:', error);
      throw new Error(error.message);
    }
  };

  const updateUserPreferences = async (prefs: UserPreferences) => {
    if (!user) return;
    try {
      await setDoc(doc(db, 'users', user.uid), {
        preferences: prefs
      }, { merge: true });
      // Update local store as well
      setLanguage(prefs.language);
      setThemeMode(prefs.theme === 'dark' ? 'dark' : 'light');
    } catch (error: any) {
      console.error('Error updating preferences:', error);
      throw new Error(error.message);
    }
  };

   const enterGuestMode = () => {
    setIsGuest(true);
    setUser(null); // Гость не имеет Firebase-пользователя
  };

  const exitGuestMode = () => {
    setIsGuest(false);
  };

   return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      isGuest,
      register, 
      login, 
      logout,
      enterGuestMode,
      exitGuestMode,
      updateUserPreferences
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);