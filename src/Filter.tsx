import { Col, Form, Row } from "react-bootstrap"

function Filter({ filterApply, setFilterApply }) {
  const handleChangeInput = (e) => {
    const { name, value } = e.target
    setFilterApply({ ...filterApply, [name]: value })
  }

  return (
    <>
      <div className='card-header border-0 pt-6'>
        <div className='card-title'>
          <div className='d-flex align-items-center position-relative my-1'>
            <span className='svg-icon svg-icon-1 position-absolute ms-6'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width={24}
                height={24}
                viewBox='0 0 24 24'
                fill='none'
              >
                <rect
                  opacity='0.5'
                  x='17.0365'
                  y='15.1223'
                  width='8.15546'
                  height={2}
                  rx={1}
                  transform='rotate(45 17.0365 15.1223)'
                  fill='black'
                />
                <path
                  d='M11 19C6.55556 19 3 15.4444 3 11C3 6.55556 6.55556 3 11 3C15.4444 3 19 6.55556 19 11C19 15.4444 15.4444 19 11 19ZM11 5C7.53333 5 5 7.53333 5 11C5 14.4667 7.53333 17 11 17C14.4667 17 17 14.4667 17 11C17 7.53333 14.4667 5 11 5Z'
                  fill='black'
                />
              </svg>
            </span>
            <input
              type='text'
              name='find'
              className='form-control form-control-solid w-250px ps-15'
              placeholder='Search here...'
              onChange={(e) => handleChangeInput(e)}
            />
          </div>
        </div>
        <div className='card-toolbar'>
          <div className='d-flex justify-content-end'
          // data-kt-customer-table-toolbar='base'
          >
            <button
              type='button'
              className='btn btn-light-primary'
              data-kt-menu-trigger="click"
              data-kt-menu-placement="left-start"
            >
              <span className='svg-icon svg-icon-2'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width={24}
                  height={24}
                  viewBox='0 0 24 24'
                  fill='none'
                >
                  <path
                    d='M19.0759 3H4.72777C3.95892 3 3.47768 3.83148 3.86067 4.49814L8.56967 12.6949C9.17923 13.7559 9.5 14.9582 9.5 16.1819V19.5072C9.5 20.2189 10.2223 20.7028 10.8805 20.432L13.8805 19.1977C14.2553 19.0435 14.5 18.6783 14.5 18.273V13.8372C14.5 12.8089 14.8171 11.8056 15.408 10.964L19.8943 4.57465C20.3596 3.912 19.8856 3 19.0759 3Z'
                    fill='black'
                  />
                </svg>
              </span>
              Filter
            </button>
            <div
              className='menu menu-sub menu-sub-dropdown w-600px'
              data-kt-menu='true'
              id='kt-toolbar-filter'
            >
              <div className='px-7 py-5'>
                <div className='fs-4 text-dark fw-bolder'>Filter Options</div>
              </div>
              <div className='separator border-gray-200' />
              <div className='px-7 py-5'>
                <div className='mb-10'>
                  <Form.Group as={Row} className='mb-6'>
                    <Form.Label column lg='4' className='required form-label fw-bold fs-6'>
                      Register Date
                    </Form.Label>
                    <Col lg='4' className='fv-row'>
                      <Form.Control
                        type='date'
                        name='date_start'
                        value={filterApply.date_start}
                        onChange={handleChangeInput}
                        className={`form-control-solid`}
                        placeholder=''
                      />
                    </Col>
                    <Col lg='4' className='fv-row'>
                      <Form.Control
                        type='date'
                        name='date_end'
                        value={filterApply.date_end}
                        onChange={handleChangeInput}
                        className={`form-control-solid`}
                        placeholder=''
                      />
                    </Col>
                  </Form.Group>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Filter
