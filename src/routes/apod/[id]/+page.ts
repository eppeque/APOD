import type { Apod } from "$lib/apod.js";
import { error } from "@sveltejs/kit";

export async function load({ params, fetch }) {
  const res = await fetch(`https://spacelab.henni.be/apod/${params.id}`);

  if (res.ok) {
    return {
      apod: (await res.json()) as Apod,
    };
  }

  throw error(503, { message: "Couldn't fetch from API" });
}
