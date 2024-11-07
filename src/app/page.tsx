"use client";
import { useRouter } from "next/navigation";

export default function Home() {
  const route = useRouter();

  return (
    <div className="flex font-custom    flex-col items-center gap-6 min-h-screen p-8 pb-20  sm:p-20 ]">
      Home Page{" "}
      <button
        onClick={() => {
          route.push("/dashboard");
        }}
      >
        Click here to Go dashboard
      </button>
    </div>
  );
}
