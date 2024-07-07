import { GetAllMenuParentsQuery, MenuParentInput } from '@/__generated__/graphql'
import { KTSVG } from '@/_metronic/helpers'
import { InputV } from '@/components/InputV'
import { useFormik } from 'formik'
import { useCreateMenuParent, useDeleteMenuParent, useUpdateMenuParent } from '@/hook/useMenu'
import { useCallback, useState } from 'react'
import { Col, Form, Modal, Row } from 'react-bootstrap'
import Swal from 'sweetalert2'
import { UpdateQuerys } from '@/types/TGlobal'
import * as Yup from 'yup'

type Props = {
  modal: boolean
  handleCloseModal: () => void
  data: GetAllMenuParentsQuery['getAllMenuParents'] | undefined
  updateQuery: UpdateQuerys<GetAllMenuParentsQuery>
}

const MenuParentModal: React.FC<Props> = ({ modal, handleCloseModal, data, updateQuery }) => {
  const [addMenuParent] = useCreateMenuParent()
  const [updateMenuParent] = useUpdateMenuParent()
  const [deleteMenuParent] = useDeleteMenuParent()

  const [getId, setGetId] = useState(null)

  const handleClose = () => {
    handleCloseModal()
    resetForm()
    setGetId(null)
  }

  const formik = useFormik<MenuParentInput>({
    initialValues: {
      name: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
    }),
    onSubmit: (values, { setSubmitting }) => {
      setSubmitting(true)
      if (getId) {
        // Update
        updateMenuParent({
          variables: {
            id: getId,
            input: {
              ...values,
            },
          },
        })
          .then((res) => {
            updateQuery(({ getAllMenuParents }) => ({
              getAllMenuParents: getAllMenuParents.map((data) =>
                data.id === res.data?.updateMenuParent?.id ? res.data?.updateMenuParent : data,
              ),
            }))
            // handleClose()
          })
          .catch((err) => console.log(err))
          .finally(() => setSubmitting(false))
        return
      }
      // Create
      addMenuParent({ variables: { input: values } })
        .then((res) => {
          updateQuery(({ getAllMenuParents }) => ({
            getAllMenuParents: res.data?.createMenuParent
              ? [...getAllMenuParents, res.data?.createMenuParent]
              : getAllMenuParents,
          }))
          // handleClose()
        })
        .catch((err) => console.log(err))
        .finally(() => setSubmitting(false))
    },
  })

  const { setValues, resetForm, isSubmitting } = formik

  const handleEdit = (data: any) => {
    setGetId(data.id)
    setValues(data)
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
        await deleteMenuParent({ variables: { id } })
          .then((res) => {
            if (res.data?.deleteMenuParent) {
              // delete filter by [id]
              updateQuery(({ getAllMenuParents }) => ({
                getAllMenuParents: getAllMenuParents.filter((data) => data.id !== id),
              }))
              Swal.fire('Deleted!', 'Your file has been deleted.', 'success')
            }
          })
          .catch((err) => console.log(err))
      }
    })
  }, [])

  // useEffect(() => {
  //   if (dataInput) {
  //     const { id, ...rest } = dataInput
  //     setValues({ ...rest })
  //   }
  // }, [dataInput])

  return (
    <>
      <Modal
        show={modal}
        onHide={handleClose}
        size='sm'
        centered
        className='bg-grey-800 p-2 text-white bg-opacity-25'
      >
        <Modal.Header>
          <Modal.Title>Modal heading</Modal.Title>
          <div className='btn btn-icon btn-sm btn-light-primary' onClick={handleClose}>
            <KTSVG className='svg-icon-2' path='/media/icons/duotune/arrows/arr061.svg' />
          </div>
        </Modal.Header>
        <Form onSubmit={formik.handleSubmit}>
          <Modal.Body>
            <Form.Group as={Row} className='mb-5'>
              <Form.Label column sm='3' className='form-label text-nowrap required'>
                Name
              </Form.Label>
              <Col sm>
                <InputV name='name' formik={formik} />
              </Col>
            </Form.Group>
            <table
              id='kt_customers_table'
              className='table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4'
            >
              <thead>
                <tr className='fw-bolder text-muted'>
                  <th className=''>Name</th>
                  <th className=''>Order</th>
                  <td className='text-end'>Action</td>
                </tr>
              </thead>
              <tbody className='fw-bold text-gray-600'>
                {data?.map((item) => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.order}</td>
                    <td className='text-end'>
                      <button
                        className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                        onClick={() => handleEdit(item)}
                        type='button'
                        title='Edit'
                      >
                        <KTSVG path='/media/icons/duotune/art/art005.svg' className='svg-icon-3' />
                      </button>
                      <button
                        className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm'
                        onClick={() => handleDelete(item.id)}
                        type='button'
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
          </Modal.Body>
          <Modal.Footer>
            <button className='btn btn-light' onClick={handleClose}>
              Close
            </button>
            <button className='btn btn-primary' type='submit'>
              {isSubmitting ? (
                <span className='indicator-progress' style={{ display: 'block' }}>
                  Please wait...{' '}
                  <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                </span>
              ) : !getId ? (
                'Save'
              ) : (
                'update'
              )}
            </button>
          </Modal.Footer>
        </Form>
      </Modal>
      {/* <MenuParentModal /> */}
    </>
  )
}

export default MenuParentModal
