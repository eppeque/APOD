<script>
  import { base } from "$app/paths";
  import Navlink from "./Navlink.svelte";
</script>

<nav class="py-10 flex justify-between items-center">
  <h2 class="text-lg lg:text-xl">NASA APOD</h2>

  <ul class="flex gap-10">
    <Navlink text="Accueil" url="{base}/" />
    <Navlink text="Connexion" url="{base}/sign-in" />
    <li>
      <a
        href="/sign-up"
        class="py-2 px-4 bg-gradient-to-r from-red-500 to-blue-500 text-white rounded-md"
        >S'inscrire</a
      >
    </li>
  </ul>
</nav>
