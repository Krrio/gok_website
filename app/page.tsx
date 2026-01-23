import Events from "@/components/About";
import Exercises from "@/components/Exercises";
import Hero from "@/components/Hero";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center max-w-7xl mx-auto">
      <Hero />
      <Events />
      <Exercises />
    </div>
  );
};

export default Home;
