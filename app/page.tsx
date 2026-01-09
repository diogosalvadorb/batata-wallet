import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session?.user) {
    redirect("/dashboard");
  }

  return (
    <div>
      <Header />
      <h1>Hello World</h1>
      <Button>Click me</Button>
      <Link href="/dashboard">Go to dashboard</Link>
    </div>
  );
}
