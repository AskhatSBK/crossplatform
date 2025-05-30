import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { db } from '../firebase/config';
import { ref, set, get } from 'firebase/database';

interface TeamState {
  items: string[];
  groups: number;
  teams: string[][];
  syncing: boolean;
  setItems: (items: string[]) => void;
  setGroups: (groups: number) => void;
  setTeams: (teams: string[][]) => void;
  clearAll: () => void;
  syncTeamsToFirebase: (user: any) => Promise<void>;
  loadFromStorage: () => Promise<void>;
}

export const useStore = create<TeamState>((set, get) => ({
  items: [],
  groups: 2,
  teams: [],
  syncing: false,
  setItems: (items) => set({ items }),
  setGroups: (groups) => set({ groups }),
  setTeams: (teams) => set({ teams }),
  clearAll: () => set({ items: [], teams: [] }),
  syncTeamsToFirebase: async (user) => {
    set({ syncing: true });
    try {
      const { items, groups, teams } = get();
      if (user) {
        await set(ref(db, `users/${user.uid}/teams`), {
          items,
          groups,
          teams: teams.map((members, i) => ({ teamNumber: i + 1, members })),
          updatedAt: new Date().toISOString(),
        });
      }
    } catch (error) {
      console.error('Sync error:', error);
    } finally {
      set({ syncing: false });
    }
  },
  loadFromStorage: async () => {
    try {
      const data = await AsyncStorage.getItem('teamState');
      if (data) {
        const { items, groups, teams } = JSON.parse(data);
        set({ items, groups, teams });
      }
    } catch (error) {
      console.error('Error loading state:', error);
    }
  },
}));

// Persist store to AsyncStorage
useStore.subscribe(async (state) => {
  try {
    await AsyncStorage.setItem('teamState', JSON.stringify({
      items: state.items,
      groups: state.groups,
      teams: state.teams,
    }));
  } catch (error) {
    console.error('Error saving state:', error);
  }
}); 