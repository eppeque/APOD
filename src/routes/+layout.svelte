<script>
  import "../app.css";
  import Footer from "$lib/components/Footer.svelte";
  import Navbar from "$lib/components/Navbar.svelte";
  import { onMount } from "svelte";
  import { loadAuth } from "$lib/auth";

  onMount(loadAuth);
</script>

<div class="px-10 lg:px-40 min-h-screen bg-white font-lexend">
  <Navbar />
  <slot />
  <Footer />
</div>
