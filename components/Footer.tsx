"use client";

import { Github } from "lucide-react";

interface FooterProps {
  contributeLabel: string;
}

export function Footer({ contributeLabel }: FooterProps) {
  return (
    <footer className="w-full mt-4 md:mt-6 pb-2 md:pb-3 px-4">
      <div className="max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 text-xs sm:text-sm">
        {/* Built with love */}
        <div className="flex items-center gap-1.5 font-nunito text-gray-700">
          <span>Built with</span>
          <span className="text-pink-500">❤️</span>
          <span>by</span>
          <a
            href="https://github.com/444chak"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-gray-900 hover:text-purple-600 transition-colors underline decoration-1 underline-offset-2"
          >
            444chak
          </a>
        </div>

        {/* Separator */}
        <span className="hidden sm:inline text-gray-400">•</span>

        {/* Contribute link */}
        <a
          href="https://github.com/444chak/are-we-done-yet"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 font-nunito font-semibold text-gray-900 hover:text-purple-600 transition-colors underline decoration-1 underline-offset-2"
        >
          <Github className="w-3.5 h-3.5" />
          <span>{contributeLabel}</span>
        </a>
      </div>
    </footer>
  );
}
