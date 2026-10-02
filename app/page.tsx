import Preloader from "@/components/Preloader";
import Navbar from "@/components/Navbar";
import ProgressTracker from "@/components/ProgressTracker";
import SectionTitle from "@/components/SectionTitle";
import Hero from "@/components/sections/Hero";
import Soorasamharam from "@/components/sections/Soorasamharam";
import LeadingTheDevas from "@/components/sections/LeadingTheDevas";
import Swamimalai from "@/components/sections/Swamimalai";
import AboutMe from "@/components/sections/AboutMe";
import Skills from "@/components/sections/Skills";
import Testimonials from "@/components/sections/Testimonials";
import Contact from "@/components/sections/Contact";
import { SmoothScroll } from "@/lib/scroll";
import { sectionTitles as t } from "@/lib/content";

export default function Page() {
  return (
    <>
      <SmoothScroll />
      <Preloader />
      <Navbar />
      <ProgressTracker />
      <main>
        <Hero />
        <SectionTitle id="projects" accent="gold" {...t.projects} />
        <Soorasamharam />
        <LeadingTheDevas />
        <Swamimalai />
        <AboutMe />
        <SectionTitle id="skills" accent="indigo" {...t.skills} />
        <Skills />
        <SectionTitle id="testimonials" accent="maroon" {...t.testimonials} />
        <Testimonials />
        <SectionTitle id="contact" accent="dawn" {...t.contact} />
        <Contact />
      </main>
    </>
  );
}
