import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/5 bg-black/60 backdrop-blur-xl px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link
          href="/"
          className="text-xl font-bold tracking-tighter hover:opacity-80 transition-opacity text-white"
        >
          ASSET<span className="text-zinc-500">CORE</span>
        </Link>

        <div className="flex items-center gap-4">
          <Link href="/login">
            <Button
              variant="ghost"
              className="text-zinc-400 hover:text-white hover:bg-zinc-900"
            >
              Sign In
            </Button>
          </Link>
          <Link href="/sign-up">
            <Button className="bg-white text-black hover:bg-zinc-200 rounded-sm px-6">
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
