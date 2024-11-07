"use client";
import { clearPosts } from "@/redux/slices/postsSlice";
import { FaMagic } from "react-icons/fa";
import { useDispatch } from "react-redux";
export default function Topbar() {
  const dispatch = useDispatch();

  const handleClearPosts = () => {
    console.log("clear");
    dispatch(clearPosts());
  };
  return (
    <header className=" px-4 py-2 border-b-[1px]  flex justify-between items-center">
      <h1 className="text-lg font-bold">Home</h1>
      <div className="space-x-4">
        {/* Add user profile, notifications, etc. */}
        <button
          onClick={handleClearPosts}
          className="hover:bg-[#c9e6f8] px-3 py-1 w-[40px] h-[40px] rounded-[20px]"
        >
          <FaMagic color="#198ED6" />
        </button>
      </div>
    </header>
  );
}
