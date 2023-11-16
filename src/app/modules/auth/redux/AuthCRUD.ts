import axios from 'axios'
import { AuthModel } from '../models/AuthModel'
import { UserModel } from '../models/UserModel'

export const GET_USER_BY_ACCESSTOKEN_URL = `/user/profile`
export const LOGIN_URL = `/login`
export const CHANGE_PASSWORD_URL = '/change-password'
export const REGISTER_URL = `/auth/register`
export const REQUEST_PASSWORD_URL = `/auth/forgot-password`
export const LOGOUT_URL = `/logout`
export const DEACTIVATE_URL = `/user/deactivate`

// Server should return AuthModel
export async function login(email: string, password: string) {
  return await axios.post(LOGIN_URL, { email, password })
}

export async function requestChangePassword(
  password: string,
  confirmation_password: string,
  token: string,
) {
  return await axios.post(CHANGE_PASSWORD_URL, {
    password,
    confirmation_password,
    token,
  })
}

// Server should return AuthModel
export function register(
  email: string,
  firstname: string,
  lastname: string,
  password: string,
) {
  return axios.post<AuthModel>(REGISTER_URL, {
    email,
    firstname,
    lastname,
    password,
  })
}

// Server should return object => { result: boolean } (Is Email in DB)
export function requestPassword(email: string) {
  return axios.post<{ result: boolean }>(REQUEST_PASSWORD_URL, { email })
}

export async function getUserByToken() {
  // Authorization head should be fulfilled in interceptor.
  // Check common redux folder => setupAxios
  return await axios.get<UserModel>(GET_USER_BY_ACCESSTOKEN_URL)
}

export function logout() {
  return axios.post(LOGOUT_URL)
}

export async function deactivate(confirm: boolean) {
  return await axios.post(DEACTIVATE_URL, { confirm })
}
