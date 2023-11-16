import { AuthModel } from './AuthModel'
import { UserAddressModel } from './UserAddressModel'
import { UserCommunicationModel } from './UserCommunicationModel'
import { UserEmailSettingsModel } from './UserEmailSettingsModel'
import { UserSocialNetworksModel } from './UserSocialNetworksModel'

export interface UserModel {
  id: number
  username: string
  password: string | undefined
  email: string
  first_name: string
  last_name: string
  fullname?: string
  activated: boolean
  occupation?: string
  companyName?: string
  phone?: string
  roles?: string
  permissions: string[]
  photo?: string
  language?: 'en' | 'de' | 'es' | 'fr' | 'ja' | 'zh' | 'ru'
  timeZone?: string
  website?: 'https://keenthemes.com'
  emailSettings?: UserEmailSettingsModel
  auth?: AuthModel
  communication?: UserCommunicationModel
  address?: UserAddressModel
  socialNetworks?: UserSocialNetworksModel
  customer_id?: Number
  agent_id?: Number
}
