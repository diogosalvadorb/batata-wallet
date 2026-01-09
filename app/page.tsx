import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Header />
      <h1>Hello World</h1>
      <Button >Click me</Button>
      <Link href="/dashboard">Go to dashboard</Link>
    </div>
  );
}
