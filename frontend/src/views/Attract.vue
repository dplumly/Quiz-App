<template>
  	<div>
    	<h1>This is an attract screen</h1>

		<video autoplay loop muted playsinline class="bg-video">
			<source src="/frontend/public/attract-bg.mp4" type="video/mp4">
		</video>

		<NextButton id="attract-button" @click="$router.push('/instructions')">Tap to begin.</NextButton>
	</div>
</template>


<style scoped>
h1 {
  display: table;
  margin: 0 auto;
  margin: 500px auto 0 auto;
}

#attract-button {
	position: absolute;
	bottom: 200px;
	left: 0; 
  	right: 0; 
  	margin-inline: auto; 
}
</style>


<script>
import NextButton from "@/components/NextButton.vue";
export default {
    components: {
        NextButton,
    },
};
</script>





  