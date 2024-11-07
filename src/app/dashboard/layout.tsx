// app/dashboard/layout.tsx
import Rightbar from "@/components/Rightbar";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen font-custom ">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex ">
        <div className="w-[60%] flex flex-col">
          {/* Topbar */}
          <Topbar />

          {/* Main Section */}
          <main className="flex-1 bg-slate-200  ">{children}</main>
        </div>
        <div className=" w-[40%] h-screen  flex flex-col border-l-[1px] ">
          {/* Topbar */}
          <Rightbar />
        </div>
      </div>
    </div>
  );
}
