<script>
  import { onMount } from "svelte";
  import { quadOut } from "svelte/easing";
  import { tweened, spring } from "svelte/motion";
  import { clicking, hovering } from "$lib";

  let cursorPos1 = spring(
    { x: 950, y: 540 },
    {
      damping: 0.5,
      stiffness: 0.75,
    },
  );

  let cursorPos2 = spring(
    { x: 950, y: 540 },
    {
      damping: 0.5,
      stiffness: 0.15,
    },
  );

  let cursorPos3 = spring(
    { x: 950, y: 540 },
    {
      damping: 0.5,
      stiffness: 0.075,
    },
  );

  let cursorPos4 = spring(
    { x: 950, y: 540 },
    {
      damping: 0.5,
      stiffness: 0.1,
    },
  );

  let uiPos = tweened(
    { x: 960, y: 540 },
    {
      duration: 500,
      easing: quadOut,
    },
  );

  let blur1Pos = tweened(
    { x: 960, y: 540 },
    {
      duration: 2500,
      easing: quadOut,
    },
  );

  let blur2Pos = tweened(
    { x: 960, y: 540 },
    {
      duration: 1000,
      easing: quadOut,
    },
  );

  let screenSize = { x: 1920, y: 1080 };
  let pageOffset = 5;
  let cursorHoverLeftPos = spring({ x: 0, y: 0 });
  let cursorHoverRightPos = spring({ x: 0, y: 0 });

  function updateMousePos(e) {
    cursorPos1.set({ x: e.clientX, y: e.clientY });
    cursorPos2.set({ x: e.clientX, y: e.clientY });
    cursorPos3.set({ x: e.clientX, y: e.clientY });
    cursorPos4.set({ x: e.clientX, y: e.clientY });
    uiPos.set({ x: e.clientX, y: e.clientY });
    blur1Pos.set({ x: e.clientX, y: e.clientY });
    blur2Pos.set({ x: e.clientX, y: e.clientY });

    let hoveredElement = document.elementFromPoint(e.clientX, e.clientY);
    if (hoveredElement.hasAttribute("triggerhover")) {
      hovering.set(true);
      let boundingRect = hoveredElement.getBoundingClientRect();

      cursorHoverLeftPos.set({
        x: boundingRect.left,
        y: boundingRect.top + boundingRect.height / 2,
      });

      cursorHoverRightPos.set({
        x: boundingRect.right,
        y: boundingRect.top + boundingRect.height / 2,
      });

      // cursorHoverLeftPos.x = boundingRect.left;
      // cursorHoverLeftPos.y = boundingRect.top + boundingRect.height / 2;
      // cursorHoverRightPos.x = boundingRect.right;
      // cursorHoverRightPos.y = boundingRect.top + boundingRect.height / 2;
    } else {
      hovering.set(false);

      cursorHoverLeftPos.set({
        x: e.clientX - 30,
        y: e.clientY,
      });

      cursorHoverRightPos.set({
        x: e.clientX + 30,
        y: e.clientY,
      });
    }
  }

  let cursor1Scale = 1;
  let cursor2Scale = 1;
  let cursor3Scale = 2;
  let cursor4Scale = 1;

  let cursor1Opacity = 1;
  let cursor2Opacity = 1;
  let cursor3Opacity = 0;
  let cursor4Opacity = 1;

  $: if ($clicking) {
    cursor1Scale = 1.5;
    cursor1Opacity = 1;

    cursor2Scale = 1;
    cursor2Opacity = 1;

    cursor3Scale = 1.1;
    cursor3Opacity = 1;

    cursor4Scale = 1.25;
    cursor4Opacity = 0;
  } else if ($hovering) {
    cursor1Scale = 1.25;
    cursor1Opacity = 1;

    cursor2Scale = 1;
    cursor2Opacity = 1;

    cursor3Scale = 2;
    cursor3Opacity = 0;

    cursor4Scale = 1;
    cursor4Opacity = 0;
  } else {
    cursor1Scale = 1;
    cursor1Opacity = 1;

    cursor2Scale = 1;
    cursor2Opacity = 1;

    cursor3Scale = 2;
    cursor3Opacity = 0;

    cursor4Scale = 1.5;
    cursor4Opacity = 0;
  }

  onMount(() => {
    screenSize = {
      x: document.body.clientWidth,
      y: document.body.clientHeight,
    };
  });
</script>

<div
  id="app-container"
  on:mousemove={updateMousePos}
  on:mousedown={() => {
    clicking.set(true);
  }}
  on:mouseup={() => {
    clicking.set(false);
  }}
  role="none"
