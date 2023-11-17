import { Checkbox, FormControlLabel, CheckboxProps } from '@mui/material'
import { Controller, FieldValues, Path, RegisterOptions, UseFormReturn } from 'react-hook-form'

type Props<T extends FieldValues> = CheckboxProps & {
  label?: string
  rules?:
    | Omit<
        RegisterOptions<T, Path<T> & (string | undefined)>,
        'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
      >
    | undefined
  methods: UseFormReturn<T, any, undefined>
  name: Path<T>
}

export function CheckBoxM<T extends FieldValues>({ methods, ...props }: Props<T>) {
  const {
    control,
    formState: { errors },
  } = methods
  return (
    <>
      <FormControlLabel
        label={props.label}
        control={
          <Controller
            control={control}
            name={props.name}
            rules={props.rules}
            render={({ field }) => <Checkbox {...field} {...props} />}
          />
        }
      />
      {errors[props.name] && (
        <p style={{ color: 'red' }}>{errors[props.name]?.message as string}</p>
      )}
    </>
  )
}
