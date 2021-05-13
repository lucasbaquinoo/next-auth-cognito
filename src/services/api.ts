import axios from 'axios'
import { Auth } from 'aws-amplify'
import Cookie from 'js-cookie'

export const api = axios.create({
  baseURL: 'https://api.b3.testing.sambatech.dev/v1',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
})

export const signIn = async (email: string, password: string) => {
  const response = await Auth.signIn(email.toLowerCase(), password);
  Cookie.set('authB3', {auth: true})
  return response;
}

export const sendToken = async(token: string, refresh = '') => {
  await api.post(
    '/authorization_tokens',
    {
      refreshToken: refresh,
    },
    {
      headers: {
        Authorization: token
      }
    })
}