"use client";

import { Share2, Check } from "lucide-react";
import { useState } from "react";

interface ShareButtonProps {
  shareUrl: string;
  shareLabel: string;
  copiedLabel: string;
}

export function ShareButton({
  shareUrl,
  shareLabel,
  copiedLabel,
}: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    if (!shareUrl || shareUrl.trim() === "") {
      return;
    }

    const canUseWebShare =
      typeof navigator.share === "function" &&
      (window.location.protocol === "https:" ||
        window.location.hostname === "localhost" ||
        window.location.hostname === "127.0.0.1");

    if (canUseWebShare) {
      try {
        await navigator.share({
          title: "Are We Done Yet?",
          text: "Partage mon timer de cours !",
          url: shareUrl,
        });
      } catch (err: any) {
        if (err.name === "AbortError") {
          return;
        }
      }
    }

    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = shareUrl;
        textArea.style.position = "fixed";
        textArea.style.left = "-999999px";
        textArea.style.top = "0";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
          const successful = document.execCommand("copy");
          if (successful) {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
          }
        } finally {
          document.body.removeChild(textArea);
        }
      }
    } catch (err) {
      // Silent fail
    }
  };

  return (
    <button
      type="button"
      onClick={handleShare}
      className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-3xl border-3 border-black dark:border-gray-600 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.08)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.16)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all font-nunito font-semibold text-sm cursor-pointer text-gray-900 dark:text-gray-100"
      aria-label={shareLabel}
    >
      {copied ? (
        <>
          <Check className="w-4 h-4 text-gray-900 dark:text-gray-100" />
          <span>{copiedLabel}</span>
        </>
      ) : (
        <>
          <Share2 className="w-4 h-4 text-gray-900 dark:text-gray-100" />
          <span>{shareLabel}</span>
        </>
      )}
    </button>
  );
}
