"use client";

import { useEffect } from "react";

export function PerformanceGuard() {
  useEffect(() => {
    if (typeof performance === "undefined" || typeof performance.measure !== "function") {
      return;
    }

    const originalMeasure = performance.measure.bind(performance);

    performance.measure = (...args) => {
      try {
        return originalMeasure(...(args as Parameters<typeof originalMeasure>));
      } catch (error) {
        if (
          error instanceof DOMException &&
          error.name === "InvalidStateError" &&
          typeof error.message === "string" &&
          error.message.toLowerCase().includes("negative time stamp")
        ) {
          if (process.env.NODE_ENV !== "production") {
            console.warn("Performance measurement ignored:", error.message);
          }
          return undefined;
        }
        throw error;
      }
    };

    return () => {
      performance.measure = originalMeasure;
    };
  }, []);

  return null;
}
