import bcrypt from "bcryptjs";
import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
// import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
// import YandexProvider from "next-auth/providers/yandex";
import Yandex from "next-auth/providers/yandex"
import Vk from "next-auth/providers/vk"
// import MailRu from "next-auth/providers/mailru";
// import TikTok from "next-auth/providers/tiktok"

import { LoginSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";



export default {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    Yandex,
//     TikTok,
//     YandexProvider({
// 	clientId: process.env.YANDEX_CLIENT_ID,
// 	clientSecret: process.env.YANDEX_CLIENT_SECRET
//    }),
// Vk({
// 	accessTokenUrl: `https://oauth.vk.com/access_token?v=${apiVersion}`,
// 	requestTokenUrl: `https://oauth.vk.com/access_token?v=${apiVersion}`,
// 	authorizationUrl: `https://oauth.vk.com/authorize?response_type=code&v=${apiVersion}`,
// 	profileUrl: `https://api.vk.com/method/users.get?fields=photo_100&v=${apiVersion}`,
//    }),
	// Vk,
   Vk({
	clientId: process.env.AUTH_VK_ID,
	clientSecret: process.env.AUTH_VK_SECRET,
	// checks: ["pkce", "state"],
	checks: ["none"],
   }),
//    MailRu,
//     Github({
//       clientId: process.env.GITHUB_CLIENT_ID,
//       clientSecret: process.env.GITHUB_CLIENT_SECRET,
//     }),
    Credentials({
	// credentials используется для настройки формы входа - которая автоматически генерируется
	credentials: {
          email: { label: "Email", type: "email" },
          password: { label: "Password", type: "password" },
        },
	// authorize используется для проверки входных данных - если они совпадают, то вернет объект user, а если нет, то null. Можно также выбросить ошибку и увидеть ее на странице с ошибками.
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;
          
          const user = await getUserByEmail(email);
          if (!user || !user.password) return null;

          const passwordsMatch = await bcrypt.compare(
            password,
            user.password,
          );

          if (passwordsMatch) return user;
        }

        return null;
      }
    })
  ],
} satisfies NextAuthConfig