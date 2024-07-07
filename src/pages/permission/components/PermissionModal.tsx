import { useLazyQuery, useMutation } from '@apollo/client'
import { GetAllPermissionsQuery, Permission, PermissionInput } from '__generated__/graphql'
import { KTSVG } from '_metronic/helpers'
import useOnceCall from 'app/utils/useOneCall'
import { InputV } from 'components/InputV'
import { Select } from 'components/Select'
import { useFormik } from 'formik'
import { CREATE_PERMISSION, UPDATE_PERMISSION } from 'graphql/mutations/permission.mutation'
import { GET_ROLE_DROPDOWN } from 'graphql/querys/role.query'
import { Dispatch, SetStateAction, useEffect } from 'react'
import { Col, Form, Modal, Row } from 'react-bootstrap'
import { UpdateQuerys } from 'types/TGlobal'
import * as Yup from 'yup'

type Props = {
  modal: boolean
  setModal: Dispatch<SetStateAction<boolean>>
  permission: Permission | null
  updateQuery: UpdateQuerys<GetAllPermissionsQuery>
}

const PermissionModal = ({ modal, setModal, permission, updateQuery }: Props) => {
  const [addPermission] = useMutation(CREATE_PERMISSION)
  const [updatePermission] = useMutation(UPDATE_PERMISSION)

  // Dropdown
  const [getRoleDropdown, { data: roleDropdown }] = useLazyQuery(GET_ROLE_DROPDOWN)

  const handleClose = () => {
    resetForm()
    setModal(!modal)
  }

  const formik = useFormik<PermissionInput>({
    initialValues: {
      name: '',
      role: [],
      // group: '',
      // key: ''
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Username is required'),
      role: Yup.array(),
    }),
    onSubmit: (values, { setSubmitting }) => {
      setSubmitting(true)
      if (permission) {
        // Update
        updatePermission({
          variables: {
            id: permission.id,
            input: {
              ...values,
              role: values.role.filter((role) => role),
            },
          },
        })
          .then((res) => {
            updateQuery(({ getAllPermissions }) => ({
              getAllPermissions: getAllPermissions.map((data) =>
                data.id === res.data?.updatePermission?.id ? res.data?.updatePermission : data,
              ),
            }))
            handleClose()
          })
          .catch((err) => console.log(err))
          .finally(() => setSubmitting(false))
        return
      }
      // Create
      addPermission({ variables: { input: values } })
        .then((res) => {
          updateQuery(({ getAllPermissions }) => ({
            getAllPermissions: res.data?.createPermission
              ? [...getAllPermissions, res.data.createPermission]
              : getAllPermissions,
          }))
          handleClose()
        })
        .catch((err) => console.log(err))
        .finally(() => setSubmitting(false))
    },
  })

  const { setValues, resetForm, isSubmitting } = formik

  useOnceCall(() => {
    getRoleDropdown()
  }, modal)

  useEffect(() => {
    if (permission) {
      const { id, ...rest } = permission
      setValues({ ...rest, role: permission.role.map((role) => role.id) })
    }
  }, [permission])

  return (
    <Modal show={modal} onHide={handleClose} size='lg'>
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
              <Form.Label className='form-label text-nowrap required'>
                Group
              </Form.Label>
              <Select name='group' formik={formik}>
                <option value=''>Please choose</option>
                {roleDropdown?.getRoleDropdown
                  ? Object.keys(roleDropdown?.getRoleDropdown).map((key) => (
                    <option key={key} value={key}>
                      {roleDropdown?.getRoleDropdown[key]}
                    </option>
                  ))
                  : null}
              </Select>
            </Col>
          </Form.Group>
          <Form.Group className='mb-5 col-8'>
            <Form.Label className='form-label text-nowrap required'>Key Name</Form.Label>
            <InputV name='key' formik={formik} />
          </Form.Group>
          <Form.Group className='mb-5'>
            <Form.Label column lg='4' className='form-label text-nowrap'>
              Roles
            </Form.Label>
            <Select name='role' formik={formik} multiple>
              <option value=''>Please choose</option>
              {roleDropdown?.getRoleDropdown
                ? Object.keys(roleDropdown?.getRoleDropdown).map((key) => (
                  <option key={key} value={key}>
                    {roleDropdown?.getRoleDropdown[key]}
                  </option>
                ))
                : null}
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
            ) : !permission ? (
              'Save'
            ) : (
              'update'
            )}
          </button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}

export default PermissionModal
