import { createAuthClient } from "better-auth/react";
//conecta com as rotas do better-auth criadas no arquivo route.ts
export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
});
