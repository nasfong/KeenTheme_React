export function debounce(fn: Function, delay: number) {
  let timer: NodeJS.Timeout

  return function (this: Function, ...args: any[]) {
    clearTimeout(timer)
    timer = setTimeout(() => fn(...args), delay)
  }
}
