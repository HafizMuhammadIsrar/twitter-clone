"use client";
import React, { useState } from "react";
import { FaCog, FaSearch } from "react-icons/fa";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const trendsData = [
  {
    title: "#BBNaija",
    tweets: "274K Tweets",
    details: "Discussion around the Big Brother Naija reality show.",
  },
  {
    title: "#TaylorSwift",
    tweets: "154K Tweets",
    details: "Trending discussions about Taylor Swift's latest album.",
  },
  {
    title: "#Lover",
    tweets: "135K Tweets",
    details: "Fans sharing their love for Taylor Swift's songs.",
  },
  {
    title: "#Dora",
    tweets: "124K Tweets",
    details: "Conversations about the character Dora.",
  },
  {
    title: "#TGIF",
    tweets: "43K Tweets",
    details: "Celebrating the end of the week!",
  },
  {
    title: "#WeekendVibes",
    tweets: "10K Tweets",
    details: "People sharing their weekend activities.",
  },
  {
    title: "#Dora",
    tweets: "124K Tweets",
    details: "Conversations about the character Dora.",
  },
  {
    title: "#Dora",
    tweets: "124K Tweets",
    details: "Conversations about the character Dora.",
  },
  // Add more trends as needed
];

export function TrendAccordion({ title, tweets, details }: any) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="px-4 border-b hover:bg-[#e7f1f5] border-gray-200">
      <div
        className="flex justify-between items-center p-2 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center">
          <span className="font-semibold">{title}</span>
        </div>
        {isOpen ? <FaChevronUp /> : <FaChevronDown />}
      </div>
      {isOpen && <div className="p-2 text-gray-700">{details}</div>}
      <span className="ml-2 text-gray-500">{tweets}</span>
    </div>
  );
}

const Rightbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showAll, setShowAll] = useState(false);

  // Filter trends based on search term
  const filteredTrends = trendsData.filter((trend) =>
    trend.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Display limited trends if showAll is false, otherwise show all
  const displayedTrends = showAll ? filteredTrends : filteredTrends.slice(0, 6);

  return (
    <>
      <div className="flex overflow-scroll card_ h-[90%] flex-col gap-5 px-10 p-3">
        <div className="search relative bg-[#E6ECF0] p-2.5 rounded-[30px]">
          <FaSearch
            color="#808080"
            className="absolute top-[14px] left-[20px]"
          />
          <input
            type="text"
            className="px-[35px] w-full bg-transparent outline-none"
            placeholder="Search Twitter "
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} // Update the search term
          />
        </div>
        <div className="py-2 w-full max-w-md mx-auto bg-[#F5F8FA] rounded-lg shadow-md">
          <div className="flex px-4 justify-between items-center">
            <h2 className="text-xl font-bold">Trends for you</h2>
            <button className="hover:bg-[#c9e6f8] px-3 py-1 w-[40px] h-[40px] rounded-[20px]">
              <FaCog color="#198ED6" />
            </button>
          </div>
          {displayedTrends.length > 0 ? (
            displayedTrends.map((trend, index) => (
              <TrendAccordion
                key={index}
                title={trend.title}
                tweets={trend.tweets}
                details={trend.details}
              />
            ))
          ) : (
            <div className="p-2 text-gray-700">No trends found.</div>
          )}
          {/* Show "See More" button if there are more trends to show */}
          {!showAll && filteredTrends.length > 3 && (
            <button
              className="text-blue-500 font-medium mt-2 px-4 "
              onClick={() => setShowAll(true)}
            >
              See more
            </button>
          )}
        </div>
      </div>
      <div className="footer px-10 p-3 text-[13px] flex gap-3 flex-wrap">
        <a href="#">Terms</a>
        <a href="#">Privacy policy</a>
        <a href="#">Ads info</a>
        <a href="#">More</a>
        <a href="#">© 2020 Twitter, Inc.</a>
      </div>
    </>
  );
};

export default Rightbar;
