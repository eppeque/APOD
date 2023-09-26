<script lang="ts">
  import Title from "../components/Title.svelte";
  import Spinner from "../components/Spinner.svelte";
  import { fetchLatestApods, type Apod } from "$lib/apod";
  import { onMount } from "svelte";
  import APOD from "../components/APOD.svelte";

  let apods: Promise<Apod[]>;

  onMount(() => {
    apods = fetchLatestApods();
  });
</script>

<svelte:head>
  <title>Accueil - NASA APOD</title>
</svelte:head>

<Title text="Dernières APODs" />
{#if apods}
  {#await apods}
    <Spinner />
  {:then results}
    <ul class="grid grid-cols-3">
      {#each results as apod}
        <APOD {apod} />
      {/each}
    </ul>
  {/await}
{/if}
