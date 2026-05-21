export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-foreground mb-4">
          EPA Digital Full Stack
        </h1>
        <p className="text-lg text-muted-foreground mb-8">
          NextJS + Go fullstack template
        </p>
        <div className="space-y-2 text-left inline-block">
          <p className="text-sm text-muted-foreground">
            ✅ Read CLAUDE.md for architecture guide
          </p>
          <p className="text-sm text-muted-foreground">
            ✅ Check src/app for page structure
          </p>
          <p className="text-sm text-muted-foreground">
            ✅ Check server/ for business logic
          </p>
        </div>
      </div>
    </main>
  )
}
