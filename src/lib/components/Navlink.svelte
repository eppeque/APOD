<script lang="ts">
  import { page } from "$app/stores";

  export let text: string;
  export let url: string;
</script>

<li>
  <a
    href={url}
    class={`hover:underline hover:text-blue-600 ${
      `${$page.url.pathname}` === url ? "text-blue-600" : ""
    }`}>{text}</a
  >
</li>
