import { StyleSheet } from 'react-native';
import { THEME } from '../../theme';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    height: 100,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
  },
  username: {
    color: THEME.COLORS.TEXT,
    fontFamily: THEME.FONT_FAMILY.BOLD,
    fontSize: THEME.FONT_SIZE.MD,
    marginLeft: 16,
  },
  button: {
    backgroundColor: THEME.COLORS.PRIMARY,
    width: 42,
    height: 42,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    marginLeft: 2,
  }
});