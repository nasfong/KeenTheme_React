import { GetAllUsersQuery } from "__generated__/graphql"
import { KTSVG } from "_metronic/helpers"

type Props = {
  data?: GetAllUsersQuery
  handleEdit: (user: GetAllUsersQuery['getAllUsers'][0]) => void
  handleDelete: (id: string) => void
}

const color = ['primary', 'danger', 'info', 'warning', 'dark']

const AdministratorItem = ({
  data,
  handleEdit,
  handleDelete
}: Props) => {
  return (
    <div className='grid'>
      {data?.getAllUsers.map(user => (
        <div key={user.id} className='card'>
          <div className='card-body d-flex flex-column g-y-3'>
            <div className='fw-bold'>{user.username}</div>
            <div>{user.password}</div>
            <div>{user.email}</div>
            <div className='mt-auto'>
              <span className={`badge badge-light-${color[Math.floor(Math.random() * 5)]} me-1`}>
                {user.role.name}
              </span>
            </div>
            <div className='d-flex'>
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
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default AdministratorItem