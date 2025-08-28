import Hero from "./Hero";
import Description from "./Description";
import FeatureCards from "./FeatureCards";

export default async function Home() {
  return (
    <div className="flex flex-col min-h-screen w-90 md:w-full">
      <Hero />
      <Description />
      <FeatureCards />
    </div>
  );
}
