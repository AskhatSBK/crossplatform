import React from 'react';
import { View, Text, StyleSheet, useWindowDimensions } from 'react-native';
import { useTheme } from '../theme/theme';
import { useLocalization } from '../i18n/useLocalization';
import { commonStyles } from '../theme/styles';

interface TeamProps {
  team: string[];
  teamNumber: number;
  isTablet: boolean;
  isSmallScreen: boolean;
}

export const Team = ({ team, teamNumber, isTablet, isSmallScreen }: TeamProps) => {
  const theme = useTheme();
  const { t } = useLocalization();

  return (
    <View 
      style={[
        commonStyles.gridItem,
        styles.teamContainer,
        { backgroundColor: theme.cardBackground }
      ]}
    >
      <Text style={[
        styles.teamTitle,
        isSmallScreen && styles.teamTitleSmall,
        { color: theme.primary }
      ]}>
        {t('team')} {teamNumber}
      </Text>
      {team.map((member, memberIndex) => (
        <Text 
          key={memberIndex} 
          style={[
            styles.member,
            isSmallScreen && styles.memberSmall,
            { color: theme.text }
          ]}
        >
          {member}
        </Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  teamContainer: {
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    gap: 8,
  },
  teamTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  teamTitleSmall: {
    fontSize: 16,
  },
  member: {
    fontSize: 16,
  },
  memberSmall: {
    fontSize: 14,
  }
}); 