<script setup>
import { onMounted, nextTick, watch } from 'vue';
import { useRouter } from 'vitepress';
import Panzoom from '@panzoom/panzoom';

const { route } = useRouter();

onMounted(() => createPanzoom());

watch(
  () => route.path,
  async () => {
    await nextTick();

    createPanzoom();
  },
);

function createPanzoom() {
  document.querySelectorAll('img[alt = "zoom"], .mermaid').forEach(async (m) => {
    if (m.panzoom) {
      return false;
    }

    const wrapper = document.createElement('div');
    wrapper.classList.add('mermaid-wrapper');

    m.before(wrapper);

    wrapper.appendChild(m);

    await nextTick();

    const pz = Panzoom(m, {
      maxScale: 20,
      minScale: 0.5,
      canvas: true,
    });

    m.panzoom = pz;

    wrapper.appendChild(createActions(pz, wrapper, m));
    wrapper.addEventListener('wheel', pz.zoomWithWheel);
  });
}

function createActions(panzoom, wrapper, mermaid) {
  const actions = document.createElement('div');
  actions.classList.add('mermaid-wrapper__actions');

  actions.appendChild(createZoomIn(panzoom, wrapper, mermaid));
  actions.appendChild(createZoomOut(panzoom, wrapper, mermaid));
  actions.appendChild(createZoomRestore(panzoom, wrapper, mermaid));
  actions.appendChild(createFullScreenToggler(panzoom, wrapper, mermaid));

  return actions;
}

function createZoomIn(panzoom, wrapper, mermaid) {
  const zoomIn = document.createElement('div');

  zoomIn.classList.add('mermaid-wrapper__action');
  zoomIn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" 
  stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 5l0 14" /><path d="M5 12l14 0" /></svg>`;

  zoomIn.onclick = () => {
    panzoom.zoomIn();
  };

  return zoomIn;
}

function createZoomOut(panzoom, wrapper, mermaid) {
  const zoomOut = document.createElement('div');

  zoomOut.classList.add('mermaid-wrapper__action');
  zoomOut.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" 
  stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 12l14 0" /></svg>`;

  zoomOut.onclick = () => {
    panzoom.zoomOut();
  };

  return zoomOut;
}

function createZoomRestore(panzoom, wrapper, mermaid) {
  const zoomRestore = document.createElement('div');

  zoomRestore.classList.add('mermaid-wrapper__action');
  zoomRestore.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" 
  stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M21 21l-6 -6" />
  <path d="M3.268 12.043a7.017 7.017 0 0 0 6.634 4.957a7.012 7.012 0 0 0 7.043 -6.131a7 7 0 0 0 -5.314 -7.672a7.021 7.021 0 0 0 -8.241 4.403" /><path d="M3 4v4h4" /></svg>`;

  zoomRestore.onclick = () => {
    panzoom.reset();
  };

  return zoomRestore;
}

function createFullScreenToggler(panzoom, wrapper, mermaid) {
  const fullScreenToggler = document.createElement('div');

  fullScreenToggler.classList.add('mermaid-wrapper__action');
  fullScreenToggler.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" 
  stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 8v-2a2 2 0 0 1 2 -2h2" />
  <path d="M4 16v2a2 2 0 0 0 2 2h2" /><path d="M16 4h2a2 2 0 0 1 2 2v2" /><path d="M16 20h2a2 2 0 0 0 2 -2v-2" /></svg>`;

  fullScreenToggler.onclick = () => {
    panzoom.reset({ animate: false });
    wrapper.classList.toggle('is-fullscreen');
  };

  return fullScreenToggler;
}
</script>

<template>
</template>

<style lang="scss">
.mermaid-wrapper {
  display: block;
  min-height: 168px;
  overflow: hidden;
  position: relative;
  background: var(--vp-c-bg);

  &__actions {
    position: absolute;
    z-index: 10;
    right: 16px;
    bottom: 16px;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  &__action {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    font-weight: 600;
    color: var(--vp-button-alt-hover-text);
    background-color: var(--vp-button-alt-hover-bg);
    border-radius: 4px;
    padding: 4px;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;

    & > * {
      display: block;
      width: 20px;
      height: 20px;
      font-size: 20px;
      line-height: 1;
    }
  }

  &.is-fullscreen {
    position: fixed;
    z-index: 1000;
    inset: 0;
  }
}
</style>
