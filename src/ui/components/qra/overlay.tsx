import { cn } from "@/lib/utils";
import { useEffect, useRef, type ReactNode } from "react";
import { useOverlayAnimation, type OverlayTransitionTypes } from "./animation";

type OverlayProps = {
  children: ReactNode;
  containerRef: React.RefObject<HTMLDivElement | null>;
  transitionType?: OverlayTransitionTypes;
};

export function Overlay({
  children,
  containerRef,
  transitionType = "swipe",
}: OverlayProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const overlayTl = useOverlayAnimation({
    overlayRef,
    containerRef,
    transitionType,
  });

  useEffect(() => {
    if (!overlayTl.current) return;
    overlayTl.current.play();
  }, [overlayTl]);

  return (
    <div className="absolute inset-0" ref={overlayRef}>
      <div
        className={cn(
          "bg-map text-map-foreground size-full",
          "opacity-0" // initial animation class
        )}
        data-animate-overlay
      >
        {children}
      </div>
      {transitionType === "swipe" ? (
        <div
          aria-hidden
          data-animate-shutter
          className="bg-primary fixed bottom-0 size-full translate-y-full"
        />
      ) : null}
      {transitionType === "circle" ? (
        <svg
          className="pointer-events-none fixed inset-0 size-full"
          aria-hidden
          data-animate-circle
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <mask id="holeMask">
              <rect width="100" height="100" fill="white" />
              <circle id="maskHole" cx="50" cy="50" r="0" fill="black" />
            </mask>
          </defs>

          <g mask="url(#holeMask)">
            <circle className="fill-primary" cx="50" cy="50" r="0" />
            <circle className="fill-background" cx="50" cy="50" r="0" />
            <circle className="fill-accent" cx="50" cy="50" r="0" />
          </g>
        </svg>
      ) : null}
    </div>
  );
}
