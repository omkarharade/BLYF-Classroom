import Link from "next/link";

export default function GamesPage() {
  const games = [
    { id: "boardGame", title: "Board Game", href: "/games/boardGame" },
    { id: "cardsGame", title: "Cards Game", href: "/games/cardsGame" }
  ];

  return (
    <div className="p-8 min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <h1 className="text-3xl mb-6">Games</h1>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 max-w-3xl">
        {games.map(g => (
          <Link key={g.id} href={g.href} className="block p-6 bg-gray-800 rounded-lg hover:scale-105 transition transform">
            <h2 className="text-xl">{g.title}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
}