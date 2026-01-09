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

import Link from "next/link";
import { FcGoogle } from "react-icons/fc";

export default function RegisterForm() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Criar conta</CardTitle>
        <CardDescription>
          Preencha os dados para criar sua conta
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <Button className="w-full" variant="outline">
          <FcGoogle className="mr-2 h-4 w-4" />
          Continuar com Google
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
              <FieldLabel>Nome</FieldLabel>
              <FieldContent>
                <Input type="text" placeholder="Nome completo" />
              </FieldContent>
            </Field>
          </div>
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
          <div className="space-y-2">
            <Field>
              <FieldLabel>Confirmar senha</FieldLabel>
              <FieldContent>
                <Input type="password" placeholder="********" />
              </FieldContent>
            </Field>
          </div>
          <Button type="submit" className="w-full">
            Criar conta
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
