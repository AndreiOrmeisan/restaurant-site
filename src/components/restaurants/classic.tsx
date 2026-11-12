import type { CSSProperties } from "react";
import Image from "next/image";
import { ArrowRight, ArrowUp, Clock3, Mail, MapPin, Phone, Play, UtensilsCrossed } from "lucide-react";
import type { Restaurant } from "@/lib/restaurants/schema.mts";
import { RestaurantMenu } from "./menu";
import styles from "./classic.module.css";

export function ClassicRestaurant({ restaurant: r }: { restaurant: Restaurant }) {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  const theme = { "--restaurant-paper": r.theme.background, "--restaurant-ink": r.theme.text, "--restaurant-primary": r.theme.primary, "--restaurant-accent": r.theme.accent } as CSSProperties;
  return <div className={styles.site} style={theme} id="sus" data-logo-style={r.logoStyle}>
    <a className={styles.skip} href="#meniu">Sari la meniu</a>
    <header className={styles.header}><div className={styles.wrap}>
      <a className={styles.logo} href="#sus" aria-label={`${r.name} — ${r.tagline}`}><Image src={base + r.logo} alt={r.name} width={210} height={72} unoptimized /></a>
      <nav aria-label="Navigare principală"><a className={styles.homeLink} href="#sus">Acasă</a><a href="#meniu">Meniu</a><a href="#despre">Despre noi</a><a href="#contact">Contact</a></nav>
      <div className={styles.headerDetails}>
        {r.address && <div><MapPin /><span>{r.address.split(" · ")[0]}<small>{r.address.split(" · ").slice(1).join(" · ")}</small></span></div>}
        {r.openingHours && <div><Clock3 /><span>{r.openingHours[0]}<small>{r.openingHours.slice(1).join(" · ")}</small></span></div>}
      </div>
      {r.phone && <a className={styles.button} href={`tel:${r.phone}`}><Phone size={19} /> Sună acum</a>}
    </div></header>
    <main>
      <section className={styles.hero} aria-labelledby="restaurant-title">
        {r.heroImage && <div className={styles.heroImage}><Image src={base + r.heroImage} alt={r.hero.imageAlt} fill sizes="(max-width: 700px) 100vw, 65vw" unoptimized preload /></div>}
        <div className={styles.heroContent}>
          <p className={styles.eyebrow}>{r.hero.eyebrow}</p>
          <h1 id="restaurant-title">{r.hero.title} <em>{r.hero.emphasis}</em></h1>
          <p className={styles.heroDescription}>{r.hero.description}</p>
          <div className={styles.actions}><a className={styles.button} href="#meniu"><UtensilsCrossed size={21} />Vezi meniul <ArrowRight size={20} /></a><a className={styles.discover} href="#despre"><span><Play size={17} fill="currentColor" /></span>Descoperă<br />{r.name}</a></div>
        </div>
      </section>
      <RestaurantMenu categories={r.categories} description={r.menuDescription} />
      <section className={`${styles.wrap} ${styles.about}`} id="despre"><p className={styles.eyebrow}>{r.name} · {r.tagline}</p><h2>{r.about.title}</h2><p>{r.about.description}</p></section>
      <section className={`${styles.wrap} ${styles.contact}`} id="contact" aria-labelledby="contact-title"><div><p className={styles.eyebrow}>Te așteptăm la masă</p><h2 id="contact-title">Ne vedem la {r.name}</h2></div><div className={styles.contactInfo}>
        {r.address && <p><MapPin aria-hidden="true" /><span>{r.address}</span></p>}
        {r.openingHours && <p><Clock3 aria-hidden="true" /><span>{r.openingHours.join(" · ")}</span></p>}
        {r.email && <p><Mail aria-hidden="true" /><a href={`mailto:${r.email}`}>{r.email}</a></p>}
        <div className={styles.actions}>{r.phone && <a className={styles.button} href={`tel:${r.phone}`}><Phone size={18} />{r.phone}</a>}{r.whatsapp && <a className={styles.secondaryButton} href={`https://wa.me/${r.whatsapp.slice(1)}`}>WhatsApp</a>}{r.mapsUrl && <a className={styles.secondaryButton} href={r.mapsUrl}>Deschide harta <ArrowRight size={16} /></a>}</div>
      </div></section>
    </main>
    <footer className={styles.footer}><div className={styles.wrap}><p>© {new Date().getFullYear()} {r.name} · {r.tagline}</p><a href="#sus">Înapoi sus <ArrowUp size={16} /></a></div></footer>
  </div>;
}
