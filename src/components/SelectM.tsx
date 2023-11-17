import { FormControl, InputLabel, MenuItem, Select, SelectProps } from '@mui/material'
import { Controller, FieldValues, Path, RegisterOptions, UseFormReturn } from 'react-hook-form'

type Props<T extends FieldValues, P extends { [id: string]: any }> = SelectProps & {
  label: string
  rules?:
    | Omit<
        RegisterOptions<T, Path<T> & (string | undefined)>,
        'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
      >
    | undefined
  methods: UseFormReturn<T, any, undefined>
  name: Path<T>
  items?: P[]
  keyValue?: keyof P | 'id'
  displayName: keyof P
}

export function SelectM<T extends FieldValues, P extends { [id: string]: any }>({
  keyValue = 'id',
  items,
  displayName,
  methods,
  ...props
}: Props<T, P>) {
  const {
    control,
    formState: { errors },
  } = methods
  return (
    <FormControl fullWidth>
      <InputLabel>{props.label}</InputLabel>
      {items ? (
        <Controller
          name={props.name}
          control={control}
          rules={props.rules}
          render={({ field }) => (
            <Select fullWidth error={!!errors[props.name]} {...field} {...props}>
              {items.map((item) => (
                <MenuItem key={item[keyValue]} value={item[keyValue]}>
                  {item[displayName]}
                </MenuItem>
              ))}
            </Select>
          )}
        />
      ) : null}
      {errors[props.name] && <p style={{ color: 'red' }}>{(errors[props.name] as any).message}</p>}
    </FormControl>
  )
}
