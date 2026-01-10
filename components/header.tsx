import Link from "next/link";
import { Button } from "./ui/button";

export default function Header() {
  return (
    <header className="bg-background min-h-screen">
      <div className="container mx-auto flex items-center justify-between">
        <div>
          <span className="text-2xl font-bold">Batata Wallet</span>
        </div>

        <Link href="/authentication">
          <Button variant="primary">
            Entrar
          </Button>
        </Link>
      </div>
    </header>
  );
}