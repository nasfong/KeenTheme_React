import AdministratorModal from './components/AdministratorModal'
import { ChangeEvent, useCallback } from 'react'
import Swal from 'sweetalert2'
import { useState } from 'react'
import { useDeleteUser, useUser } from 'hook/useUser'
import { KTSVG } from '_metronic/helpers'
import { Input } from 'components/Input'
import { MyPagination } from 'components/MyPagination'
import { debounce, useDebounce } from 'helpers/debounce'
import { alerts } from 'helpers/alerts'

const Administrator = () => {
  const { data, loading, error, updateQuery, refetch } = useUser({ limit: 3 })

  const [deleteUser] = useDeleteUser()

  const [modal, setModal] = useState(false)
  const [user, setUser] = useState(null)
  const [page, setPage] = useState(1)

  const handlePage = (updatePage: number) => {
    refetch({
      page: updatePage,
    })
    setPage(updatePage)
  }

  const handleSearch = useCallback(
    debounce(async (e: ChangeEvent<HTMLInputElement>) => {
      await refetch({
        search: e.target.value,
      })
    }, 500),
    [refetch],
  )

  useDebounce(() => {
    console.log(page)
  }, 500, [page])


  const handleOpenModal = () => setModal(true)

  const handleCloseModal = () => {
    setModal(false)
    setUser(null)
  }

  const handleEdit = (user: any) => {
    handleOpenModal()
    setUser(user)
    return user
  }

  const handleDelete = useCallback(async (id: string) => {
    alerts(async () => {
      await deleteUser({ variables: { id } })
        .then((res) => {
          if (res.data?.deleteUser) {
            updateQuery(({ getAllUsers }) => ({
              getAllUsers: {
                users: getAllUsers.users.filter((user) => user.id !== id),
                totalPages: getAllUsers.totalPages,
              },
            }))
            Swal.fire('Deleted!', 'Your file has been deleted.', 'success')
          }
        })
        .catch((err) => console.log(err))
    })
  }, [])

  if (error) return <div>{JSON.stringify(error)}</div>
  if (loading) return <div>Loading</div>

  return (
    <>
      <button className='btn btn-primary btn-sm' onClick={handleOpenModal}>
        Create
      </button>
      <div className='card card-body'>
        <Input label='HELLO' name='' onChange={handleSearch} />
        <div className='table-responsive'>

          <table
            id='kt_customers_table'
            className='table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4'
          >
            <thead>
              <tr className='fw-bolder text-muted'>
                <th className='min-w-500px'>Name</th>
                <th className='min-w-500px'>Role</th>
                <td className='text-end'>Action</td>
              </tr>
            </thead>
            <tbody className='fw-bold text-gray-600'>
              {data?.getAllUsers?.users.map((user) => (
                <tr key={user.id}>
                  <td>{user.username}</td>
                  <td>
                    <span className={`badge badge-light-primary`}>{user.role.name}</span>
                  </td>
                  <td className='text-end text-nowrap'>
                    <button
                      className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                      onClick={() => handleEdit(user)}
                      title='Edit'
                    >
                      <KTSVG path='/media/icons/duotune/art/art005.svg' className='svg-icon-3' />
                    </button>
                    <button
                      className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm'
                      onClick={() => handleDelete(user.id)}
                      title='Delete'
                    >
                      <KTSVG path='/media/icons/duotune/general/gen027.svg' className='svg-icon-3' />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {data?.getAllUsers.totalPages && data.getAllUsers.totalPages > 1 ? (
          <MyPagination
            page={page}
            totalPages={data.getAllUsers.totalPages}
            handlePagination={handlePage}
            perPage={1}
          />
        ) : null}
      </div>
      <AdministratorModal
        modal={modal}
        handleCloseModal={handleCloseModal}
        user={user}
        updateQuery={updateQuery}
      />
    </>
  )
}

export default Administrator
