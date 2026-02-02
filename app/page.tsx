import Contests from "@/components/Contests";
import Events from "@/components/Events";
import Exercises from "@/components/Exercises";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center max-w-7xl mx-auto">
      <Hero />
      <Events />
      <Exercises />
      <Contests />
      <Projects />
    </div>
  );
};

export default Home;
