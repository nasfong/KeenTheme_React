import { DependencyList, useEffect } from "react"

export function debounce(fn: Function, delay: number) {
  let timer: number

  return function (this: Function, ...args: any[]) {
    clearTimeout(timer)
    timer = setTimeout(() => fn(...args), delay)
  }
}

export function useDebounce(fn: Function, delay: number, deps: DependencyList) {
  useEffect(() => {
    debounce(fn, delay)
    console.log(delay)
  }, deps)
}