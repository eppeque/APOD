<script lang="ts">
  import Title from "../components/Title.svelte";
  import Spinner from "../components/Spinner.svelte";
  import { fetchLatestApods, type Apod } from "$lib/apod";
  import { onMount } from "svelte";

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
    {#each results as result}
      <li>{result.title}</li>
    {/each}
  {/await}
{/if}
