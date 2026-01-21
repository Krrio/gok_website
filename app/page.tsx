import About from "@/components/About";
import Hero from "@/components/Hero";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center max-w-7xl mx-auto">
      <Hero />
      <About />
    </div>
  );
};

export default Home;
