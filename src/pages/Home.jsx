import React from "react";
import Hero from "@/components/home/Hero";
import Marquee from "@/components/home/Marquee";
import Categories from "@/components/home/Categories";
import Featured from "@/components/home/Featured";
import Wholesale from "@/components/home/Wholesale";
import Visit from "@/components/home/Visit";

export default function Home() {
  return (
    <div>
      <Hero />
      <Marquee />
      <Categories />
      <Featured />
      <Wholesale />
      <Visit />
    </div>
  );
}
