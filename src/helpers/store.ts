import { TypedUseSelectorHook, shallowEqual, useSelector } from 'react-redux'
import { Action, applyMiddleware, combineReducers, createStore } from 'redux'
import thunk from 'redux-thunk'

interface State {
  counter: number
}

const initialState: State = {
  counter: 0,
}

const authReducer = (state = initialState.counter, action: Action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1
    case 'DECREMENT':
      return state - 1
    default:
      return state
  }
}

const rootReducer = combineReducers({
  counter: authReducer,
})

type RootState = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer, applyMiddleware(thunk))

export const useAuthSelector: TypedUseSelectorHook<RootState> = (fn) => {
  return useSelector(fn, shallowEqual)
}
