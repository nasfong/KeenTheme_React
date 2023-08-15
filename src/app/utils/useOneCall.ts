import { useEffect, useRef } from 'react'

const useOnceCall = (cb: Function, condition = true) => {
  const isCalledRef = useRef(false)

  useEffect(() => {
    if (condition && !isCalledRef.current) {
      isCalledRef.current = true
      cb()
    }
  }, [cb, condition])
}

export default useOnceCall
