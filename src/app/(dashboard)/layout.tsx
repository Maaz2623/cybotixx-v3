import Dock from "@/components/dock";
import PageHeader from "@/components/page-header";
import { Separator } from "@/components/ui/separator";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="w-full flex justify-center items-center pt-5 pb-20">
      <div className="md:w-1/2 w-full ">
        <PageHeader />
        <Separator className="mt-5 w-full" />
        {children}
      </div>
      <Dock />
    </main>
  );
}
