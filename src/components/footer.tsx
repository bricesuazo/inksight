import { Lightbulb } from "lucide-react";

export default function Footer() {
  return (
    <footer className="flex justify-center border-t">
      <div className="container mx-auto flex max-w-screen-lg flex-col items-center gap-1 p-4 text-orange-800">
        <Lightbulb />
        <p>InkSight</p>
      </div>
    </footer>
  );
}
