"use client";

import React, { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CARDS = [
  {
    img: "https://res.cloudinary.com/dnpseycnv/image/upload/v1777981001/WhatsApp_Image_2026-05-05_at_7.34.23_PM_llong9.jpg",
    pos: "h-[15vw] w-[13vw] max-md:h-[32vw] max-md:w-[26vw] top-[10%] left-[10%] max-md:top-[8%] max-md:left-[6%]",
    bg: "bg-red-500",
  },
  {
    img: "https://res.cloudinary.com/dnpseycnv/image/upload/v1776622352/dog-mercury-1_x544tt.jpg",
    pos: "h-[13vw] w-[10vw] max-md:h-[23vw] max-md:w-[18vw] top-[20%] left-[5%] max-md:top-[14%] max-md:left-[3%]",
    bg: "bg-blue-500",
  },
  {
    img: "https://res.cloudinary.com/dnpseycnv/image/upload/v1777981003/WhatsApp_Image_2026-05-05_at_7.34.23_PM_3_yzr4e0.jpg",
    pos: "h-[20vw] w-[17vw] max-md:h-[33vw] max-md:w-[28vw] top-[70%] left-[0%] max-md:top-[56%] max-md:left-[0%]",
    bg: "bg-green-500",
  },
  {
    img: "https://res.cloudinary.com/dnpseycnv/image/upload/v1776622864/dog-rocky-1_rixlcm.jpg",
    pos: "h-[13vw] w-[17vw] max-md:h-[25vw] max-md:w-[28vw] top-[75%] left-[20%] max-md:top-[65%] max-md:left-[16%]",
    bg: "bg-yellow-500",
  },
  {
    img: "https://res.cloudinary.com/dnpseycnv/image/upload/v1776622353/dog-maria-1_q9riqc.jpg",
    pos: "h-[12vw] w-[10vw] max-md:h-[25vw] max-md:w-[18vw] top-[10%] left-[55%] max-md:top-[8%] max-md:left-[50%]",
    bg: "bg-yellow-500",
  },
  {
    img: "https://res.cloudinary.com/dnpseycnv/image/upload/v1776622859/dog-milo-1_km3xuy.jpg",
    pos: "h-[17vw] w-[17vw] max-md:h-[33vw] max-md:w-[29vw] top-[20%] right-[1%] max-md:top-[13%] max-md:right-[2%]",
    bg: "bg-blue-500",
  },
  {
    img: "https://res.cloudinary.com/dnpseycnv/image/upload/v1776622849/dog-joffery-1_zhuxhg.jpg",
    pos: "h-[19vw] w-[18vw] max-md:h-[34vw] max-md:w-[30vw] top-[70%] right-[5%] max-md:top-[56%] max-md:right-[6%]",
    bg: "bg-green-500",
  },
  {
    img: "https://res.cloudinary.com/dnpseycnv/image/upload/v1776622353/dog-cloe-1_tarrgz.jpg",
    pos: "h-[15vw] w-[14vw] max-md:h-[26vw] max-md:w-[23vw] top-[80%] right-[15%] max-md:top-[70%] max-md:right-[11%]",
    bg: "bg-red-500",
  },
];

const AbstractCards = () => {
  const sectionRef = useRef(null);
  const wrappersRefs = useRef([]);
  const innersRefs = useRef([]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const initial = CARDS.map(() => ({
      rotation: Math.round(Math.random() * 60 - 30),
      scale: 1.3,
      zIndex: gsap.utils.random(5, 50, 1),
    }));

    wrappersRefs.current.forEach((wrapper, idx) => {
      if (wrapper) wrapper.style.zIndex = String(initial[idx].zIndex);
    });

    const ctx = gsap.context(() => {
      innersRefs.current.forEach((inner, idx) => {
        const wrapper = wrappersRefs.current[idx];
        if (!inner || !wrapper) return;

        const measureOffset = () => {
          const wRect = wrapper.getBoundingClientRect();
          const sRect = section.getBoundingClientRect();
          return {
            x: sRect.left + sRect.width / 2 - (wRect.left + wRect.width / 2),
            y: sRect.top + sRect.height / 2 - (wRect.top + wRect.height / 2),
          };
        };

        gsap.fromTo(
          inner,
          {
            x: () => measureOffset().x,
            y: () => measureOffset().y,
            scale: initial[idx].scale,
            rotate: initial[idx].rotation,
          },
          {
            x: 0,
            y: 0,
            scale: 1,
            rotate: 0,
            ease: "back.inOut(2)",
            scrollTrigger: {
              trigger: section,
              start: "top 20%",
              end: "top -10%",
              scrub: 1.3,
              invalidateOnRefresh: true,
            },
          },
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="h-screen w-full flex flex-col items-center justify-center text-[#1b1b1b] overflow-x-clip relative"
    >
      <h2 className="max-md:text-[14vw] text-center text-[6vw] font-semibold leading-[.8] tracking-tight">
        Be a <br /> dog's hero
      </h2>

      <p className="mt-10 max-md:mt-8 max-md:w-[85vw] max-md:text-[3.7vw] w-[40%] text-center text-[1.3vw] leading-[1.3] tracking-tight">
        We rescue, heal, and love homeless dogs, guiding them safely from our
        doors into the warmth of your forever family.
      </p>

      <button
        type="button"
        className="shadow-md mt-10 max-md:mt-8 max-md:px-8 max-md:py-3 max-md:text-[4vw] rounded-full px-6 py-2 text-1.25vw] font-semibold text-white bg-[#1b1b1b] hover:bg-sky-700 transition-colors duration-300 ease-in-out"
        // className="shadow-md text-xs sm:text-sm sm:h-10 px-2 sm:px-4 cursor-pointer"
      >
        Learn more
      </button>

      {CARDS.map((card, idx) => (
        <div
          key={card.img}
          ref={(el) => {
            wrappersRefs.current[idx] = el;
          }}
          className={`absolute ${card.pos}`}
        >
          <div
            ref={(el) => {
              innersRefs.current[idx] = el;
            }}
            className={`h-full w-full overflow-hidden rounded-2xl will-change-transform ${card.bg}`}
          >
            <img
              src={card.img}
              className="pointer-events-none size-full select-none object-cover"
              draggable={false}
              alt="img"
            />
          </div>
        </div>
      ))}
    </section>
  );
};

export default AbstractCards;
