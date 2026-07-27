"use client";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import React, { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);
function Lenis() {
  const lenisRef = useRef(null);
  useEffect(() => {}, []);
  return <div>Lenis</div>;
}

export default Lenis;
