<script lang="ts">
  export let id: string;
  export let type: string;
  export let title: string;
  export let isRequired: boolean = false;
</script>

<label for={id} class="py-2">{title}</label>
<input
  {type}
  name={id}
  {id}
  class="p-3 my-2 outline-none border-2 border-gray-200 rounded-md focus:border-blue-500"
  required={isRequired}
/>
