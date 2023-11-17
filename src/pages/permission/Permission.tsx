import { useMutation, useQuery } from '@apollo/client'
import { GET_ALL_PERMISSIONS } from 'graphql/querys/permission.query'
import { useCallback, useState } from 'react'
import PermissionModal from './components/PermissionModal'
import { DELETE_PERMISSION } from 'graphql/mutations/permission.mutation'
import Swal from 'sweetalert2'
import { KTSVG } from '_metronic/helpers'

const Permission = () => {
  const { data, updateQuery, error, loading } = useQuery(GET_ALL_PERMISSIONS, {
    fetchPolicy: 'network-only',
  })
  const [deletePermission] = useMutation(DELETE_PERMISSION)

  const [modal, setModal] = useState(false)
  const [permission, setPermission] = useState(null)

  const handleOpen = () => setModal(true)

  const handleEdit = useCallback((permission: any) => {
    setModal(true)
    setPermission(permission)
  }, [])

  const handleDelete = useCallback((id: string) => {
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
        await deletePermission({ variables: { id } })
          .then((res) => {
            if (res.data?.deletePermission) {
              // delete filter by [id]
              updateQuery(({ getAllPermissions }) => ({
                getAllPermissions: getAllPermissions.filter((permission) => permission.id !== id),
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
      <button className='btn btn-primary btn-sm' onClick={handleOpen}>
        Create
      </button>

      <div className='card card-flush card-body'>
        <div className='table-responsive'>
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
              {data?.getAllPermissions.map((permission) => (
                <tr key={permission.id}>
                  <td>{permission.name}</td>
                  <td>
                    {permission.role.map((role) => (
                      <span key={role.id} className={`badge badge-light-primary me-1`}>
                        {role.name}
                      </span>
                    ))}
                  </td>
                  <td className='text-end'>
                    <button
                      className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                      onClick={() => handleEdit(permission)}
                      title='Edit'
                    >
                      <KTSVG path='/media/icons/duotune/art/art005.svg' className='svg-icon-3' />
                    </button>
                    <button
                      className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm'
                      onClick={() => handleDelete(permission.id)}
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
      </div>

      <PermissionModal
        modal={modal}
        setModal={setModal}
        permission={permission}
        updateQuery={updateQuery}
      />
    </>
  )
}

export default Permission
