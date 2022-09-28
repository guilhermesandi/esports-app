import { StyleSheet } from 'react-native';
import { THEME } from '../../theme';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    borderRadius: 8,
    padding: 16,
    backgroundColor: THEME.COLORS.BACKGROUND_800,
    alignItems: 'center',
    marginBottom: 8,
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 68,
    height: 68,
    borderRadius: 34,
    borderWidth: 4,
    borderColor: THEME.COLORS.SHAPE,
  },
  levelContainer: {
    position: 'absolute',
    paddingHorizontal: 4,
    borderRadius: 8,
    bottom: -12,
    backgroundColor: THEME.COLORS.BACKGROUND_800,
  },
  level: {
    color: THEME.COLORS.TEXT,
    fontSize: THEME.FONT_SIZE.SM,
    fontFamily: THEME.FONT_FAMILY.BOLD,
  },
  name: {
    color: THEME.COLORS.TEXT,
    fontSize: THEME.FONT_SIZE.MD,
    fontFamily: THEME.FONT_FAMILY.BOLD,
    marginLeft: 16,
  },
});