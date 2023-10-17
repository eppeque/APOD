<script lang="ts">
  import Title from "$lib/components/Title.svelte";
  import { user } from "$lib/auth";
  import { base } from "$app/paths";
  import { goto } from "$app/navigation";
  import type { Apod } from "$lib/apod";
  import { onMount, setContext } from "svelte";
  import { fetchApods } from "$lib/apod";
  import Spinner from "$lib/components/Spinner.svelte";
  import { createLikeStore, updateLikes } from "$lib/likes";
  import Carousel from "$lib/components/Carousel.svelte";

  onMount(() => {
    const unsubscribe = user.subscribe((value) => {
      if (value === null) {
        goto(base);
      }
    });

    return unsubscribe;
  });

  let apodsPromise: Promise<Apod[]>;
  let likes = createLikeStore();
  setContext("likes", likes);

  onMount(async () => {
    apodsPromise = fetchApods();
    await updateLikes(await apodsPromise, likes);
  });
</script>

<Title text="APOD Catalog" />

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
