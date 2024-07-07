import { Autocomplete, AutocompleteProps, CircularProgress, TextField } from '@mui/material'
import { Controller, FieldValues, Path, RegisterOptions, UseFormReturn } from 'react-hook-form'

type Props<T extends FieldValues, P extends { [id: string]: any }> =
  Omit<AutocompleteProps<P, false, false, false>, 'options' | 'renderInput'> &
  {
    label: string
    rules?: Omit<RegisterOptions<T, Path<T> & (string | undefined)>, "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"> | undefined
    methods: UseFormReturn<T, any, undefined>
    name: Path<T>
    items: P[] | undefined
    keyValue?: keyof P | 'id'
    displayName: keyof P
  }

export function SelectSearch<T extends FieldValues, P extends { [id: string]: any }>({
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
    <Controller
      name={props.name}
      control={control}
      rules={props.rules}
      render={({ field: { onChange, value, ...rest } }) => (
        <Autocomplete
          {...rest}
          {...props}
          fullWidth
          loading={props.loading}
          options={items || []}
          getOptionLabel={(option) => option[displayName]}
          renderInput={(params) => (
            <TextField
              {...params}
              label={
                <>
                  {props.label} {' '}
                  {props.rules?.required && <span style={{ color: 'red' }}>*</span>}
                </>
              }
              margin="dense"
              error={!!errors[props.name]}
              helperText={errors[props.name]?.message as string}
              InputProps={{
                ...params.InputProps,
                endAdornment: props.loading ? (
                  <CircularProgress color="primary" size={20} />
                ) : params.InputProps.endAdornment
              }}
            />
          )}
          value={items?.find((opt) => opt[keyValue] === value) || null}
          onChange={(_, value) => onChange(value?.[keyValue] || null)}
        // isOptionEqualToValue={(option, value) => option.id === value.id}
        />
      )}
    />
  )
}
