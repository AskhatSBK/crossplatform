import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBmRjkN3ywG-8hajBw8PV60aaqRIa6vGX8",
  authDomain: "rangdom.firebaseapp.com",
  projectId: "rangdom",
  storageBucket: "rangdom.appspot.com",
  messagingSenderId: "351207761101",
  appId: "1:351207761101:web:5054e8b2810d930763f584",
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);

let analytics;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

export { auth, db, analytics };