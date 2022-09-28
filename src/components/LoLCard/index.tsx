import {
  View,
  TouchableOpacity,
  TouchableOpacityProps,
  Image,
  Text,
} from 'react-native';

import { styles } from './styles';

interface Props extends TouchableOpacityProps {
  title: string;
  level: number;
  bannerUrl: string
}

export function LoLCard({ title, level, bannerUrl, ...rest }: Props) {
  return (
    <TouchableOpacity style={styles.container} {...rest}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: bannerUrl }}
          style={styles.image}
        />
        <View style={styles.levelContainer}>
          <Text style={styles.level}>
            {level}
          </Text>
        </View>
      </View>
      <Text style={styles.name}>
        {title}
      </Text>
    </TouchableOpacity>
  )
}