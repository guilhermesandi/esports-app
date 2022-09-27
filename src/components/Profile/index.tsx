import { View, Text, Image, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import { useAuth } from '../../hooks/auth';

import { THEME } from '../../theme';

import { styles } from './styles';

export function Profile() {
  const { user, signOut } = useAuth();

  return (
    <View style={styles.container}>
      <View style={styles.userContainer}>
        <Image
          source={{ uri: user.avatar }}
          style={styles.avatar}
        />
        <Text style={styles.username}>{user.username}</Text>
      </View>
      <TouchableOpacity
        onPress={signOut}
      >
        <MaterialIcons
          name="logout"
          size={25}
          color={THEME.COLORS.TEXT}
        />
      </TouchableOpacity>
    </View>
  )
}