>
  <div
    id="page-container"
    style:transform={`translate(${-(pageOffset * ($uiPos.x / screenSize.x) - pageOffset / 2)}vh, ${-(pageOffset * ($uiPos.y / screenSize.y) - pageOffset / 2)}vh)`}
  >
    <slot />
  </div>

  <div
    class="cursor-container cursor-1-container"
    style:top={`${$cursorPos1.y}px`}
    style:left={`${$cursorPos1.x}px`}
    style:transform={`scale(${cursor1Scale})`}
    style:opacity={cursor1Opacity}
  >
    <img
      src="/assets/cursor/reticle_crosshair.png"
      alt=""
      class="cursor-img cursor-1"
    />
  </div>

  <div
    class="cursor-container cursor-2-container"
    style:top={`${$cursorPos2.y}px`}
    style:left={`${$cursorPos2.x}px`}
    style:transform={`scale(${cursor2Scale})`}
    style:opacity={cursor2Opacity}
  >
    <img
      src="/assets/cursor/reticle_dashed-circle.png"
      alt=""
      class="cursor-img cursor-2"
    />
    <img
      src="/assets/cursor/reticle_inner-cuffs.png"
      alt=""
      class="cursor-img cursor-3"
    />
  </div>

  <div
    class="cursor-container cursor-3-container"
    style:top={`${$cursorPos3.y}px`}
    style:left={`${$cursorPos3.x}px`}
    style:transform={`scale(${cursor3Scale})`}
    style:opacity={cursor3Opacity}
  >
    <img
      src="/assets/cursor/reticle_circle.png"
      alt=""
      class="cursor-img cursor-4"
    />
    <img
      src="/assets/cursor/reticle_arrows.png"
      alt=""
      class="cursor-img cursor-5"
    />
  </div>

  <div
    class="cursor-container cursor-4-container"
    style:top={`${$cursorPos4.y}px`}
    style:left={`${$cursorPos4.x}px`}
    style:transform={`scale(${cursor4Scale})`}
    style:opacity={cursor4Opacity}
  >
    <img
      src="/assets/cursor/reticle_stripes.png"
      alt=""
      class="cursor-img cursor-6"
    />
    <img
      src="/assets/cursor/reticle_outter-cuffs.png"
      alt=""
      class="cursor-img cursor-7"
    />
  </div>

  <div
    class="cursor-hover-container left"
    style:top={`${$cursorHoverLeftPos.y}px`}
    style:left={`${$cursorHoverLeftPos.x}px`}
    style:opacity={$hovering ? 1 : 0}
  >
    <img
      src="/assets/cursor/reticle_left.png"
      alt=""
      class="cursor-hover-img"
    />
  </div>

  <div
    class="cursor-hover-container right"
    style:top={`${$cursorHoverRightPos.y}px`}
    style:left={`${$cursorHoverRightPos.x}px`}
    style:opacity={$hovering ? 1 : 0}
  >
    <img
      src="/assets/cursor/reticle_right.png"
      alt=""
      class="cursor-hover-img"
    />
  </div>

  <div
    id="blur1"
    class="bg-element"
    style:top={`${$blur1Pos.y}px`}
    style:left={`${$blur1Pos.x}px`}
  >
    <img src="/assets/blur.png" alt="" />
  </div>

  <div
    id="blur2"
    class="bg-element"
    style:top={`${$blur2Pos.y}px`}
    style:left={`${$blur2Pos.x}px`}
  >
    <img src="/assets/blur.png" alt="" />
  </div>
</div>

<style>
  :global(h1) {
    margin: 0;
    font-size: 1.75em;
  }

  :global(input) {
    background-color: #fff1;
    border: none;
    color: unset;
    font-size: unset;
    font-family: unset;
    outline: none;

    padding-left: 10px;
    border-left: 5px solid var(--orange);
  }

  #app-container {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  #page-container {
    width: 95vw;
    height: 95vh;
    z-index: 10;
  }

  .cursor-container {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 100;
    pointer-events: none;
    transition-property: transform, opacity;
    transition-duration: 0.25s;
    transition-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }

  .cursor-img {
    position: absolute;
    scale: 0.33;
  }

  .cursor-2 {
    animation: cursorDashesRotate 15s linear infinite;
  }
  .cursor-4,
  .cursor-5 {
    animation: cursorDashesRotate 10s linear infinite reverse;
  }
  .cursor-3,
  .cursor-7 {
    animation: cursorStabilization 10s ease-in-out infinite -0.2s;
  }
  .cursor-6 {
    animation: cursorStabilizationLess 10s ease-in-out infinite;
  }
  .cursor-7 {
    animation: cursorStabilization 10s ease-in-out infinite;
  }

  .cursor-hover-container {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: flex-start;

    transition-property: opacity;
    transition-duration: 0.5s;
    transition-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    z-index: 100;
    pointer-events: none;
  }

  .cursor-hover-container > img {
    height: 2.5lh;
  }

  .cursor-hover-container.left {
    justify-content: flex-end;
  }

  .cursor-hover-img {
    position: absolute;
  }

  .bg-element {
    position: absolute;
    pointer-events: none;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .bg-element > * {
    position: absolute;
  }

  #blur1 > img {
    width: 250vw;
    opacity: 0;
    animation: blurFade 4s ease-out forwards;
    filter: hue-rotate(270deg);
  }

  #blur2 > img {
    width: 100vw;
    opacity: 0;
    animation: blurFade 4s ease-out forwards;
    filter: hue-rotate(310deg);
  }

  @keyframes blurFade {
    from {
      opacity: 0;
    }
    to {
      opacity: 0.1;
    }
  }

  @keyframes cursorDashesRotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  @keyframes cursorStabilization {
    0% {
      transform: rotate(-15deg);
    }
    10% {
      transform: rotate(3deg);
    }
    17% {
      transform: rotate(-6deg);
    }
    30% {
      transform: rotate(10deg);
    }
    40% {
      transform: rotate(5deg);
    }
    50% {
      transform: rotate(15deg);
    }
    65% {
      transform: rotate(-5deg);
    }
    74% {
      transform: rotate(2deg);
    }
    82% {
      transform: rotate(-12deg);
    }
    93% {
      transform: rotate(2deg);
    }
    100% {
      transform: rotate(-15deg);
    }
  }

  @keyframes cursorStabilizationLess {
    0% {
      transform: rotate(-5deg);
    }
    10% {
      transform: rotate(1deg);
    }
    17% {
      transform: rotate(-2deg);
    }
    30% {
      transform: rotate(3deg);
    }
    40% {
      transform: rotate(2deg);
    }
    50% {
      transform: rotate(5deg);
    }
    65% {
      transform: rotate(-2deg);
    }
    74% {
      transform: rotate(1deg);
    }
    82% {
      transform: rotate(-4deg);
    }
    93% {
      transform: rotate(2deg);
    }
    100% {
      transform: rotate(-5deg);
    }
  }
</style>
