import React, { useState } from 'react';
import { 
  View, 
  StyleSheet, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  ScrollView, 
  Alert,
  useWindowDimensions
} from 'react-native';
import { useTheme } from '../theme/theme';
import { useLocalization } from '../i18n/useLocalization';
import { commonStyles } from '../theme/styles';
import { Team } from '../components/Team';
import { Ionicons } from '@expo/vector-icons';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { RootStackParamList } from '../navigation/types';
import { GuestBanner } from '../components/GuestBanner';
import { useAuth } from '../auth/AuthContext';
import { useNetworkStatus } from '../context/NetworkStatusContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { db } from '../firebase/config';
import { ref, set, get } from 'firebase/database';

type TeamGeneratorScreenProps = {
  navigation: DrawerNavigationProp<RootStackParamList, 'TeamGenerator'>;
};

export const TeamGeneratorScreen = ({ navigation }: TeamGeneratorScreenProps) => {
  const theme = useTheme();
  const { t } = useLocalization();
  const { width } = useWindowDimensions();
  const isTablet = width >= 768;
  const isSmallScreen = width < 360;

  const [names, setNames] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [numberOfTeams, setNumberOfTeams] = useState(2);
  const [teams, setTeams] = useState<string[][]>([]);

  const { user } = useAuth();
  const { isOnline } = useNetworkStatus();

  const handleAddName = () => {
    if (inputValue.trim()) {
      setNames([...names, inputValue.trim()]);
      setInputValue('');
    }
  };

  const handleRemoveName = (index: number) => {
    setNames(names.filter((_, i) => i !== index));
  };

  const handleGenerateTeams = async () => {
    if (names.length < numberOfTeams) {
      Alert.alert(
        t('error'),
        t('chooseTeams'),
        [{ text: t('confirm'), style: 'default' }]
      );
      return;
    }

    const shuffledNames = [...names].sort(() => Math.random() - 0.5);
    const newTeams: string[][] = Array.from({ length: numberOfTeams }, () => []);

    shuffledNames.forEach((name, index) => {
      newTeams[index % numberOfTeams].push(name);
    });

    setTeams(newTeams);

    // Save to local storage and Firebase with id, members, createdAt
    const now = new Date().toISOString();
    const teamsForHistory = newTeams.map((members, i) => ({
      id: `${Date.now()}_${i}`,
      members,
      createdAt: now,
    }));

    // Save to AsyncStorage
    const localState = {
      items: names,
      groups: numberOfTeams,
      teams: newTeams,
      updatedAt: now,
      history: teamsForHistory,
    };
    await AsyncStorage.setItem('teamState', JSON.stringify(localState));

    // Save to Firebase if online and user is logged in
    if (isOnline && user) {
      await set(ref(db, `users/${user.uid}/teams`), {
        items: names,
        groups: numberOfTeams,
        teams: teamsForHistory,
        updatedAt: now,
      });
    }
  };

  const handleClearAll = () => {
    setNames([]);
    setTeams([]);
    setNumberOfTeams(2);
  };

  return (
    <>
      <GuestBanner />
      <ScrollView 
        style={[commonStyles.container, { backgroundColor: theme.background }]}
        contentContainerStyle={[
          commonStyles.content,
          isTablet && commonStyles.contentTablet
        ]}
      >
        <View style={[
          commonStyles.card,
          isTablet && commonStyles.cardTablet,
          { backgroundColor: theme.cardBackground }
        ]}>
          <Text style={[
            commonStyles.subtitle,
            isTablet && commonStyles.subtitleTablet,
            { color: theme.text }
          ]}>
            {t('teamMembers')}
          </Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={[
                commonStyles.input,
                isTablet && commonStyles.inputTablet,
                { 
                  backgroundColor: theme.inputBackground,
                  color: theme.text,
                  borderColor: theme.border
                }
              ]}
              placeholder={t('enterName')}
              placeholderTextColor={theme.textSecondary}
              value={inputValue}
              onChangeText={setInputValue}
              onSubmitEditing={handleAddName}
            />
            <TouchableOpacity
              style={[
                commonStyles.button,
                isTablet && commonStyles.buttonTablet,
                { backgroundColor: theme.primary }
              ]}
              onPress={handleAddName}
            >
              <Text style={[
                commonStyles.text,
                isTablet && commonStyles.textTablet,
                { color: theme.buttonText }
              ]}>
                {t('add')}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.namesList}>
            {names.map((name, index) => (
              <View
                key={index}
                style={[
                  styles.nameItem,
                  { backgroundColor: theme.inputBackground }
                ]}
              >
                <Text style={[
                  commonStyles.text,
                  isTablet && commonStyles.textTablet,
                  isSmallScreen && styles.nameTextSmall,
                  { color: theme.text }
                ]}>
                  {name}
                </Text>
                <TouchableOpacity
                  onPress={() => handleRemoveName(index)}
                  style={styles.removeButton}
                >
                  <Ionicons name="close-circle" size={20} color={theme.error} />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>

        <View style={[
          commonStyles.card,
          isTablet && commonStyles.cardTablet,
          { backgroundColor: theme.cardBackground }
        ]}>
          <Text style={[
            commonStyles.subtitle,
            isTablet && commonStyles.subtitleTablet,
            { color: theme.text }
          ]}>
            {t('numberOfTeams')}
          </Text>
          <View style={styles.teamsInputContainer}>
            <TouchableOpacity
              style={[
                commonStyles.button,
                isTablet && commonStyles.buttonTablet,
                { backgroundColor: theme.primary }
              ]}
              onPress={() => setNumberOfTeams(Math.max(2, numberOfTeams - 1))}
            >
              <Text style={[
                commonStyles.text,
                isTablet && commonStyles.textTablet,
                { color: theme.buttonText }
              ]}>
                -
              </Text>
            </TouchableOpacity>
            <Text style={[
              commonStyles.text,
              isTablet && commonStyles.textTablet,
              { color: theme.text }
            ]}>
              {numberOfTeams}
            </Text>
            <TouchableOpacity
              style={[
                commonStyles.button,
                isTablet && commonStyles.buttonTablet,
                { backgroundColor: theme.primary }
              ]}
              onPress={() => setNumberOfTeams(Math.min(names.length, numberOfTeams + 1))}
            >
              <Text style={[
                commonStyles.text,
                isTablet && commonStyles.textTablet,
                { color: theme.buttonText }
              ]}>
                +
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={[
          styles.buttonsContainer,
          isTablet && styles.buttonsContainerTablet
        ]}>
          <TouchableOpacity
            style={[
              commonStyles.button,
              isTablet && commonStyles.buttonTablet,
              { backgroundColor: theme.primary }
            ]}
            onPress={handleGenerateTeams}
          >
            <Text style={[
              commonStyles.text,
              isTablet && commonStyles.textTablet,
              { color: theme.buttonText }
            ]}>
              {t('generateTeams')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              commonStyles.button,
              isTablet && commonStyles.buttonTablet,
              { backgroundColor: theme.error }
            ]}
            onPress={handleClearAll}
          >
            <Text style={[
              commonStyles.text,
              isTablet && commonStyles.textTablet,
              { color: theme.buttonText }
            ]}>
              {t('clearAll')}
            </Text>
          </TouchableOpacity>
        </View>

        {teams.length > 0 ? (
          <View style={[
            commonStyles.card,
            isTablet && commonStyles.cardTablet,
            { backgroundColor: theme.cardBackground }
          ]}>
            <Text style={[
              commonStyles.subtitle,
              isTablet && commonStyles.subtitleTablet,
              { color: theme.text }
            ]}>
              {t('teams')}
            </Text>
            <View style={[
              commonStyles.gridContainer,
              isTablet && commonStyles.gridContainerTablet
            ]}>
              {teams.map((team, index) => (
                <Team
                  key={index}
                  team={team}
                  teamNumber={index + 1}
                  isTablet={isTablet}
                  isSmallScreen={isSmallScreen}
                />
              ))}
            </View>
          </View>
        ) : (
          <View style={[
            commonStyles.card,
            isTablet && commonStyles.cardTablet,
            { backgroundColor: theme.cardBackground }
          ]}>
            <Text style={[
              commonStyles.text,
              isTablet && commonStyles.textTablet,
              { color: theme.textSecondary }
            ]}>
              {t('noTeams')}
            </Text>
          </View>
        )}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  namesList: {
    gap: 8,
  },
  nameItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
  },
  nameTextSmall: {
    fontSize: 14,
  },
  removeButton: {
    padding: 4,
  },
  teamsInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
  buttonsContainer: {
    gap: 16,
  },
  buttonsContainerTablet: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 24,
  },
}); 