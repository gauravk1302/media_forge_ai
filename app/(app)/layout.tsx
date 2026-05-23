"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useClerk, useUser } from "@clerk/nextjs";
import {
  LogOutIcon,
  MenuIcon,
  LayoutDashboardIcon,
  Share2Icon,
  UploadIcon,
  SparklesIcon,
  XIcon,
} from "lucide-react";

const sidebarItems = [
  { href: "/home", icon: LayoutDashboardIcon, label: "Dashboard" },
  { href: "/social-share", icon: Share2Icon, label: "Social Share" },
  { href: "/video-upload", icon: UploadIcon, label: "Video Upload" },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const pathname = usePathname();
  const router = useRouter();

  const clerk = useClerk();
  const { user } = useUser();

  const getPageTitle = () => {
    const currentPage = sidebarItems.find((item) => item.href === pathname);

    return currentPage?.label || "MediaForgeAI";
  };

  const handleSignOut = async () => {
    await clerk.signOut({
      redirectUrl: "/",
    });
  };

  const userEmail = user?.emailAddresses?.[0]?.emailAddress || "";

  const userInitial = userEmail.charAt(0).toUpperCase();

  return (
    <div className="h-screen bg-black text-white flex overflow-hidden">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/70 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:relative top-0 left-0 z-50 h-screen w-72 bg-zinc-950 border-r border-zinc-800 transition-transform duration-300 flex flex-col ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Logo */}
        <div className="h-[102px] flex items-center justify-between px-6 border-b border-zinc-800 shrink-0">
          <button
            onClick={() => router.push("/")}
            className="text-[30px] font-bold tracking-tight"
          >
            MediaForge
            <span className="text-violet-400">AI</span>
          </button>

          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-zinc-400 hover:text-white"
          >
            <XIcon />
          </button>
        </div>

        {/* Nav */}
        <nav className="p-4 flex-1 overflow-y-auto">
          <ul className="space-y-3">
            {sidebarItems.map((item) => {
              const active = pathname === item.href;

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-200 ${
                      active
                        ? "bg-violet-600 text-white shadow-lg shadow-violet-600/20"
                        : "text-zinc-400 hover:bg-zinc-900 hover:text-white"
                    }`}
                  >
                    <item.icon className="w-5 h-5" />

                    <span className="font-medium">{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Bottom */}
        <div className="p-4 border-t border-zinc-800 shrink-0">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 mb-4">
            <div className="flex items-center gap-2 mb-2">
              <SparklesIcon className="w-5 h-5 text-violet-400" />

              <span className="font-semibold">AI Media Tools</span>
            </div>

            <p className="text-sm text-zinc-400">
              Upload, transform & organize media faster.
            </p>
          </div>

          <button
            onClick={handleSignOut}
            className="w-full bg-red-500/10 border border-red-500/20 text-red-300 hover:bg-red-500/20 rounded-2xl py-3 font-medium transition flex items-center justify-center gap-2"
          >
            <LogOutIcon className="w-5 h-5" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Header */}
        <header className="h-[102px] bg-black border-b border-zinc-800 shrink-0">
          <div className="h-full px-8 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden text-zinc-400 hover:text-white"
              >
                <MenuIcon />
              </button>

              <h1 className="text-[30px] font-bold tracking-tight">
                {getPageTitle()}
              </h1>
            </div>

            {user && (
              <div className="flex items-center gap-5">
                <span className="text-zinc-400 hidden md:block max-w-xs truncate">
                  {userEmail}
                </span>

                <div className="w-14 h-14 rounded-full bg-violet-600 flex items-center justify-center font-bold text-white text-xl">
                  {userInitial}
                </div>
              </div>
            )}
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
