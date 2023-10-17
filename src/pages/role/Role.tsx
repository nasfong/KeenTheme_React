import { useMutation, useQuery } from "@apollo/client"
import { DELETE_ROLE } from "graphql/mutations/role.mutation"
import { GET_ALL_ROLES } from "graphql/querys/role.query"
import { useCallback, useState } from "react"
import Swal from "sweetalert2"
import RoleModal from "./components/RoleModal"

const Role = () => {

  const { data, updateQuery } = useQuery(GET_ALL_ROLES, { fetchPolicy: 'network-only' })
  const [deleteRole] = useMutation(DELETE_ROLE, { fetchPolicy: 'network-only' })

  const [modal, setModal] = useState(false)
  const [role, setRole] = useState(null)

  const handleOpen = () => setModal(true)

  const handleCloseModal = () => {
    setModal(false)
    setRole(null)
  }

  const handleEdit = useCallback((role: any) => {
    setModal(true)
    setRole(role)
  }, [])

  const handleDelete = useCallback((id: string) => {
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
        await deleteRole({ variables: { id } })
          .then((res) => {
            if (res.data?.deleteRole) {
              // delete filter by [id]
              updateQuery(({ getAllRoles }) => ({
                getAllRoles: getAllRoles.filter(user => user.id !== id)
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

  return (
    <>
      <button className='btn btn-primary btn-sm' onClick={handleOpen} >Create</button>
      <div className='grid'>
        {data?.getAllRoles.map(role => (
          <div className='' key={role.id}>
            <div className='card card-flush h-md-100'>
              <div className='card-header'>
                <div className='card-title'>
                  <h2>{role.name}</h2>
                </div>
              </div>

              <div className='card-body pt-1'>
                <div className='fw-bolder text-gray-600 mb-5'>
                  Total users with this role:
                  {/* {role.total_users} */}
                </div>
                <div className='d-flex flex-column text-gray-600'>
                  {role.permission instanceof Array
                    ? role.permission.map((permission, pIndex) => (
                      <div className='d-flex align-items-center py-2' key={pIndex}>
                        <span className='bullet bg-primary me-3'></span>
                        {permission?.name}
                      </div>
                    ))
                    : ''}
                </div>
              </div>
              <div className='card-footer flex-wrap pt-0 d-flex justify-content-between'>
                {/* <Link
                  to={`/role/${role.id}/detail`}
                  className='btn btn-light btn-active-primary my-1 me-2'
                >
                  View Role
                </Link> */}

                <button
                  type='button'
                  className='btn btn-light btn-active-light-primary my-1'
                  onClick={() => handleEdit(role)}
                >
                  Edit Role
                </button>

                <button
                  type='button'
                  className='btn  btn-light-danger my-1'
                  onClick={() => handleDelete(role.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <RoleModal
        modal={modal}
        handleCloseModal={handleCloseModal}
        role={role}
        updateQuery={updateQuery}
      />
    </>
  )
}

export default Role