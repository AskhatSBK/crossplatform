import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView, useWindowDimensions } from 'react-native';
import { useTheme } from '../theme/theme';
import { useLocalization } from '../i18n/useLocalization';
import { commonStyles } from '../theme/styles';
import { Ionicons } from '@expo/vector-icons';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { RootStackParamList } from '../navigation/types';
import { GuestBanner } from '../components/GuestBanner';

type HomeScreenProps = {
  navigation: DrawerNavigationProp<RootStackParamList, 'Home'>;
};

export const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const theme = useTheme();
  const { t } = useLocalization();
  const { width } = useWindowDimensions();
  const isTablet = width >= 768;
  const isSmallScreen = width < 360;

  const features = [
    {
      title: t('generateTeamsDesc'),
      icon: 'people-outline' as const,
      screen: 'TeamGenerator' as const,
    },
    {
      title: t('settingsDesc'),
      icon: 'settings-outline' as const,
      screen: 'Settings' as const,
    },
    {
      title: t('aboutDesc'),
      icon: 'information-circle-outline' as const,
      screen: 'About' as const,
    },
  ];

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
            {t('welcome')}
          </Text>
          <Text style={[
            commonStyles.text,
            isTablet && commonStyles.textTablet,
            { color: theme.textSecondary }
          ]}>
            {t('welcomeDesc')}
          </Text>
        </View>

        <View style={[
          styles.featuresContainer,
          isTablet && styles.featuresContainerTablet
        ]}>
          {features.map((feature, index) => (
            <TouchableOpacity
              key={index}
              style={[
                commonStyles.card,
                isTablet && commonStyles.cardTablet,
                { backgroundColor: theme.cardBackground }
              ]}
              onPress={() => navigation.navigate(feature.screen)}
            >
              <Ionicons 
                name={feature.icon} 
                size={isTablet ? 32 : 24} 
                color={theme.primary} 
              />
              <Text style={[
                commonStyles.text,
                isTablet && commonStyles.textTablet,
                isSmallScreen && styles.featureTextSmall,
                { color: theme.text }
              ]}>
                {feature.title}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  featuresContainer: {
    gap: 16,
  },
  featuresContainerTablet: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 24,
  },
  featureTextSmall: {
    fontSize: 14,
  },
}); 