<template>
    <div class="app-container">
      <!-- Background video that stays persistent -->
      <video
          v-if="currentPath !== '/'" 
          autoplay 
          loop 
          muted 
          playsinline 
          class="bg-video">
          <source src="/frontend/public/videos/main-bg.mp4" type="video/mp4">
      </video>
  
      <!-- Attract video that's always loaded but only visible on root path -->
      <video
          ref="attractVideo"
          autoplay 
          loop 
          muted 
          playsinline 
          class="attract-video"
          :class="{ 'visible': currentPath === '/' }">
          <source src="/frontend/public/videos/attract-bg.mp4" type="video/mp4">
      </video>
  
      <!-- Gives the pages a fade transition -->
      <router-view v-slot="{ Component }">
          <transition name="page" mode="out-in" @before-leave="prepareForTransition">
              <component :is="Component" />
          </transition>
      </router-view>
  
      <!-- Timeout Component - only create it when NOT on the root/attract page -->
      <Timeout 
        v-if="currentPath !== '/'" 
        @reset="goToAttract" 
        :currentPath="currentPath" 
      />
    </div>
  </template>


<style>
.app-container {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

/* Background videos - positioned absolutely */
.bg-video, .attract-video {
  position: fixed;
  right: 0;
  bottom: 0;
  min-width: 100%;
  min-height: 100%;
  width: auto;
  height: auto;
  z-index: -1;
}

/* Attract video visibility */
.attract-video {
  opacity: 0;
  transition: opacity 0.3s ease;
}

.attract-video.visible {
  opacity: 1;
}

/* Page transition effects - faster and smoother */
.page-enter-active,
.page-leave-active {
  transition: opacity 0.2s ease;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
}
</style>
  
<script setup>
    import { ref, watch } from 'vue'
    import Timeout from './components/Timeout.vue'
    import { useRouter, useRoute } from 'vue-router'
    
    const router = useRouter()
    const route = useRoute()
    const currentPath = ref(route.path)
    const attractVideo = ref(null)
    
    function goToAttract() {
        // Ensure attract video is preloaded and ready
        if (attractVideo.value) {
        attractVideo.value.play().catch(e => console.log('Video play error:', e))
        }
        
        // Navigate to attract screen with a small delay
        setTimeout(() => {
        router.push('/')
        }, 50)
    }
    
    function prepareForTransition() {
        // Prepare any resources needed for smooth transition
        if (route.path === '/' && attractVideo.value) {
        attractVideo.value.play().catch(e => console.log('Video play error:', e))
        }
    }
    
    // Keep track of current path
    watch(() => route.path, (newPath) => {
        console.log('Route path changed to:', newPath)
        currentPath.value = newPath
    }, { immediate: true })
    </script>

    
    <script>
    export default {
        name: "App"
    };
</script>