import { FC } from 'react'

const Error403: FC = () => {
  return (
    <>
      <h1 className='fw-bolder fs-4x text-gray-700 mb-10'>Forbiddon Error</h1>

      <div className='fw-bold fs-3 text-gray-400 mb-15'>
        You don't have permission to access on this module.
      </div>
    </>
  )
}

export { Error403 }
