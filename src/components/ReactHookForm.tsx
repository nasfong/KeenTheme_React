import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { InputH } from "./InputH";
import { Form } from "react-bootstrap";

const schema = yup.object({
  name: yup.string().required(),
  age: yup.number().positive().integer().required(),
}).required();
type FormData = yup.InferType<typeof schema>;

const ReactHookForm = () => {

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(schema)
  })
  const onSubmit = (data: FormData) => {
    // data.preventDefault()
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* <input {...register("name")} />
      <p>{errors.name?.message}</p> */}

      <input {...register("age")} />
      <p>{errors.age?.message}</p>

      <Form.Group>
        <Form.Label className='form-label text-nowrap required'>
          React Hook Form
        </Form.Label>
        <InputH
          {...register("name")}
          errors={errors.name?.message}
        />
        <Form.Control.Feedback type='invalid'>{errors.name?.message}</Form.Control.Feedback>
      </Form.Group>

      <button className='btn btn-primary btn-sm float-end' type="submit">Submit</button>
    </form>
  );
}

export default ReactHookForm