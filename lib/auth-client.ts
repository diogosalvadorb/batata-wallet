import { createAuthClient } from "better-auth/react";
//conecta com as rotas do better-auth criadas no arquivo route.ts
export const authClient = createAuthClient({
  baseURL: "http://localhost:3000",
});
