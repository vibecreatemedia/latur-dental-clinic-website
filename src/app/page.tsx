"use client";

import { Suspense, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { WorkInProgress } from "@/components/site/work-in-progress";
import { FullSite } from "@/components/site/full-site";

function MainContent() {
  const searchParams = useSearchParams();
  const [showFullSite, setShowFullSite] = useState(false);

  useEffect(() => {
    if (searchParams.get("mode") === "full" || searchParams.get("preview") === "true") {
      setShowFullSite(true);
    }
  }, [searchParams]);

  if (showFullSite) {
    return <FullSite onBackToWip={() => setShowFullSite(false)} />;
  }

  return <WorkInProgress onPreviewFullSite={() => setShowFullSite(true)} />;
}

export default function Home() {
  return (
    <Suspense fallback={<WorkInProgress />}>
      <MainContent />
    </Suspense>
  );
}
