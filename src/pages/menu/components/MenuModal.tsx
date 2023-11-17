import { GetAllMenusQuery, Menu, MenuInput } from '__generated__/graphql'
import { KTSVG } from '_metronic/helpers'
import useOnceCall from 'app/utils/useOneCall'
import { InputV } from 'components/InputV'
import { Select } from 'components/Select'
import { useFormik } from 'formik'
import { useCreateMenu, useQueryMenuParent, useUpdateMenu } from 'hook/useMenu'
import { useEffect, useState } from 'react'
import { Col, Form, Modal, Row } from 'react-bootstrap'
import { UpdateQuerys } from 'types/TGlobal'
import * as Yup from 'yup'
import MenuParentModal from './MenuParentModal'

type Props = {
  modal: boolean
  handleCloseModal: () => void
  dataInput: Menu | null
  updateQuery: UpdateQuerys<GetAllMenusQuery>
  duplicate?: { name?: string[]; order?: number[] }
}

const MenuModal: React.FC<Props> = ({
  modal,
  handleCloseModal,
  dataInput,
  updateQuery,
  duplicate,
}) => {
  const [addRole] = useCreateMenu()
  const [updateRole] = useUpdateMenu()

  const [getAllMenuParents, { data: menuParentDropdown, updateQuery: updateQueryMenuParent }] =
    useQueryMenuParent()

  const handleClose = () => {
    handleCloseModal()
    resetForm()
  }

  // Duplicate checked
  const checkNameUniqueness = async (name: string, exitingNames?: string[]) => {
    return { isUnique: !exitingNames?.includes(name) }
  }

  const checkNumberUniqueness = async (name: number, exitingNames?: number[]) => {
    return { isUnique: !exitingNames?.includes(name) }
  }
  // Formik
  const formik = useFormik<MenuInput>({
    initialValues: {
      name: '',
      parent: '',
      url: '',
      icon: '',
      color: '',
      order: 0,
      status: 0,
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required('Name is required')
        .test({
          name: 'isUnique',
          message: 'Name already in used',
          async test(value) {
            try {
              const response = await checkNameUniqueness(value, duplicate?.name)
              return response.isUnique
            } catch (error) {
              return false
            }
          },
        }),
      parent: Yup.string().required('Parent Menu is required'),
      url: Yup.string().nullable(),
      icon: Yup.string().nullable(),
      color: Yup.string().nullable(),
      order: Yup.number()
        .default(0)
        .test({
          name: 'isUnique',
          message: 'Order already in used',
          async test(value) {
            try {
              const response = await checkNumberUniqueness(value, duplicate?.order)
              return response.isUnique
            } catch (error) {
              return false
            }
          },
        }),
      status: Yup.number(),
    }),
    onSubmit: (values, { setSubmitting }) => {
      setSubmitting(true)
      if (dataInput) {
        // Update
        updateRole({
          variables: {
            id: dataInput.id,
            input: {
              ...values,
            },
          },
        })
          .then((res) => {
            updateQuery(({ getAllMenus }) => ({
              getAllMenus: getAllMenus.map((data) =>
                data.id === res.data?.updateMenu?.id ? res.data?.updateMenu : data,
              ),
            }))
            handleClose()
          })
          .catch((err) => console.log(err))
          .finally(() => setSubmitting(false))
        return
      }
      // Create
      addRole({ variables: { input: values } })
        .then((res) => {
          updateQuery(({ getAllMenus }) => ({
            getAllMenus: res.data?.createMenu ? [...getAllMenus, res.data.createMenu] : getAllMenus,
          }))
          handleClose()
        })
        .catch((err) => console.log(err))
        .finally(() => setSubmitting(false))
    },
  })

  const { setValues, resetForm, isSubmitting } = formik

  useOnceCall(() => {
    getAllMenuParents()
  }, modal)

  useEffect(() => {
    if (dataInput) {
      const { id, ...rest } = dataInput
      setValues({ ...rest })
    }
  }, [dataInput])

  const [showModalMenuParent, setShowModalMenuParent] = useState(false)
  const handleCloseMenuParentModal = () => setShowModalMenuParent(false)
  return (
    <>
      <Modal show={modal} onHide={handleClose} size='xl'>
        <Modal.Header>
          <Modal.Title>Modal heading</Modal.Title>
          <div className='btn btn-icon btn-sm btn-light-primary' onClick={handleClose}>
            <KTSVG className='svg-icon-2' path='/media/icons/duotune/arrows/arr061.svg' />
          </div>
        </Modal.Header>
        <Form onSubmit={formik.handleSubmit}>
          <Modal.Body>
            <Form.Group as={Row} className='mb-5'>
              <Col lg={6}>
                <Form.Label className='form-label text-nowrap required'>Name</Form.Label>
                <InputV name='name' formik={formik} />
              </Col>
              <Col lg={6}>
                <Form.Label className='form-label text-nowrap'>
                  Parent Menu <span className='text-danger me-3'>*</span>
                  <button
                    className='btn btn-bg-light btn-color-primary btn-active-primary btn-sm'
                    type='button'
                    onClick={() => setShowModalMenuParent(true)}
                  >
                    <i className='fas fa-plus-circle fa-lg'></i> Add New Parent
                  </button>
                </Form.Label>
                <Select name='parent' formik={formik}>
                  <option value=''>Please choose</option>
                  {menuParentDropdown?.getAllMenuParents.map((parent) => (
                    <option key={parent.id} value={parent.id}>
                      {parent.name}
                    </option>
                  ))}
                </Select>
              </Col>
            </Form.Group>
            <Form.Group className='mb-5'>
              <Form.Label className='form-label text-nowrap'>URL</Form.Label>
              <InputV name='url' formik={formik} />
            </Form.Group>
            <Form.Group as={Row} className='mb-5'>
              <Col lg={6}>
                <Form.Label className='form-label text-nowrap'>
                  Icon{' '}
                  <small>
                    <u>
                      <a
                        href='https://preview.keenthemes.com/metronic8/demo1/documentation/icons/duotune.html'
                        target='_blank'
                        rel='noreferrer'
                      >
                        Duotune
                      </a>
                    </u>{' '}
                    <i className='fas fa-external-link-alt'></i>
                  </small>
                </Form.Label>
                <InputV name='icon' formik={formik} disabled />
              </Col>
              <Col lg={6}>
                <Form.Label className='form-label text-nowrap'>Color</Form.Label>
                <InputV name='color' formik={formik} />
              </Col>
            </Form.Group>
            <Form.Group className='mb-5'>
              <Form.Label className='form-label text-nowrap'>
                Order <small>(Optional)</small>
              </Form.Label>
              <InputV name='order' type='number' formik={formik} />
            </Form.Group>
            <Form.Group className='mb-5 col-4'>
              <Form.Label className='form-label text-nowrap'>
                Status <small>(Optional)</small>
              </Form.Label>
              <Select
                name='status'
                formik={formik}
                onChange={(e) => formik.setFieldValue('status', Number(e.target.value))}
              >
                <option value={0}>Show</option>
                <option value={1}>Hide</option>
              </Select>
            </Form.Group>
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
              ) : !dataInput ? (
                'Save'
              ) : (
                'update'
              )}
            </button>
          </Modal.Footer>
        </Form>
      </Modal>
      <MenuParentModal
        modal={showModalMenuParent}
        handleCloseModal={handleCloseMenuParentModal}
        data={menuParentDropdown?.getAllMenuParents}
        updateQuery={updateQueryMenuParent}
      />
    </>
  )
}

export default MenuModal
