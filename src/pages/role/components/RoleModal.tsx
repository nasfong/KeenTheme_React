import { useLazyQuery, useMutation } from "@apollo/client";
import { GetAllRolesQuery, Role, RoleInput } from "__generated__/graphql";
import { KTSVG } from "_metronic/helpers";
import useOnceCall from "app/utils/useOneCall";
import { CheckBox } from "components/CheckBox";
import { InputV } from "components/InputV";
import { useFormik } from "formik";
import { CREATE_ROLE, UPDATE_ROLE } from "graphql/mutations/role.mutation";
import { GET_PERMISSION_DROPDOWN } from "graphql/querys/permission.query";
import { useEffect } from "react";
import { Form, Modal } from "react-bootstrap"
import { UpdateQuerys } from "types/TGlobal";
import * as Yup from 'yup';

type Props = {
  modal: boolean
  handleCloseModal: () => void
  role: Role | null
  updateQuery: UpdateQuerys<GetAllRolesQuery>
}

const RoleModal = ({
  modal,
  handleCloseModal,
  role,
  updateQuery
}: Props) => {

  const [addRole] = useMutation(CREATE_ROLE)
  const [updateRole] = useMutation(UPDATE_ROLE)

  // Dropdown
  const [getPermissionDropdown, { data: permissionDropdown }] = useLazyQuery(GET_PERMISSION_DROPDOWN, { fetchPolicy: 'network-only' })

  const handleClose = () => {
    handleCloseModal()
    resetForm()
  }

  const formik = useFormik<RoleInput>({
    initialValues: {
      name: '',
      permission: []
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required('Username is required')
      ,
      role: Yup.array()

    }),
    onSubmit: (values, { setSubmitting }) => {
      setSubmitting(true)
      if (role) {
        // Update
        updateRole({
          variables: {
            id: role.id,
            input: {
              ...values,
              permission: values.permission.filter(permission => permission)
            }
          }
        })
          .then((res) => {
            updateQuery(({ getAllRoles }) => ({
              getAllRoles: getAllRoles.map(data => data.id === res.data?.updateRole?.id ? res.data?.updateRole : data)
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
          updateQuery(({ getAllRoles }) => ({
            getAllRoles: res.data?.createRole ? [...getAllRoles, res.data.createRole] : getAllRoles
          }))
          handleClose()
        })
        .catch((err) => console.log(err))
        .finally(() => setSubmitting(false))
    },
  });

  const { values, setValues, resetForm, isSubmitting } = formik

  useOnceCall(() => {
    getPermissionDropdown()
  }, modal)

  useEffect(() => {
    if (role) {
      const { id, ...rest } = role
      setValues({ ...rest, permission: role.permission.map(permission => permission.id) })
    }
  }, [role])

  return (
    <Modal show={modal} onHide={handleClose} size='xl'>
      <Modal.Header>
        <Modal.Title>Modal heading</Modal.Title>
        <div className='btn btn-icon btn-sm btn-light-primary' onClick={handleClose}>
          <KTSVG className='svg-icon-2' path='/media/icons/duotune/arrows/arr061.svg' />
        </div>
      </Modal.Header>
      <Form onSubmit={formik.handleSubmit}>
        <Modal.Body>
          <Form.Group className='mb-5'>
            <Form.Label className='form-label text-nowrap required'>
              Name
            </Form.Label>
            <InputV
              name='name'
              formik={formik}
            />
          </Form.Group>

          <div className='grid'>
            {permissionDropdown?.getPermissionDropdown ? Object.keys(permissionDropdown?.getPermissionDropdown).map((key) => (
              <div key={key} className='card shadow-sm'>
                <div className='card-body p-3'>
                  <CheckBox
                    name={`permission`}
                    formik={formik}
                    defaultValue={key}
                    checked={
                      values.permission.includes(key)
                        ? true
                        : false
                    }
                  />
                  <span
                    className='form-check-label text-gray-800 fw-bold'
                  >
                    {permissionDropdown?.getPermissionDropdown[key]}
                  </span>
                </div>
              </div>
            )) : null}
          </div>

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
            ) : (
              !role ? 'Save' : 'update'
            )}
          </button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}

export default RoleModal