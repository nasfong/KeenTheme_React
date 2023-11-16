import { TextField, TextFieldProps } from '@mui/material'
import {
  Controller,
  FieldValues,
  Path,
  RegisterOptions,
  UseFormReturn,
} from 'react-hook-form'

type Props<T extends FieldValues> = TextFieldProps & {
  rules?:
    | Omit<
        RegisterOptions<T, Path<T> & (string | undefined)>,
        'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
      >
    | undefined
  methods: UseFormReturn<T, any, undefined>
  name: Path<T>
}

export function InputM2<T extends FieldValues>({
  methods,
  ...props
}: Props<T>) {
  const {
    control,
    formState: { errors },
  } = methods
  return (
    <Controller
      control={control}
      name={props.name}
      rules={props.rules}
      render={({ field }) => (
        <TextField
          fullWidth
          error={!!errors[props.name]}
          helperText={errors[props.name]?.message as string}
          {...props}
          {...field}
        />
      )}
    />
  )
}
