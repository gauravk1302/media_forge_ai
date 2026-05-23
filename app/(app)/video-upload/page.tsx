"use client";

import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { UploadCloud, Video, FileVideo, Sparkles } from "lucide-react";

function VideoUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const router = useRouter();

  const MAX_FILE_SIZE = 70 * 1024 * 1024;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) return;

    if (file.size > MAX_FILE_SIZE) {
      alert("File size too large (Max 70MB)");
      return;
    }

    setIsUploading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("originalSize", file.size.toString());

    try {
      await axios.post("/api/video-upload", formData);
      router.push("/");
    } catch (error) {
      console.log(error);
      alert("Upload failed. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      

      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="grid lg:grid-cols-2 gap-10">
          {/* Left Info Panel */}
          <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-8">
            <div className="w-16 h-16 rounded-2xl bg-violet-600/10 border border-violet-500/20 flex items-center justify-center mb-6">
              <Video className="w-8 h-8 text-violet-400" />
            </div>

            <h2 className="text-3xl font-bold mb-4">
              Upload Your Videos
            </h2>

            <p className="text-zinc-400 text-lg leading-relaxed">
              Upload videos securely, organize content, and manage media with a
              premium AI-powered dashboard.
            </p>

            <div className="grid grid-cols-2 gap-5 mt-10">
              {[
                {
                  icon: <FileVideo className="w-5 h-5 text-violet-400" />,
                  title: "HD Video Support",
                },
                {
                  icon: <UploadCloud className="w-5 h-5 text-violet-400" />,
                  title: "Fast Upload",
                },
                {
                  icon: <Sparkles className="w-5 h-5 text-violet-400" />,
                  title: "AI Processing",
                },
                {
                  icon: <Video className="w-5 h-5 text-violet-400" />,
                  title: "Smart Management",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5"
                >
                  <div className="mb-3">{item.icon}</div>
                  <p className="font-medium">{item.title}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Upload Form */}
          <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-8">
            <h2 className="text-2xl font-semibold mb-8">
              Video Upload Form
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title */}
              <div>
                <label className="block text-zinc-300 mb-3">
                  Video Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-2xl px-5 py-4 text-white placeholder:text-zinc-500 focus:outline-none focus:border-violet-500"
                  placeholder="Enter video title"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-zinc-300 mb-3">
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={5}
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-2xl px-5 py-4 text-white placeholder:text-zinc-500 focus:outline-none focus:border-violet-500 resize-none"
                  placeholder="Write a short description..."
                />
              </div>

              {/* File Upload */}
              <div>
                <label className="block text-zinc-300 mb-3">
                  Video File
                </label>

                <input
                  type="file"
                  accept="video/*"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                  required
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-2xl px-4 py-4 text-white file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:bg-violet-600 file:text-white hover:file:bg-violet-700"
                />

                <p className="text-zinc-500 text-sm mt-3">
                  Maximum upload size: 70MB
                </p>
              </div>

              {/* Upload Progress */}
              {isUploading && (
                <div>
                  <div className="w-full h-3 bg-zinc-800 rounded-full overflow-hidden">
                    <div className="h-full bg-violet-500 animate-pulse w-2/3"></div>
                  </div>
                  <p className="text-zinc-400 mt-3">Uploading your video...</p>
                </div>
              )}

              {/* Button */}
              <button
                type="submit"
                disabled={isUploading}
                className="w-full bg-violet-600 hover:bg-violet-700 disabled:opacity-50 transition rounded-2xl py-4 font-semibold text-lg"
              >
                {isUploading ? "Uploading..." : "Upload Video"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoUpload;