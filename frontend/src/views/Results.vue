<template>
    <div>
        <h2>You did it!</h2>
        <p>You are great!!!</p>

        <MainButton class="finish-button" type="primary" @click="$router.push('/')">Finish</MainButton>
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

.finish-button {
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
