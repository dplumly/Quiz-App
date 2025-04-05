<template>
    <div>
        <h2>Quiz Instructions</h2>
        <p>Read the instructions carefully before starting.</p>

        <MainButton class="next-button" type="primary" @click="$router.push('/quiz')">Next</MainButton>
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
import MainButton from "@/components/MainButton.vue";
export default {
    components: {
        MainButton,
    },
};
</script>