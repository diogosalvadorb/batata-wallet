import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { SignOutButton } from "./_components/sign-out-button";

export default async function Dashboard() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/authentication");
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Bem-vindo, {session.user.name || session.user.email}!</p>
      <SignOutButton />
    </div>
  );
}
