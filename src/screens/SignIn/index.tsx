import { Image, TouchableOpacity, Text, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GameController } from 'phosphor-react-native';

import logoImg from '../../assets/logo-nlw-esports.png';
import { THEME } from '../../theme';

import { useAuth } from '../../hooks/auth';

import { Background } from '../../components/Background';
import { Heading } from '../../components/Heading';
import { Loading } from '../../components/Loading';

import { styles } from './styles';

export function SignIn() {
  const { loading, signIn } = useAuth();

  async function handleSignIn() {
    try {
      await signIn();
    } catch (error) {
      Alert.alert(String(error));
    }
  }

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <Image
          source={logoImg}
          style={styles.logo}
        />

        <Heading
          title="Entrar"
          subtitle="Faça login utilizando sua conta Discord."
          style={styles.heading}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={handleSignIn}
        >
          {loading ? (
            <Loading color={THEME.COLORS.TEXT} />
          ) : (
            <>
              <GameController
                color={THEME.COLORS.TEXT}
                size={20}
              />

              <Text style={styles.buttonTitle}>
                Entrar com Discord
              </Text>
            </>
          )}
        </TouchableOpacity>
      </SafeAreaView>
    </Background>
  )
}