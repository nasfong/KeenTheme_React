import React, { useEffect } from 'react'
import { Content } from './components/Content'
import { PageDataProvider } from './core'
import { MenuComponent } from '../assets/ts/components'
import { useLocation } from 'react-router-dom'


const MasterLayout: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const location = useLocation()
  useEffect(() => {
    setTimeout(() => {
      MenuComponent.reinitialization()
    }, 500)
  }, [])

  useEffect(() => {
    setTimeout(() => {
      MenuComponent.reinitialization()
    }, 500)
  }, [location.key])

  return (
    <PageDataProvider>
      {/* <Notify /> */}
      <div className='page d-flex flex-row flex-column-fluid'>
        {/* <AsideDefault /> */}
        <div className='wrapper d-flex flex-column flex-row-fluid' id='kt_wrapper'>
          {/* <HeaderWrapper /> */}

          <div id='kt_content' className='content d-flex flex-column flex-column-fluid'>
            <Content>
              {children}
            </Content>
          </div>
        </div>
      </div>

    </PageDataProvider>
  )
}

export { MasterLayout }
