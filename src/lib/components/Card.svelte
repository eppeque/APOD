<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import IconButton from "./IconButton.svelte";
  import LikeButton from "./LikeButton.svelte";

  export let title: string;
  export let subtitle: string;
  export let body: string;
  export let mediaUrl: string;
  export let likesCount: number;
  export let isLiked: boolean;

  const dispatch = createEventDispatcher();
  let showDetails = false;

  function toggleDetails() {
    showDetails = !showDetails;
  }

  function forward() {
    dispatch("like");
  }
</script>

<div class="p-10 m-4 shadow-xl rounded-lg w-full">
  <h2 class="text-3xl py-2">{title}</h2>
  <p class="text-lg py-2">{subtitle}</p>

  <LikeButton {likesCount} {isLiked} on:click={forward} />
  <IconButton
    icon={showDetails ? "expand_less" : "expand_more"}
    on:click={toggleDetails}
  />
  {#if showDetails}
    <p
      class="text-lg my-4 p-3 rounded-md bg-gradient-to-b from-blue-200 to-red-200"
    >
      {body}
    </p>
  {/if}

  {#if !mediaUrl.includes("youtube")}
    <img
      class="py-4 mx-auto max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl"
      src={mediaUrl}
      alt={title}
    />
  {:else}
    <iframe
      src={mediaUrl}
      class="py-4 mx-auto w-full"
      title="YouTube video player"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowfullscreen
    />
  {/if}
</div>
