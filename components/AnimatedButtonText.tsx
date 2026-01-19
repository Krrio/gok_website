const AnimatedButtonText = ({ text }: { text: string }) => (
  <>
    <span className="sr-only">{text}</span>
    <span
      aria-hidden="true"
      className="relative inline-block overflow-hidden align-middle leading-[1.4] pb-0.5"
    >
      <span className="block opacity-0">{text}</span>

      <span className="absolute left-0 top-0 w-full transition-transform duration-300 ease-out group-hover:-translate-y-full">
        {text}
      </span>

      <span className="absolute left-0 top-0 w-full translate-y-full transition-transform duration-300 ease-out group-hover:translate-y-0">
        {text}
      </span>
    </span>
  </>
);

export default AnimatedButtonText;
