import React, { useState } from 'react';
import { 
  Text, 
  View, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  TextInput,
  SafeAreaView,
  StatusBar
} from 'react-native';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

// Mock data for recent teams
const recentTeams = [
  { id: 1, name: 'Project Alpha', members: 8, date: '2023-04-10' },
  { id: 2, name: 'Hackathon Team', members: 5, date: '2023-04-08' },
  { id: 3, name: 'Study Group', members: 4, date: '2023-04-05' },
];

export default function Index() {
  const [teamName, setTeamName] = useState('');
  const [memberCount, setMemberCount] = useState('');
  const [groupCount, setGroupCount] = useState('');

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />
      <ScrollView style={styles.scrollView}>
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.title}>Team Generator</Text>
          <Text style={styles.subtitle}>Create balanced teams quickly</Text>
        </View>

        {/* Quick Generate Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Generate</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Team Name"
              placeholderTextColor="#a0a0a0"
              value={teamName}
              onChangeText={setTeamName}
            />
            <TextInput
              style={styles.input}
              placeholder="Number of Members"
              placeholderTextColor="#a0a0a0"
              keyboardType="numeric"
              value={memberCount}
              onChangeText={setMemberCount}
            />
            <TextInput
              style={styles.input}
              placeholder="Number of Groups"
              placeholderTextColor="#a0a0a0"
              keyboardType="numeric"
              value={groupCount}
              onChangeText={setGroupCount}
            />
            <TouchableOpacity style={styles.generateButton}>
              <Text style={styles.generateButtonText}>Generate Teams</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Advanced Options Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Advanced Options</Text>
          <View style={styles.optionsContainer}>
            <TouchableOpacity style={styles.optionButton}>
              <Ionicons name="people" size={24} color="#fff" />
              <Text style={styles.optionText}>Import Members</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionButton}>
              <Ionicons name="settings" size={24} color="#fff" />
              <Text style={styles.optionText}>Team Settings</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionButton}>
              <Ionicons name="document-text" size={24} color="#fff" />
              <Text style={styles.optionText}>Export Teams</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Recent Teams Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Teams</Text>
          {recentTeams.map((team) => (
            <TouchableOpacity key={team.id} style={styles.teamCard}>
              <View style={styles.teamInfo}>
                <Text style={styles.teamName}>{team.name}</Text>
                <Text style={styles.teamDetails}>{team.members} members • {team.date}</Text>
              </View>
              <Ionicons name="chevron-forward" size={24} color="#fff" />
            </TouchableOpacity>
          ))}
        </View>

        {/* Navigation Links */}
        <View style={styles.navigationContainer}>
          <Link href="/about" style={styles.navLink}>
            <Text style={styles.navLinkText}>About</Text>
          </Link>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#25292e',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#3a3f47',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#a0a0a0',
  },
  section: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#3a3f47',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
  },
  inputContainer: {
    gap: 12,
  },
  input: {
    backgroundColor: '#3a3f47',
    borderRadius: 8,
    padding: 12,
    color: '#fff',
    fontSize: 16,
  },
  generateButton: {
    backgroundColor: '#4a90e2',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  generateButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 12,
  },
  optionButton: {
    backgroundColor: '#3a3f47',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    width: '30%',
    minWidth: 100,
  },
  optionText: {
    color: '#fff',
    marginTop: 8,
    fontSize: 14,
  },
  teamCard: {
    backgroundColor: '#3a3f47',
    borderRadius: 8,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  teamInfo: {
    flex: 1,
  },
  teamName: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 4,
  },
  teamDetails: {
    color: '#a0a0a0',
    fontSize: 14,
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 20,
    gap: 20,
  },
  navLink: {
    padding: 12,
    backgroundColor: '#3a3f47',
    borderRadius: 8,
  },
  navLinkText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
});
