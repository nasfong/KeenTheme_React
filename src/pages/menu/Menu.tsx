import { useMutation } from "@apollo/client"
import MenuModal from "./components/MenuModal"
import { DELETE_USER } from "graphql/mutations/user.mutation"
import { useCallback } from "react"
import Swal from "sweetalert2"
import { useState } from 'react';
import { KTSVG } from "_metronic/helpers"
import { useQueryMenu } from "hook/useMenu"

const Menu = () => {

  const { data, loading, error, updateQuery } = useQueryMenu()
  const [deleteUser] = useMutation(DELETE_USER)

  const [modal, setModal] = useState(false)
  const [dataInput, setDataInput] = useState(null)

  const handleOpenModal = () => setModal(true)

  const handleCloseModal = () => {
    setModal(false)
    setDataInput(null)
  }

  const handleEdit = (data: any) => {
    handleOpenModal()
    setDataInput(data)
  }

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
              // delete filter by [id]
              updateQuery(({ getAllMenus }) => ({
                getAllMenus: getAllMenus.filter(data => data.id !== id)
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
      <button
        className='btn btn-primary btn-sm'
        onClick={handleOpenModal}
      >Create</button>
      <div className='card card-body'>
        <table id='kt_customers_table' className='table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4'>
          <thead>
            <tr className='fw-bolder text-muted'>
              <th className=''>Name</th>
              <th className='min-w-100px'>Role</th>
              <td className='text-end'>Action</td>
            </tr>
          </thead>
          <tbody className='fw-bold text-gray-600'>
            {data?.getAllMenus.map(menu => (
              <tr key={menu.id}>
                <td>{menu.name}</td>
                <td>
                  <span className={`badge badge-light-primary`}>
                    {menu.url}
                  </span>
                </td>
                <td className='text-end'>
                  <button
                    className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                    onClick={() => handleEdit(menu)}
                    title='Edit'
                  >
                    <KTSVG path='/media/icons/duotune/art/art005.svg' className='svg-icon-3' />
                  </button>
                  <button
                    className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm'
                    onClick={() => handleDelete(menu.id)}
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
      <MenuModal
        modal={modal}
        handleCloseModal={handleCloseModal}
        dataInput={dataInput}
        updateQuery={updateQuery}
      />
    </>
  )
}

export default Menu