"use client";

import { useEffect, useMemo, useState } from "react";

interface HeroTypewriterProps {
  phrases: string[];
  typingSpeed?: number;
  pauseDuration?: number;
}

export function HeroTypewriter({
  phrases,
  typingSpeed = 85,
  pauseDuration = 1600,
}: HeroTypewriterProps) {
  const safePhrases = useMemo(() => (phrases.length ? phrases : ["Isère"]), [phrases]);
  const [index, setIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentPhrase = safePhrases[index % safePhrases.length];
    let timer: ReturnType<typeof setTimeout> | undefined;

    if (!isDeleting && displayed === currentPhrase) {
      timer = setTimeout(() => setIsDeleting(true), pauseDuration);
    } else if (isDeleting && displayed === "") {
      timer = setTimeout(() => {
        setIsDeleting(false);
        setIndex((prev) => (prev + 1) % safePhrases.length);
      }, typingSpeed);
    } else {
      timer = setTimeout(() => {
        const nextValue = isDeleting
          ? currentPhrase.slice(0, Math.max(0, displayed.length - 1))
          : currentPhrase.slice(0, displayed.length + 1);
        setDisplayed(nextValue);
      }, isDeleting ? typingSpeed / 1.5 : typingSpeed);
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [displayed, index, isDeleting, pauseDuration, safePhrases, typingSpeed]);

  return (
    <span className="relative inline-block pr-4 font-semibold text-white" aria-live="polite">
      {displayed}
      <span
        className="absolute inset-y-0 right-0 w-[2px] animate-pulse bg-white"
        aria-hidden="true"
      />
    </span>
  );
}
