<script lang="ts">
  import { signIn, user } from "$lib/auth";
  import Input from "$lib/components/Input.svelte";
  import Title from "$lib/components/Title.svelte";
  import Button from "$lib/components/Button.svelte";
  import { goto } from "$app/navigation";
  import { base } from "$app/paths";
  import { onMount } from "svelte";

  let errorMessage = "";

  onMount(() => {
    user.subscribe((token) => {
      if (token !== null) {
        goto(base);
      }
    });
  });

  async function handleSumbit(e: SubmitEvent) {
    const data = new FormData(e.target as HTMLFormElement);
    const entries = Object.fromEntries(data.entries());

    const email = entries.email as string;
    const password = entries.password as string;

    errorMessage = "";

    try {
      await signIn(email, password);
    } catch (e: any) {
      errorMessage = e.message;
    }
  }
</script>

<svelte:head>
  <title>Sign In - NASA APOD</title>
</svelte:head>

<Title text="Sign In" />
{#if errorMessage !== ""}
  <p class="text-red-600 py-2">{errorMessage}</p>
{/if}
<form
  class="p-10 shadow-xl rounded-lg flex flex-col my-4"
  on:submit|preventDefault={handleSumbit}
>
  <Input title="Email" type="email" id="email" isRequired />
  <Input title="Password" type="password" id="password" isRequired />

  <div class="h-10" />
  <Button text="Connect" />
</form>
