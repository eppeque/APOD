<script lang="ts">
  import IconButton from "./IconButton.svelte";

  export let likesCount: number;
  export let isLiked: boolean;
</script>

<div class="flex items-center">
  <IconButton icon={isLiked ? "thumb_up" : "thumb_up_off_alt"} on:click />
  <p>{likesCount}</p>
</div>
