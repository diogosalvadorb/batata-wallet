"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldContent, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { toast } from "sonner";

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    const { data, error } = await authClient.signIn.social({
      provider: "google",
      callbackURL: "/dashboard",
    });
    if (error) {
      toast.error(error.message);
      setIsLoading(false);
      return;
    }
    if (data) {
      router.refresh();
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Entrar na conta</CardTitle>
        <CardDescription>Entre com seu email e senha</CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <Button
          className="w-full"
          variant="outline"
          onClick={handleGoogleLogin}
          disabled={isLoading}
        >
          <FcGoogle className="mr-2 h-4 w-4" />
          {isLoading ? "Carregando..." : "Continuar com Google"}
        </Button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card text-muted-foreground px-2">Ou</span>
          </div>
        </div>

        <form className="space-y-4">
          <div className="space-y-2">
            <Field>
              <FieldLabel>Email</FieldLabel>
              <FieldContent>
                <Input type="email" placeholder="seu@email.com" />
              </FieldContent>
            </Field>
          </div>
          <div className="space-y-2">
            <Field>
              <FieldLabel>Senha</FieldLabel>
              <FieldContent>
              <Input type="password" placeholder="********" />
              </FieldContent>
            </Field>
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Entrando..." : "Entrar"}
          </Button>
        </form>
      </CardContent>

      <CardFooter className="flex justify-center">
        <p className="text-muted-foreground text-sm">
          Esqueceu sua senha? <Link href="#">Recuperar senha</Link>
        </p>
      </CardFooter>
    </Card>
  );
}
