import type { Metadata } from "next";
import Image from "next/image";
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

  return (
    <main
      className="min-h-screen"
      style={{ backgroundColor: restaurant.theme.background, color: restaurant.theme.text }}
    >
      <div className="mx-auto max-w-4xl px-6 py-10">
        <header>
          <Image src={restaurant.logo} alt="" width={192} height={72} unoptimized />
          <h1 className="mt-3 text-4xl font-bold">{restaurant.name}</h1>
          <p className="mt-1">{restaurant.tagline}</p>
        </header>
        <h2 className="mt-10 text-3xl font-bold">Meniu</h2>
        <nav aria-label="Categorii din meniu" className="mt-4">
          <ul className="flex flex-wrap gap-x-4 gap-y-2">
            {restaurant.categories.map((category) => (
              <li key={category.id}><a className="underline" href={`#${category.id}`}>{category.name}</a></li>
            ))}
          </ul>
        </nav>
        {restaurant.categories.map((category) => (
          <section className="mt-8" key={category.id} id={category.id}>
            <h3 className="text-2xl font-semibold">{category.name}</h3>
            <ul className="mt-3 grid gap-3 sm:grid-cols-2">
              {category.products.map((product) => (
                <li className="rounded-lg border border-black/15 p-4" key={product.id}>
                  <h4 className="font-semibold">{product.name}</h4>
                  <p className="mt-1">{product.description}</p>
                  {product.quantity && <p className="mt-1 text-sm">{product.quantity}</p>}
                  <p className="mt-2 font-semibold">
                    {new Intl.NumberFormat("ro-RO", {
                      style: "currency",
                      currency: product.currency,
                    }).format(product.price)}
                  </p>
                  {!product.available && <p className="mt-1 text-sm">Indisponibil</p>}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </main>
  );
}
