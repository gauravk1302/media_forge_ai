"use client";

import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6">
      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-16 items-center">
        {/* Left */}
        <div className="hidden md:block">
          <h1 className="text-5xl font-bold text-white leading-tight">
            Welcome Back to{" "}
            <span className="text-violet-400">MediaForgeAI</span>
          </h1>

          <p className="text-zinc-400 text-lg mt-6">
            Continue managing your media with AI-powered uploads, thumbnails,
            sorting, and content workflows.
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
        <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6 shadow-2xl w-full max-w-md mx-auto overflow-hidden">
          <SignIn
            appearance={{
              elements: {
                rootBox: "w-full",
                main: "w-full",
                card: "bg-transparent shadow-none w-full max-w-full p-0",
                headerTitle: "text-white text-2xl",
                headerSubtitle: "text-zinc-400",
                socialButtonsBlockButton:
                  "bg-zinc-900 border border-zinc-700 text-white hover:bg-zinc-800 w-full",
                socialButtonsBlockButtonText: "text-white",
                formFieldLabel: "text-zinc-300",
                formFieldInput:
                  "bg-zinc-900 border border-zinc-700 text-white placeholder:text-zinc-500 w-full",
                formButtonPrimary: "bg-violet-600 hover:bg-violet-500 w-full",
                footerActionText: "text-zinc-400",
                footerActionLink: "text-violet-400 hover:text-violet-300",
                identityPreviewText: "text-white",
                identityPreviewEditButton: "text-violet-400",
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}