
import Hero from "./Hero"
import Description from "./Description"
import FeatureCards from "./FeatureCards"

export default async function Home() {

  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <Description />
      <FeatureCards />
    </div>
  )
}

