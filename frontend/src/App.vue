<template>
	<div>
        <!-- Plays the main apps background video on all pages, but the attract screen-->
        <video
            v-if="$route.name !=='Attract'" 
            autoplay 
            loop 
            muted 
            playsinline 
            class="bg-video">
            <source src="/public/bg.mp4" type="video/mp4">
        </video>

        <!-- Gives the pages a fade transition -->
        <router-view v-slot="{ Component }">
            <transition name="fade" mode="out-in">
                <component :is="Component" />
            </transition>
        </router-view>

        <!-- <router-view v-slot="{ Component }">
            <transition name="fade" mode="out-in">
                <component :is="Component" :key="$route.fullPath" />
            </transition>
        </router-view> -->
	</div>
  </template>

<script>
	export default {
	name: "App"
	};
</script>

  