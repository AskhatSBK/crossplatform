import React from 'react';
import { View, StyleSheet, useWindowDimensions, ScrollView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Items } from './Items';
import { GroupsInput } from './GroupsInput';
import { Team } from './Team';
import { GenerateButton } from './GenerateButton';
import { ClearAllButton } from './ClearAllButton';
import { useTheme } from '../theme/theme';
import { SettingsButton } from './SettingsButton';

interface LayoutProps {
  children: React.ReactNode;
  showSettingsButton?: boolean;
}

export const Layout = ({ children, showSettingsButton = true }: LayoutProps) => {
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;
  const theme = useTheme();

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={[
          styles.container,
          isLandscape && styles.landscapeContainer
        ]}>
          <View style={[
            styles.inputSection,
            isLandscape && styles.landscapeInputSection
          ]}>
            <View style={[styles.card, { backgroundColor: theme.cardBackground }, theme.cardShadow]}>
              <Items />
            </View>
            <View style={[styles.card, { backgroundColor: theme.cardBackground }, theme.cardShadow]}>
              <GroupsInput />
            </View>
            <View style={styles.buttonContainer}>
              <View style={styles.buttonWrapper}>
                <GenerateButton />
              </View>
              <View style={styles.buttonWrapper}>
                <ClearAllButton />
              </View>
            </View>
          </View>
          
          <View style={[
            styles.teamSection,
            isLandscape && styles.landscapeTeamSection
          ]}>
            <Team team={[]} teamNumber={0} isTablet={false} isSmallScreen={false} />
          </View>
        </View>
      </ScrollView>
      {showSettingsButton && <SettingsButton />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingTop: 16,
  },
  container: {
    flex: 1,
    padding: 20,
    gap: 24,
  },
  landscapeContainer: {
    flexDirection: 'row',
    gap: 24,
  },
  inputSection: {
    flex: 1,
    gap: 24,
  },
  landscapeInputSection: {
    flex: 1,
    maxWidth: '45%',
  },
  card: {
    borderRadius: 16,
    padding: 24,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
    marginTop: 12,
  },
  buttonWrapper: {
    flex: 1,
  },
  teamSection: {
    flex: 1,
  },
  landscapeTeamSection: {
    flex: 1,
  },
}); 