"use client";
import { useRef, useState } from "react";
import Image from "next/image";
import { Pizza, Soup, Salad, CakeSlice, CupSoda, Search, X, Scale, UtensilsCrossed, Sandwich, Beef, Fish, Leaf, CookingPot } from "lucide-react";
import type { Restaurant } from "@/lib/restaurants/schema.mts";
import styles from "./classic.module.css";
function normalize(value: string) { return value.normalize("NFD").replace(/\p{M}/gu, "").toLowerCase(); }
const icons = { pizza: Pizza, pasta: Soup, salad: Salad, dessert: CakeSlice, drink: CupSoda, burger: Sandwich, meat: Beef, fish: Fish, starter: UtensilsCrossed, soup: CookingPot, vegan: Leaf };
const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function RestaurantMenu({ categories, description }: { categories: Restaurant["categories"]; description: string }) {
  const [active, setActive] = useState(categories[0].id);
  const [query, setQuery] = useState("");
  const input = useRef<HTMLInputElement>(null);
  const search = normalize(query.trim());
  const visible = categories.filter(c => search || c.id === active).flatMap(c => c.products.filter(p => !search || normalize(`${c.name} ${p.name} ${p.description}`).includes(search)));
  return <section className={styles.menu} id="meniu" aria-labelledby="menu-title"><div className={styles.wrap}>
    <div className={styles.menuHeader}><h2 id="menu-title"><span>Meniul nostru</span></h2><p>{description}</p></div>
    <nav className={styles.categories} aria-label="Categorii din meniu">{categories.map(c => { const Icon = c.icon ? icons[c.icon] : UtensilsCrossed; return <button key={c.id} type="button" aria-pressed={!search && c.id === active} onClick={() => { setActive(c.id); setQuery(""); }}><Icon aria-hidden="true" size={27} />{c.name}</button>; })}</nav>
    <div className={styles.searchRow}><div className={styles.searchControl}><Search size={18} aria-hidden="true" /><label className="sr-only" htmlFor="menu-search">Caută în meniu</label><input ref={input} id="menu-search" type="search" placeholder="Caută un preparat sau ingredient…" value={query} onChange={e => setQuery(e.target.value)} />{query && <button aria-label="Șterge căutarea" onClick={() => {setQuery(""); input.current?.focus();}}><X size={18} /></button>}</div></div>
    <p role="status" className={search ? styles.resultCount : "sr-only"}>{search ? `${visible.length} produse găsite în meniu.` : `${categories.find(c => c.id === active)?.name}: ${visible.length} produse.`}</p>
    {!visible.length && <div className={styles.empty}><h3>Niciun preparat găsit</h3><p>Încearcă alt nume sau ingredient.</p><button onClick={() => setQuery("")}>Resetează căutarea</button></div>}
    <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">{visible.map(p => <li className={styles.product} key={p.id}>
      {p.image && <div className={styles.productImage}><Image src={base + p.image} alt={p.image.includes("placeholder-") ? `Ilustrație provizorie pentru ${p.name}` : p.name} fill sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 25vw" unoptimized /></div>}
      <div className={styles.productBody}><h3>{p.name}</h3><p className={styles.description}>{p.description}</p>{p.quantity && <p className={styles.quantity}><Scale size={16} aria-hidden="true" />{p.quantity}</p>}<p className={styles.price}>{new Intl.NumberFormat("ro-RO", {minimumFractionDigits:2, maximumFractionDigits:2}).format(p.price)} {p.currency}</p>
      {!p.available && <p className={styles.details}>Indisponibil</p>}{(p.allergens?.length || p.nutrition) && <details className={styles.details}><summary>Alergeni{p.nutrition ? " și valori nutriționale" : ""}</summary>{p.allergens?.length ? <p>{p.allergens.join(", ")}</p> : null}{p.nutrition && <p>{p.nutrition}</p>}</details>}</div>
    </li>)}</ul>
  </div></section>;
}
