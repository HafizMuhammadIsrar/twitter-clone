import Header from "@/components/Header";
import Posts from "@/components/Posts";

// app/dashboard/page.tsx
export default function DashboardPage() {
  return (
    <section className=" font-custom  overflow-auto   test_ ">
      <Header />
      <p className="h-3"></p>
      <Posts />
    </section>
  );
}
