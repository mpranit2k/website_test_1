import dynamic from "next/dynamic";
import { Hero } from "@/components/Hero";
import { TrustBar } from "@/components/TrustBar";
import { Features } from "@/components/Features";
import { ServiceArea } from "@/components/ServiceArea";
import { Reviews } from "@/components/Reviews";
import { Footer } from "@/components/Footer";

const FAQ = dynamic(() => import("@/components/FAQ").then((m) => m.FAQ));

export default function Home() {
  return (
    <>
      <Hero />
      <TrustBar />
      <Features />
      <ServiceArea />
      <Reviews />
      <FAQ />
      <Footer />
    </>
  );
}
