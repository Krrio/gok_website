import React from "react";

const About = () => {
  return (
    <div className="h-screen w-full p-4 flex flex-col md:-mt-16">
      <div className="w-full flex flex-col items-start space-y-4 md:space-y-8 mb-8">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-center md:text-left">
          Nadchodzące wydarzenia
        </h1>
        <p className="md:text-[24px]! text-[20px]! text-gray-600">
          Dowiedz się więcej o naszej działalności i ofercie kulturalnej.
        </p>
      </div>
    </div>
  );
};

export default About;
