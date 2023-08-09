import { FormEvent } from "react"
import { Button, Form, Modal } from "react-bootstrap"
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
                            placeholder='Username'
                        />
                        {/* <Form.Control.Feedback type='invalid'>name is required</Form.Control.Feedback> */}
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button className='btn btn-primary' variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" type='submit'>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}

export default FormModal