import { KTSVG } from "_metronic/helpers"
import { Form, Modal } from "react-bootstrap"
import { useEffect, useState } from 'react';
import { useFormik } from "formik";
import * as Yup from 'yup';
import { InputV } from "components/InputV";
import { OperationVariables, WatchQueryOptions, useLazyQuery, useMutation } from "@apollo/client";
import { CREATE_USER, UPDATE_USER } from "graphql/mutations/user.mutation";
import { GET_ALL_ROLES } from "graphql/querys/role.query";
import { Select } from "components/Select";
import { GetAllUsersQuery, GetUserQuery } from "__generated__/graphql";
import useOnceCall from "app/utils/useOneCall";

type Props = {
  refetch: () => void
  user?: GetUserQuery["getUser"]
  updateQuery: <TVars extends OperationVariables>(mapFn: (previousQueryResult: GetAllUsersQuery, options: Pick<WatchQueryOptions<TVars, GetAllUsersQuery>, "variables">) => GetAllUsersQuery) => void
}

type userFormik = Omit<GetUserQuery["getUser"], 'id'>

const AdministratorModal = ({ refetch, user, updateQuery }: Props) => {

  // Submit
  const [addUser] = useMutation(CREATE_USER)
  const [updateUser] = useMutation(UPDATE_USER)

  // Dropdown
  const [getRoleDropdown, { data: roleDropdown }] = useLazyQuery(GET_ALL_ROLES)

  const [show, setShow] = useState(false)

  const handleClose = () => {
    setShow(!show)
    resetForm()
  }

  const formik = useFormik<userFormik>({
    initialValues: {
      username: '',
      password: '',
      email: '',
      role: []
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
      role: Yup.array()

    }),
    onSubmit: (values) => {
      // Update
      if (user) {
        updateUser({
          variables: {
            id: user.id,
            input: {
              ...values,
              role: values.role?.filter(role => role)
            },
          }
        }).then((res) => {
          updateQuery(({ getAllUsers }) => ({
            getAllUsers: getAllUsers.map(data => data.id === res.data?.updateUser?.id ? res.data?.updateUser : data)
          }))
          handleClose()
        })
          .catch((err) => console.log(err))
        return
      }
      // Create
      addUser({ variables: { input: values } })
        .then(() => {
          refetch()
          handleClose()
        })
        .catch((err) => console.log(err))

    },
  });
  const { setValues, resetForm } = formik

  useOnceCall(() => {
    getRoleDropdown()
    console.log('fetch')
  }, show)

  useEffect(() => {
    if (user) {
      const { id, ...rest } = user
      setValues(rest)
    }
    setShow(!!user)
  }, [user])
  return (
    <>
      <button
        className='btn btn-primary btn-sm'
        onClick={() => setShow(true)}
      >Create</button>
      <Modal show={show} onHide={handleClose}>
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
              <Form.Label column lg='4' className='form-label text-nowrap'>
                Roles
              </Form.Label>
              <Select
                name='role'
                formik={formik}
                multiple
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
              Save Changes
            </button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  )
}

export default AdministratorModal