import { Checkbox, FormControlLabel, CheckboxProps } from '@mui/material'
import { Controller, FieldValues, Path, UseFormReturn } from 'react-hook-form'

type Props<
  T extends FieldValues,
  P extends { [id: string]: any },
> = CheckboxProps & {
  methods: UseFormReturn<T, any, undefined>
  name: Path<T>
  items?: P[]
  keyValue?: keyof P | 'id'
  label: keyof P
}

export function CheckBoxes<
  T extends FieldValues,
  P extends { [id: string]: any },
>({ methods, items, keyValue = 'id', label, ...props }: Props<T, P>) {
  const { control } = methods
  return (
    <Controller
      control={control}
      name={props.name}
      render={({ field: { onChange, ...rest } }) => (
        <>
          {items?.map((item) => (
            <FormControlLabel
              key={item[keyValue]}
              label={item[label]}
              control={
                <Checkbox
                  checked={rest.value.includes(item[keyValue])}
                  onChange={(e) => {
                    const selectedOptions = e.target.checked
                      ? [...rest.value, item[keyValue]]
                      : rest.value.filter((id: string) => id !== item[keyValue])
                    onChange(selectedOptions) //? Format value
                  }}
                  {...rest}
                  {...props}
                />
              }
            />
          ))}
        </>
      )}
    />
  )
}
