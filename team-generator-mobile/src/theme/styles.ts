import { StyleSheet, Platform, Dimensions } from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const isTablet = SCREEN_WIDTH >= 768;
const isSmallScreen = SCREEN_WIDTH < 360;

// Define consistent spacing values
const SPACING = {
  xs: isSmallScreen ? 4 : 6,
  sm: isSmallScreen ? 8 : 12,
  md: isSmallScreen ? 16 : 20,
  lg: isSmallScreen ? 24 : 32,
  xl: isSmallScreen ? 32 : 40,
};

export const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: SPACING.md,
    paddingTop: SPACING.lg,
    gap: SPACING.md,
  },
  contentTablet: {
    padding: SPACING.lg,
    paddingTop: SPACING.xl,
    maxWidth: 1200,
    alignSelf: 'center',
    width: '100%',
    gap: SPACING.lg,
  },
  card: {
    borderRadius: isSmallScreen ? 12 : 16,
    padding: SPACING.md,
    marginBottom: 0, // Remove margin since we're using gap
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  cardTablet: {
    padding: SPACING.lg,
  },
  subtitle: {
    fontSize: isSmallScreen ? 18 : 20,
    fontWeight: '700',
    marginBottom: SPACING.md,
    letterSpacing: 0.5,
  },
  subtitleTablet: {
    fontSize: 28,
    marginBottom: SPACING.lg,
  },
  text: {
    fontSize: isSmallScreen ? 14 : 16,
    lineHeight: isSmallScreen ? 20 : 24,
    letterSpacing: 0.3,
  },
  textTablet: {
    fontSize: 18,
    lineHeight: 28,
  },
  section: {
    marginBottom: 0, // Remove margin since we're using gap
  },
  sectionTablet: {
    marginBottom: 0, // Remove margin since we're using gap
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: SPACING.sm,
  },
  rowTablet: {
    paddingVertical: SPACING.md,
  },
  divider: {
    height: 1,
    marginVertical: SPACING.xs,
  },
  button: {
    borderRadius: isSmallScreen ? 10 : 12,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  buttonTablet: {
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderRadius: isSmallScreen ? 8 : 10,
    padding: SPACING.sm,
    fontSize: isSmallScreen ? 14 : 16,
  },
  inputTablet: {
    padding: SPACING.md,
    fontSize: 18,
  },
  label: {
    fontSize: isSmallScreen ? 12 : 14,
    fontWeight: '600',
    marginBottom: SPACING.xs,
    opacity: 0.8,
  },
  labelTablet: {
    fontSize: 16,
    marginBottom: SPACING.sm,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.md,
    justifyContent: 'center',
  },
  gridContainerTablet: {
    gap: SPACING.lg,
    justifyContent: 'flex-start',
  },
  gridItem: {
    flex: 1,
    minWidth: isSmallScreen ? 140 : 160,
    maxWidth: isTablet ? 300 : 200,
  },
}); 