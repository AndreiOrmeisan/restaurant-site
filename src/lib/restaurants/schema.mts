import { z } from "zod";

const text = z.string().trim().min(1, "Câmpul nu poate fi gol.");
const id = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Folosește litere mici, cifre și cratime.");
const color = z.string().regex(/^#[0-9a-f]{6}$/i, "Folosește formatul #RRGGBB.");
const phone = z.string().regex(/^\+[1-9]\d{7,14}$/, "Folosește formatul internațional, fără spații.");
const imagePath = z.string().regex(
  /^\/(?:[\w-]+\/)*[\w-]+\.(?:avif|gif|jpe?g|png|svg|webp)$/i,
  "Folosește o cale către o imagine locală din public/.",
);

const productSchema = z.strictObject({
  id,
  name: text,
  description: text,
  price: z.number().nonnegative(),
  currency: z.enum(["RON", "EUR"]),
  image: imagePath.optional(),
  quantity: text.optional(),
  available: z.boolean(),
  allergens: z.array(text).optional(),
  nutrition: text.optional(),
});

const categorySchema = z.strictObject({
  id,
  name: text,
  products: z.array(productSchema).min(1),
  icon: z.enum(["pizza", "pasta", "salad", "dessert", "drink", "burger", "meat", "fish", "starter", "soup", "vegan"]).optional(),
});

export const restaurantSchema = z.strictObject({
  slug: id,
  name: text,
  tagline: text,
  hero: z.strictObject({ eyebrow: text, title: text, emphasis: text, description: text, imageAlt: text }),
  about: z.strictObject({ title: text, description: text }),
  menuDescription: text,
  logo: imagePath,
  logoStyle: z.enum(["wordmark", "seal"]).optional(),
  heroImage: imagePath.optional(),
  layout: z.literal("classic"),
  theme: z.strictObject({
    primary: color,
    background: color,
    text: color,
    accent: color,
  }),
  phone: phone.optional(),
  email: z.email().optional(),
  whatsapp: phone.optional(),
  address: text.optional(),
  mapsUrl: z.url({ protocol: /^https$/ }).optional(),
  openingHours: z.array(text).min(1).optional(),
  deliveryAvailable: z.boolean(),
  categories: z.array(categorySchema).min(1),
}).check(({ value, issues }) => {
  const categoryIds = new Set<string>();
  const productIds = new Set<string>();

  value.categories.forEach((category, categoryIndex) => {
    if (categoryIds.has(category.id)) {
      issues.push({
        code: "custom",
        input: category.id,
        path: ["categories", categoryIndex, "id"],
        message: "ID de categorie duplicat.",
      });
    }
    categoryIds.add(category.id);

    category.products.forEach((product, productIndex) => {
      if (productIds.has(product.id)) {
        issues.push({
          code: "custom",
          input: product.id,
          path: ["categories", categoryIndex, "products", productIndex, "id"],
          message: "ID de produs duplicat.",
        });
      }
      productIds.add(product.id);
    });
  });
});

export type Restaurant = z.infer<typeof restaurantSchema>;
