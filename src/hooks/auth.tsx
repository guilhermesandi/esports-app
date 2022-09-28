import React, { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import * as AuthSession from 'expo-auth-session';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { SCOPE } = process.env;
const { CLIENT_ID } = process.env;
const { CDN_IMAGE } = process.env;
const { REDIRECT_URI } = process.env;
const { RESPONSE_TYPE } = process.env;

import { apiDiscord } from '../services/api';
import { COLLECTION_USERS } from '../configs/database';

interface DiscordConnections {
  friend_sync: boolean;
  id: string;
  metadata_visibility: number;
  name: string;
  show_activity: boolean;
  two_way_link: boolean;
  type: string;
  verified: boolean;
  visibility: number;
}

interface User {
  id: string;
  username: string;
  avatar: string;
  token: string;
  connections: DiscordConnections[];
}

interface AuthContextData {
  user: User;
  loading: boolean;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
}

interface AuthProviderProps {
  children: ReactNode;
}

type AuthorizationResponse = AuthSession.AuthSessionResult & {
  params: {
    access_token?: string;
    error?: string;
  }
}

export const AuthContext = createContext({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>({} as User);
  const [loading, setLoading] = useState(false);

  async function signIn() {
    try {
      setLoading(true);

      const authUrl = `${apiDiscord.defaults.baseURL}/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;

      const { type, params } = await AuthSession.startAsync({ authUrl }) as AuthorizationResponse;

      if (type === 'success' && !params.error) {
        apiDiscord.defaults.headers.authorization = `Bearer ${params.access_token}`;

        const userInfo = await apiDiscord.get('/users/@me');
        const userInfoConnections = await apiDiscord.get('/users/@me/connections');

        userInfo.data.avatar = `${CDN_IMAGE}/avatars/${userInfo.data.id}/${userInfo.data.avatar}.png`;

        const userData = {
          ...userInfo.data,
          token: params.access_token,
          connections: userInfoConnections.data
        }

        await AsyncStorage.setItem(COLLECTION_USERS, JSON.stringify(userData));

        setUser(userData);
      }
    } catch (error) {
      throw new Error('Não foi possível autenticar');
    } finally {
      setLoading(false);
    }
  }

  async function signOut() {
    setUser({} as User);
    await AsyncStorage.removeItem(COLLECTION_USERS);
  }

  async function loadUserStorageData() {
    const storage = await AsyncStorage.getItem(COLLECTION_USERS);

    if (storage) {
      const userLogged = JSON.parse(storage) as User;
      apiDiscord.defaults.headers.authorization = `Bearer ${userLogged.token}`;

      setUser(userLogged);
    }
  }

  useEffect(() => {
    loadUserStorageData();
  }, []);

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      signIn,
      signOut,
    }}>
      {children}
    </AuthContext.Provider>
  )
}

function useAuth() {
  const context = useContext(AuthContext);

  return context;
}

export {
  AuthProvider,
  useAuth,
}
