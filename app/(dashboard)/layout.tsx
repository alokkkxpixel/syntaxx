// app/(dashboard)/layout.tsx
import DashLayout from "@/components/DashBoard-layout";
import { getTechs } from "@/lib/action/TechAction";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const techs = await getTechs();
  

  return (
    <DashLayout techs={techs}>
      {children}
    </DashLayout>
  );
}