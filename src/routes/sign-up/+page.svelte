<script lang="ts">
  import Input from "../../components/Input.svelte";
  import Title from "../../components/Title.svelte";

  let fails: { message: string }[] = [];

  const handleSumbit = e => {

    fails = [];

    const data = new FormData(e.target);
    const value = Object.fromEntries(data.entries());

    value.password === value.confirmpassword
      ? console.log("ok")
      : fails.push({ message: "Passwords do not match" } as { message: string });

    typeof value.email === 'string' && value.email.includes("@")
      ? console.log("ok")
      : fails.push({ message: "Email is not valid" } as { message: string });

    fails = fails;
    console.log(value);
  }
</script>

<svelte:head>
  <title>Créer un compte - NASA APOD</title>
</svelte:head>

<Title text="Sign Up" />

{#if fails.length > 0}
  {#each fails as fail}
    <p class="text-red-500">{fail.message}</p>
  {/each}
{/if}

    <form class="p-5 shadow-xl rounded-lg flex flex-col my-4" action="#" method="POST" on:submit|preventDefault={handleSumbit}>
      <Input text="Last Name" type="text" id="lastname" />
      <Input text="First Name" type="text" id="firstname" />
      <Input text="Email" type="text" id="email" />
      <Input text="Password" type="password" id="password" />
      <Input text="Confirm password" type="password" id="confirmpassword" />
      <label for="country" class="block text-sm font-medium leading-6 text-gray-900">Country</label>
          <div class="mt-2">
            <select id="country" name="country" autocomplete="country-name" class="w-full p-3 outline-none border-2 border-gray-200 rounded-md focus:border-blue-500">
              <option>United States</option>
              <option>Canada</option>
              <option>Mexico</option>
            </select>
          </div>
      <div>
        <div class="h-10"></div>
        <button type="submit" class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out">
          Confirm
        </button>
      </div>
    </form>