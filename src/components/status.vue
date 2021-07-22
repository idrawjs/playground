<template>
  <div v-if="globalData.demoStatus === 'LOADING' ">
    <div class="loading">
      <div class="loading-container loading-container-1">
        <div class="circle-1"></div>
        <div class="circle-2"></div>
        <div class="circle-3"></div>
        <div class="circle-4"></div>
      </div>
      <div class="loading-container loading-container-2">
        <div class="circle-1"></div>
        <div class="circle-2"></div>
        <div class="circle-3"></div>
        <div class="circle-4"></div>
      </div>
      <div class="loading-container loading-container-3">
        <div class="circle-1"></div>
        <div class="circle-2"></div>
        <div class="circle-3"></div>
        <div class="circle-4"></div>
      </div>
    </div>
  </div>
  <div class="error-status" v-if="globalData.demoStatus === 'NOT_FOUND' ">
    <div class="error-status-logo">
      <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="200" height="200"><path d="M517.818182 69.818182C765.207273 69.818182 965.818182 270.429091 965.818182 517.818182S765.207273 965.818182 517.818182 965.818182 69.818182 765.207273 69.818182 517.818182 270.429091 69.818182 517.818182 69.818182z m0 819.991273c205.405091 0 371.991273-166.586182 371.991273-371.991273S723.223273 145.826909 517.818182 145.826909 145.826909 312.413091 145.826909 517.818182s166.586182 371.991273 371.991273 371.991273z m-47.988364-195.979637a48.011636 48.011636 0 1 1 96 0 48.011636 48.011636 0 0 1-96 0zM493.800727 581.818182a8.029091 8.029091 0 0 1-7.982545-8.005818V301.847273c0-4.421818 3.607273-8.005818 8.005818-8.005818h47.988364c4.421818 0 8.005818 3.607273 8.005818 8.005818v271.988363c0 4.421818-3.607273 8.005818-8.005818 8.005819H493.847273z" fill="#7dc5eb"></path></svg>
    </div>
    <div class="error-status-title">Not Found</div>
  </div>
  <div class="error-status" v-if="globalData.demoStatus === 'NOT_FINISHED' ">
    <div class="error-status-logo">
      <svg  viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"  width="200" height="200"><path d="M512 64a448 448 0 1 1 0 896A448 448 0 0 1 512 64z m0 64a384 384 0 1 0 0 768A384 384 0 0 0 512 128z m-0.704 448.512c98.048 0 187.648 49.472 240.384 129.408l7.68 12.16-55.104 32.64a223.872 223.872 0 0 0-192.96-110.208c-75.968 0-145.28 38.144-186.432 99.776l-7.36 11.776-55.36-32.192a287.872 287.872 0 0 1 249.152-143.36zM384 320v128H320V320h64z m320 0v128h-64V320h64z"  fill="#7dc5eb"></path></svg>
    </div>
    <div class="error-status-title">Not Finished</div>
    <div class="error-status-title">It will take a while ...</div>
  </div>
</template>

<script setup lang="ts">
import { globalData } from './../util/global';

</script>

<style scoped>
.loading {
  margin: 100px auto;
  width: 40px;
  height: 40px;
  position: relative;
}
.loading-container-1 > div, .loading-container-2 > div, .loading-container-3 > div {
  width: 10px;
  height: 10px;
  background-color: var(--color-branding);
 
  border-radius: 100%;
  position: absolute;
  -webkit-animation: bouncedelay 1.2s infinite ease-in-out;
  animation: bouncedelay 1.2s infinite ease-in-out;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
}
.loading .loading-container {
  position: absolute;
  width: 100%;
  height: 100%;
}
.loading-container-2 {
  -webkit-transform: rotateZ(45deg);
  transform: rotateZ(45deg);
}
.loading-container-3 {
  -webkit-transform: rotateZ(90deg);
  transform: rotateZ(90deg);
}
.circle-1 { top: 0; left: 0; }
.circle-2 { top: 0; right: 0; }
.circle-3 { right: 0; bottom: 0; }
.circle-4 { left: 0; bottom: 0; }
.loading-container-2 .circle-1 {
  -webkit-animation-delay: -1.1s;
  animation-delay: -1.1s;
}
.loading-container-3 .circle-1 {
  -webkit-animation-delay: -1.0s;
  animation-delay: -1.0s;
}
.loading-container-1 .circle-2 {
  -webkit-animation-delay: -0.9s;
  animation-delay: -0.9s;
}
.loading-container-2 .circle-2 {
  -webkit-animation-delay: -0.8s;
  animation-delay: -0.8s;
}
.loading-container-3 .circle-2 {
  -webkit-animation-delay: -0.7s;
  animation-delay: -0.7s;
}
 
.loading-container-1 .circle-3 {
  -webkit-animation-delay: -0.6s;
  animation-delay: -0.6s;
}
.loading-container-2 .circle-3 {
  -webkit-animation-delay: -0.5s;
  animation-delay: -0.5s;
}
.loading-container-3 .circle-3 {
  -webkit-animation-delay: -0.4s;
  animation-delay: -0.4s;
}
.loading-container-1 .circle-4 {
  -webkit-animation-delay: -0.3s;
  animation-delay: -0.3s;
}
.loading-container-2 .circle-4 {
  -webkit-animation-delay: -0.2s;
  animation-delay: -0.2s;
}
.loading-container-3 .circle-4 {
  -webkit-animation-delay: -0.1s;
  animation-delay: -0.1s;
}
@-webkit-keyframes bouncedelay {
  0%, 80%, 100% { -webkit-transform: scale(0.0) }
  40% { -webkit-transform: scale(1.0) }
}
@keyframes bouncedelay {
  0%, 80%, 100% {
    transform: scale(0.0);
    -webkit-transform: scale(0.0);
  } 40% {
    transform: scale(1.0);
    -webkit-transform: scale(1.0);
  }
}

.error-status {
  display: flex;
  flex-direction: column;
  margin-top: 40px;
}

.error-status-logo {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 120px;
}
.error-status-logo svg {
  width: 100px;
}
.error-status-title {
  margin-top: 10px;
  text-align: center;
  font-size: 20px;
  line-height: 32px;
  color: #888888;
}

</style>