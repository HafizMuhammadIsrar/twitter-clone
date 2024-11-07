"use client";
import React, { useState } from "react";
import Image from "next/image";
import {
  FaRegComment,
  FaRetweet,
  FaHeart,
  FaShare,
  FaUserPlus,
} from "react-icons/fa";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import profile from "@/images/profile.png";

export const WhoToFollow = () => {
  // Initialize suggested users with follow status
  const [suggestedUsers, setSuggestedUsers] = useState([
    {
      id: 1,
      name: "Linda Shelton #BlackLivesMatter",
      username: "Linda_shelton",
      profilePic: "https://example.com/linda.jpg",
      bio: "WordPress/PHP Geek, JavaScript Developer, Tools Creator, Always ready to help with code",
      followedBy: "Ellie Jamie and 20 others",
      followed: false, // Track follow status
    },
    {
      id: 2,
      name: "Mark Anderson",
      username: "mark_anderson",
      profilePic: "https://example.com/mark.jpg",
      bio: "Frontend Developer, React Enthusiast, Open-source Contributor",
      followedBy: "Ellie Jamie and 15 others",
      followed: false,
    },
  ]);

  // Handle follow/unfollow action
  const handleFollowToggle = (id: any) => {
    setSuggestedUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === id ? { ...user, followed: !user.followed } : user
      )
    );
  };

  const renderUser = (user: any) => (
    <div
      key={user.id}
      className="flex items-start hover:bg-[#F5F8FA] p-2 border-b border-gray-200"
    >
      <Image
        src={profile}
        alt={user.name}
        className="w-10 mt-4 h-10 rounded-full mr-4"
        width={100}
        height={100}
      />
      <div className="flex-1">
        <div className="flex flex-col">
          <div className="flex items-center mt-1 text-sm text-gray-500">
            <Image
              src="/path-to-icon.jpg"
              alt="Profile icon"
              className="w-4 h-4 rounded-full mr-1"
              width={16}
              height={16}
            />
            <span>{user.followedBy} follow</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-bold">{user.name}</span>
            <button
              onClick={() => handleFollowToggle(user.id)}
              className={`border-[#198ED6] border-[1px] font-semibold rounded-[24px] px-2 p-1 ml-auto flex items-center ${
                user.followed
                  ? "bg-[#198ED6] text-white hover:bg-[#166aa7]"
                  : "text-[#198ED6] hover:bg-[#c9e6f8]"
              }`}
            >
              {user.followed ? (
                "Following"
              ) : (
                <>
                  <FaUserPlus className="mr-1" /> Follow
                </>
              )}
            </button>
          </div>
          <span className="text-gray-500">@{user.username}</span>
          <span>{user.bio}</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="border-t bg-white border-gray-200">
      <h3 className="font-bold text-[19px] border-b px-4 py-2.5">
        Who to follow
      </h3>
      {suggestedUsers.slice(0, 3).map(renderUser)}
      <button className="text-blue-500 text-center w-full font-medium mt-2">
        See all suggestions
      </button>
    </div>
  );
};

export const TwitterPost = ({
  profilePic,
  name,
  username,
  time,
  content,
  comments,
  likes,
  shares,
  image,
}: any) => {
  // Local state to track likes and whether the post is liked
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(likes);

  // Toggle like status
  const handleLikeToggle = () => {
    if (liked) {
      setLikesCount(likesCount - 1);
    } else {
      setLikesCount(likesCount + 1);
    }
    setLiked(!liked);
  };

  return (
    <div className="flex p-4 border-b bg-white hover:bg-[#F5F8FA]  border-gray-200 max-w-full">
      {/* Profile Picture */}
      <Image
        width={100}
        height={100}
        src={profilePic}
        alt="Profile"
        className="w-12 h-12 rounded-full mr-4"
      />

      {/* Post Content */}
      <div className="flex-1">
        {/* Name and Time */}
        <div className="flex items-center">
          <span className="font-bold">{name}</span>
          <span className="text-gray-500 ml-2">@{username}</span>
          <span className="text-gray-500 mx-2">·</span>
          <span className="text-gray-500">{time}</span>
        </div>

        {/* Post Text */}
        <p className="my-2 text-gray-800">{content}</p>

        {/* Optional Image */}
        {image && (
          <Image
            src={image}
            width={100}
            height={100}
            alt="Post"
            className="my-2 rounded-lg max-h-80 object-cover w-full"
          />
        )}

        {/* Actions: Comments, Likes, Shares */}
        <div className="flex justify-around mt-2 text-gray-500">
          <button className="flex items-center hover:text-blue-500">
            <FaRegComment className="mr-1" />
            {comments}
          </button>
          <button className="flex items-center hover:text-green-500">
            <FaRetweet className="mr-1" />
            {shares}
          </button>
          <button
            onClick={handleLikeToggle}
            className={`flex items-center ${liked ? "text-red-500" : ""}`}
          >
            <FaHeart className="mr-1" />
            {likesCount}
          </button>
          <button className="flex items-center hover:text-blue-500">
            <FaShare className="mr-1" />
          </button>
        </div>
      </div>
    </div>
  );
};

const Posts = () => {
  const getTimeDifference = (timestamp: string) => {
    const postTime = new Date(timestamp);
    const now = new Date();
    const differenceInMs = now.getTime() - postTime.getTime();

    // Calculate time differences in seconds, minutes, and hours
    const seconds = Math.floor(differenceInMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);

    if (seconds < 60) return "just now";
    if (minutes < 60) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`;

    // If more than 24 hours, return the time in HH:mm format
    return postTime.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };
  const posts = useSelector((state: RootState) =>
    state.posts.posts.map((post) => ({
      ...post,
      timeString: getTimeDifference(post.timestamp),
    }))
  );

  return (
    <div>
      <div className="posts    ">
        {/* <div classN
        ame="post flex items-start ">
          <div className="profile px-5 ">
            <div className="img  w-[46px] h-[46px] rounded-[50%] bg-slate-300 ">
              <Image
                src={profile}
                width={100}
                height={100}
                alt="img"
                className="  rounded-[50%] "
              />
            </div>
          </div>
          <div className="content">sdldkfls</div>
        </div> */}
        {posts.map((item, index) => (
          <div key={index}>
            <TwitterPost
              profilePic={profile}
              name="John Doe"
              username="johndoe"
              time={item.timeString}
              content={item.content}
              comments={24}
              likes={150}
              shares={12}
              image={item.image}
            />
          </div>
        ))}
        <div className=" h-3 "></div>
        <WhoToFollow />
      </div>
    </div>
  );
};

export default Posts;
