import Header from "@/components/header";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ArrowRightIcon,
} from "lucide-react";

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session?.user) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen bg-black">
      <Header />
      <section className="container mx-auto px-4 pt-20 pb-32 md:pt-32 md:pb-40">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="mb-6 bg-linear-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-5xl font-bold text-transparent md:text-7xl">
            Controle Financeiro
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-xl text-gray-400 md:text-2xl">
            Gerencie suas finanças de forma simples e eficiente. Visualize seus
            gastos, acompanhe investimentos e alcance seus objetivos.
          </p>
          <div className="flex items-center justify-center">
            <Button
              asChild
              size="lg"
              className="rounded-full bg-yellow-500 px-8 py-6 text-lg font-bold text-black hover:bg-yellow-600"
            >
              <Link href="/authentication?tab=register">
                Começar Agora
                <ArrowRightIcon className="ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
