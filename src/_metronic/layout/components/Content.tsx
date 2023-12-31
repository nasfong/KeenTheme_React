import React, { useEffect } from 'react'
import { useLocation } from 'react-router'
import clsx from 'clsx'
import { useLayout } from '../core'
import { DrawerComponent } from '../../assets/ts/components'

const Content: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const { classes } = useLayout()
  // const location = useLocation()
  useEffect(() => {
    DrawerComponent.hideAll()
  }, [])

  return (
    <div id='kt_content_container' className={clsx(classes.footerContainer.join(' '))}>
      {children}
    </div>
  )
}

export { Content }
