import { createSafeActionClient } from "next-safe-action";
import { auth } from "./auth";
import { headers } from "next/headers";

export const actionClient = createSafeActionClient({
  handleServerError(e) {
    // Trata erro de API key inválida do OpenAI
    const errorMessage = e instanceof Error ? e.message : String(e);
    const errorStatus = (e as any)?.status;

    if (
      errorStatus === 401 ||
      errorMessage.includes("Incorrect API key provided")
    ) {
      return "API key inválida. Por favor, verifique sua API key do OpenAI";
    }

    if (e instanceof Error) {
      return e.message;
    }
    // erro genérico
    return "Something went wrong while executing the operation";
  },
});

export const protectedActionClient = actionClient.use(async ({ next }) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user) {
    throw new Error("Não autorizado. Por favor, faça login para continuar.");
  }
  return next({ ctx: { user: session.user } });
});
