/* eslint-disable jsx-a11y/anchor-is-valid */
import { FC } from 'react'
import { useLayout } from '../core'

const Footer: FC = () => {
  const { classes } = useLayout()
  const { REACT_APP_APP_NAME } = process.env
  return (
    <div className='footer py-4 d-flex flex-lg-column' id='kt_footer'>
      {/* begin::Container */}
      <div
        className={`${classes.footerContainer} d-flex flex-column flex-md-row align-items-center justify-content-between`}
      >
        {/* begin::Copyright */}
        <div className='text-dark order-2 order-md-1'>
          <span className='text-muted fw-bold me-2'>{new Date().getFullYear()} &copy;</span>
          {/* <a href='#' className='text-gray-800 text-hover-primary'> */}
          <span className='text-muted fw-bold'>{REACT_APP_APP_NAME}</span>
          {/* </a> */}
        </div>
        {/* end::Copyright */}

        {/* begin::Nav */}
        {/* <ul className='menu menu-gray-600 menu-hover-primary fw-bold order-1'>
          <li className='menu-item'>
            <a href='#' className='menu-link ps-0 pe-2'>
              About
            </a>
          </li>
          <li className='menu-item'>
            <a href='#' className='menu-link pe-0 pe-2'>
              Contact
            </a>
          </li>
          <li className='menu-item'>
            <a href='#' className='menu-link pe-0'>
              Purchase
            </a>
          </li>
        </ul> */}
        {/* end::Nav */}
      </div>
      {/* end::Container */}
    </div>
  )
}

export { Footer }
