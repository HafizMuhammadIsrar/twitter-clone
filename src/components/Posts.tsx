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
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import profile from "@/images/profile.png";
import { addComment } from "@/redux/slices/postsSlice";

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
  postId,
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
  const dispatch = useDispatch();
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(likes);
  const [commentText, setCommentText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLikeToggle = () => {
    setLikesCount(liked ? likesCount - 1 : likesCount + 1);
    setLiked(!liked);
  };

  const handleCommentSubmit = () => {
    if (commentText.trim()) {
      dispatch(
        addComment({
          postId,
          comment: {
            id: Date.now(),
            text: commentText,
            author: username,
            timestamp: new Date().toISOString(),
          },
        })
      );
      setCommentText("");
      setIsModalOpen(false);
    }
  };

  // Close modal when clicking outside
  const handleModalClick = (e: any) => {
    if (e.target.id === "modal-backdrop") {
      setIsModalOpen(false);
    }
  };

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

  return (
    <div className="flex p-4 border-b bg-white hover:bg-[#F5F8FA] border-gray-200 max-w-full">
      {/* Profile Picture */}
      <Image
        src={profilePic}
        width={100}
        height={100}
        alt="Profile"
        className="w-12 h-12 rounded-full mr-4"
      />

      <div className="flex-1">
        {/* Post Header */}
        <div className="flex items-center">
          <span className="font-bold">{name}</span>
          <span className="text-gray-500 ml-2">@{username}</span>
          <span className="text-gray-500 mx-2">·</span>
          <span className="text-gray-500">{time}</span>
        </div>

        {/* Post Content */}
        <p className="my-2 text-gray-800">{content}</p>

        {image && (
          <Image
            src={image}
            width={100}
            height={100}
            alt="Post"
            className="my-2 rounded-lg max-h-80 object-cover w-full"
          />
        )}

        {/* Action Buttons */}
        <div className="flex justify-around mt-2 text-gray-500">
          <button
            className="flex items-center hover:text-blue-500"
            onClick={() => setIsModalOpen(true)}
          >
            <FaRegComment className="mr-1" />
            {comments?.length}
          </button>
          <button className="flex items-center hover:text-green-500">
            <FaRetweet className="mr-1" />
            {shares}
          </button>
          <button
            onClick={handleLikeToggle}
            className={`flex items-center hover:text-red-500 ${
              liked ? "text-red-500" : ""
            }`}
          >
            <FaHeart className="mr-1" />
            {likesCount}
          </button>
          <button className="flex items-center hover:text-blue-500">
            <FaShare className="mr-1" />
          </button>
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div
            id="modal-backdrop"
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={handleModalClick}
          >
            <div className="bg-white rounded-lg w-full max-w-lg mx-4 p-6">
              {/* Modal Header */}
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">Comments</h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>

              {/* Comments List */}
              <div className="max-h-64 overflow-y-auto mb-4">
                {comments.map((comment: any) => (
                  <div
                    key={comment.id}
                    className="p-3 bg-gray-50 rounded-lg mb-2"
                  >
                    <div className="flex items-center gap-3 ">
                      <div className="font-semibold">@{comment.author}</div>
                      <div className="font-semibold">
                        {getTimeDifference(comment.timestamp)}
                      </div>
                    </div>
                    <div className="text-gray-600">{comment.text}</div>
                  </div>
                ))}
              </div>

              {/* Comment Input */}
              <textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Write your comment..."
                className="w-full p-2 border border-gray-300 rounded-lg mb-4 min-h-[100px] focus:outline-none focus:border-blue-500"
              />

              {/* Action Buttons */}
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCommentSubmit}
                  disabled={!commentText.trim()}
                  className={`px-4 py-2 bg-blue-500 text-white rounded-lg ${
                    commentText.trim()
                      ? "hover:bg-blue-600"
                      : "opacity-50 cursor-not-allowed"
                  }`}
                >
                  Comment
                </button>
              </div>
            </div>
          </div>
        )}
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

  console.log(posts);

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
              comments={item.comments}
              likes={0}
              shares={0}
              image={item.image}
              postId={item.id}
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
