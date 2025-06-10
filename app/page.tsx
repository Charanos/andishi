"use client";

import BlogsSection from "./blogs/page";
import Services from "./sections/Services";
import HowItWorks from "./sections/HowWeDoIt";
import Newsletter from "./sections/Newsletter";
import WhyAndishi from "./sections/WhyAndishi";
import StatsSection from "./sections/MiniStats";
import HeroSection from "./sections/HeroSection";
import ClientReviews from "./sections/ClientReviews";
import ProjectsShowcase from "./sections/ProjectsShowcase";

export default function HomePage() {
  return (
    <main className="overflow-x-hidden">
      <HeroSection />

      <StatsSection />

      {/* Alternate bg shades via tailwind arbitrary bg-colors */}
      <WhyAndishi />

      <HowItWorks />

      <Services />

      <ClientReviews />

      <BlogsSection />

      <ProjectsShowcase />

      <Newsletter />

      <article className="prose">
        <h1>This should be big and serif</h1>
        <p>Your paragraph should have generous line-height and margins.</p>
      </article>
    </main>
  );
}
