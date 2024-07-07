import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Card, Checkbox, Form, Input } from 'antd'
import { useNavigate } from 'react-router-dom';
import { useAuthSelector } from 'src/context/authentication/store'
import { useGlobalData } from 'src/context/other/GlobalDataProvider';
import { useLogin } from 'src/hook/useLogin'

interface FieldType {
  username: string
  password: string
}


const Login = () => {
  const navigate = useNavigate()
  const { dispatch: dispatchRedux } = useAuthSelector()
  const { dispatch } = useGlobalData()

  const [login] = useLogin()

  const onFinish = (input: FieldType) => {
    login({
      variables: {
        input: {
          username: input.username,
          password: input.password
        }
      }
    })
      .then(res => {
        if (res.data?.login?.token) {
          dispatchRedux({ type: 'LOGIN', payload: { token: res.data.login.token } })
          dispatch({ type: 'NOTIFY', payload: { status: 'success', content: 'Welcome to Nasfong world!' } });
          localStorage.setItem('token', res.data.login.token);
          navigate('/management')
        } else if (res.data?.login?.message) {
          dispatch({ type: 'NOTIFY', payload: { status: 'warning', content: res.data.login.message } })
        }
      })
      .catch(e => dispatch({ type: 'NOTIFY', payload: { status: 'error', content: e.message } }))
  }

  return (
    <Card style={{ margin: 50, marginTop: 300 }}>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ username: 'Nas Fong', password: '12345678' }}
        onFinish={onFinish}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: 'Please input your Username!' }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
            autoComplete='username'
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your Password!' }]}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder="Password"
            autoComplete='current-password'
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <a className="login-form-forgot" href="">
            Forgot password
          </a>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
          Or <a href="">register now!</a>
        </Form.Item>
      </Form>
    </Card>
  )
}

export default Login