<script>
  import Dropdown from "./Dropdown.svelte";
</script>

<div class="system-browser">
  <div class="browser-panel search-container">
    <input type="text" placeholder="Search systems" triggerhover />
    <Dropdown values={["test", "test2", "test3", "test4", "longtest"]} />
  </div>

  <div class="browser-panel system-list"></div>
</div>

<style>
  .system-browser {
    grid-area: browser;
    display: grid;
    gap: 1em;
    grid-template-rows: 15% auto;
  }

  .search-container {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    justify-content: space-between;
  }

  .search-container > input {
    flex: 1 0 100%;
  }

  .system-list {
    background-color: #fff1;
    border-left: 5px solid var(--orange);
  }
</style>
