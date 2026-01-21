import { createAuthClient } from "better-auth/react";
//conecta com as rotas do better-auth criadas no arquivo route.ts
export const authClient = createAuthClient({
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
});
