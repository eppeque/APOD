<script lang="ts">
  import { signIn } from "$lib/auth";
  import Input from "$lib/components/Input.svelte";
  import Title from "$lib/components/Title.svelte";
  import Button from "$lib/components/Button.svelte";

  let errorMessage = "";

  async function handleSumbit(e: SubmitEvent) {
    const data = new FormData(e.target as HTMLFormElement);
    const entries = Object.fromEntries(data.entries());

    const email = entries.email as string;
    const password = entries.password as string;

    errorMessage = "";

    try {
      await signIn(
        email,
        password
      );
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
  <Input title="Email" type="email" id="email" />
  <Input title="Password" type="password" id="password" />

<div class="h-10" />
<Button text="Connect" />
</form>
