<template>
    <div>
        <h2>Quiz Instructions</h2>
        <h5>Read the instructions carefully <br> before starting.</h5>
        <div id="white-circle"></div>
        <div id="red-circle"></div>

        <MainButton class="next-button" type="primary" @click="$router.push('/quiz')">Next</MainButton>
    </div>
</template>


<style scoped>
h2 {
    display: table;
    margin: 0 auto;
    margin: 500px auto 30px auto;
    font-size: 84px;
}

h5 {
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
    background-color: #408EC6;
}

#red-circle {
    position: absolute;
    right: -150px;
    bottom: 800px;
    background-color: #7A2048;
    height: 320px;
    width: 320px;
    border-radius: 50%;
}

#white-circle {
    position: absolute;
    left: -100px;
    bottom: 400px;
    background-color: #d9d9d9;
    height: 185px;
    width: 185px;
    border-radius: 50%;
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