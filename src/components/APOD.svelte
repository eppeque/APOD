<script lang="ts">
  import type { Apod } from "$lib/apod";
  import Button from "./Button.svelte";
  import Link from "./Link.svelte";

  export let apod: Apod;
  let showDetails = false;

  const formattedDate = new Date(apod.date);
  const ytbRegex = /^https:\/\/www\.youtube\.com\/embed\/([a-zA-Z0-9]{11}).*$/;
  const groups = ytbRegex.exec(apod.url)!;
</script>

<div class="p-10 m-4 shadow-xl rounded-lg h-fit">
  <h2 class="text-3xl py-2">{apod.title}</h2>
  <p class="text-lg py-2">{formattedDate.toLocaleDateString()}</p>
  <img
    class="py-4"
    src={apod.media_type === "image"
      ? apod.url
      : `https://img.youtube.com/vi/${groups[1]}/hqdefault.jpg`}
    alt={apod.title}
  />
  {#if apod.media_type === "video"}
    <Link url="https://youtube.com/watch?v={groups[1]}" />
    <div class="h-4" />
  {/if}
  <Button
    text={showDetails ? "See less" : "See more"}
    on:click={() => (showDetails = !showDetails)}
  />

  {#if showDetails}
    <p
      class="text-lg my-4 p-3 rounded-md bg-gradient-to-b from-blue-200 to-red-200"
    >
      {apod.explanation}
    </p>
  {/if}
</div>
