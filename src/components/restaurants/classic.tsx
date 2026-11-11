import type { CSSProperties } from "react";
import Image from "next/image";
import type { Restaurant } from "@/lib/restaurants/schema.mts";
import { RestaurantMenu } from "./menu";
import styles from "./classic.module.css";

export function ClassicRestaurant({ restaurant }: { restaurant: Restaurant }) {
  const { name, logo, tagline, heroImage, theme, phone, whatsapp, address, openingHours, mapsUrl } = restaurant;
  const hasContact = phone || whatsapp || address || openingHours || mapsUrl;
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  const themeVariables = {
    "--restaurant-paper": theme.background,
    "--restaurant-ink": theme.text,
    "--restaurant-primary": theme.primary,
    "--restaurant-accent": theme.accent,
  } as CSSProperties;

  return (
    <div className={styles.site} style={themeVariables}>
      <header className={styles.header} id="sus">
        <div className={styles.wrap}>
          <a href="#sus" aria-label={name}>
            <Image src={basePath + logo} alt="" width={124} height={47} unoptimized />
          </a>
          <nav aria-label="Navigare principală">
            <a href="#meniu">Meniu</a>
            {hasContact && <a href="#contact">Contact</a>}
          </nav>
        </div>
      </header>
      <main>
        <section
          className={`${styles.hero} grid ${heroImage ? "md:grid-cols-[minmax(0,4fr)_minmax(0,6fr)]" : ""}`}
          aria-labelledby="restaurant-title"
        >
          <div className={styles.heroContent}>
            <h1 id="restaurant-title">{name}</h1>
            <p>{tagline}</p>
            <div className={styles.actions}>
              <a className={styles.button} href="#meniu">Vezi meniul <span aria-hidden="true">↓</span></a>
              {phone && <a className={styles.secondaryButton} href={`tel:${phone}`}>Sună</a>}
            </div>
          </div>
          {heroImage && (
            <div className={styles.heroImage}>
              <Image src={basePath + heroImage} alt="" fill sizes="(max-width: 767px) 100vw, 60vw" unoptimized preload />
            </div>
          )}
        </section>
        <RestaurantMenu categories={restaurant.categories} />
        {hasContact && (
          <section className={`${styles.wrap} ${styles.contact}`} id="contact">
            <h2>Contact</h2>
            {address && <address>{address}</address>}
            {openingHours && (
              <ul>{openingHours.map((line) => <li key={line}>{line}</li>)}</ul>
            )}
            <div className={styles.actions}>
              {phone && <a href={`tel:${phone}`}>{phone}</a>}
              {whatsapp && <a href={`https://wa.me/${whatsapp.slice(1)}`}>WhatsApp</a>}
              {mapsUrl && <a href={mapsUrl}>Deschide harta</a>}
            </div>
          </section>
        )}
      </main>
      <footer className={styles.footer}>
        <div className={styles.wrap}>
          <p>© {name}</p>
          {address && <p>{address}</p>}
          {phone && <a href={`tel:${phone}`}>{phone}</a>}
          <a href="#sus">Înapoi sus ↑</a>
        </div>
      </footer>
    </div>
  );
}
