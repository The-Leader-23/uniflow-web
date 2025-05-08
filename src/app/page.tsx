import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
      <p className="text-lg text-center max-w-2xl mb-6">
        UniFlow is an AI-powered education platform created to bridge the gap between high school and university. We support students, teachers, and school admins with smart tools for learning, teaching, and school management.
      </p>

      <Card className="w-full max-w-md shadow-xl bg-black/30 text-white backdrop-blur-sm border border-white/20">
        <CardContent className="p-6 text-center">
          <h2 className="text-2xl font-semibold mb-2">Why UniFlow Exists</h2>
          <p className="mb-4 text-sm">
            "In my first year of university, I realized something sad but true — many of the students who thrived came from private schools. Those of us from public schools struggled with the pace, the pressure, and the lack of support. I built UniFlow to change that."
          </p>
        </CardContent>
      </Card>

      <div className="mt-10 flex flex-col gap-4">
        <Link href="/highschool">
          <Button>High School Student</Button>
        </Link>
        <Link href="/teacher">
          <Button variant="outline">Teacher Dashboard</Button>
        </Link>
        <Link href="/admin">
          <Button variant="ghost">Admin Panel</Button>
        </Link>
      </div>
    </main>
  );
}

