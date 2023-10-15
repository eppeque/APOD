<script lang="ts">
  import { goto } from "$app/navigation";
  import { base } from "$app/paths";
  import type { Apod } from "$lib/apod";
  import { user, token } from "$lib/auth";
  import { getContext } from "svelte";
  import IconButton from "./IconButton.svelte";
  import LikeButton from "./LikeButton.svelte";
  import type { LikeStore } from "$lib/likes";

  export let apod: Apod;
  let showDetails = false;
  let likes: LikeStore = getContext("likes");

  $: formattedDate = new Date(apod.date);
  $: likeStatus = $likes?.get(apod.date);

  function toggleDetails() {
    showDetails = !showDetails;
  }

  async function like() {
    if ($user === null) {
      goto(`${base}/sign-in`);
      return;
    }

    await likes.like(apod.date);
  }

  async function unlike() {
    if ($user === null) {
      goto(`${base}/sign-in`);
      return;
    }

    await likes.unlike(apod.date);
  }

  //TODO : modifier l'icone du like + incrémenter le nombre de like + afficher l'icone du like si l'utilisateur a déjà liké
</script>

<div class="p-10 m-4 shadow-xl rounded-lg w-full">
  <h2 class="text-3xl py-2">{apod.title}</h2>
  <p class="text-lg py-2">{formattedDate.toDateString()}</p>

  <LikeButton
    likesCount={likeStatus?.likes ?? 0}
    isLiked={likeStatus?.isLiked ?? false}
    on:click={() => {
      likeStatus?.isLiked ? unlike() : like();
    }}
  />
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
