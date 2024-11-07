"use client";
import React, { useState } from "react";
import profile from "@/images/profile.png";
import Image from "next/image";
import {
  FaPlusSquare,
  FaRegFile,
  FaSmile,
  FaCalendarCheck,
} from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addPost } from "@/redux/slices/postsSlice";
import EmojiPicker from "emoji-picker-react";

const Header = () => {
  const dispatch = useDispatch();
  const [content, setContent] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handlePost = () => {
    if (!content.trim() && !selectedImage) return; // Prevent empty posts

    const newPost = {
      content,
      image: imagePreview,
      timestamp: new Date().toISOString(),
    };

    dispatch(addPost(newPost));
    setContent(""); // Clear input field
    setSelectedImage(null); // Clear selected image
    setImagePreview(null); // Clear image preview
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file)); // Preview the selected image
    }
  };

  const triggerFileInput = () => {
    document.getElementById("fileInput")?.click();
  };

  const handleEmojiSelect = (emojiObject: any) => {
    setContent(content + emojiObject.emoji);
    setShowEmojiPicker(false);
  };

  return (
    <div className="p-4 bg-white ">
      <div className="flex gap-4 ">
        <div className="img w-[46px] h-[46px] rounded-[50%] bg-slate-300 ">
          <Image
            src={profile}
            width={100}
            height={100}
            alt="img"
            className="rounded-[50%]"
          />
        </div>
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What's happening"
          className="outline-none w-full"
        />
      </div>

      {imagePreview && (
        <div className="mt-4">
          <img
            src={imagePreview}
            alt="Selected"
            className="w-full max-h-60 object-cover rounded-md"
          />
        </div>
      )}

      <div className="flex mt-5 justify-between ">
        <div className="flex ml-12 items-center text-[22px] text-[#198ED6] gap-4 ">
          <FaPlusSquare className="cursor-pointer" onClick={triggerFileInput} />
          <FaRegFile className="cursor-pointer" />
          <FaSmile
            className="cursor-pointer"
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          />
          <FaCalendarCheck className="cursor-pointer" />
        </div>

        <button
          onClick={handlePost}
          className="flex items-center justify-center font-bold px-4 p-2 bg-[#198ED6] text-center rounded-[30px] text-white"
        >
          Tweet
        </button>
      </div>

      {/* Hidden file input field for selecting an image */}
      <input
        type="file"
        id="fileInput"
        accept="image/*"
        onChange={handleImageSelect}
        style={{ display: "none" }}
      />

      {/* Emoji Picker */}
      {showEmojiPicker && (
        <div className="absolute z-10 mt-2">
          <EmojiPicker onEmojiClick={handleEmojiSelect} />
        </div>
      )}
    </div>
  );
};

export default Header;
