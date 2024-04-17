<script>
  export let values;
  export let placeholder = values[0];
  export let currentValue = placeholder;

  let isOpen = false;

  let longestStringLength = 0;

  for (let value of values) {
    if (value.length > longestStringLength) {
      longestStringLength = value.length;
    }
  }
</script>

<div class="dropdown" style:width={`${longestStringLength + 2}ch`}>
  <div
    class="clickout-box"
    on:click={() => (isOpen = false)}
    role="none"
    style:pointer-events={isOpen ? "unset" : "none"}
    style:backdrop-filter={isOpen ? "blur(10px)" : "blur(0px)"}
    style:background-color={isOpen ? "#0001" : "#0000"}
  ></div>

  <div
    class="displayed-value"
    style:border-bottom={isOpen ? "2px solid var(--orange)" : "none"}
    role="none"
    on:click={() => (isOpen = !isOpen)}
    triggerhover
  >
    {currentValue}
  </div>

  <div class="dropdown-menu">
    {#if isOpen}
      {#each values as value}
        <div
          class="dropdown-value"
          on:click={() => {
            currentValue = value;
            isOpen = false;
          }}
          role="none"
          triggerhover
        >
          {value}
        </div>
      {/each}
    {/if}
  </div>
</div>

<style>
  .dropdown {
    height: 1lh;
    z-index: 50;
  }

  .clickout-box {
    width: 200vw;
    height: 200vh;
    position: fixed;
    background-color: #0000;
    top: 0;
    left: 0;
    transform: translate(-50vw, -50vh);
    z-index: -5;
    transition: 0.25s ease-out;
  }

  .displayed-value,
  .dropdown-value {
    background-color: #fff1;
    border-left: 5px solid var(--orange);
    padding: 0px 10px;
    transition-property: background-color, border-left;
    transition-duration: 0.25s;
    transition-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }

  .dropdown-value:hover {
    background-color: #fff3;
    border-left: 10px solid var(--orange);
  }

  .dropdown-menu {
    z-index: 50;
  }
</style>
