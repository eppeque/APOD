<script lang="ts">
  import type { Apod } from "$lib/apod";
  import { getContext } from "svelte";
  import Card from "./Card.svelte";
  import IconButton from "./IconButton.svelte";
  import { user } from "$lib/auth";
  import { goto } from "$app/navigation";
  import { base } from "$app/paths";
  import type { LikeStore } from "$lib/likes";

  export let apods: Apod[];

  let likes: LikeStore = getContext("likes");
  let index = 0;

  $: apod = apods[index];
  $: likesCount = $likes.get(apod.date)?.likes ?? 0;
  $: isLiked = $likes.get(apod.date)?.isLiked ?? false;

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
</script>

<div class="flex flex-col md:flex-row">
  <IconButton icon="arrow_back_ios" on:click={back} />
  <Card
    title={apod.title}
    subtitle={new Date(apod.date).toDateString()}
    body={apod.explanation}
    mediaUrl={apod.url}
    {likesCount}
    {isLiked}
    on:like={() => (isLiked ? unlike() : like())}
  />
  <IconButton icon="arrow_forward_ios" on:click={next} />
</div>
