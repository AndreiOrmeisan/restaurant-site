import assert from "node:assert/strict";
import { test } from "node:test";
import { getRestaurant, loadRestaurants, parseRestaurantConfig } from "../src/lib/restaurants/load.mts";

test("încarcă și validează configurația FORNO", () => {
  const restaurants = loadRestaurants();
  const forno = getRestaurant("forno");

  assert.ok(forno);
  assert.deepEqual(forno, restaurants.find((restaurant) => restaurant.slug === "forno"));
  assert.equal(forno.layout, "classic");
  assert.equal(forno.categories.length, 5);
  assert.equal(forno.categories.flatMap((category) => category.products).length, 14);
});

test("raportează fișierul și câmpul atunci când prețul este invalid", () => {
  const forno = getRestaurant("forno");
  assert.ok(forno);
  forno.categories[0].products[0].price = -1;

  assert.throws(() => parseRestaurantConfig(JSON.stringify(forno), "test.json"), (error: Error) => {
    assert.match(error.message, /test\.json/);
    assert.match(error.message, /categories\[0\]\.products\[0\]\.price/);
    return true;
  });
});

test("respinge ID-uri de produs duplicate între categorii", () => {
  const forno = getRestaurant("forno");
  assert.ok(forno);
  forno.categories[1].products[0].id = forno.categories[0].products[0].id;

  assert.throws(() => parseRestaurantConfig(JSON.stringify(forno), "test.json"), /ID de produs duplicat/);
});

test("raportează un fișier JSON cu sintaxă invalidă", () => {
  assert.throws(() => parseRestaurantConfig("{", "test.json"), /test\.json: JSON invalid/);
});

test("întoarce undefined pentru un slug necunoscut", () => {
  assert.equal(getRestaurant("inexistent"), undefined);
});
