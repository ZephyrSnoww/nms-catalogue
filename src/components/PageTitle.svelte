<script>
  export let text;
</script>

<div class="title-container">
  <div class="title-text">{text}</div>
  <img src="/assets/title-bar.png" alt="" class="title-bg" style:width={`${text.length + 10}ch`}>
</div>

<style>
  .title-container {
    position: relative;
    font-size: 1.75em;
  }

  .title-text {
    position: absolute;
    top: -1vh;
    left: -1vw;
  }

  .title-bg {
    position: absolute;
    top: -5vh;
    left: -5vw;
  }
</style>
