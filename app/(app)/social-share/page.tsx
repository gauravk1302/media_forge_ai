"use client";

import React, { useState, useEffect, useRef } from "react";
import { CldImage } from "next-cloudinary";

const socialFormats = {
  "Instagram Square (1:1)": {
    width: 1080,
    height: 1080,
    aspectRatio: "1:1",
  },
  "Instagram Portrait (4:5)": {
    width: 1080,
    height: 1350,
    aspectRatio: "4:5",
  },
  "Twitter Post (16:9)": {
    width: 1200,
    height: 675,
    aspectRatio: "16:9",
  },
  "Twitter Header (3:1)": {
    width: 1500,
    height: 500,
    aspectRatio: "3:1",
  },
  "Facebook Cover (205:78)": {
    width: 820,
    height: 312,
    aspectRatio: "205:78",
  },
};

type SocialFormat = keyof typeof socialFormats;

export default function SocialShare() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [selectedFormat, setSelectedFormat] = useState<SocialFormat>(
    "Instagram Square (1:1)",
  );
  const [isUploading, setIsUploading] = useState(false);
  const [isTransforming, setIsTransforming] = useState(false);

  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (uploadedImage) {
      setIsTransforming(true);
    }
  }, [selectedFormat, uploadedImage]);

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/image-upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.log("Upload API Error:", errorText);
        throw new Error(errorText);
      }

      const data = await response.json();
      setUploadedImage(data.publicId);
    } catch (error) {
      console.log(error);
      alert("Failed to upload image");
    } finally {
      setIsUploading(false);
    }
  };

  const handleDownload = async () => {
    if (!imageRef.current) return;

    const response = await fetch(imageRef.current.src);
    const blob = await response.blob();

    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = `${selectedFormat.replace(/\s+/g, "_").toLowerCase()}.png`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="grid lg:grid-cols-2 gap-10">
          {/* Upload Section */}
          <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-8">
            <h2 className="text-2xl font-semibold mb-6">Upload Your Image</h2>

            <label className="block">
              <span className="text-zinc-300 mb-3 block">
                Choose image file
              </span>

              <input
                type="file"
                onChange={handleFileUpload}
                className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-violet-600 file:text-white hover:file:bg-violet-700"
              />
            </label>

            {isUploading && (
              <div className="mt-6">
                <div className="w-full h-3 bg-zinc-800 rounded-full overflow-hidden">
                  <div className="h-full bg-violet-500 animate-pulse w-2/3"></div>
                </div>
                <p className="text-zinc-400 mt-3">Uploading image...</p>
              </div>
            )}

            <div className="mt-10 grid grid-cols-2 gap-4">
              {[
                "📸 Instagram Ready",
                "🐦 Twitter Formats",
                "📘 Facebook Covers",
                "⚡ Instant Resize",
              ].map((item) => (
                <div
                  key={item}
                  className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4"
                >
                  <p className="font-medium">{item}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Preview Section */}
          <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-8">
            {!uploadedImage ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-20">
                <div className="w-24 h-24 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-4xl mb-6">
                  🖼
                </div>

                <h3 className="text-2xl font-semibold">No Image Uploaded</h3>

                <p className="text-zinc-400 mt-3 max-w-sm">
                  Upload an image to generate optimized social media versions.
                </p>
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-semibold mb-6">
                  Transform & Preview
                </h2>

                <div className="relative mb-8">
                  <select
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 pr-12 py-3 text-white appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-violet-500"
                    value={selectedFormat}
                    onChange={(e) =>
                      setSelectedFormat(e.target.value as SocialFormat)
                    }
                  >
                    {Object.keys(socialFormats).map((format) => (
                      <option key={format} value={format}>
                        {format}
                      </option>
                    ))}
                  </select>

                  <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-zinc-400 text-sm">
                    ▼
                  </div>
                </div>

                <div className="relative flex justify-center bg-zinc-900 rounded-2xl p-4 min-h-[400px] items-center">
                  {isTransforming && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/70 rounded-2xl z-10">
                      <div className="w-14 h-14 border-4 border-zinc-700 border-t-violet-500 rounded-full animate-spin"></div>
                    </div>
                  )}

                  <CldImage
                    width={socialFormats[selectedFormat].width}
                    height={socialFormats[selectedFormat].height}
                    src={uploadedImage}
                    sizes="100vw"
                    alt="transformed image"
                    crop="fill"
                    aspectRatio={socialFormats[selectedFormat].aspectRatio}
                    gravity="auto"
                    ref={imageRef}
                    onLoad={() => setIsTransforming(false)}
                    className="rounded-2xl max-h-[500px] object-contain"
                  />
                </div>

                <button
                  onClick={handleDownload}
                  className="w-full mt-8 bg-violet-600 hover:bg-violet-700 transition rounded-2xl py-4 font-semibold text-lg"
                >
                  Download {selectedFormat}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
