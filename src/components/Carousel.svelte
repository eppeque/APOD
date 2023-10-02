<script lang="ts">
  import type { Apod } from "$lib/apod";
  import APOD from "./APOD.svelte";
  import IconButton from "./IconButton.svelte";

  export let apods: Apod[];
  let index = 0;

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

<div class="flex flex-col md:flex-row">
  <IconButton icon="arrow_back_ios" on:click={back} />
  <APOD apod={apods[index]} />
  <IconButton icon="arrow_forward_ios" on:click={next} />
</div>
