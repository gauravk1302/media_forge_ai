"use client";

import { SignUp } from "@clerk/nextjs";

const features = [
  "📸 Photo Upload",
  "🎨 AI Thumbnail",
  "🎥 Video Upload",
  "🗂 Smart Sorting",
];

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
            Create a powerful AI-driven media workflow for uploading,
            generating, and organizing content.
          </p>

          <div className="grid grid-cols-2 gap-5 mt-10">
            {features.map((item) => (
              <div
                key={item}
                className="bg-[#151821] border border-zinc-800 rounded-2xl p-5 hover:border-violet-500/40 transition"
              >
                <h3 className="text-white font-semibold">{item}</h3>
              </div>
            ))}
          </div>
        </div>

        {/* Clerk */}
        <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6 shadow-2xl w-full max-w-md mx-auto overflow-hidden">
          <SignUp
            appearance={{
              elements: {
                rootBox: "w-full",
                main: "w-full",
                card: "bg-transparent shadow-none w-full max-w-full p-0",
                headerTitle: "text-white text-2xl",
                headerSubtitle: "text-zinc-400 mb-4",
                socialButtonsBlockButton:
                  "bg-[#151821] border border-zinc-800 text-white hover:bg-[#1b1f2a] w-full",
                socialButtonsBlockButtonText: "text-white",
                socialButtonsBlock: "mb-5",
                dividerLine: "bg-zinc-800",
                dividerText: "text-zinc-500",
                formFieldLabel: "text-zinc-300",
                formFieldInput:
                  "bg-[#151821] border border-zinc-800 text-white placeholder:text-zinc-500 w-full",
                formButtonPrimary:
                  "bg-black border border-zinc-700 text-white hover:bg-zinc-900 w-full mt-4",
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