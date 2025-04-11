import { Text, View, StyleSheet, ScrollView } from 'react-native';
import { Link } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useTheme } from './context/ThemeContext';

const key_func = [
  'Divide into groups',
  'Create group name',
  'Division by (skill, age, etc.)',
  'Export to Google Sheet',
  'Invitation to group',
];

export default function AboutScreen() {
  const { t } = useTranslation();
  const { theme, isDarkMode } = useTheme();
  
  // Get dynamic styles based on theme
  const dynamicStyles = {
    container: {
      backgroundColor: theme.background,
    },
    scrollContent: {
      padding: 20,
      alignItems: 'center' as const,
    },
    header: {
      color: theme.text,
    },
    text: {
      color: theme.text,
    },
    item: {
      color: theme.text,
    },
  };

  return (
    <View style={[styles.container, dynamicStyles.container]}>
      <ScrollView contentContainerStyle={[styles.scrollContent, dynamicStyles.scrollContent]}>
        <Text style={[styles.header, dynamicStyles.header]}>{t('about.title')}</Text>
        <Text style={[styles.header, dynamicStyles.header]}>{t('common.appName')}</Text>
        <Text style={[styles.header, dynamicStyles.header]}>
          {t('about.keyFeatures')}
        </Text>
        {/* Feature list */}
        {key_func.map((item, index) => (
          <Text key={index} style={[styles.item, dynamicStyles.item]}>{`\u2022 ${item}`}</Text>
        ))}

        {/* Info block */}
        <Text style={[styles.text, dynamicStyles.text]}>
          {`\n${t('about.framework')}\n${t('about.database')}\n${t('about.api')}`}
        </Text>

        {/* Welcome message */}
        <Text style={[styles.text, dynamicStyles.text]}>
          {t('about.developedBy')}
          {t('about.mentor')}
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
  },
  item: {
    fontSize: 18,
    textAlign: 'center',
    marginVertical: 4,
  },
}); 