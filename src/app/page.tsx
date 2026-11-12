import type { Metadata } from "next";
import { ClassicRestaurant } from "@/components/restaurants/classic";
import { loadRestaurants } from "@/lib/restaurants/load.mts";

// Single-restaurant entry point; each config also has a dedicated slug route.
function defaultRestaurant() {
  const restaurant = loadRestaurants()[0];
  if (!restaurant) throw new Error("No restaurant configuration found.");
  return restaurant;
}

export function generateMetadata(): Metadata {
  const restaurant = defaultRestaurant();
  return {
    title: `${restaurant.name} — ${restaurant.tagline}`,
    description: restaurant.hero.description,
  };
}

export default function Home() {
  return <ClassicRestaurant restaurant={defaultRestaurant()} />;
}
