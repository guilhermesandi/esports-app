import { useState, useEffect } from 'react';
import { View, Text, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useAuth } from '../../hooks/auth';
import { apiLoL, apiRiot } from '../../services/api';

import { Background } from '../../components/Background';
import { ProfileBar } from '../../components/ProfileBar';

import { styles } from './styles';
import { LoLCard } from '../../components/LoLCard';

interface LoLData {
  accountId: string;
  id: string;
  name: string;
  profileIconId: number;
  puuid: string;
  revisionDate: number;
  summonerLevel: number;
  profileIconUrl: string;
}

export function Profile() {
  const { user } = useAuth();

  const [lolData, setLolData] = useState({} as LoLData);

  async function getRiotAccountData() {
    const riotName = user.connections.filter(connection => connection.type === 'riotgames')[0];
    
    const [gameName, tagLine] = riotName.name.split('#');

    const response = await apiRiot.get(`/account/v1/accounts/by-riot-id/${gameName}/${tagLine}?api_key=RGAPI-b6979800-67a2-46bf-83ee-17a21e7053a8`);
    console.log('response', response.data)
  }

  async function getLoLAccountData() {
    const LoLName = user.connections.filter(connection => connection.type === 'leagueoflegends')[0].name;

    if (LoLName) {
      const response = await apiLoL.get(`/summoner/v4/summoners/by-name/${LoLName}?api_key=${process.env.RIOT_API_KEY}`);
      console.log('response', response.data);
  
      const profileIconUrl = `https://ddragon.leagueoflegends.com/cdn/12.18.1/img/profileicon/${response.data.profileIconId}.png`
  
      const lolUserData = {
        ...response.data,
        profileIconUrl
      }
  
      // https://ddragon.leagueoflegends.com/cdn/12.18.1/img/profileicon/5324.png
  
      setLolData(lolUserData);
    }
  }

  useEffect(() => {
    getLoLAccountData();
  }, []);

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <ProfileBar style={styles.profile} />

        {lolData.name && (
          <LoLCard bannerUrl={lolData.profileIconUrl} level={lolData.summonerLevel} title={lolData.name} />
        )}
      </SafeAreaView>
    </Background>
  )
}