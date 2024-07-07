import { TextField, TextFieldProps } from '@mui/material';
import { Control, Controller, FieldPath, FieldValues, RegisterOptions } from 'react-hook-form';

type Props<T extends FieldValues> = TextFieldProps & {
  rules?: Omit<RegisterOptions<T, FieldPath<T>>, 'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'>;
  control?: Control<T>;
  name: FieldPath<T>;
};

export function InputM2<T extends FieldValues>({ control, ...props }: Props<T>) {

  // const error = props.name.split('.').reduce<any>((obj, key) => obj?.[key], errors) as { message?: string };

  return (
    <Controller
      control={control}
      name={props.name}
      rules={props.rules}
      defaultValue={'' as T[FieldPath<T>]}
      render={({ field, fieldState }) => (
        <TextField
          {...props}
          {...field}
          fullWidth
          margin="dense"
          error={!!fieldState.error}
          helperText={fieldState.error?.message}
          label={
            <>
              {props.label} {' '}
              {props.rules?.required && <span style={{ color: 'red' }}>*</span>}
            </>
          }
        />
      )}
    />
  );
}
