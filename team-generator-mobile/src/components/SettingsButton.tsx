import React, { useState } from 'react';
import { 
  TouchableOpacity, 
  Modal, 
  View, 
  Text, 
  StyleSheet, 
  TouchableWithoutFeedback,
  ScrollView,
  Platform,
  useWindowDimensions
} from 'react-native';
import { useSettingsStore } from '../store/useSettingsStore';
import { useTheme } from '../theme/theme';
import { useLocalization } from '../i18n/useLocalization';

export const SettingsButton = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { language, themeMode, setLanguage, setThemeMode } = useSettingsStore();
  const theme = useTheme();
  const { t } = useLocalization();
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'ru', name: 'Русский' },
    { code: 'kk', name: 'Қазақша' },
  ];

  const themes = [
    { code: 'light', name: t('lightTheme') },
    { code: 'dark', name: t('darkTheme') },
    { code: 'system', name: t('systemTheme') },
  ];

  return (
    <>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.cardBackground }, theme.cardShadow]}
        onPress={() => setIsModalVisible(true)}
      >
        <Text style={[styles.buttonText, { color: theme.text }]}>⚙️</Text>
      </TouchableOpacity>

      <Modal
        visible={isModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setIsModalVisible(false)}
        supportedOrientations={['portrait', 'landscape']}
      >
        <TouchableWithoutFeedback onPress={() => setIsModalVisible(false)}>
          <View style={[styles.modalOverlay, { backgroundColor: theme.shadow }]}>
            <TouchableWithoutFeedback>
              <View style={[
                styles.modalContent, 
                { backgroundColor: theme.cardBackground }, 
                theme.cardShadow,
                isLandscape && styles.modalContentLandscape
              ]}>
                <Text style={[styles.modalTitle, { color: theme.text }]}>{t('settings')}</Text>
                
                <View style={[styles.section, isLandscape && { marginBottom: 0 }]}>
                  <Text style={[styles.sectionTitle, { color: theme.text }]}>{t('language')}</Text>
                  <View style={styles.optionsContainer}>
                    {languages.map((lang) => (
                      <TouchableOpacity
                        key={lang.code}
                        style={[
                          styles.option,
                          { borderColor: theme.border },
                          language === lang.code && { 
                            backgroundColor: theme.primary,
                            borderColor: theme.primary,
                          }
                        ]}
                        onPress={() => setLanguage(lang.code as any)}
                      >
                        <Text
                          style={[
                            styles.optionText,
                            { color: language === lang.code ? theme.buttonText : theme.text }
                          ]}
                        >
                          {lang.name}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>

                <View style={[styles.section, isLandscape && { marginBottom: 0 }]}>
                  <Text style={[styles.sectionTitle, { color: theme.text }]}>{t('theme')}</Text>
                  <View style={styles.optionsContainer}>
                    {themes.map((th) => (
                      <TouchableOpacity
                        key={th.code}
                        style={[
                          styles.option,
                          { borderColor: theme.border },
                          themeMode === th.code && { 
                            backgroundColor: theme.primary,
                            borderColor: theme.primary,
                          }
                        ]}
                        onPress={() => setThemeMode(th.code as any)}
                      >
                        <Text
                          style={[
                            styles.optionText,
                            { color: themeMode === th.code ? theme.buttonText : theme.text }
                          ]}
                        >
                          {th.name}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    top: 40,
    right: 16,
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  buttonText: {
    fontSize: 22,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '85%',
    maxWidth: 400,
    borderRadius: 20,
    padding: 24,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 12,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  modalContentLandscape: {
    maxWidth: 600,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: 32,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
    width: '100%',
  },
  section: {
    marginBottom: 24,
    width: '48%',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  option: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
    borderWidth: 1,
    marginBottom: 8,
  },
  optionText: {
    fontSize: 16,
    fontWeight: '500',
  },
}); 