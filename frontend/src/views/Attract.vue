<template>
  	<div>
    	<h1>This is an attract screen</h1>
        <h5>Read the instructions carefully <br> before starting.</h5>

		<video 
            autoplay 
            loop muted 
            playsinline 
            class="bg-video">
			<source src="/public/attract-bg.mp4" type="video/mp4">
		</video>

		<MainButton id="attract-button" @click="$router.push('/instructions')">Tap to begin.</MainButton>
	</div>
</template>


<style scoped>
h1 {
  display: table;
  margin: 500px auto 30px auto;
  max-width: 900px;
  text-align: center;
}

h5 {
    margin: 0 auto;
    display: table;
    text-align: center;
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
import MainButton from "@/components/MainButton.vue";
export default {
    components: {
        MainButton,
    },
};
</script>





  