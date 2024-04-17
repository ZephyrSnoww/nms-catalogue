<script>
  import PageTitle from "../../components/PageTitle.svelte";
  import SystemBrowser from "../../components/SystemBrowser.svelte";
</script>

<svelte:head>
  <title>NMS SYSTEMS CATALOGUE</title>
</svelte:head>

<PageTitle text="SYSTEMS DIRECTORY" />
<div class="page-content">
  <SystemBrowser />
  <div class="system-graphic"></div>
</div>

<style>
  .page-content {
    width: 100%;
    height: 100%;

    display: grid;
    grid-template-columns: 33% auto;
    grid-template-rows: 10% auto;
    grid-template-areas: "blank graphic" "browser graphic";
    gap: 1em;
  }

  .system-graphic {
    grid-area: graphic;
    border: 2px solid #fff1;
  }
</style>
