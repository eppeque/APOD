<script lang="ts">
    export let text: string;
    export let type: string;
    export let id: string;
  </script>

<label for="{text}" class="block text-base font-medium leading-6 text-gray-900">{text}</label>
<div class="mt-2">
    <input type="{type}" name="{id}" id="{id}" autocomplete="given-name" class="w-full p-3 outline-none border-2 border-gray-200 rounded-md focus:border-blue-500">
</div>