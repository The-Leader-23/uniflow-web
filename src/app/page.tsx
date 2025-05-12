import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="bg-animated-gradient min-h-screen flex flex-col items-center justify-center p-6 text-white transition-all duration-1000">
      <div className="glow-loop-delayed">
        <Image
          src="/UniFlowLogo.png"
          alt="UniFlow Logo"
          width={180}
          height={180}
          className="mb-6 glow-full-cycle"
        />
      </div>
      <h1 className="text-4xl font-bold text-center mb-4">Welcome to UniFlow</h1>
      <p className="text-lg text-center max-w-2xl mb-8">
        An AI-powered education assistant helping students learn smarter,
        apply to universities, and build real skills — without becoming AI-dependent.
      </p>

      <div className="flex flex-wrap gap-4 justify-center">
  <Link href="/highschool">
    <Button className="bg-white/20 text-white border border-white/30 backdrop-blur-md hover:bg-white/30 transition-all duration-300 rounded-xl px-6 py-2">
      High School Student
    </Button>
  </Link>
  <Link href="/tertiary">
    <Button className="bg-white/20 text-white border border-white/30 backdrop-blur-md hover:bg-white/30 transition-all duration-300 rounded-xl px-6 py-2">
      Tertiary Student
    </Button>
  </Link>
  <Link href="/teacher">
    <Button className="bg-white/20 text-white border border-white/30 backdrop-blur-md hover:bg-white/30 transition-all duration-300 rounded-xl px-6 py-2">
      Teacher
    </Button>
  </Link>
</div>
    </main>
  );
}


