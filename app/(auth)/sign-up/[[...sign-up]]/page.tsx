"use client";

import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6">
      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-16 items-center">
        {/* Left */}
        <div className="hidden md:block">
          <h1 className="text-5xl font-bold text-white leading-tight">
            Join <span className="text-violet-400">MediaForgeAI</span>
          </h1>

          <p className="text-zinc-400 text-lg mt-6">
            Create a powerful AI-driven media workflow for uploading, generating,
            and organizing content.
          </p>

          <div className="grid grid-cols-2 gap-5 mt-10">
            {[
              "📸 Photo Upload",
              "🎨 AI Thumbnail",
              "🎥 Video Upload",
              "🗂 Smart Sorting",
            ].map((item) => (
              <div
                key={item}
                className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 hover:border-violet-500/40 transition"
              >
                <h3 className="text-white font-semibold">{item}</h3>
              </div>
            ))}
          </div>
        </div>

        {/* Clerk */}
        <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6 shadow-2xl">
          <SignUp
            appearance={{
              elements: {
                card: "bg-transparent shadow-none",
                headerTitle: "text-white text-2xl",
                headerSubtitle: "text-zinc-400",
                socialButtonsBlockButton:
                  "bg-zinc-900 border border-zinc-700 text-white hover:bg-zinc-800",
                socialButtonsBlockButtonText: "text-white",
                formFieldLabel: "text-zinc-300",
                formFieldInput:
                  "bg-zinc-900 border border-zinc-700 text-white placeholder:text-zinc-500",
                footerActionText: "text-zinc-400",
                footerActionLink: "text-violet-400 hover:text-violet-300",
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}