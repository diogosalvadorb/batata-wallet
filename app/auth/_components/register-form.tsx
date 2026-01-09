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
import { register } from "@/actions/auth/register";
import { useAction } from "next-safe-action/hooks";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { toast } from "sonner";

export default function RegisterForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const router = useRouter();

  const { execute, status } = useAction(register, {
    onSuccess: (result) => {
      if (result?.data?.message) {
        toast.success(result.data.message);
      } else {
        toast.success("Conta criada com sucesso!");
      }
      // conta criada com sucesso porem não esta sendo redirecionado para a dashboard
      router.push("/dashboard");
      router.refresh();
    },
    onError: ({ error }) => {
      if (error.serverError) {
        toast.error(error.serverError);
      } 
    },
  });

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    execute(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Criar conta</CardTitle>
        <CardDescription>
          Preencha os dados para criar sua conta
        </CardDescription>
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

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Field>
              <FieldLabel>Nome</FieldLabel>
              <FieldContent>
                <Input
                  type="text"
                  name="name"
                  placeholder="Nome completo"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </FieldContent>
            </Field>
          </div>
          <div className="space-y-2">
            <Field>
              <FieldLabel>Email</FieldLabel>
              <FieldContent>
                <Input
                  type="email"
                  name="email"
                  placeholder="seu@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </FieldContent>
            </Field>
          </div>
          <div className="space-y-2">
            <Field>
              <FieldLabel>Senha</FieldLabel>
              <FieldContent>
                <Input
                  type="password"
                  name="password"
                  placeholder="********"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </FieldContent>
            </Field>
          </div>
          <div className="space-y-2">
            <Field>
              <FieldLabel>Confirmar senha</FieldLabel>
              <FieldContent>
                <Input
                  type="password"
                  name="confirmPassword"
                  placeholder="********"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </FieldContent>
            </Field>
          </div>
          <Button
            type="submit"
            className="w-full"
            disabled={status === "executing" || isLoading}
          >
            {status === "executing" ? "Criando conta..." : "Criar conta"}
          </Button>
        </form>
      </CardContent>

      <CardFooter className="flex justify-center">
        <p className="text-muted-foreground text-sm">
          Ao criar uma conta, você concorda com nossos{" "}
          <Link href="#">Termos de Uso</Link>
        </p>
      </CardFooter>
    </Card>
  );
}
