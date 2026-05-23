"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";

export default function Home() {
  const { user, isLoaded } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && user) {
      router.replace("/home");
    }
  }, [isLoaded, user, router]);

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <h1 className="text-4xl font-bold text-violet-400 animate-pulse">
          Loading...
        </h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navbar */}
      <nav className="border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight">
            MediaForge<span className="text-violet-400">AI</span>
          </h1>

          <div className="flex gap-4">
            <Link
              href="/sign-in"
              className="px-5 py-2 rounded-xl border border-zinc-700 hover:border-violet-500 hover:bg-zinc-900 transition"
            >
              Sign In
            </Link>

            <Link
              href="/sign-up"
              className="px-5 py-2 rounded-xl bg-violet-600 hover:bg-violet-700 transition font-medium"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-block px-4 py-2 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-300 text-sm mb-6">
              AI Powered Media Platform
            </div>

            <h1 className="text-6xl font-bold leading-tight">
              Create, Organize &
              <span className="text-violet-400"> Transform Media</span>
            </h1>

            <p className="text-zinc-400 text-xl mt-6 leading-relaxed">
              Upload photos, generate AI thumbnails, manage videos, and sort
              your media with a fast production-ready workflow.
            </p>

            <div className="flex gap-4 mt-10">
              <Link
                href="/sign-up"
                className="px-8 py-4 rounded-2xl bg-violet-600 hover:bg-violet-700 transition font-semibold"
              >
                Start Free
              </Link>

              <Link
                href="/sign-in"
                className="px-8 py-4 rounded-2xl border border-zinc-700 hover:border-violet-500 hover:bg-zinc-900 transition"
              >
                Sign In
              </Link>
            </div>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-2 gap-6">
            {[
              ["📸", "Photo Upload", "Upload high-quality images instantly"],
              ["🎨", "AI Thumbnails", "Generate thumbnails automatically"],
              ["🎥", "Video Upload", "Upload and manage videos seamlessly"],
              ["🗂", "Smart Sorting", "AI-based content organization"],
            ].map(([icon, title, desc]) => (
              <div
                key={title}
                className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 hover:border-violet-500/40 transition"
              >
                <div className="text-3xl mb-4">{icon}</div>
                <h3 className="text-xl font-semibold">{title}</h3>
                <p className="text-zinc-400 mt-2">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}