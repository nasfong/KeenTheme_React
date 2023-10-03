import { Modal } from "react-bootstrap"
import { KTSVG } from "./_metronic/helpers"
import ReactHookForm from "./components/ReactHookForm"

type props = {
  show: boolean
  setShow: React.Dispatch<React.SetStateAction<boolean>>
}

const ReactHookFormModal: React.FC<props> = ({ show, setShow }) => {


  const handleClose = () => setShow(!show)

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header>
        <Modal.Title>Modal heading</Modal.Title>
        <div className='btn btn-icon btn-sm btn-light-primary' onClick={handleClose}>
          <KTSVG className='svg-icon-2' path='/media/icons/duotune/arrows/arr061.svg' />
        </div>
      </Modal.Header>
      <Modal.Body>
        <ReactHookForm />
      </Modal.Body>
      <Modal.Footer>

      </Modal.Footer>
    </Modal>
  )
}

export default ReactHookFormModal