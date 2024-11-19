export default async function PrintableLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen text-black flex justify-center items-start py-20 bg-white">
      {children}
    </main>
  );
}
