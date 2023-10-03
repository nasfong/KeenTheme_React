import { useState, useLayoutEffect } from 'react'
import { KTSVG } from './_metronic/helpers'
import { MyPagination } from './components/MyPagination'
import { CalenderDropdown } from './CalenderDropdown'
import FormModal from './FormModal'
import Filter from './Filter'
import FormikModal from './FormikModal'
import { useTranslation } from 'react-i18next'
import ReactHookFormModal from './ReactHookFormModal'
import ReactHookForm from './components/ReactHookForm'
import Table from 'components/Table'
import { Link } from 'react-router-dom'
// import ReactQuery from './components/ReactQuery'


function App() {
  const { t, i18n } = useTranslation()

  const [count, setCount] = useState(0)
  const [show, setShow] = useState(false)
  const [show1, setShow1] = useState(false)
  const [show2, setShow2] = useState(false)
  const [page, setPage] = useState(1)

  const handlePage = (updatePage: number) => setPage(updatePage)
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  useLayoutEffect(() => {
    i18n.changeLanguage('en')
  }, [i18n])

  return (
    <div className='container text-center'>
      <Link to='management'>Management</Link>
      {/* <ReactQuery /> */}
      <div className='card card-body'>
        <ReactHookForm />
      </div>

      <button className='btn btn-danger btn-sm' onClick={() => changeLanguage("en")}>en</button>
      <button className='btn btn-dark btn-sm' onClick={() => changeLanguage("kh")}>kh</button>

      <div className="card card-body">
        <h1>{t('HELLO')}</h1>
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
        <Table />
        <MyPagination page={page} totalPages={10} handlePagination={handlePage} perPage={10} />
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <button className='btn btn-primary btn-lg me-2' onClick={() => setShow(true)}>button</button>
      <button className='btn btn-info btn-lg me-2' onClick={() => setShow1(true)}>Formik</button>
      <button className='btn btn-warning btn-lg' onClick={() => setShow2(true)}>ReactHookForm</button>
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
      <ReactHookFormModal show={show2} setShow={setShow2} />


    </div>
  )
}

export default App
