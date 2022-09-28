import { useNavigation } from '@react-navigation/native';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import { useAuth } from '../../hooks/auth';

import { THEME } from '../../theme';

import { styles } from './styles';

export function ProfileBar() {
  const { user, signOut } = useAuth();

  const navigation = useNavigation();

  function handleProfile() {
    navigation.navigate('profile');
  }

  return (
    <View style={styles.container}>
      <View style={styles.userContainer}>
        <TouchableOpacity
          onPress={handleProfile}
        >
          <Image
            source={{ uri: user.avatar }}
            style={styles.avatar}
          />
        </TouchableOpacity>
        <Text style={styles.username}>{user.username}</Text>
      </View>
      <TouchableOpacity
        onPress={signOut}
        style={styles.button}
      >
        <MaterialIcons
          name="logout"
          size={24}
          color={THEME.COLORS.TEXT}
          style={styles.icon}
        />
      </TouchableOpacity>
    </View>
  )
}