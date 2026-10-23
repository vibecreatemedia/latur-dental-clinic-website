"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// Module-level state survives component remounts across page transitions
let lastPathname = typeof window !== "undefined" ? window.location.pathname : "";
let isPopstateNavigation = false;

if (typeof window !== "undefined") {
  window.addEventListener("popstate", () => {
    isPopstateNavigation = true;
  });
}

function instantScrollToTop() {
  window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  if (document.documentElement) {
    document.documentElement.scrollTop = 0;
  }
  if (document.body) {
    document.body.scrollTop = 0;
  }
}

/**
 * ScrollToTop ensures that whenever a user navigates between pages or blog articles,
 * the scroll position resets to the top of the destination page instantly.
 *
 * It respects:
 * 1. Browser back/forward navigation (popstate) by allowing scroll restoration.
 * 2. Anchor links (#hash) by scrolling to the targeted section instead of forcing to top.
 * 3. Both desktop and mobile viewports.
 */
export function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    // If navigation was triggered by browser Back/Forward (popstate),
    // allow the browser to restore the previous scroll position sensibly.
    if (isPopstateNavigation) {
      isPopstateNavigation = false;
      lastPathname = pathname;
      return;
    }

    const isPathChange = lastPathname !== pathname;
    lastPathname = pathname;

    if (!isPathChange) {
      return;
    }

    // If navigation target includes a hash (e.g. /#appointment or /#contact),
    // let it scroll to that element instead of forcing the page to the top.
    const hash = window.location.hash;
    if (hash && hash !== "#") {
      const targetId = decodeURIComponent(hash.slice(1));
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "instant" });
        return;
      }

      // If the target element is still rendering during hydration, retry shortly
      const retryTimer = setTimeout(() => {
        const el = document.getElementById(targetId);
        if (el) {
          el.scrollIntoView({ behavior: "instant" });
        }
      }, 50);

      return () => clearTimeout(retryTimer);
    }

    // Reset scroll position to top instantly across multiple frames
    // to handle asynchronous RSC DOM mounting and layout shifts
    instantScrollToTop();
    const rafId = requestAnimationFrame(instantScrollToTop);
    const tickTimer = setTimeout(instantScrollToTop, 50);
    const lateTimer = setTimeout(instantScrollToTop, 150);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(tickTimer);
      clearTimeout(lateTimer);
    };
  }, [pathname]);

  return null;
}
