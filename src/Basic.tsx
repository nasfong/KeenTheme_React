import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import { Input } from './components/Input'
import { CheckBox } from './components/CheckBox'
import { Select } from './components/Select'

// const MyCheckbox = ({ children, ...props }) => {
//   // React treats radios and checkbox inputs differently from other input types: select and textarea.
//   // Formik does this too! When you specify `type` to useField(), it will
//   // return the correct bag of props for you -- a `checked` prop will be included
//   // in `field` alongside `name`, `value`, `onChange`, and `onBlur`
//   const [field, meta] = useField({ ...props, type: 'checkbox' });
//   return (
//     <div>
//       <label className="checkbox-input">
//         <input type="checkbox" {...field} {...props} />
//         {children}
//       </label>
//       {meta.touched && meta.error ? (
//         <div className="error">{meta.error}</div>
//       ) : null}
//     </div>
//   );
// };

// const MySelect = ({ label, ...props }) => {
//   const [field, meta] = useField(props);
//   return (
//     <div>
//       <label htmlFor={props.id || props.name}>{label}</label>
//       <select {...field} {...props} />
//       {meta.touched && meta.error ? (
//         <div className="error">{meta.error}</div>
//       ) : null}
//     </div>
//   );
// };

// And now we can use these
const Basic = () => {
  // const formik = useFormik({
  //   initialValues: {
  //     firstName: '',
  //     lastName: '',
  //     email: '',
  //   },
  //   validationSchema: Yup.object({
  //     firstName: Yup.string()
  //       .max(15, 'Must be 15 characters or less')
  //       .required('Required'),
  //     lastName: Yup.string()
  //       .max(20, 'Must be 20 characters or less')
  //       .required('Required'),
  //     email: Yup.string().email('Invalid email address').required('Required'),
  //   }),
  //   onSubmit: values => {
  //     alert(JSON.stringify(values, null, 2));
  //   },
  // });
  return (
    <>
      <h1>Subscribe!</h1>
      {/* <form onSubmit={formik.handleSubmit}> */}
      <Formik
        initialValues={{
          username: '',
          password: '',
          email: '',
          active: false, // added for our checkbox
          jobType: '', // added for our select
        }}
        validationSchema={Yup.object({
          username: Yup.string()
            .max(15, 'Must be 15 characters or less')
            .required('Username is required'),
          password: Yup.string()
            .max(20, 'Must be 20 characters or less')
            .required('Password is required'),
          email: Yup.string().email('Invalid email address').required('Required'),
          active: Yup.boolean()
            .required('Required')
            .oneOf([true], 'You must accept the terms and conditions.'),
          jobType: Yup.string()
            .oneOf(['designer', 'development', 'product', 'other'], 'Invalid Job Type')
            .required('Required'),
        })}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2))
            setSubmitting(false)
          }, 400)
        }}
      >
        <Form>
          <Input inline label='Username' name='username' placeholder='username' required />
          <Input inline label='Password' name='password' type='password' />
          <Select inline label='Job Type' name='jobType' required>
            <option>Please Select</option>
            <option value='designer'>Design</option>
            <option value='development'>Development</option>
            <option value={3}>Product</option>
          </Select>
          <CheckBox label='Active' name='active' />

          <button className='btn btn-primary btn-sm' type='submit'>
            Submit
          </button>
        </Form>
      </Formik>
      {/* </form> */}
    </>
  )
}

export default Basic
