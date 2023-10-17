import * as Yup from 'yup';
import { useEffect } from "react";
import { Form, Modal } from "react-bootstrap"
import { useFormik } from "formik";
import { useLazyQuery, useMutation } from "@apollo/client";
import { InputV } from "components/InputV";
import { CREATE_USER, UPDATE_USER } from "graphql/mutations/user.mutation";
import { GET_ROLE_DROPDOWN } from "graphql/querys/role.query";
import { GetAllUsersQuery, GetUserQuery, UserInput } from "__generated__/graphql";
import { Select } from "components/Select";
import useOnceCall from "app/utils/useOneCall";
import { KTSVG } from "_metronic/helpers"
import { UpdateQuerys } from 'types/TGlobal';

type Props = {
  modal: boolean
  handleCloseModal: () => void
  user: GetUserQuery["getUser"] | null
  updateQuery: UpdateQuerys<GetAllUsersQuery>
}

const AdministratorModal: React.FC<Props> = ({ modal, handleCloseModal, user, updateQuery }) => {
  // Submit
  const [addUser] = useMutation(CREATE_USER)
  const [updateUser] = useMutation(UPDATE_USER)

  // Dropdown
  const [getRoleDropdown, { data: roleDropdown }] = useLazyQuery(GET_ROLE_DROPDOWN)


  const handleClose = () => {
    handleCloseModal()
    resetForm()
  }

  const formik = useFormik<UserInput>({
    initialValues: {
      username: '',
      password: '',
      email: '',
      role: ''
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .required('Username is required')
      ,
      email: Yup.string().nullable()
      // .email()
      // .required('Email Address is required')
      // .matches(
      //   /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
      ,
      password: Yup.string()
        .required("This field is required")
        .min(8, "Password must be 8 or more characters")
      ,
      role: Yup.string()
        .required("This field is required")

    }),
    onSubmit: (values, { setSubmitting }) => {
      setSubmitting(true)
      // Update
      if (user) {
        updateUser({
          variables: {
            id: user.id,
            input: {
              ...values
            },
          }
        }).then((res) => {
          updateQuery(({ getAllUsers }) => ({
            getAllUsers: getAllUsers.map(data => data.id === res.data?.updateUser?.id ? res.data?.updateUser : data)
          }))
          handleClose()
        })
          .catch((err) => console.log(err))
          .finally(() => setSubmitting(false))
        return
      }
      // Create
      addUser({ variables: { input: values } })
        .then((res) => {
          updateQuery(({ getAllUsers }) => ({
            getAllUsers: res.data?.createUser ? [...getAllUsers, res.data.createUser] : getAllUsers
          }))
          handleClose()
        })
        .catch((err) => console.log(err))
        .finally(() => setSubmitting(false))
    },
  });
  const { setValues, resetForm, isSubmitting } = formik

  useOnceCall(() => {
    getRoleDropdown()
  }, modal)

  useEffect(() => {
    if (user) {
      const { id, ...rest } = user
      setValues({ ...rest, role: user.role?.id })
    }
  }, [user, modal])
  return (
    <>
      <Modal show={modal} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Modal heading</Modal.Title>
          <div className='btn btn-icon btn-sm btn-light-primary' onClick={handleClose}>
            <KTSVG className='svg-icon-2' path='/media/icons/duotune/arrows/arr061.svg' />
          </div>
        </Modal.Header>
        <form onSubmit={formik.handleSubmit}>
          <Modal.Body>
            <Form.Group className='mb-5'>
              <Form.Label className='form-label text-nowrap required'>
                Username
              </Form.Label>
              <InputV
                name='username'
                formik={formik}
              />
            </Form.Group>
            <Form.Group className='mb-5'>
              <Form.Label className='form-label text-nowrap'>
                Email
              </Form.Label>
              <InputV
                name='email'
                formik={formik}
              />
            </Form.Group>
            <Form.Group className='mb-5'>
              <Form.Label className='form-label text-nowrap required'>
                Password
              </Form.Label>
              <InputV
                name='password'
                formik={formik}
              />
            </Form.Group>
            <Form.Group className='mb-5'>
              <Form.Label column lg='4' className='form-label text-nowrap required'>
                Roles
              </Form.Label>
              <Select
                name='role'
                formik={formik}
              >
                <option value=''>Please choose</option>
                {roleDropdown?.getRoleDropdown ? Object.keys(roleDropdown?.getRoleDropdown).map((key) => (
                  <option key={key} value={key}>
                    {roleDropdown?.getRoleDropdown[key]}
                  </option>
                )) : null}
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
              ) : (
                !user ? 'Save' : 'update'
              )}
            </button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  )
}

export default AdministratorModal