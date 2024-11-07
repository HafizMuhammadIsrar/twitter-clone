"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import profile from "@/images/profile.png";
import {
  FaHome,
  FaTwitter,
  FaBell,
  FaEnvelope,
  FaBookmark,
  FaList,
  FaUser,
  FaSearch,
  FaEllipsisH,
} from "react-icons/fa";

const sidebarItems = [
  { href: "/dashboard", label: "Home", icon: <FaHome /> },
  { href: "/dashboard/explore", label: "Explore", icon: <FaSearch /> },
  {
    href: "/dashboard/notifications",
    label: "Notifications",
    icon: <FaBell />,
  },
  { href: "/dashboard/messages", label: "Messages", icon: <FaEnvelope /> },
  { href: "/dashboard/bookmarks", label: "Bookmarks", icon: <FaBookmark /> },
  { href: "/dashboard/lists", label: "Lists", icon: <FaList /> },
  { href: "/dashboard/profile", label: "Profile", icon: <FaUser /> },
  { href: "/dashboard/more", label: "More", icon: <FaEllipsisH /> },
];

export default function Sidebar() {
  const [selectedTab, setSelectedTab] = useState("/dashboard");

  return (
    <aside className="w-[300px] min-h-screen  border-r-[1px]   flex flex-col gap-3 items-center p-5 px-10">
      <div className="icon w-full text-left px-9 ">
        <FaTwitter color="#198ED6" size="30px" />
      </div>
      <nav className=" px-6  w-full">
        {sidebarItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setSelectedTab(item.href)} // Set selected tab on click
            className={`flex text-[19px] items-center font-semibold p-3 hover:bg-[#c9e6f8] hover:text-[#198ED6] rounded-[30px] transition-colors duration-200 ${
              selectedTab === item.href ? "text-[#198ED6] " : "text-black"
            }`}
          >
            {item.icon} <span className="ml-2">{item.label}</span>
          </Link>
        ))}
      </nav>
      <div className="  flex flex-col gap-1">
        <button
          className={`flex items-center !justify-center font-bold p-[10px] bg-[#198ED6] w-full text-center rounded-[30px]  text-white  
            `}
        >
          Tweet
        </button>
        <div className="flex py-1 p-4  hover:bg-[#c9e6f8] rounded-[36px]   max-w-full">
          {/* Profile Picture */}
          <Image
            width={100}
            height={100}
            src={profile}
            alt="Profile"
            className="w-12 h-12 rounded-full bg-slate-200 mr-2"
          />

          {/* Post Content */}
          <div className="flex-1">
            {/* Name and Time */}
            <div className="flex flex-col items-start justify-start">
              <span className="font-bold">David Herbert</span>
              <span className="text-gray-500 ">@king.david</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
