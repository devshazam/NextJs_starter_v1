import NextAuth from "next-auth"
import  { UserRole } from "@prisma/client";
import { PrismaAdapter } from "@auth/prisma-adapter";

import prisma from "@/lib/db";
import authConfig from "@/auth.config";
import { getUserById } from "@/data/user";
import { getAccountByUserId } from "@/data/account";

export const {
  handlers,
  auth,
  signIn,
  signOut,
} = NextAuth({
//   pages: {
//     signIn: "/auth/login", // кастомизировать
//     		// signIn: '/auth/signin',
// 		// signOut: '/auth/signout',
// 		// error: '/auth/error', // Error code passed in query string as ?error=
// 		// verifyRequest: '/auth/verify-request', // (used for check email message)
// 		// newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
//   },
//   events: {
//     async linkAccount({ user }) {
// 	console.log(1, user);
//       await db.user.update({
//         where: { id: user.id },
//         data: { emailVerified: new Date() }
//       })
//     }
//   },
  	callbacks: {
		// Этот callback 
		async signIn({ user, account }) {
		console.log(2, user, account);
			// 1. При использовании провайдеров социальных сетей не проходить email verification
			if (account?.provider !== "credentials") return true;

			// 2. 
			const existingUser = await getUserById(user.id);

			// 3. если пользователь не прошел email verification - отклонить
			if (!existingUser?.emailVerified) return false;

			return true;
		},
	// формирование token-a при авторизации: добавление требуемых полей (role? )
		async jwt({ token }) { // возвращает токен
		console.log(4, token);
			if (!token.sub) return token;
		
			const existingUser = await getUserById(token.sub);
		
			if (!existingUser) return token;
		
			const existingAccount = await getAccountByUserId(
			existingUser.id
			);
		
			token.isOAuth = !!existingAccount;
			token.name = existingUser.name;
			token.email = existingUser.email;
			token.role = existingUser.role;

			return token;
		},
	// Создание клиентской сессии 
		async session({ token, session }) {
			console.log(3, token, session);
				if (token.sub && session.user) {
				session.user.id = token.sub;
				}

				if (token.role && session.user) {
				session.user.role = token.role as UserRole;
				}

				if (session.user) {
				session.user.name = token.name;
				session.user.email = token.email as string;
				session.user.isOAuth = token.isOAuth as boolean;
				}

				return session;
		},

  },
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig,
});
