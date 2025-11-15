import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="mx-auto max-w-4xl space-y-10">
        <header className="space-y-2">
          <h1 className="text-3xl font-bold text-slate-900">
            Home Page
          </h1>

          <p className="text-slate-700">
            Tailwind + shadcn UI working correctly 🎉
          </p>
        </header>

        {/** FORM TEST */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-slate-900">Form check</h2>

          <div className="space-y-2">
            <p className="text-sm font-medium text-slate-700">Your name:</p>
            <Input placeholder="Enter your name..." className="max-w-sm" />
          </div>

          <Button>Click me</Button>
        </section>

        {/** CARD TEST */}
        <section>
          <Card className="max-w-md">
            <CardHeader>
              <CardTitle>Demo Card</CardTitle>
            </CardHeader>

            <CardContent className="space-y-2">
              <p className="text-slate-700">
                This is a card from shadcn/ui. Everything works 🚀
              </p>

              <div className="flex gap-2">
                <Button size="sm">Small</Button>
                <Button variant="outline">Outline</Button>
              </div>
            </CardContent>
          </Card>
        </section>

        {/** TAILWIND TEST GRID */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-slate-900">
            Tailwind utilities test
          </h2>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-xl bg-white shadow p-4 space-y-2">
              <p className="text-xs uppercase text-slate-500">
                Typography
              </p>
              <p className="text-sm text-slate-600">Small text</p>
              <p className="text-base text-slate-700">Base text</p>
              <p className="text-lg font-semibold text-slate-900">Large text</p>
            </div>

            <div className="rounded-xl bg-white shadow p-4 space-y-2">
              <p className="text-xs uppercase text-slate-500">
                Spacing & background
              </p>
              <div className="flex gap-2">
                <div className="h-10 w-10 rounded bg-blue-500" />
                <div className="h-10 w-10 rounded bg-red-500" />
                <div className="h-10 w-10 rounded bg-green-500" />
              </div>
            </div>

            <div className="rounded-xl bg-slate-900 shadow p-4 text-slate-100 space-y-2">
              <p className="text-xs uppercase text-slate-300">Dark surface</p>
              <p className="text-sm">Testing contrast and padding</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
