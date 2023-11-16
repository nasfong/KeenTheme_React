import { useMutation } from '@apollo/client'
import AdministratorModal from './components/AdministratorModal'
import { DELETE_USER } from 'graphql/mutations/user.mutation'
import { useCallback } from 'react'
import Swal from 'sweetalert2'
import { useState } from 'react'
import { useUser } from 'hook/useUser'
import { KTSVG } from '_metronic/helpers'

const Administrator = () => {
  const { data, loading, error, updateQuery } = useUser()
  const [deleteUser] = useMutation(DELETE_USER)

  const [modal, setModal] = useState(false)
  const [user, setUser] = useState(null)

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
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteUser({ variables: { id } })
          .then((res) => {
            if (res.data?.deleteUser) {
              // delete filter by [id]
              updateQuery(({ getAllUsers }) => ({
                getAllUsers: getAllUsers.filter((user) => user.id !== id),
              }))
              Swal.fire('Deleted!', 'Your file has been deleted.', 'success')
            }
          })
          .catch((err) => console.log(err))
      }
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
        <table
          id='kt_customers_table'
          className='table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4'
        >
          <thead>
            <tr className='fw-bolder text-muted'>
              <th className=''>Name</th>
              <th className='min-w-100px'>Role</th>
              <td className='text-end'>Action</td>
            </tr>
          </thead>
          <tbody className='fw-bold text-gray-600'>
            {data?.getAllUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.username}</td>
                <td>
                  <span className={`badge badge-light-primary`}>
                    {user.role.name}
                  </span>
                </td>
                <td className='text-end'>
                  <button
                    className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                    onClick={() => handleEdit(user)}
                    title='Edit'
                  >
                    <KTSVG
                      path='/media/icons/duotune/art/art005.svg'
                      className='svg-icon-3'
                    />
                  </button>
                  <button
                    className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm'
                    onClick={() => handleDelete(user.id)}
                    title='Delete'
                  >
                    <KTSVG
                      path='/media/icons/duotune/general/gen027.svg'
                      className='svg-icon-3'
                    />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
