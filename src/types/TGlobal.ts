
//? Get Required type from Package or Functional type
export type GetRequiredKeys<T> = { [K in keyof T as (undefined extends T[K] ? never : K)]: T[K] }

//? DotNestKeys for translate ['FORM.FRIST_NAME']
type DotPrefix<T extends string> = T extends "" ? "" : `.${T}`
export type DotNestedKeys<T> = (T extends object ?
    { [K in Exclude<keyof T, symbol>]: `${K}${DotPrefix<DotNestedKeys<T[K]>>}` }[Exclude<keyof T, symbol>]
    : "") extends infer D ? Extract<D, string> : never;

