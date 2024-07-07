import {
  Box, Button, Card, CardActions, CardContent
  // styled
} from '@mui/material'
import { InputM2 } from 'components/InputM'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
// import { alpha, useTheme } from '@mui/material/styles'
// import ApexChart from 'react-apexcharts'
import { useQueryMenuParent } from 'hook/useMenu'
import { useEffect, useRef } from 'react'
import { SelectM } from 'components/SelectM'
import { CheckBoxM } from 'components/CheckBoxM'
import { CheckBoxes } from 'components/CheckBoxes'
import { useQueryCustomer } from 'src/hook/useCustomer'
import { SelectSearch } from 'src/components/Autocomplete'
import ButtonM from 'src/components/ButtonM'
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'

// interface FormData {
//   firstName: string
//   lastName: string | undefined
//   email: string | undefined
//   age: number | undefined
//   birth: string | undefined
//   gender: string | undefined
//   allows: string[] | undefined
//   active: boolean | undefined
//   searchSelect: { id?: string, name?: string, order?: number } | undefined
// country: null | string | undefined
// lists: { name: string }[] | undefined
// user: {
//   username: string
// } | undefined
// }
const tomorrow = new Date('02/07/2000')

const schema = yup.object().shape({
  firstName: yup.string().required().default('nasfong'),
  lastName: yup.string().default('hello'),
  email: yup.string().email().default(''),
  age: yup.number().positive().integer().default(21),
  birth: yup.date().default(tomorrow).nullable(),
  gender: yup.string().default(''),
  allows: yup.array().default([]),
  active: yup.boolean().default(false),
  searchSelect: yup.object({
    id: yup.string(),
    name: yup.string(),
    order: yup.number()
  }),
  country: yup.string().default(null).nullable(),
  lists: yup.array().of(yup.object({
    name: yup.string().required()
  })).default([]).required(),
  user: yup.object({
    username: yup.string()
  })
})

type FormData = yup.InferType<typeof schema>

const Customer = () => {
  const [getAllMenuParents, { data: dropdown_user, loading, refetch }] = useQueryMenuParent()
  const { data } = useQueryCustomer()
  const methods = useForm<FormData>({
    // resolver: yupResolver(schema),
    // defaultValues: schema.getDefault(),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      age: 23,
      birth: tomorrow,
      gender: '',
      allows: [],
      active: false,
      searchSelect: { id: '652929b262fe992347a0bced', name: 'Dashboard', order: 4 },
      country: '652954140638300c0f8a5bf5',
      lists: [],
      user: {
        username: ''
      }
    }
  })

  const { fields, append, remove } = useFieldArray({
    name: 'lists',
    control: methods.control
  })

  const inputRef = useRef<HTMLInputElement>(null)
  useEffect(() => {
    if (inputRef.current) inputRef.current.focus()
    getAllMenuParents()
  }, [])

  const handleAdd = () => {
    append({ name: 'New' })
  }
  const handleRemove = (index: number) => {
    remove(index)
  }

  const onSubmit = (input: FormData) => {
    console.log(input)
  }
  return (
    <>
      <Card>
        <CardContent>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <InputM2
              label='First Name'
              name='firstName'
              control={methods.control}
              // rules={{ required: 'First Name is required' }}
              sx={{
                color: 'primary.light',
                backgroundColor: (theme) => theme.palette.primary.lightest,
              }}
              inputRef={inputRef}
            />
            <InputM2
              label='Last Name'
              name='lastName'
              control={methods.control}
            // rules={{ required: 'First Name is required' }}
            />
            <InputM2
              label='Email'
              name='email'
              control={methods.control}
            // rules={{
            //   required: 'Email is required',
            //   pattern: {
            //     value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
            //     message: 'Invalid email address',
            //   },
            // }}
            />
            <InputM2 label='Age' name='age' control={methods.control} />
            {/* <InputM2 label='Birth' name='birth' control={methods.control} type='date' /> */}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Controller
                control={methods.control}
                name='birth'
                rules={{
                  validate: () => false
                }}
                render={({ field: { onChange, value, ...rest } }) => (
                  <DatePicker
                    label='Birth'
                    sx={{ width: '100%' }}
                    minDate={dayjs(new Date())}
                    // onOpen={() => setOpen(true)}
                    // onClose={() => setOpen(false)}
                    onChange={(...e) => {
                      onChange(...e)
                      // console.log(e, d)
                    }}

                    defaultValue={value ? dayjs(value) : null}
                    {...rest}
                  />
                )}
              />
            </LocalizationProvider>
            <SelectM
              loading={loading}
              label='Gender'
              name='gender'
              methods={methods}
              items={dropdown_user?.getAllMenuParents}
              keyValue='id'
              displayName='name'
              rules={{
                // required: 'Gender is required',
                validate: () => false
              }}
            />
            <SelectSearch
              loading={loading}
              label='Country'
              name='country'
              items={[{ id: "0", name: 'All' }].concat(dropdown_user?.getAllMenuParents || [])}
              displayName='name'
              methods={methods}
            // rules={{ required: 'required' }}
            />
            <CheckBoxes
              methods={methods}
              name='allows'
              items={dropdown_user?.getAllMenuParents}
              label='name'
            />
            <CheckBoxM
              label='Activate User'
              methods={methods}
              name='active'
            // rules={{ required: 'You must accept the terms and conditions' }}
            />
            <InputM2
              label='Username'
              name='user.username'
              control={methods.control}
            // rules={{ required: 'You must accept the terms and conditions' }}
            />
            {fields.map((field, index) => (
              <Box key={field.id} display='flex'>
                <InputM2
                  label={field.name + index}
                  name={`lists.${index}.name`}
                  control={methods.control}
                // rules={{ required: `name${index} is required` }}
                />
                <Button type='button' variant='text' onClick={() => handleRemove(index)}>Remove</Button>
              </Box>
            ))}
            <Button type='button' variant='text' onClick={handleAdd}>Add</Button>
            <Button type='button' variant='text' onClick={async () => await refetch()}>Reload</Button>

            <br />
            <ButtonM
              loading={loading}
              type='submit'
              variant='contained'
            >Submit</ButtonM>
          </form>
        </CardContent>
        <CardActions sx={{ display: 'flex', flexDirection: 'column' }}>
          {data?.getAllCustomers?.map(item => (
            <div key={item?.id}>{item?.name} - {item?.phone} - {item?.age}</div>
          ))}
        </CardActions>
      </Card>

    </>
  )
}

export default Customer
