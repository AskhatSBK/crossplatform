import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { useAuth } from '../auth/AuthContext';
import { useNetworkStatus } from '../context/NetworkStatusContext';
import { useTheme } from '../theme/theme';
import { Team } from '../components/Team';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { db } from '../firebase/config';
import { ref, onValue, get } from 'firebase/database';

interface TeamEntry {
  id: string;
  members: string[];
  createdAt: string;
}

export const HistoryScreen = () => {
  const { user } = useAuth();
  const { isOnline } = useNetworkStatus();
  const theme = useTheme();
  const [teams, setTeams] = useState<TeamEntry[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeams = async () => {
      setLoading(true);
      if (isOnline && user) {
        // Fetch from Firebase
        const teamsRef = ref(db, `users/${user.uid}/teams`);
        onValue(teamsRef, (snapshot) => {
          const data = snapshot.val();
          if (data && data.teams) {
            setTeams(
              data.teams.map((t: any, i: number) => ({
                id: t.id || `${i}`,
                members: t.members,
                createdAt: t.createdAt || data.updatedAt || new Date().toISOString(),
              }))
            );
          } else {
            setTeams([]);
          }
          setLoading(false);
        });
      } else {
        // Fetch from local storage
        const local = await AsyncStorage.getItem('teamState');
        if (local) {
          const parsed = JSON.parse(local);
          setTeams(
            (parsed.teams || []).map((members: string[], i: number) => ({
              id: `${i}`,
              members,
              createdAt: parsed.updatedAt || new Date().toISOString(),
            }))
          );
        } else {
          setTeams([]);
        }
        setLoading(false);
      }
    };
    fetchTeams();
  }, [isOnline, user]);

  const filteredTeams = teams.filter((team) =>
    team.members.some((member) => member.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}> 
      <Text style={[styles.title, { color: theme.text }]}>History</Text>
      <TextInput
        style={[styles.input, { color: theme.text, borderColor: theme.border, backgroundColor: theme.inputBackground }]}
        placeholder="Search by member name"
        placeholderTextColor={theme.textSecondary}
        value={search}
        onChangeText={setSearch}
      />
      {loading ? (
        <ActivityIndicator color={theme.primary} style={{ marginTop: 32 }} />
      ) : filteredTeams.length === 0 ? (
        <Text style={{ color: theme.textSecondary, marginTop: 32 }}>No teams found.</Text>
      ) : (
        <FlatList
          data={filteredTeams}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <Team
              team={item.members}
              teamNumber={index + 1}
              isTablet={false}
              isSmallScreen={false}
            />
          )}
          contentContainerStyle={{ paddingBottom: 32 }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    maxWidth: 340,
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
    alignSelf: 'center',
  },
}); 