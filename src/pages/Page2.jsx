import ShareBox from "../components/ShareBox";

export default function Page2() {
  return (
    <div
      id="page2"   // 👈 REQUIRED for AnimatedSection detection
      className="relative min-h-screen overflow-x-hidden text-white overflow-y-auto scroll-smooth"
      style={{ scrollSnapType: "y mandatory" }}
    >
      <section
        className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 md:px-8 transition-all duration-700 ease-out will-change-transform"
        style={{ scrollSnapAlign: "center" }}
      >
        <div className="w-full max-w-2xl mx-auto">
          <ShareBox />
        </div>

        <p className="mt-20 text-gray-300 text-sm text-center">
          Built by : @raj333sh_
        </p>
      </section>
    </div>
  );
}