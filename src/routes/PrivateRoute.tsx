import { usePermissions } from './PermissionsContext'

interface PrivateRouteProps {
  component: React.ComponentType
  requiredPermissions: Permission[]
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({
  component: Component,
  requiredPermissions,
}) => {
  const { handlePermission } = usePermissions()
  const hasPermission = handlePermission(requiredPermissions)
  return true ? <Component /> : <>No Permission</>
}
