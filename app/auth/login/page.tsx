'use client';
import { useSearchParams } from "next/navigation";

import { Button, Checkbox, Form, Input ,Flex} from "antd";
import { LockOutlined, UserOutlined , PhoneOutlined, MailOutlined} from '@ant-design/icons';
import { useActionState } from 'react';
import { login } from '@/actions/login';

// import { useForm } from "react-hook-form";

// import { FormItem } from "react-hook-form-antd";
// import { DevTool } from "@hookform/devtools";
// import { zodResolver } from "@hookform/resolvers/zod";
// import * as z from "zod";

const initialState = {
	success: "",
	response: "",
	errors: {
		// username: "",
		email: "",
		phone: "",
		password: "",
		confirm: "",
	},
   };


const LoginPage = () => {
	const searchParams = useSearchParams();
	const callbackUrl = searchParams.get("callbackUrl");
	const urlError = searchParams.get("error") === "OAuthAccountNotLinked"
	  ? "Email already in use with different provider!"
	  : "";

	const [currentState, actionFunction, isPending] = useActionState(login, initialState);

	console.log(currentState);
	const onFinish = (values: any) => {
		console.log('Received values of form: ', values);
	   };

  return ( 
    <>
	<h1 className="text-center mb-6 text-lg">Вход Kopi34.ru</h1>
      {/* <Form
	 action={actionFunction}
      name="login"
      initialValues={{ remember: true }}
	 //  style={{ maxWidth: 360 }}
	 
      onFinish={onFinish}
	 > */}

    <form 
		action={actionFunction} >

	 <div className="flex flex-col gap-4">
		<div >
			<Input prefix={<MailOutlined />} placeholder="Email"  name="email"/>

			{currentState?.errors?.email && ( <p className="authentication__error-message">{currentState.errors.email}</p> )}
		</div>
		<div>
			<Input.Password prefix={<LockOutlined />} type="password" placeholder="Пароль" name="password"/>
			{currentState?.errors?.password && ( <p className="authentication__error-message">{currentState.errors.password}</p> )}
		</div>
		<div >
        <Button block type="primary" htmlType="submit" disabled={isPending} loading={isPending}>
          Войти
        </Button>
      </div>
</div>
    {/* </Form> */}
    </form>
    {currentState?.success && <p className="text-green-600">{currentState.success}</p>}
	{currentState?.response && <p className="text-yellow-600">{currentState.response}</p>}
				
    <p className="text-xs w-full text-center mt-2">* Регистрируясь, вы принимаете <a href="https://kopi34.ru/oferta" className="text-blue-500">политику конфиденциальности</a></p>
    </>
  );
}
 
export default LoginPage;