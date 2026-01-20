import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, GalleryVerticalEnd } from "lucide-react";
import Link from "next/link";
import LoginForm from "./components/login-form";
import RegisterForm from "./components/register-form";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

interface AuthPageProps {
  searchParams: Promise<{ tab?: string }>;
}

export default async function Auth({ searchParams }: AuthPageProps) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session?.user) {
    redirect("/dashboard");
  }

  const { tab } = await searchParams;
  const defaultTab = tab === "register" ? "register" : "login";

  return (
    <div className="bg-background flex min-h-screen justify-center pt-8 md:pt-16">
      <div className="w-full max-w-md px-4">
        <div className="mb-8 text-center">
          <Link href="/">
            <h1 className="text-4xl font-bold">Batata Wallet</h1>
          </Link>
          <p className="text-muted-foreground mt-2 text-sm">
            Entre ou crie sua conta para continuar
          </p>
        </div>

        <Tabs defaultValue={defaultTab} className="w-full">
          <TabsList className="mb-6 grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <LoginForm />
          </TabsContent>
          <TabsContent value="register">
            <RegisterForm />
          </TabsContent>
        </Tabs>

        <Link href="/">
          <Button variant="link" className="w-full">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar para a página inicial
          </Button>
        </Link>
      </div>
    </div>
  );
}
