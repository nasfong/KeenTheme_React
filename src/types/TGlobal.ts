
//? Get Required type from Package or Functional type
export type GetRequiredKeys<T> = { [K in keyof T as (undefined extends T[K] ? never : K)]: T[K] }
