import { db } from "@/db";
export default async function Home() {
  const results = await db.query.testing.findMany();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        {results.map((result: any) => (
          <h1 key={result.id}>{result.name}</h1>
        ))}
      </div>
    </main>
  );
}
