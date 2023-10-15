<script lang="ts">
  import Title from "$lib/components/Title.svelte";
  import Spinner from "$lib/components/Spinner.svelte";
  import { fetchLatestApods, type Apod } from "$lib/apod";
  import { onMount, setContext } from "svelte";
  import Carousel from "$lib/components/Carousel.svelte";
  import { createLikeStore, updateLikes } from "$lib/likes";

  let apodsPromise: Promise<Apod[]>;
  let likes = createLikeStore();
  setContext("likes", likes);

  onMount(async () => {
    apodsPromise = fetchLatestApods();
    await updateLikes(await apodsPromise, likes);
  });
</script>

<svelte:head>
  <title>Home - NASA APOD</title>
</svelte:head>

<Title text="Latest APODs" />
{#if apodsPromise}
  {#await apodsPromise}
    <div class="w-full py-2 flex justify-center items-center">
      <Spinner />
    </div>
  {:then apods}
    <Carousel {apods} />
  {:catch err}
    <p class="text-center text-lg py-2 text-red-600">{err}</p>
  {/await}
{/if}
