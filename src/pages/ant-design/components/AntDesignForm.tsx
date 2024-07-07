import { Button, Checkbox, Form, Input, Select, Space } from "antd"
import { LockOutlined, UserOutlined } from '@ant-design/icons'

interface FormValues {
  username: string
  password: string
  age: number
  nationality: string
  country: number
  active: boolean
  user: {
    name: string
    email: string
  }
}

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
    number: '${label} is not a valid number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};

const AntDesignForm = () => {

  const onFinish = (input: FormValues) => {
    console.log(input)
  }
  return (
    <Form
      {...layout}
      name="nest-messages"
      onFinish={onFinish}
      style={{ maxWidth: 600 }}
      validateMessages={validateMessages}
      initialValues={{ nationality: 'lucy' }}
    >
      <Form.Item<FormValues> label='Username' name='username' rules={[{ required: true }]}>
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          autoComplete="username"
        />
      </Form.Item>
      <Form.Item label='Password' name='password'>
        <Input.Password
          prefix={<LockOutlined className="site-form-item-icon" />}
          autoComplete="current-password"
        />
      </Form.Item>
      <Form.Item label='Age' name='age'>
        <Input type="number" />
      </Form.Item>
      <Form.Item label='Nationality' name='nationality'>
        <Select
          style={{ width: 120 }}
          options={[
            { value: 'jack', label: 'Jack' },
            { value: 'lucy', label: 'Lucy' },
            { value: 'Yiminghe', label: 'yiminghe' },
            { value: 'disabled', label: 'Disabled', disabled: true },
          ]}
        />
      </Form.Item>
      <Form.Item label='Country (Search)' name='country'>
        <Select showSearch optionFilterProp='children'>
          <Select.Option value={1}>Cambodia</Select.Option>
          <Select.Option value={2}>Thailand</Select.Option>
          <Select.Option value={3}>USA</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item label="User">
        <Space.Compact>
          <Form.Item<FormValues>
            noStyle
            name={['user', 'name']}
            rules={[{ required: true }]}
          >
            <Input placeholder="Name" />
          </Form.Item>
          <Form.Item<FormValues>
            noStyle
            name={['user', 'email']}
            rules={[{ required: true }]}
          >
            <Input placeholder="Email" />
          </Form.Item>
        </Space.Compact>
      </Form.Item>

      <Form.Item name='active' valuePropName="checked" initialValue={false}>
        <Checkbox>Active</Checkbox>
      </Form.Item>
      <Form.Item>
        <Button type="dashed" htmlType="submit">Submit</Button>
      </Form.Item>
    </Form>
  )
}

export default AntDesignForm