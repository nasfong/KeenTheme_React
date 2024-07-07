import { createContext, useContext, useEffect, useReducer } from "react"
import { message } from 'antd'
import { NoticeType } from "antd/es/message/interface"

type NotifyTypes = NoticeType | 'open'

interface IState {
  notify?: { status: NotifyTypes | 'open', content: string }
  sidebarMenu: Menu[] | undefined
}
type IAction =
  { type: 'SET_MENU'; payload: Menu[] | undefined }
  | { type: 'NOTIFY'; payload: { status: NotifyTypes, content: string } | undefined }
interface GlobalDataProps extends IState {
  dispatch: React.Dispatch<IAction>
}

const DataContext = createContext<GlobalDataProps | undefined>(undefined)

export function GlobalDataProvider({ children }: { children: React.ReactNode }) {
  const initialState: IState = {
    notify: undefined,
    sidebarMenu: []
  }
  const [state, dispatch] = useReducer((state: IState, action: IAction): IState => {
    switch (action.type) {
      case 'SET_MENU':
        return { sidebarMenu: action.payload }
      case 'NOTIFY':
        return { ...state, notify: action.payload }
      default:
        return state
    }
  }, initialState)

  useEffect(() => {
    if (state.notify?.status && state.notify?.content) {
      const { status, content } = state.notify
      message[status]({ content })
      // dispatch({ type: 'NOTIFY', payload: undefined })
    }
  }, [state.notify])

  return (
    <DataContext.Provider value={{ ...state, dispatch }} >
      {children}
    </DataContext.Provider>
  )
}

export function useGlobalData() {
  const context = useContext(DataContext)
  if (context === undefined) {
    throw new Error('usePermissions must be used within a PermissionsProvider')
  }
  return context
}