import { FormEvent } from "react"
import { Form, Modal } from "react-bootstrap"
import { KTSVG } from "./_metronic/helpers"

type props = {
  show: boolean
  setShow: React.Dispatch<React.SetStateAction<boolean>>
}

const FormModal: React.FC<props> = ({ show, setShow }) => {


  const handleClose = () => setShow(!show)
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // console.log(e.target['username'].value

  }
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header>
        <Modal.Title>Modal heading</Modal.Title>
        <div className='btn btn-icon btn-sm btn-light-primary' onClick={handleClose}>
          <KTSVG className='svg-icon-2' path='/media/icons/duotune/arrows/arr061.svg' />
        </div>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          Woohoo, you are reading this text in a modal!
          <Form.Group>
            <Form.Label className='required form-label'>Name</Form.Label>
            <Form.Control
              type='text'
              name='username'
              // isInvalid={true}
              className='form-control-solid'
              defaultValue='nasfong'
              placeholder='Username'
            />
            {/* <Form.Control.Feedback type='invalid'>name is required</Form.Control.Feedback> */}
          </Form.Group>
          <Form.Group>
            <Form.Label className='required form-label'>Phone</Form.Label>
            <Form.Control
              type='number'
              name='phone'
              // isInvalid={true}
              className='form-control-solid'
              placeholder='phone'
              defaultValue={1900}
              disabled
              // readOnly
            />
            <Form.Control.Feedback type='invalid'>phone is required</Form.Control.Feedback>
          </Form.Group>
          <Form.Label className='form-label'>Date</Form.Label>
          <input
            className="form-control form-control-solid   active"
            placeholder="Select a date"
            name="due_date"
            type="date"
          />
        </Modal.Body>
        <Modal.Footer>
          <button className='btn btn-light' onClick={handleClose}>
            Close
          </button>
          <button className='btn btn-primary' type='submit'>
            Save Changes
          </button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}

export default FormModal