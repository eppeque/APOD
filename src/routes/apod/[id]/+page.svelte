<script lang="ts">
  import Card from "$lib/components/Card.svelte";
  import { onMount } from "svelte";
  import type { PageData } from "./$types";
  import { createLikeStore, updateLikes } from "$lib/likes";

  export let data: PageData;
  let apod = data.apod;

  let likes = createLikeStore();
  $: likesCount = $likes.get(apod.date)?.likes ?? 0;
  $: isLiked = $likes.get(apod.date)?.isLiked ?? false;

  onMount(async () => {
    await updateLikes([apod], likes);
  });
</script>

<svelte:head>
  <title>{apod.title} - NASA APOD</title>
</svelte:head>

<Card
  title={apod.title}
  subtitle={apod.date}
  body={apod.explanation}
  mediaUrl={apod.url}
  {likesCount}
  {isLiked}
/>
