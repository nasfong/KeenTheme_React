import { CircularProgress, FormControl, InputLabel, MenuItem, Select, SelectProps, Typography } from '@mui/material'
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
  loading?: boolean
}

export function SelectM<T extends FieldValues, P extends { [id: string]: any }>({
  keyValue = 'id',
  items,
  displayName,
  methods,
  loading,
  ...props
}: Props<T, P>) {
  const {
    control,
    formState: { errors },
  } = methods
  return (
    <FormControl variant="filled" margin='dense' fullWidth>
      <InputLabel>
        {props.label} {' '}
        {props.rules?.required && <span style={{ color: 'red' }}>*</span>}
      </InputLabel>
      <Controller
        name={props.name}
        control={control}
        rules={props.rules}
        render={({ field }) => (
          <Select
            {...field}
            {...props}
            fullWidth
            error={!!errors[props.name]}
            displayEmpty
            endAdornment={loading ? <CircularProgress color="primary" size={20} sx={{ mr: 4 }} /> : null}
          >
            {loading ? (
              <MenuItem disabled={loading}>Loading...</MenuItem>
            ) : (
              (items || []).map((item) => (
                <MenuItem key={item[keyValue]} value={item[keyValue]}>
                  {item[displayName]}
                </MenuItem>
              ))
            )}
          </Select>
        )}
      />
      {errors[props.name] ? (
        <Typography color="#F04438" fontSize={10} px={2} pt={0.4} fontWeight={450}>
          {(errors[props.name] as any).message}
        </Typography>
      ) : null}
    </FormControl>
  )
}
