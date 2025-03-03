<template>
    <div>
        <h2>Quiz Instructions</h2>
        <p>Read the instructions carefully before starting.</p>

        <NextButton class="next-button" type="primary" @click="$router.push('/quiz')">Next</NextButton>
    </div>
</template>


<style scoped>
h2 {
    display: table;
    margin: 0 auto;
    margin: 500px auto 0 auto;
}

p {
    margin: 0 auto;
    display: table;
    text-align: center;
}

.next-button {
	position: absolute;
	bottom: 200px;
  	right: 0;
    left: 0; 
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