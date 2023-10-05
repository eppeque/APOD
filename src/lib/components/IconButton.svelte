<script lang="ts">
  export let icon: string;
</script>

<button
  class="py-2 px-4 rounded-full text-gray-600 hover:bg-gray-100 flex justify-center items-center material-icons"
  on:click
>
  {icon}
</button>
