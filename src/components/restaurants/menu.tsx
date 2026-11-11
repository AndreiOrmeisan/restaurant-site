"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import type { Restaurant } from "@/lib/restaurants/schema.mts";
import styles from "./classic.module.css";

function normalizeSearch(value: string) {
  return value.normalize("NFD").replace(/\p{M}/gu, "").toLowerCase();
}

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function RestaurantMenu({ categories }: { categories: Restaurant["categories"] }) {
  const [query, setQuery] = useState("");
  const searchInput = useRef<HTMLInputElement>(null);
  const search = normalizeSearch(query.trim());
  const visibleCategories = search
    ? categories.map((category) => ({
        ...category,
        products: category.products.filter((product) =>
          normalizeSearch(`${category.name} ${product.name} ${product.description}`).includes(search),
        ),
      })).filter((category) => category.products.length > 0)
    : categories;
  const productCount = visibleCategories.reduce((count, category) => count + category.products.length, 0);

  return (
    <section className={styles.menu} id="meniu" aria-labelledby="menu-title">
      <div className={`${styles.wrap} ${styles.menuHeader}`}>
        <h2 id="menu-title">Meniu</h2>
        <div className={`${styles.search} w-full md:w-80`}>
          <label htmlFor="menu-search">Caută în meniu</label>
          <div className={styles.searchControl}>
            <input
              ref={searchInput}
              id="menu-search"
              type="search"
              placeholder="Nume sau ingredient"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
            {query && (
              <button type="button" onClick={() => {
                setQuery("");
                searchInput.current?.focus();
              }}>Șterge</button>
            )}
          </div>
        </div>
      </div>
      {visibleCategories.length > 0 && (
        <nav className={styles.categories} aria-label="Categorii din meniu">
          <ul className={styles.wrap}>
            {visibleCategories.map((category) => (
              <li key={category.id}><a href={`#meniu-${category.id}`}>{category.name}</a></li>
            ))}
          </ul>
        </nav>
      )}
      <div className={styles.wrap}>
        <p className={search && productCount ? styles.resultCount : "sr-only"} role="status">
          {search && `${productCount} ${productCount === 1 ? "produs găsit" : "produse găsite"}.`}
        </p>
        {productCount === 0 && <p className={styles.empty}>Niciun produs găsit. Încearcă altă căutare.</p>}
        {visibleCategories.map((category) => (
          <section className={styles.category} key={category.id} id={`meniu-${category.id}`}>
            <h3>{category.name}</h3>
            <ul className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4">
              {category.products.map((product) => (
                <li className={styles.product} key={product.id}>
                  {product.image && (
                    <div className={styles.productImage}>
                      <Image src={basePath + product.image} alt="" fill sizes="(max-width: 720px) 100vw, 540px" unoptimized />
                    </div>
                  )}
                  <div className={styles.productHeading}>
                    <h4>{product.name}</h4>
                    <p>{new Intl.NumberFormat("ro-RO", {
                      style: "currency",
                      currency: product.currency,
                    }).format(product.price)}</p>
                  </div>
                  <p className={styles.description}>{product.description}</p>
                  {product.quantity && <p className={styles.details}>{product.quantity}</p>}
                  {!product.available && <p className={styles.details}>Indisponibil</p>}
                  {(product.allergens?.length || product.nutrition) && (
                    <details className={styles.details}>
                      <summary>{product.nutrition ? "Alergeni și valori nutriționale" : "Alergeni"}</summary>
                      {product.allergens?.length ? <p>Alergeni — {product.allergens.join(", ")}</p> : null}
                      {product.nutrition && <p>{product.nutrition}</p>}
                    </details>
                  )}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </section>
  );
}
