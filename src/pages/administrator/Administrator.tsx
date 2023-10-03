import { useLazyQuery, useMutation, useQuery } from "@apollo/client"
import { GET_ALL_USERS, GET_USER_BY_ID } from "graphql/querys/administrator"
import AdministratorModal from "./components/AdministratorModal"
import { KTSVG } from "_metronic/helpers"
import { DELETE_USER } from "graphql/mutations/user.mutation"
import { useCallback } from "react"
import Swal from "sweetalert2"

const color = ['primary', 'danger', 'info', 'warning', 'dark']

const Administrator = () => {

  const { data, loading, error, refetch, updateQuery } = useQuery(GET_ALL_USERS)
  const [userGetById, { data: user }] = useLazyQuery(GET_USER_BY_ID, { fetchPolicy: 'no-cache' })
  const [deleteUser] = useMutation(DELETE_USER)

  const handleEdit = useCallback(async (id: string) => {
    await userGetById({ variables: { id } })
      .catch((err) => console.log(err))
  }, [])
  const handleDelete = useCallback(async (id: string) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteUser({ variables: { id } })
          .then((res) => {
            if (res.data?.deleteUser) {
              updateQuery(({ getAllUsers }) => ({
                getAllUsers: getAllUsers.filter(user => user.id !== id)
              }))
              Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              )
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
      <AdministratorModal refetch={refetch} user={user?.getUser} updateQuery={updateQuery} />

      <div className='grid'>
        {data?.getAllUsers.map(user => (
          <div key={user.id} className='card'>
            <div className='card-body d-flex flex-column g-y-3'>
              <div className='fw-bold'>{user.username}</div>
              <div>{user.password}</div>
              <div>{user.email}</div>
              <div className='mt-auto'>
                {user.role?.map(role => (
                  <span key={role} className={`badge badge-light-${color[Math.floor(Math.random() * 5)]} me-1`}>
                    {role}
                  </span>
                ))}
              </div>
              <div className='d-flex'>
                <button
                  className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                  onClick={() => handleEdit(user.id)}
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
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default Administrator