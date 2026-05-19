import { useEffect } from "react";
import { type SectionSlug, trackSectionView } from "./analytics";

const trackedSections: SectionSlug[] = [
  "hero",
  "services",
  "about",
  "process",
  "reviews",
  "owner",
  "faq",
  "contact",
];

export const useSectionViewTracking = () => {
  useEffect(() => {
    if (!("IntersectionObserver" in window)) {
      return;
    }

    const viewedSections = new Set<SectionSlug>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          const section = entry.target.id as SectionSlug;

          if (viewedSections.has(section)) {
            return;
          }

          viewedSections.add(section);
          trackSectionView({ section });
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.45,
      },
    );

    trackedSections.forEach((section) => {
      const element = document.getElementById(section);

      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, []);
};
