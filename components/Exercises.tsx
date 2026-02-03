import ExerciseGrid from "./ExerciseGrid";

const Exercises = () => {
  return (
    <div className="h-full md:h-dvh 2xl:h-[52vh] w-full p-4 md:mt-8 flex flex-col">
      <div className="w-full flex flex-col items-start space-y-4 md:space-y-8 mb-8">
        <h1 className="text-5xl! lg:text-6xl! font-semibold text-left">
          Zajęcia i warsztaty
        </h1>
        <p className="md:text-[24px]! text-[20px]! text-gray-600">
          Codziennie organizowane{" "}
          <span className="px-1 bg-gray-300/40 rounded-[5px]">
            warsztaty tematyczne
          </span>{" "}
          dla różnych grup wiekowych
        </p>
      </div>
      <div className="w-full flex items-center justify-center flex-col">
        <ExerciseGrid />
      </div>
    </div>
  );
};

export default Exercises;
