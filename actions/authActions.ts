"use server"

import prisma from '@/lib/db'

// Получить юзера или создать
export async function userRegister(prevState: any, formData: FormData) {

	const apiResult =  { success: "", response: "", errors: { username: "", email: "", phone: "", password: "", confirm: ""} };


	// const existingUser = await prisma.user.findUnique({ where: { email }})

	// if (existingUser) {
	// 	return {...apiResult, success: "success"};;
	// }
	return {...apiResult, success: "success"};
}
