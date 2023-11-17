import { Button, Card, CardContent, Container, TextField, styled } from '@mui/material'
import { InputM2 } from 'components/InputM'
import { Controller, useForm } from 'react-hook-form'
import { alpha, useTheme } from '@mui/material/styles'
import ApexChart from 'react-apexcharts'
import { useQueryMenuParent } from 'hook/useMenu'
import { useEffect, useRef } from 'react'
import { SelectM } from 'components/SelectM'
import { CheckBoxM } from 'components/CheckBoxM'
import { CheckBoxes } from 'components/CheckBoxes'

interface FormData {
  firstName: string
  lastName?: string
  email?: string
  age: number
  birth: string
  gender: string
  allows: string[]
  active: boolean
}

const useChartOptions = () => {
  const theme = useTheme()

  return {
    chart: {
      background: 'transparent',
      stacked: false,
      toolbar: {
        show: false,
      },
    },
    colors: [theme.palette.primary.main, alpha(theme.palette.primary.main, 0.25)],
    dataLabels: {
      enabled: false,
    },
    fill: {
      opacity: 1,
      type: 'solid',
    },
    grid: {
      borderColor: theme.palette.divider,
      strokeDashArray: 2,
      xaxis: {
        lines: {
          show: false,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    legend: {
      show: false,
    },
    plotOptions: {
      bar: {
        columnWidth: '10px',
      },
    },
    stroke: {
      colors: ['transparent'],
      show: true,
      width: 2,
    },
    theme: {
      mode: theme.palette.mode,
    },
    xaxis: {
      axisBorder: {
        color: theme.palette.divider,
        show: true,
      },
      axisTicks: {
        color: theme.palette.divider,
        show: true,
      },
      categories: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ],
      labels: {
        offsetY: 5,
        style: {
          colors: theme.palette.text.secondary,
        },
      },
    },
    yaxis: {
      labels: {
        formatter: (value: number) => (value > 0 ? `${value}K` : `${value}`),
        offsetX: -10,
        style: {
          colors: theme.palette.text.secondary,
        },
      },
    },
  }
}

const Chart = styled(ApexChart)``

const Customer = () => {
  const [getAllMenuParents, { data: dropdown_user }] = useQueryMenuParent()
  const methods = useForm<FormData>({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      age: 23,
      birth: '2000-07-02',
      gender: '',
      allows: [],
      active: false,
    },
  })

  const inputRef = useRef<HTMLInputElement>(null)
  useEffect(() => {
    if (inputRef.current) inputRef.current.focus()
    getAllMenuParents()
  }, [])
  const onSubmit = (data: FormData) => {
    // console.log(Object.keys(data.allows), Object.values(data.allows))
    // console.log(data.allows.forEach(e => e))
    console.log(data.allows)
  }
  const chartOptions = useChartOptions()
  return (
    <Container sx={{ marginTop: 10 }}>
      <Card>
        <CardContent>
          {/* <Chart
            height={350}
            options={chartOptions}
            series={[
              {
                name: 'This year',
                data: [18, 16, 5, 8, 3, 14, 14, 16, 17, 19, 18, 20]
              },
              {
                name: 'Last year',
                data: [12, 11, 4, 6, 2, 9, 9, 10, 11, 12, 13, 13]
              }
            ]}
            type="bar"
            width="100%"
          /> */}
        </CardContent>
      </Card>

      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <InputM2
          label='First Name'
          name='firstName'
          methods={methods}
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
          methods={methods}
          // rules={{ required: 'First Name is required' }}
          sx={{
            color: 'primary.light',
            backgroundColor: (theme) => theme.palette.primary.lightest,
          }}
        // ref={inputRef}
        />
        <InputM2
          label='Email'
          name='email'
          methods={methods}
        // rules={{
        //   required: 'Email is required',
        //   pattern: {
        //     value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
        //     message: 'Invalid email address',
        //   },
        // }}
        />
        <InputM2 label='Age' name='age' methods={methods} />
        <InputM2 label='Birth' name='birth' methods={methods} />
        <SelectM
          label='Gender'
          name='gender'
          methods={methods}
          items={dropdown_user?.getAllMenuParents}
          keyValue='id'
          displayName='name'
        // keyValue="id"
        // rules={{ required: 'Gender is required' }}
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
        <br />
        <Button type='submit'>Submit</Button>
      </form>
    </Container>
  )
}

export default Customer
