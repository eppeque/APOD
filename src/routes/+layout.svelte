<script>
  import "../app.css";
  import Footer from "../components/Footer.svelte";
  import Navbar from "../components/Navbar.svelte";
</script>

<div class="px-10 lg:px-40 min-h-screen bg-white font-lexend">
  <Navbar />
  <slot />
  <Footer />
</div>
