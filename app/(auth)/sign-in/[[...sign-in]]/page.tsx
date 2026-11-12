"use client";

import { SignIn } from "@clerk/nextjs";

const features = [
  "📸 Photo Upload",
  "🎨 AI Thumbnail",
  "🎥 Video Upload",
  "🗂 Smart Sorting",
];

export default function Page() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 sm:px-6 py-10">
      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Left Section */}
        <div className="hidden md:block">
          <h1 className="text-4xl lg:text-5xl font-bold text-white leading-tight">
            Welcome Back to{" "}
            <span className="text-violet-400">MediaForgeAI</span>
          </h1>

          <p className="text-zinc-400 text-lg mt-6">
            Continue managing your media with AI-powered uploads, thumbnails,
            sorting, and content workflows.
          </p>

          <div className="grid grid-cols-2 gap-4 mt-10">
            {features.map((item) => (
              <div
                key={item}
                className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-5 hover:border-violet-500/40 transition"
              >
                <h3 className="text-white font-semibold">{item}</h3>
              </div>
            ))}
          </div>
        </div>

        {/* Right Section (Clerk SignIn) */}
        <div className="w-full max-w-md mx-auto flex justify-center">
          <SignIn
            routing="path"
            path="/sign-in"
            signUpUrl="/sign-up"
            fallbackRedirectUrl="/home"
            appearance={{
              variables: {
                colorPrimary: "#7c3aed",
                colorBackground: "#09090b",
                colorForeground: "#ffffff",
                colorMutedForeground: "#a1a1aa",
                colorInput: "#18181b",
                colorInputForeground: "#ffffff",
                borderRadius: "1rem",
              },
              elements: {
                rootBox: "w-full",
                cardBox:
                  "w-full shadow-2xl border border-zinc-800 rounded-3xl bg-zinc-950",
                card: "bg-zinc-950 shadow-none w-full p-6 sm:p-8",
                headerTitle: "text-white text-2xl font-bold",
                headerSubtitle: "text-zinc-400",
                socialButtonsBlockButton:
                  "!bg-zinc-900 !border !border-zinc-700 !text-white hover:!bg-zinc-800 transition",
                socialButtonsBlockButtonText: "!text-white font-medium",
                dividerLine: "!bg-zinc-800",
                dividerText: "!text-zinc-500",
                formFieldLabel: "!text-zinc-300",
                formFieldInput:
                  "!bg-zinc-900 !border !border-zinc-700 !text-white placeholder:!text-zinc-500 focus:!border-violet-500",
                formButtonPrimary:
                  "!bg-violet-600 hover:!bg-violet-500 !text-white !shadow-none transition",
                footer: "!bg-zinc-950 border-t border-zinc-800/80",
                footerActionText: "!text-zinc-400",
                footerActionLink: "!text-violet-400 hover:!text-violet-300",
                identityPreviewText: "!text-white",
                identityPreviewEditButton: "!text-violet-400",
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}