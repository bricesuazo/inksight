import { Lightbulb } from "lucide-react";
import Link from "next/link";

export default function Header() {
  return (
    <header className="flex justify-center border-b">
      <Link
        href="/"
        className="container mx-auto flex max-w-screen-lg flex-col items-center gap-1 p-4 text-orange-800"
      >
        <Lightbulb />
        <p>InkSight</p>
      </Link>
    </header>
  );
}
