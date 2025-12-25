export default function WishCard({ name }) {
  return (
    <div className="flex, flex-col, items-center, justify-center, text-center space-y-4 mb-8 mt-10">
      <h2 className="text-2xl md:text-7xl font-bold text-pink-400 animate-bounce uppercase tracking-widest">
        {name || "@raj333sh"}
      </h2>
      <p className="text-gray-300 text-5xl">wishes you </p>
    </div>
  );
}