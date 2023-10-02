<script lang="ts">
  import Title from "../components/Title.svelte";
  import Spinner from "../components/Spinner.svelte";
  import { fetchLatestApods, type Apod } from "$lib/apod";
  import { onMount } from "svelte";
  import APOD from "../components/APOD.svelte";
  import IconButton from "../components/IconButton.svelte";

  let apodsPromise: Promise<Apod[]>;
  let index = 0;

  onMount(() => {
    apodsPromise = fetchLatestApods();
  });

  function next() {
    index = (index + 1) % 7;
  }

  function back() {
    const newIndex = index - 1;

    if (newIndex < 0) {
      index = 6;
    } else {
      index = newIndex;
    }
  }
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
    <div class="flex flex-col md:flex-row">
      <IconButton icon="arrow_back_ios" on:click={back} />
      <APOD apod={apods[index]} />
      <IconButton icon="arrow_forward_ios" on:click={next} />
    </div>
  {:catch err}
    <p class="text-center text-lg py-2 text-red-600">{err}</p>
  {/await}
{/if}
