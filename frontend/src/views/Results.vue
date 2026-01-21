<template>
    <div>

        <transition name="fade" mode="out-in">
            <div v-if="delayHeading">
                <!-- <img src="/frontend/public/party.png"> -->
                <DotLottieVue id="lottie-container" autoplay loop src="/public/data.json" />

                <h2>You did it!</h2>
                <h3 id="score">You got {{ score }}/{{ total }} correct!</h3>
            </div>
        </transition>

        

        <video 
            autoplay 
            muted 
            playsinline 
            class="bg-video">
			<source src="/public/Results-bg.mp4" type="video/mp4">
		</video>

        <MainButton class="finish-button" type="primary" @click="$router.push('/')">Finish</MainButton>
    </div>
</template>


<style scoped>
#lottie-container {
    position: absolute;
    width: 350px;
    height: 350px;
    top: 165px;
    right: 0;
    left: 50px;
    margin-left: 0;
    margin-right: 0;
    margin-inline: auto;
}

img {
    position: absolute;
    top: 320px;
    right: 0;
    left: 0;
    margin-left: 0;
    margin-right: 0;
    margin-inline: auto; 
    width: 135px;
}

h2 {
    display: table;
    margin: 500px auto 30px auto;
}

#score {
    margin: 100px auto 0 auto;
    text-align: center;
}

.finish-button {
	position: absolute;
	bottom: 200px;
  	right: 0;
    left: 0; 
    margin-inline: auto; 
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>



<script setup>
    import { DotLottieVue } from '@lottiefiles/dotlottie-vue'
</script>


<script>
import MainButton from "@/components/MainButton.vue";

export default {
    data() {
        return {
            delayHeading: false
        };
    },

    mounted() {
        setTimeout(() => {
            this.delayHeading = true;
        }, 1000);
    },

    components: {
        MainButton,
    },

  computed: {
    score() {
      return this.$route.query.score || 0;
    },
    total() {
      return this.$route.query.total || 0;
    }
  },
};
</script>







<!-- <script>
import MainButton from "@/components/MainButton.vue";

export default {
  components: {
    MainButton,
  },
  computed: {
    score() {
      return this.$route.query.score || 0;
    },
    total() {
      return this.$route.query.total || 0;
    }
  },
  mounted() {
    const script = document.createElement('script');
    script.src = '/lottiePlayer.js'; // No "/frontend/public/"
    script.async = true;

    script.onload = () => {
      const container = document.getElementById('lottie-container');
      lottie.loadAnimation({
        container: container,
        renderer: 'svg',
        loop: false,
        autoplay: true,
        path: '/data.json' // Make sure path is correct as well
      });
    };

    document.body.appendChild(script);
  },
};
</script> -->



