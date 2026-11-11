import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { z } from "zod";
import { restaurantSchema, type Restaurant } from "./schema.mts";

export function parseRestaurantConfig(json: string, source: string): Restaurant {
  let data: unknown;
  try {
    data = JSON.parse(json);
  } catch (error) {
    throw new Error(`${source}: JSON invalid.`, { cause: error });
  }

  const result = restaurantSchema.safeParse(data);
  if (!result.success) {
    throw new Error(`${source}: configurație invalidă.\n${z.prettifyError(result.error)}`);
  }
  return result.data;
}

export function loadRestaurants(): Restaurant[] {
  const directory = join(process.cwd(), "data", "restaurants");

  return readdirSync(directory, { withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.endsWith(".json"))
    .sort((first, second) => first.name.localeCompare(second.name))
    .map(({ name }) => {
      const source = `data/restaurants/${name}`;
      const restaurant = parseRestaurantConfig(readFileSync(join(directory, name), "utf8"), source);
      if (name !== `${restaurant.slug}.json`) {
        throw new Error(`${source}: fișierul trebuie să se numească ${restaurant.slug}.json.`);
      }
      return restaurant;
    });
}

export function getRestaurant(slug: string): Restaurant | undefined {
  return loadRestaurants().find((restaurant) => restaurant.slug === slug);
}
