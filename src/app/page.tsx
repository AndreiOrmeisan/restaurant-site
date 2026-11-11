export default function Home() {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  const destination = basePath ? `${basePath}/forno/` : "/forno";

  return (
    <>
      <meta httpEquiv="refresh" content={`0;url=${destination}`} />
      <main className="p-6">
        <a className="underline" href={destination}>Deschide meniul FORNO</a>
      </main>
    </>
  );
}
