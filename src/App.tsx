import { useState } from 'react'
import { KTSVG } from './_metronic/helpers'
import { MyPagination } from './components/MyPagination'
import { CalenderDropdown } from './CalenderDropdown'
import FormModal from './FormModal'
import Filter from './Filter'
import FormikModal from './FormikModal'


function App() {

  const [count, setCount] = useState(0)
  const [show, setShow] = useState(false)
  const [show1, setShow1] = useState(false)
  const [page, setPage] = useState(1)

  const handlePage = (updatePage: number) => setPage(updatePage)

  return (
    <div className='container text-center'>
      <h1>Vite + React</h1>
      <div className="card card-body">
        <div className='d-flex justify-content-start py-0 table-responsive mt-xl-10'>
          <div className='ms-0 p-5 bg-light border rounded'>
            <p className="h1">$0</p>
            <label>Credit Amount</label>
          </div>
          <div className='ms-2 p-5 bg-light border rounded'>
            <p className="h1">$0</p>
            <label>Deposit</label>
          </div>
          <div className='ms-2 p-5 bg-light border rounded'>
            <p className="h1">$0</p>
            <label>Unpaid Deposit</label>
          </div>
          <div className='ms-2 p-5 bg-light border rounded'>
            <p className="h1">$0</p>
            <label>Invoice balance</label>
          </div>
        </div>
        <button className='btn btn-info' onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
        <Filter filterApply={{}} setFilterApply={{}} />

        <table id='kt_customers_table' className='table align-middle table-row-dashed fs-6 gy-5'>
          <thead>
            <tr className='text-start text-gray-400 fw-bolder fs-7 gs-0'>
              <th className=''>Name</th>
              <th className='min-w-100px'>Phone</th>
              <th className='min-w-125px'>E-mail</th>
              <th className=''>Address</th>
              <th className=''>Status</th>
              <th className='text-end min-w-100px'>Action</th>
            </tr>
          </thead>
          <tbody className='fw-bold text-gray-600'>
            <tr>
              <td>nasfong</td>
              <td>093292931</td>
              <td>fongren007@gmail.com</td>
              <td>Phnom Penh</td>
              <td>Active</td>
              <td>...</td>
            </tr>
          </tbody>
        </table>
        <MyPagination page={page} totalPages={10} handlePagination={handlePage} perPage={10} />
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <button className='btn btn-primary btn-lg me-2' onClick={() => setShow(true)}>button</button>
      <button className='btn btn-info btn-lg' onClick={() => setShow1(true)}>Formik</button>
      <div className='card-toolbar'>
        <button
          type='button'
          className={`btn btn-sm btn-icon btn-color-danger btn-active-light-danger border-0 me-n3`}
          data-kt-menu-trigger='click'
          data-kt-menu-placement='bottom-end'
          data-kt-menu-flip='top-end'
        >
          <KTSVG path='/media/icons/duotune/general/gen014.svg' className='svg-icon-2' />
        </button>
        <CalenderDropdown
          formInput={[]}
          setFormInput={() => []}
          dateRange={[]}
          setDateRange={() => []}
          color="danger" />
      </div>


      <FormModal show={show} setShow={setShow} />
      <FormikModal show={show1} setShow={setShow1} />
    </div>
  )
}

export default App
