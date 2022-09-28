import axios from 'axios';

const apiDiscord = axios.create({
  baseURL: 'https://discord.com/api'
})

const apiRiot = axios.create({
  baseURL: 'https://americas.api.riotgames.com/riot'
})

const apiLoL = axios.create({
  baseURL: 'https://br1.api.riotgames.com/lol'
})

export { apiDiscord, apiRiot, apiLoL }