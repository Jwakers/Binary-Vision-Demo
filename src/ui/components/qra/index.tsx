"use client";

import { usePrefersReducedMotion } from "@/lib/hooks";
import { cn } from "@/lib/utils";
import { useGSAP } from "@gsap/react";
import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";
import Image from "next/image";
import { useRef, useState } from "react";
import signalTowerImage from "../../../../public/signal-tower.png";
import { Button } from "./button";
import UKMap from "./uk-map";

gsap.registerPlugin(useGSAP);

// -- Next steps --
// Add the progress indicator at the bottom (sticky)
// Set up pin data
// Add pins to the map
// Make pints interactive
// Add back functionality when clicking a pin

const PIN_DATA = [
  {
    id: "london",
    name: "London Sector",
    // Coordinates relative to SVG viewBox (0-100 scale for percentage positioning)
    x: 52,
    y: 68,
    content: {
      title: "Pin Content Title",
      description: "Pin Content Description",
    },
  },
];

export default function QRA() {
  const { containerRef, contentRef, mapContainerRef, initialAnimationClasses } =
    useLoadAnimation();
  const zoomTl = useRef<GSAPTimeline | null>(null);
  const [activePin, setActivePin] = useState<(typeof PIN_DATA)[number] | null>(
    null
  );

  // Zoom timeline setup
  useGSAP(
    () => {
      zoomTl.current = gsap.timeline({ paused: true });
    },
    { scope: containerRef }
  );

  const handlePinClick = (pin: (typeof PIN_DATA)[number]) => {
    if (!zoomTl.current || !mapContainerRef.current) return;

    const scale = 3;

    // Animate map zoom
    gsap.set(mapContainerRef.current, {
      transformOrigin: `${pin.x}% ${pin.y}%`,
    });
    zoomTl.current.clear();
    zoomTl.current.to(mapContainerRef.current, {
      scale: scale,
      duration: 1.2,
      ease: "power2.inOut",
    });
    zoomTl.current?.play();

    gsap.to(contentRef.current?.children || [], {
      opacity: 0,
      scale: 1.1,
      filter: "blur(4px)",
      stagger: 0.1,
      duration: 0.6,
      ease: "power2.out",
      onComplete: () => {
        setActivePin(pin);
      },
    });
  };

  return (
    <div className=" mx-auto pt-20 h-dvh overflow-hidden">
      <div ref={containerRef} className="container mx-auto grid grid-cols-2">
        <div ref={mapContainerRef} className="relative">
          {/* Got this colour from the map using a color picker.
        Does not seem to be part of the design system so I am inlining it here. */}
          <UKMap
            className={cn(
              "fill-[hsl(210_8.82%_26.67%)]",
              "opacity-0 scale-110" // initial animation class
            )}
            data-map
          ></UKMap>
          {PIN_DATA.map((pin) => (
            <button
              key={pin.id}
              className={cn(
                "absolute cursor-pointer size-4 bg-accent rounded-full",
                "opacity-0 scale-200" // initial animation class
              )}
              data-pin
              aria-label={pin.name}
              style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
              onClick={() => handlePinClick(pin)}
              disabled={!!activePin}
            >
              <span className="sr-only">{pin.name}</span>
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-accent/60 rounded-full animate-ping"
              />
            </button>
          ))}
        </div>
        {/* Right Side content section */}
        <div className="my-auto space-y-4 isolate">
          {/* Initial content with GSAP animation */}
          {!activePin && (
            <div ref={contentRef} className="space-y-4">
              {/* Typically I would not use an next/image for this type of thing but an SVG.
            Also I would rarely use the next.js public directory because there is usually a cheaper way
            to store and process (hence the unoptimized prop) images e.g. through a DAM */}
              <Image
                src={signalTowerImage}
                alt="Signal Tower icon"
                className={cn("size-[64px]", initialAnimationClasses)}
                unoptimized
              />
              {/* Decided not to go with the design system typography for this demo. 
            I have increased from the designs 33px to 48px to create better hierarchy. */}
              <h1 className={cn("text-5xl font-bold", initialAnimationClasses)}>
                Threat detected
              </h1>
              <p className={cn("text-3xl", initialAnimationClasses)}>
                A rogue aircraft approaches UK airspace.
              </p>
              <Button className={cn("mt-8", initialAnimationClasses)}>
                <span>Co-ordinate response</span>
              </Button>
            </div>
          )}

          {/* Pin content with Framer Motion animation */}
          <AnimatePresence mode="wait">
            {activePin && (
              <motion.div
                key={activePin.id}
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={{
                  hidden: {},
                  visible: {
                    transition: {
                      staggerChildren: 0.15,
                    },
                  },
                  exit: {
                    transition: {
                      staggerChildren: 0.1,
                      staggerDirection: -1,
                    },
                  },
                }}
                className="space-y-4"
              >
                <motion.h1
                  className={cn("text-5xl font-bold")}
                  variants={{
                    hidden: { opacity: 0, scale: 1.1, filter: "blur(4px)" },
                    visible: { opacity: 1, scale: 1, filter: "blur(0px)" },
                    exit: { opacity: 0, scale: 1.1, filter: "blur(4px)" },
                  }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                >
                  {activePin.content.title}
                </motion.h1>
                <motion.p
                  className={cn("text-3xl")}
                  variants={{
                    hidden: { opacity: 0, scale: 1.1, filter: "blur(4px)" },
                    visible: { opacity: 1, scale: 1, filter: "blur(0px)" },
                    exit: { opacity: 0, scale: 1.1, filter: "blur(4px)" },
                  }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                >
                  {activePin.content.description}
                </motion.p>
                <motion.div
                  variants={{
                    hidden: { opacity: 0, scale: 1.1, filter: "blur(4px)" },
                    visible: { opacity: 1, scale: 1, filter: "blur(0px)" },
                    exit: { opacity: 0, scale: 1.1, filter: "blur(4px)" },
                  }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                >
                  <Button className={cn("mt-8")}>Co-ordinate response</Button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function useLoadAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const tl = useRef<GSAPTimeline>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const initialAnimationClasses = "opacity-0 origin-left scale-110 blur-sm";

  useGSAP(
    () => {
      const map = gsap.utils.toArray("[data-map]");
      const pins = gsap.utils.toArray("[data-pin]");

      if (prefersReducedMotion) {
        // Instantly show all content without animation
        gsap.set([map, contentRef.current?.children], {
          opacity: 1,
          scale: 1,
          y: 0,
          filter: "blur(0px)",
        });
        return;
      }

      tl.current = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
      });

      tl.current
        .to(map, {
          opacity: 1,
          scale: 1,
          duration: 1.2,
        })
        .to(
          map,
          {
            filter: "drop-shadow(0 0 10px rgba(255,255,255,0.15))",
            duration: 0.6,
          },
          "<+0.5"
        )
        .to(
          Array.from(contentRef.current?.children || []),
          {
            opacity: 1,
            filter: "blur(0px)",
            scale: 1,
            stagger: 0.15,
            duration: 0.6,
            ease: "back.out(1.1)",
          },
          "<+0.3"
        )
        .to(pins, {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
        });
    },
    { scope: containerRef, dependencies: [prefersReducedMotion] }
  );

  return {
    containerRef,
    contentRef,
    mapContainerRef,
    initialAnimationClasses,
    tl,
  };
}
