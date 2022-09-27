import { View, ColorValue, ActivityIndicator } from 'react-native';
import { THEME } from '../../theme';

import { styles } from './styles';

interface Props {
  color?: ColorValue;
}

export function Loading({ color = THEME.COLORS.PRIMARY }: Props) {
  return (
    <View style={styles.container}>
      <ActivityIndicator color={color} />
    </View>
  )
}