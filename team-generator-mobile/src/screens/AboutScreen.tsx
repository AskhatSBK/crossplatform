import React from 'react';
import { View, StyleSheet, Text, ScrollView, useWindowDimensions } from 'react-native';
import { useTheme } from '../theme/theme';
import { useLocalization } from '../i18n/useLocalization';
import { commonStyles } from '../theme/styles';
import { Ionicons } from '@expo/vector-icons';
import { GuestBanner } from '../components/GuestBanner';

export const AboutScreen = () => {
  const theme = useTheme();
  const { t } = useLocalization();
  const { width } = useWindowDimensions();
  const isTablet = width >= 768;
  const isSmallScreen = width < 360;

  const features = [
    {
      title: t('feature1'),
      icon: 'flash-outline',
    },
    {
      title: t('feature2'),
      icon: 'language-outline',
    },
    {
      title: t('feature3'),
      icon: 'color-palette-outline',
    },
    {
      title: t('feature4'),
      icon: 'phone-portrait-outline',
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
            {t('aboutTitle')}
          </Text>
          <Text style={[
            commonStyles.text,
            isTablet && commonStyles.textTablet,
            { color: theme.textSecondary }
          ]}>
            {t('aboutDescription')}
          </Text>
        </View>

        <View style={[
          styles.featuresContainer,
          isTablet && styles.featuresContainerTablet
        ]}>
          {features.map((feature, index) => (
            <View
              key={index}
              style={[
                commonStyles.card,
                isTablet && commonStyles.cardTablet,
                { backgroundColor: theme.cardBackground }
              ]}
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
            </View>
          ))}
        </View>

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
            {t('version')}: 1.0.0
          </Text>
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