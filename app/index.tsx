import React, { useState, useRef, useEffect } from 'react';
import { 
  Text, 
  View, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  TextInput,
  SafeAreaView,
  StatusBar,
  Alert,
  Dimensions,
  Animated,
  PanResponder
} from 'react-native';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { useTheme } from './context/ThemeContext';
import * as Haptics from 'expo-haptics';
import LanguageSwitcher from './components/LanguageSwitcher';

// Define Team interface
interface Team {
  id: number;
  name: string;
  members: number;
  date: string;
}

// Mock data for recent teams
const initialTeams: Team[] = [
  { id: 1, name: 'Project Alpha', members: 8, date: '2025-04-10' },
  { id: 2, name: 'Hackathon Team', members: 5, date: '2025-04-08' },
  { id: 3, name: 'Study Group', members: 4, date: '2025-04-05' },
];

export default function Index() {
  const { t } = useTranslation();
  const { theme, isDarkMode, toggleTheme } = useTheme();
  
  // State for form inputs
  const [teamName, setTeamName] = useState('');
  const [memberCount, setMemberCount] = useState('');
  const [groupCount, setGroupCount] = useState('');
  
  // State for teams
  const [teams, setTeams] = useState<Team[]>(initialTeams);
  const [editingTeam, setEditingTeam] = useState<Team | null>(null);
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);
  
  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  
  // Pan responder for swipe gestures
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        // Reset animations when touch starts
        scaleAnim.setValue(1);
      },
      onPanResponderMove: (_, gestureState) => {
        // Scale down slightly when dragging
        const scale = Math.max(0.95, 1 - Math.abs(gestureState.dx) / 1000);
        scaleAnim.setValue(scale);
      },
      onPanResponderRelease: (_, gestureState) => {
        // Reset scale animation
        Animated.spring(scaleAnim, {
          toValue: 1,
          useNativeDriver: true,
        }).start();
        
        // Handle swipe actions
        if (gestureState.dx > 100 && editingTeam) {
          // Swipe right - move item up
          handleMoveTeam(editingTeam, 'up');
        } else if (gestureState.dx < -100 && editingTeam) {
          // Swipe left - move item down
          handleMoveTeam(editingTeam, 'down');
        }
      },
    })
  ).current;
  
  // Animation for showing/hiding advanced options
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: showAdvancedOptions ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [showAdvancedOptions]);
  
  // Handle team generation
  const handleGenerateTeams = () => {
    if (!teamName || !memberCount || !groupCount) {
      Alert.alert(
        t('common.appName'),
        'Please fill in all fields',
        [{ text: 'OK' }]
      );
      return;
    }
    
    // Generate a new team
    const newTeam = {
      id: Date.now(),
      name: teamName,
      members: parseInt(memberCount),
      date: new Date().toISOString().split('T')[0],
    };
    
    // Add to teams list
    setTeams([newTeam, ...teams]);
    
    // Reset form
    setTeamName('');
    setMemberCount('');
    setGroupCount('');
    
    // Provide haptic feedback
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    
    // Show success message
    Alert.alert(
      t('common.appName'),
      'Teams generated successfully!',
      [{ text: 'OK' }]
    );
  };
  
  // Handle team deletion
  const handleDeleteTeam = (teamId: number) => {
    // Provide haptic feedback
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
    
    // Show confirmation dialog
    Alert.alert(
      t('common.appName'),
      'Are you sure you want to delete this team?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: () => {
            setTeams(teams.filter(team => team.id !== teamId));
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
          }
        },
      ]
    );
  };
  
  // Handle team editing
  const handleEditTeam = (team: Team) => {
    setEditingTeam(team);
    setTeamName(team.name);
    setMemberCount(team.members.toString());
    setGroupCount('1'); // Default to 1 group when editing
  };
  
  // Handle team reordering
  const handleMoveTeam = (team: Team, direction: 'up' | 'down') => {
    const currentIndex = teams.findIndex(t => t.id === team.id);
    if (currentIndex === -1) return;
    
    let newIndex;
    if (direction === 'up' && currentIndex > 0) {
      newIndex = currentIndex - 1;
    } else if (direction === 'down' && currentIndex < teams.length - 1) {
      newIndex = currentIndex + 1;
    } else {
      return; // Can't move further
    }
    
    // Create a new array with the reordered teams
    const newTeams = [...teams];
    const [movedTeam] = newTeams.splice(currentIndex, 1);
    newTeams.splice(newIndex, 0, movedTeam);
    
    setTeams(newTeams);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };
  
  // Handle double tap on team
  const handleDoubleTap = (team: Team) => {
    handleEditTeam(team);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  };
  
  // Toggle advanced options
  const toggleAdvancedOptions = () => {
    setShowAdvancedOptions(!showAdvancedOptions);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };
  
  // Get dynamic styles based on theme
  const dynamicStyles = {
    container: {
      backgroundColor: theme.background,
    },
    header: {
      borderBottomColor: theme.border,
    },
    title: {
      color: theme.text,
    },
    subtitle: {
      color: theme.textSecondary,
    },
    section: {
      borderBottomColor: theme.border,
    },
    sectionTitle: {
      color: theme.text,
    },
    input: {
      backgroundColor: theme.input,
      color: theme.inputText,
    },
    generateButton: {
      backgroundColor: theme.button,
    },
    generateButtonText: {
      color: theme.buttonText,
    },
    optionButton: {
      backgroundColor: theme.surface,
    },
    optionText: {
      color: theme.text,
    },
    teamCard: {
      backgroundColor: theme.card,
      borderColor: theme.cardBorder,
    },
    teamName: {
      color: theme.text,
    },
    teamDetails: {
      color: theme.textSecondary,
    },
    navLink: {
      backgroundColor: theme.surface,
    },
    navLinkText: {
      color: theme.text,
    },
  };
  
  return (
    <SafeAreaView style={[styles.safeArea, dynamicStyles.container]}>
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />
      <ScrollView style={styles.scrollView}>
        {/* Header Section */}
        <View style={[styles.header, dynamicStyles.header]}>
          <View style={styles.headerTop}>
            <Text style={[styles.title, dynamicStyles.title]}>{t('common.appName')}</Text>
            <View style={styles.headerButtons}>
              <TouchableOpacity 
                style={styles.themeToggle}
                onPress={toggleTheme}
              >
                <Ionicons 
                  name={isDarkMode ? "sunny" : "moon"} 
                  size={20} 
                  color={theme.text} 
                />
              </TouchableOpacity>
              <View style={styles.languageToggle}>
                <LanguageSwitcher />
              </View>
            </View>
          </View>
          <Text style={[styles.subtitle, dynamicStyles.subtitle]}>{t('common.appSubtitle')}</Text>
        </View>

        {/* Quick Generate Section */}
        <View style={[styles.section, dynamicStyles.section]}>
          <Text style={[styles.sectionTitle, dynamicStyles.sectionTitle]}>{t('home.quickGenerate')}</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={[styles.input, dynamicStyles.input]}
              placeholder={t('home.teamName')}
              placeholderTextColor={theme.textSecondary}
              value={teamName}
              onChangeText={setTeamName}
            />
            <TextInput
              style={[styles.input, dynamicStyles.input]}
              placeholder={t('home.memberCount')}
              placeholderTextColor={theme.textSecondary}
              keyboardType="numeric"
              value={memberCount}
              onChangeText={setMemberCount}
            />
            <TextInput
              style={[styles.input, dynamicStyles.input]}
              placeholder={t('home.groupCount')}
              placeholderTextColor={theme.textSecondary}
              keyboardType="numeric"
              value={groupCount}
              onChangeText={setGroupCount}
            />
            <TouchableOpacity 
              style={[styles.generateButton, dynamicStyles.generateButton]}
              onPress={handleGenerateTeams}
            >
              <Text style={[styles.generateButtonText, dynamicStyles.generateButtonText]}>
                {t('common.generate')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Advanced Options Toggle */}
        <TouchableOpacity 
          style={[styles.advancedToggle, dynamicStyles.section]}
          onPress={toggleAdvancedOptions}
        >
          <Text style={[styles.sectionTitle, dynamicStyles.sectionTitle]}>
            {t('home.advancedOptions')}
          </Text>
          <Ionicons 
            name={showAdvancedOptions ? "chevron-up" : "chevron-down"} 
            size={24} 
            color={theme.text} 
          />
        </TouchableOpacity>

        {/* Advanced Options Section - Animated */}
        <Animated.View 
          style={[
            styles.section, 
            dynamicStyles.section,
            { 
              opacity: fadeAnim,
              display: showAdvancedOptions ? 'flex' : 'none',
            }
          ]}
        >
          <View style={styles.optionsContainer}>
            <TouchableOpacity style={[styles.optionButton, dynamicStyles.optionButton]}>
              <Ionicons name="people" size={24} color={theme.text} />
              <Text style={[styles.optionText, dynamicStyles.optionText]}>{t('home.importMembers')}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.optionButton, dynamicStyles.optionButton]}>
              <Ionicons name="settings" size={24} color={theme.text} />
              <Text style={[styles.optionText, dynamicStyles.optionText]}>{t('home.teamSettings')}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.optionButton, dynamicStyles.optionButton]}>
              <Ionicons name="document-text" size={24} color={theme.text} />
              <Text style={[styles.optionText, dynamicStyles.optionText]}>{t('home.exportTeams')}</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>

        {/* Recent Teams Section */}
        <View style={[styles.section, dynamicStyles.section]}>
          <Text style={[styles.sectionTitle, dynamicStyles.sectionTitle]}>{t('home.recentTeams')}</Text>
          
          {/* Add Team Button */}
          <TouchableOpacity 
            style={[styles.addTeamButton, { backgroundColor: theme.primary }]}
            onPress={() => {
              setTeamName('');
              setMemberCount('');
              setGroupCount('');
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            }}
          >
            <Ionicons name="add" size={24} color="#fff" />
            <Text style={styles.addTeamText}>{t('gestures.tapToAdd')}</Text>
          </TouchableOpacity>
          
          {/* Team List */}
          {teams.map((team) => (
            <Animated.View 
              key={team.id}
              style={[
                styles.teamCard, 
                dynamicStyles.teamCard,
                { transform: [{ scale: scaleAnim }] }
              ]}
              {...panResponder.panHandlers}
            >
              <View style={styles.teamInfo}>
                <Text style={[styles.teamName, dynamicStyles.teamName]}>{team.name}</Text>
                <Text style={[styles.teamDetails, dynamicStyles.teamDetails]}>
                  {team.members} {t('home.members')} • {team.date}
                </Text>
              </View>
              <View style={styles.teamActions}>
                <TouchableOpacity 
                  onPress={() => handleEditTeam(team)}
                  onLongPress={() => handleDeleteTeam(team.id)}
                  onPressIn={() => {
                    // Start a timer for double tap detection
                    setTimeout(() => {
                      handleDoubleTap(team);
                    }, 300);
                  }}
                >
                  <Ionicons name="chevron-forward" size={24} color={theme.text} />
                </TouchableOpacity>
              </View>
            </Animated.View>
          ))}
        </View>

        {/* Navigation Links */}
        <View style={styles.navigationContainer}>
          <Link href="/about" style={[styles.navLink, dynamicStyles.navLink]}>
            <Text style={[styles.navLinkText, dynamicStyles.navLinkText]}>{t('common.about')}</Text>
          </Link>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  headerButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 14,
  },
  themeToggle: {
    padding: 6,
  },
  languageToggle: {
    padding: 0,
  },
  section: {
    padding: 20,
    borderBottomWidth: 1,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  inputContainer: {
    gap: 12,
  },
  input: {
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  generateButton: {
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  generateButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  advancedToggle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 12,
  },
  optionButton: {
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    width: '30%',
    minWidth: 100,
  },
  optionText: {
    marginTop: 8,
    fontSize: 14,
  },
  addTeamButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  addTeamText: {
    color: '#fff',
    marginLeft: 8,
    fontSize: 16,
  },
  teamCard: {
    borderRadius: 8,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
    borderWidth: 1,
  },
  teamInfo: {
    flex: 1,
  },
  teamName: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 4,
  },
  teamDetails: {
    fontSize: 14,
  },
  teamActions: {
    marginLeft: 16,
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 20,
    gap: 20,
  },
  navLink: {
    padding: 12,
    borderRadius: 8,
  },
  navLinkText: {
    fontSize: 16,
    fontWeight: '500',
  },
});
