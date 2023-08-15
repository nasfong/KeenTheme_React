import { Modal } from "react-bootstrap"
import { KTSVG } from "./_metronic/helpers"
import Basic from "./Basic"
import Advance from "./Advance"

type props = {
    show: boolean
    setShow: React.Dispatch<React.SetStateAction<boolean>>
}

const FormikModal: React.FC<props> = ({ show, setShow }) => {


    const handleClose = () => setShow(!show)

    return (
        <Modal show={show} onHide={handleClose} size="xl">
            <Modal.Header>
                <Modal.Title>Modal heading</Modal.Title>
                <div className='btn btn-icon btn-sm btn-light-primary' onClick={handleClose}>
                    <KTSVG className='svg-icon-2' path='/media/icons/duotune/arrows/arr061.svg' />
                </div>
            </Modal.Header>
            <Modal.Body>
                {/* <Basic /> */}
                <Advance />
            </Modal.Body>

        </Modal>
    )
}

export default FormikModal