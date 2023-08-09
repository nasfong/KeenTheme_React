import {useContext} from 'react'
import {DataContext} from '../app/reducer/GlobalState'
import Toast from './ToastComponent'
import {Toast as BToast} from 'react-bootstrap-v5'


const Notify = () => {
  const {state, dispatch} = useContext(DataContext)
  const {notify} = state
  
  return (
    <>
      <BToast
        className='toast-container position-fixed '
        style={{zIndex: 9999, top: '70px', right: '15px'}}
      >
        {notify.error && (
          <Toast
            msg={{msg: notify.error, title: 'Error'}}
            handleShow={() => dispatch({type: 'NOTIFY', payload: {}})}
            bgColor='danger'
            count={state.count}
          />
        )}

        {notify.success && (
          <Toast
            msg={{msg: notify.success, title: 'Success'}}
            handleShow={() => dispatch({type: 'NOTIFY', payload: {}})}
            bgColor='success'
            count={state.count}
          />
        )}

        {notify.warning && (
          <Toast
            msg={{msg: notify.warning, title: 'Warning'}}
            handleShow={() => dispatch({type: 'NOTIFY', payload: {}})}
            bgColor='warning'
            count={state.count}
          />
        )}
      </BToast>
    </>
  )
}

export default Notify
