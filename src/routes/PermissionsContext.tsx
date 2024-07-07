import React, { createContext, useCallback, useContext, useMemo, useState } from 'react'

interface PermissionContextProps {
  handlePermission: (permission: Permission[]) => boolean
  setPermissions: (permission: Permission[]) => void
}

const PermissionsContext = createContext<PermissionContextProps | undefined>(undefined)

export const PermissionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const initialState: Permission[] = JSON.parse(localStorage.getItem('accessControl') || '[]')
  const [userPermissions, setUserPermissions] = useState<Permission[]>(initialState)

  const handlePermission = useCallback(
    (value: Permission[] = []) =>
      !!value.some((permission) => userPermissions.includes(permission)),
    [userPermissions],
  )

  const handleSetPermission = useCallback((permission: Permission[]) => {
    setUserPermissions(permission)
    localStorage.setItem('accessControl', JSON.stringify(permission))
  }, [])

  const contextValue = useMemo(
    () => ({
      handlePermission,
      setPermissions: handleSetPermission,
    }),
    [handlePermission, handleSetPermission],
  )
  return <PermissionsContext.Provider value={contextValue}>{children}</PermissionsContext.Provider>
}

// export function usePermissions() {
//   const context = useContext(PermissionsContext)
//   if (context === undefined) {
//     throw new Error('usePermissions must be used within a PermissionsProvider')
//   }
//   return context
// }
