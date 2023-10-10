<script lang="ts">
    import Title from '$lib/components/Title.svelte';
    import type { Apod } from '$lib/apod';
    import { onMount } from "svelte";
    import { fetchApods } from '$lib/apod';
    import Spinner from '$lib/components/Spinner.svelte';
    import Article from '$lib/components/Article.svelte';

    let apodsPromise: Promise<Apod[]>;

    onMount(() => {
        apodsPromise = fetchApods();
    });

</script>

<Title text="APOD Catalog" />

{#if apodsPromise}
  {#await apodsPromise}
    <div class="w-full py-2 flex justify-center items-center">
        <Spinner />
    </div>
  {:then apods}
    <Article {apods} />
  {:catch err}
    <p class="text-center text-lg py-2 text-red-600">{err}</p>
  {/await}
{/if}