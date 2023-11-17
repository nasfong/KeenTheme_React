/* eslint-disable @typescript-eslint/no-unused-vars */
// import axios from 'axios'
import clsx from 'clsx'
import React, { FC, useEffect, useState } from 'react'
// import { shallowEqual, useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import { UserModel } from '../../../../app/modules/auth/models/UserModel'
// import { RootState } from '../../../../setup'
import { checkIsActive, KTSVG } from '../../../helpers'
import {
  // HeaderNotificationsMenu,
  HeaderUserMenu,
  QuickLinks,
  Search,
} from '../../../partials'
import { useLayout } from '../../core'

const toolbarButtonMarginClass = 'ms-1 ms-lg-3',
  toolbarButtonHeightClass = 'w-30px h-30px w-md-40px h-md-40px',
  toolbarUserAvatarHeightClass = 'symbol-30px symbol-md-60px',
  toolbarButtonIconSizeClass = 'svg-icon-1'

const Topbar: FC = () => {
  // const user: UserModel = useSelector<RootState>(({ auth }) => auth.user, shallowEqual) as UserModel
  const userCan = {
    // aba: user.permissions.includes(`Notification ABA Payment`),
    // venderContract: user.permissions.includes(`Notification Vender Contract`),
  }
  const { config } = useLayout()

  const { pathname } = useLocation()
  const isActiveABA = checkIsActive(pathname, `/aba-payment/114/Report`)
  const isActiveVender = checkIsActive(pathname, `/vender-contract`)

  const [abaCount, setAbaCount] = useState(0)
  const [venContractCount, setVenContractCount] = useState(0)
  // useEffect(() => {
  //   axios.get('payment/monitor-payment-abacount').then((res) => {
  //     setAbaCount(res.data.aba_monitor?.count)
  //     setVenContractCount(res.data.vender_monitor?.count)
  //   })
  //     .catch((error) => console.log(error))
  // })

  return (
    <div className='d-flex align-items-stretch flex-shrink-0'>
      {/* Search */}
      <div className={clsx('d-flex align-items-stretch', toolbarButtonMarginClass)}>
        {/* <Search /> */}
      </div>
      {/* Activities */}
      {/* <div className={clsx('d-flex align-items-center', toolbarButtonMarginClass)}>
        {/* begin::Drawer toggle * /}
        <div
          className={clsx('btn btn-icon btn-active-light-primary', toolbarButtonHeightClass)}
          id='kt_activities_toggle'
        >
          <KTSVG
            path='/media/icons/duotune/general/gen032.svg'
            className={toolbarButtonIconSizeClass}
          />
        </div>
        {/* end::Drawer toggle * /}
      </div> */}
      {/* Quick links */}
      {/* <div className={clsx('d-flex align-items-center', toolbarButtonMarginClass)}> */}
      {/* begin::Menu wrapper */}
      {/* <div
          className={clsx('btn btn-icon btn-active-light-primary', toolbarButtonHeightClass)}
          data-kt-menu-trigger='click'
          data-kt-menu-attach='parent'
          data-kt-menu-placement='bottom-end'
          data-kt-menu-flip='bottom'
        >
          <KTSVG
            path='/media/icons/duotune/general/gen025.svg'
            className={toolbarButtonIconSizeClass}
          />
        </div>
        <QuickLinks /> */}
      {/* end::Menu wrapper */}
      {/* </div> */}

      {/* CHAT */}
      {/* <div className={clsx('d-flex align-items-center', toolbarButtonMarginClass)}>
        {/* begin::Menu wrapper * /}
        <div
          className={clsx(
            'btn btn-icon btn-active-light-primary position-relative',
            toolbarButtonHeightClass
          )}
          id='kt_drawer_chat_toggle'
        >
          <KTSVG
            path='/media/icons/duotune/communication/com012.svg'
            className={toolbarButtonIconSizeClass}
          />

          <span className='bullet bullet-dot bg-success h-6px w-6px position-absolute translate-middle top-0 start-50 animation-blink'></span>
        </div>
        {/* end::Menu wrapper * /}
      </div> */}

      {/* NOTIFICATIONS */}
      {/* <div className={clsx('d-flex align-items-center', toolbarButtonMarginClass)}>
        {/* begin::Menu- wrapper * /}
        <div
          className={clsx(
            'btn btn-icon btn-active-light-primary position-relative',
            toolbarButtonHeightClass
          )}
          data-kt-menu-trigger='click'
          data-kt-menu-attach='parent'
          data-kt-menu-placement='bottom-end'
          data-kt-menu-flip='bottom'
        >
          <KTSVG
            path='/media/icons/duotune/general/gen022.svg'
            className={toolbarButtonIconSizeClass}
          />
        </div>
        <HeaderNotificationsMenu />
        {/* end::Menu wrapper * /}
      </div> */}
      {/* {userCan.venderContract && ( */}
      <Link
        className={clsx('d-flex align-items-center w-md-100px me-md-20', toolbarButtonMarginClass)}
        to='/vender-contract?search=1'
      >
        <div className={clsx('btn btn-icon btn-active-light-primary', toolbarButtonHeightClass)}>
          <span
            className={clsx('text-nowrap d-none d-md-inline', {
              'text-primary': isActiveVender,
            })}
          >
            Vender Monitor
          </span>
          <div className='position-relative'>
            <KTSVG
              path='/media/icons/duotune/general/gen007.svg'
              className={`${toolbarButtonIconSizeClass} svg-icon-1x ${
                isActiveVender && 'svg-icon-primary'
              }`}
            />
            {venContractCount ? (
              <span
                className='position-absolute translate-middle badge rounded-pill bg-danger border border-secondary'
                style={{ top: '10%', left: '80%' }}
              >
                <span className='fs-9'>{venContractCount}</span>
              </span>
            ) : null}
          </div>
        </div>
      </Link>
      {/* )} */}
      {/* {userCan.aba && ( */}
      <Link
        className={clsx('d-flex align-items-center w-md-100px', toolbarButtonMarginClass)}
        to='/aba-payment/114/Report/default'
      >
        <div
          className={clsx(
            'btn btn-icon btn-active-light-primary position-relative',
            toolbarButtonHeightClass,
          )}
        >
          <span
            className={clsx('text-nowrap d-none d-md-inline', {
              'text-primary': isActiveABA,
            })}
          >
            ABA Payment
          </span>
          <div className='position-relative'>
            <KTSVG
              path='/media/icons/duotune/general/gen007.svg'
              className={`${toolbarButtonIconSizeClass} svg-icon-1x ${
                isActiveABA && 'svg-icon-primary'
              }`}
            />
            {abaCount ? (
              <span
                className='position-absolute translate-middle badge rounded-pill bg-danger border border-secondary'
                style={{ top: '25%', left: '90%' }}
              >
                <span className='fs-9'>{abaCount}</span>
              </span>
            ) : null}
          </div>
        </div>
      </Link>
      {/* )} */}
      {/* begin::User */}
      <div
        className={clsx('d-flex align-items-center', toolbarButtonMarginClass)}
        id='kt_header_user_menu_toggle'
      >
        {/* begin::Toggle */}
        <div
          className={clsx('cursor-pointer symbol', toolbarUserAvatarHeightClass)}
          data-kt-menu-trigger='click'
          data-kt-menu-attach='parent'
          data-kt-menu-placement='bottom-end'
          data-kt-menu-flip='bottom'
        >
          {/* <img src={user.photo} alt='metronic' className='rounded-circle ' style={{ borderColor: '#0c5196', borderWidth: 4, borderStyle: 'solid' }} /> */}
        </div>
        <HeaderUserMenu />
        {/* end::Toggle */}
      </div>
      {/* end::User */}

      {/* begin::Aside Toggler */}
      {config.header.left === 'menu' && (
        <div className='d-flex align-items-center d-lg-none ms-2 me-n3' title='Show header menu'>
          <div
            className='btn btn-icon btn-active-light-primary w-30px h-30px w-md-40px h-md-40px'
            id='kt_header_menu_mobile_toggle'
          >
            <KTSVG path='/media/icons/duotune/text/txt001.svg' className='svg-icon-1' />
          </div>
        </div>
      )}
    </div>
  )
}

export { Topbar }
