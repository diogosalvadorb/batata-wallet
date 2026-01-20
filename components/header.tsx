import Link from "next/link";
import { Button } from "./ui/button";
import Image from "next/image";

export default function Header() {
  return (
    <header className="border-b border-yellow-500/20 bg-black/50 backdrop-blur-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 bg-linear-to-r from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center">
              <span className="text-black font-bold text-xl">B</span>
            </div>
            <span className="text-xl font-bold bg-linear-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
              Batata Wallet
            </span>
          </Link>

          <div className="flex items-center">
            <Link href="/authentication">
              <Button 
                className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold rounded-full"
              >
                Entrar
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}