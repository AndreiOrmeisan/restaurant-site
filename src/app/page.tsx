import Link from "next/link";
import { loadRestaurants } from "@/lib/restaurants/load.mts";

export default function Home() {
  const restaurants = loadRestaurants();

  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-3xl font-bold">Generator de site-uri pentru restaurante</h1>
      <ul className="mt-6 space-y-3">
        {restaurants.map((restaurant) => (
          <li key={restaurant.slug}>
            <Link className="underline" href={`/${restaurant.slug}`}>
              Vezi meniul {restaurant.name}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
