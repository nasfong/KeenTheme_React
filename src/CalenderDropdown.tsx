import 'react-date-range/dist/styles.css' // main css file
import 'react-date-range/dist/theme/default.css' // theme css file
import React from 'react'
import { getCSSVariableValue } from './_metronic/assets/ts/_utils'
import { DateRangePicker } from 'react-date-range'

type props = {
  formInput: object
  setFormInput: any
  dateRange: object
  setDateRange: any
  color?: string
}

const s_month = new Date()
const e_month = new Date()
const this_month_end = new Date(e_month.getFullYear(), e_month.getMonth() + 1, 0)
const this_month_start = new Date(s_month.setDate(1))

export const CalenderDropdown: React.FC<props> = ({
  formInput,
  setFormInput,
  dateRange,
  setDateRange,
  color,
}) => {
  const baseColor = getCSSVariableValue('--bs-' + color)
  const initState = {
    DateStart: this_month_start.toLocaleDateString('pt-br').split('/').reverse().join('-'),
    DateEnd: '',
  }
  const handleSelect = ({ data }: any) => {
    const d_start =
      data.startDate.getFullYear() +
      '-' +
      (data.startDate.getMonth() + 1 > 10
        ? data.startDate.getMonth() + 1
        : '0' + (data.startDate.getMonth() + 1)) +
      '-' +
      (data.startDate.getDate() > 10 ? data.startDate.getDate() : '0' + data.startDate.getDate())
    const d_end =
      data.endDate.getFullYear() +
      '-' +
      (data.endDate.getMonth() + 1 > 10
        ? data.endDate.getMonth() + 1
        : '0' + (data.endDate.getMonth() + 1)) +
      '-' +
      (data.endDate.getDate() > 10 ? data.endDate.getDate() : '0' + data.endDate.getDate())

    setDateRange({
      ...dateRange,
      startDate: data.startDate,
      endDate: data.endDate,
    })
    setFormInput({
      ...formInput,
      DateStart: d_start,
      DateEnd: d_end,
    })

    //Refresh 5min once
    setTimeout(() => {
      setFormInput(initState)
      setDateRange({
        startDate: this_month_start,
        endDate: this_month_end,
        key: 'data',
      })
    }, 300000)
  }

  return (
    <div
      className={`menu menu-sub menu-sub-dropdown border border-${
        color || 'dark'
      } border-1 w-925px`}
      data-kt-menu='true'
    >
      <div className='px-7 py-5'>
        Hello
        {/* <DateRangePicker
          ranges={[dateRange]}
          onChange={handleSelect}
          moveRangeOnFirstSelection={false}
          months={2}
          direction="horizontal"
          rangeColors={[baseColor]}
        /> */}
      </div>
    </div>
  )
}
