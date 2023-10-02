<script lang="ts">
  import type { Apod } from "$lib/apod";
  import IconButton from "./IconButton.svelte";

  export let apod: Apod;
  let showDetails = false;

  $: formattedDate = new Date(apod.date);

  function toggleDetails() {
    showDetails = !showDetails;
  }
</script>

<div class="p-10 m-4 shadow-xl rounded-lg w-full">
  <h2 class="text-3xl py-2">{apod.title}</h2>
  <p class="text-lg py-2">{formattedDate.toDateString()}</p>
  <IconButton
    icon={showDetails ? "expand_less" : "expand_more"}
    on:click={toggleDetails}
  />
  {#if showDetails}
    <p
      class="text-lg my-4 p-3 rounded-md bg-gradient-to-b from-blue-200 to-red-200"
    >
      {apod.explanation}
    </p>
  {/if}

  {#if apod.media_type === "image"}
    <img
      class="py-4 mx-auto max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl"
      src={apod.url}
      alt={apod.title}
    />
  {:else}
    <iframe
      src={apod.url}
      class="py-4 mx-auto w-full"
      title="YouTube video player"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowfullscreen
    />
  {/if}
</div>
