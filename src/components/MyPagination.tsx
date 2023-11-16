import React from 'react'

export interface Props {
  page: number
  totalPages: number
  handlePagination: (page: number) => void
  perPage?: number
}
export const PaginationComponent: React.FC<Props> = ({
  page,
  totalPages,
  handlePagination,
  perPage = 10,
}) => {
  return (
    <div className='d-flex flex-stack flex-wrap pt-10'>
      <div className='fs-6 fw-bold text-gray-700'>
        Showing {(page - 1) * perPage + 1} -{' '}
        {perPage * page > 100 ? 100 : perPage * page} of {100} entries
      </div>
      <ul className='pagination'>
        {page !== 1 && (
          <li className='page-item previous'>
            <a
              href='#!'
              className='page-link'
              onClick={() => handlePagination(page - 1)}
            >
              <i className='previous'></i>
            </a>
          </li>
        )}
        <li className={`page-item ${page === 1 ? 'active' : ''}`}>
          <a
            href='#!'
            className='page-link'
            onClick={() => handlePagination(1)}
          >
            1
          </a>
        </li>

        {page > 3 && <li className='page-item'>...</li>}
        {page === totalPages && totalPages > 3 && (
          <li className={`page-item`}>
            <a
              href='#!'
              className='page-link'
              onClick={() => handlePagination(page - 2)}
            >
              {page - 2}
            </a>
          </li>
        )}
        {page > 2 && (
          <li className={`page-item`}>
            <a
              href='#!'
              className='page-link'
              onClick={() => handlePagination(page - 1)}
            >
              {page - 1}
            </a>
          </li>
        )}
        {page !== 1 && page !== totalPages && (
          <li className={`page-item active`}>
            <a
              href='#!'
              className='page-link'
              onClick={() => handlePagination(page)}
            >
              {page}
            </a>
          </li>
        )}
        {page < totalPages - 1 && (
          <li className={`page-item`}>
            <a
              href='#!'
              className='page-link'
              onClick={() => handlePagination(page + 1)}
            >
              {page + 1}
            </a>
          </li>
        )}
        {page === 1 && totalPages > 3 && (
          <li className={`page-item`}>
            <a
              href='#!'
              className='page-link'
              onClick={() => handlePagination(page + 2)}
            >
              {page + 2}
            </a>
          </li>
        )}
        {page < totalPages - 2 && <li className='page-item'>...</li>}

        <li className={`page-item ${page === totalPages ? 'active' : ''}`}>
          <a
            href='#!'
            className='page-link'
            onClick={() => handlePagination(totalPages)}
          >
            {totalPages}
          </a>
        </li>

        {page !== totalPages && (
          <li className='page-item next'>
            <a
              href='#!'
              className='page-link'
              onClick={() => handlePagination(page + 1)}
            >
              <i className='next'></i>
            </a>
          </li>
        )}
      </ul>
    </div>
  )
}
export const MyPagination = PaginationComponent
