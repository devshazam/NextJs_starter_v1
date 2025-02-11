'use client';
import { Button, Checkbox, Form, Input ,Flex} from "antd";
import { LockOutlined, UserOutlined , PhoneOutlined, MailOutlined} from '@ant-design/icons';
import { useActionState } from 'react';
import { userRegister } from '@/actions/authActions';

const initialState = {
	success: "",
	response: "",
	errors: {
		username: "",
		email: "",
		phone: "",
		password: "",
		confirm: "",
	},
   };


const RegisterPage = () => {
	const [currentState, actionFunction, isPending] = useActionState(userRegister, initialState);

	console.log(currentState);
	const onFinish = (values: any) => {
		console.log('Received values of form: ', values);
	   };

  return ( 
    <>
	<h1 className="text-center mb-6 text-lg">Регистрация Kopi34.ru</h1>
      <Form
	 action={actionFunction}
      name="login"
      initialValues={{ remember: true }}
     //  style={{ maxWidth: 360 }}

      onFinish={onFinish}
    >
      <Form.Item
        name="username"
        rules={[{ required: true, message: 'Это поле обязательно!' },{max: 20, message: 'До 20 символов!' }]}
	   hasFeedback
      >
        <Input prefix={<UserOutlined />} placeholder="Имя пользователя" />
      </Form.Item>
      <Form.Item
        name="email"
        rules={[{ type: 'email', message: 'Только для E-mail!', },{ required: true, message: 'Это поле обязательно!' }]}
	   hasFeedback
      >
        <Input prefix={<MailOutlined />} placeholder="Email" />
      </Form.Item>
	
	 <Form.Item
        name="phone"
	   hasFeedback
      >
        <Input prefix={<PhoneOutlined />} placeholder="Телефон (не обязательно)" />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Это поле обязательно!'},{max: 20, message: 'До 20 символов!' }]}
	   hasFeedback
      >
        <Input.Password prefix={<LockOutlined />} type="password" placeholder="Пароль" />
      </Form.Item>
      <Form.Item
        name="confirm"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Введите пароль!',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('Пароли не совпадают!'));
            },
          }),
        ]}
      >
        <Input.Password  prefix={<LockOutlined />} placeholder="Подтвердите пароль" />
      </Form.Item>


      <Form.Item>
        <Button block type="primary" htmlType="submit">
          Зарегистрироваться*
        </Button>
      </Form.Item>

    </Form>
    <p className="text-xs w-full text-center">* Регистрируясь, вы принимаете <a href="">политику конфиденциальности</a></p>
    </>
  );
}
 
export default RegisterPage;