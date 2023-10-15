<script lang="ts">
  import { goto } from "$app/navigation";
  import { base } from "$app/paths";
  import { signUp, user } from "$lib/auth";
  import Button from "$lib/components/Button.svelte";
  import Input from "$lib/components/Input.svelte";
  import Title from "$lib/components/Title.svelte";
  import { countries } from "$lib/countries";
  import { onDestroy, onMount } from "svelte";
  import type { Unsubscriber } from "svelte/store";

  let errorMessage = "";
  let unsubscribe: Unsubscriber;

  onMount(() => {
    unsubscribe = user.subscribe((value) => {
      if (value !== null) {
        goto(base);
      }
    });
  });

  onDestroy(() => {
    if (unsubscribe) {
      unsubscribe();
      console.log("Unsubscribed!");
    }
  });

  async function handleSumbit(e: SubmitEvent) {
    const data = new FormData(e.target as HTMLFormElement);
    const entries = Object.fromEntries(data.entries());

    const firstname = entries.firstName as string;
    const lastname = entries.lastName as string;
    const email = entries.email as string;
    const password = entries.password as string;
    const passwordConfirm = entries.passwordConfirm as string;
    const country = entries.country as string;

    errorMessage = "";

    try {
      await signUp(
        { id: "", firstname, lastname, email, country, apods: [] },
        password,
        passwordConfirm
      );
    } catch (e: any) {
      errorMessage = e.message;
    }
  }
</script>

<svelte:head>
  <title>Sign Up - NASA APOD</title>
</svelte:head>

<Title text="Sign Up" />
{#if errorMessage !== ""}
  <p class="text-red-600 py-2">{errorMessage}</p>
{/if}
<form
  class="p-10 shadow-xl rounded-lg flex flex-col my-4"
  on:submit|preventDefault={handleSumbit}
>
  <Input title="First Name" type="text" id="firstName" isRequired />
  <Input title="Last Name" type="text" id="lastName" isRequired />
  <Input title="Email" type="email" id="email" isRequired />
  <Input title="Password" type="password" id="password" isRequired />
  <Input
    title="Confirm password"
    type="password"
    id="passwordConfirm"
    isRequired
  />
  <label for="country" class="py-2">Country</label>
  <select
    id="country"
    name="country"
    autocomplete="country-name"
    class="p-3 my-2 outline-none border-2 border-gray-200 rounded-md focus:border-blue-500"
  >
    <option value="US">United States</option>
    {#each countries as country}
      <option value={country.code}>{country.name}</option>
    {/each}
  </select>
  <div class="h-10" />
  <Button text="Create account" />
</form>
