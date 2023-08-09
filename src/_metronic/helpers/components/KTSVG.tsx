import React from 'react'
import SVG from 'react-inlinesvg'

type Props = {
  className?: string
  path: string
  svgClassName?: string
}

export const KTSVG: React.FC<Props> = ({ className = '', path, svgClassName = 'mh-50px' }) => {
  return (
    <span className={`svg-icon ${className}`}>
      <SVG src={path} className={svgClassName} />
    </span>
  )
}
