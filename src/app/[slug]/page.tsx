import type { Metadata } from "next";
import { ClassicRestaurant } from "@/components/restaurants/classic";
import { notFound } from "next/navigation";
import { getRestaurant, loadRestaurants } from "@/lib/restaurants/load.mts";

export const dynamicParams = false;

export function generateStaticParams() {
  return loadRestaurants().map(({ slug }) => ({ slug }));
}

async function loadPageRestaurant({ params }: PageProps<"/[slug]">) {
  const { slug } = await params;
  const restaurant = getRestaurant(slug);
  if (!restaurant) notFound();
  return restaurant;
}

export async function generateMetadata(props: PageProps<"/[slug]">): Promise<Metadata> {
  const restaurant = await loadPageRestaurant(props);
  return { title: `Meniu | ${restaurant.name}`, description: restaurant.tagline };
}

export default async function RestaurantPage(props: PageProps<"/[slug]">) {
  const restaurant = await loadPageRestaurant(props);

  return <ClassicRestaurant restaurant={restaurant} />;
}
