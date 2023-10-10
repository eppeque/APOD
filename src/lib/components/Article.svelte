<script lang="ts">
    import type { Apod } from "$lib/apod";
    import APOD from "./APOD.svelte";
  
    export let apods: Apod[];
    let index = 0;
  
    function next() {
      index = (index + 1) % apods.length;
    }
  
    function back() {
      const newIndex = index - 1;
  
      if (newIndex < 0) {
        index = apods.length + newIndex;
      } else {
        index = newIndex;
      }
    }
  </script>
  
  <div class="flex flex-col md:flex-row">
    {#each apods as apod}
        <APOD apod={apod} />
    {/each}
  </div>