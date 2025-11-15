import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-100">
      <div className="mx-auto max-w-5xl px-4 py-8 space-y-8">
        <h1 className="text-3xl font-bold text-slate-900">
          Home Page
        </h1>

        <p className="text-slate-700">
          Tailwind + Shadcn UI working correctly 🎉
        </p>

        <div className="space-y-2">
          <p className="text-sm font-medium text-slate-700">Your name:</p>
          <Input placeholder="Enter your name..." className="max-w-sm" />
        </div>

        <Button>
          Click me
        </Button>

        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>Demo Card</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-slate-700">
              This is a card from shadcn/ui. Everything is configured properly 🚀
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
