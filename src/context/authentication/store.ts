import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { Dispatch, applyMiddleware, createStore } from 'redux'
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk'
// import { useJwt } from 'react-jwt';
// import loggerMiddleware from 'redux-logger';
import { jwtDecode } from 'jwt-decode'

interface User {
  id: string
  username: string
  password: string
  role: string
  permission: string[]
  exp: number
  iat: number
}

type Action =
  | { type: 'LOGIN'; payload: { token: string } }
  | { type: 'LOGOUT' };


interface IState {
  auth?: {
    token: string | undefined
    user?: User | null
  }
}


const initialState: IState = {
  auth: undefined
}

const persistConfig = {
  key: 'root',
  storage,
  // Optionally, you can blacklist or whitelist specific reducers
  // blacklist: ['user'],
  // whitelist: ['user'],
}

const decodeToken = (token: string | undefined): User => jwtDecode(token || '')

const authReducer = (state = initialState, action: Action): IState => {
  switch (action.type) {
    case 'LOGIN':
      return { auth: { token: action.payload.token, user: decodeToken(action.payload.token) } }
    case 'LOGOUT':
      return { auth: { token: undefined, user: undefined } }
    default:
      return state
  }
}

const persistedReducer = persistReducer(persistConfig, authReducer)

type RootState = ReturnType<typeof store.getState>

export const store = createStore(
  persistedReducer,
  applyMiddleware(
    thunk,
    // loggerMiddleware
  )
)
export const persistor = persistStore(store)

export const useAuthSelector = <T>(fn?: (state: RootState) => T) => {
  const state = fn ? useSelector(fn, shallowEqual) : undefined
  const dispatch = useDispatch<Dispatch<Action>>()
  return { state, dispatch }
}
