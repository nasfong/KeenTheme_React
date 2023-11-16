import { Toast } from 'react-bootstrap'
import { KTSVG } from '../_metronic/helpers'
const ToastComponent = ({ msg, handleShow, bgColor, count }: any) => {
  return (
    <>
      <Toast
        show
        bg={bgColor}
        className={`bg-${bgColor}`}
        delay={count || 60000}
        autohide
        onClose={handleShow}
      >
        <Toast.Header closeButton={false}>
          <strong className='me-auto'>{msg.title}</strong>

          <div
            className={`btn btn-icon btn-sm btn-light-${bgColor}`}
            onClick={handleShow}
          >
            <KTSVG
              className='svg-icon-2'
              path='/media/icons/duotune/arrows/arr061.svg'
            />
          </div>
        </Toast.Header>
        <Toast.Body className='text-white'>
          <span dangerouslySetInnerHTML={{ __html: msg.msg }} />
        </Toast.Body>
      </Toast>
    </>
  )
}

export default ToastComponent
