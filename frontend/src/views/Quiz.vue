<template>
    <div>
        <h2>{{ currentQuestion.text }}</h2>
        <h4>{{ currentIndex + 1 }}/{{ questions.length }}</h4>

        <div id="questions">
            <button
                v-for="(option, index) in currentQuestion.options"
                :key="index"
                @click="selectAnswer(option, $event)" :class="{ isSelected: userAnswers[currentIndex] === option }">
                {{ option }}
            </button>
        </div>

        <div> 
            <NextButton class="back-button" type="secondary" v-if="currentIndex > 0" @click="prevQuestion">Back</NextButton>
            <NextButton class="next-button" type="primary" v-if="currentIndex < questions.length - 1" @click="nextQuestion">Next</NextButton>
            <button v-if="currentIndex === questions.length - 1" @click="submitQuiz">Submit</button>          
        </div>
    </div>
</template>
  
  <script>
  export default {
    data() {
      return {
        currentIndex: 0,
        questions: [
          { text: "What is 2 + 2?", options: ["3", "4", "5"], answer: "4" },
          { text: "What is the capital of France?", options: ["Paris", "London", "Berlin"], answer: "Paris" },
          { text: "What is s';dlvsdfp[]gler?", options: ["lksjfg", "sdg", "sdfg"], answer: "sdfg" },
          // Add more questions dynamically...
        ],
        userAnswers: [],
      };
    },
    computed: {
      currentQuestion() {
        return this.questions[this.currentIndex];
      },
    },
    methods: {
      selectAnswer(option) {
        this.userAnswers[this.currentIndex] = option;
        button.classList.add("isSelected");
      },
      nextQuestion() {
        if (this.currentIndex < this.questions.length - 1) {
          this.currentIndex++;
        }
      },
      prevQuestion() {
        if (this.currentIndex > 0) {
          this.currentIndex--;
        }
      },
      submitQuiz() {   
        console.log("User answers:", this.userAnswers);
  
        fetch('http://localhost:3000/submit-quiz', {
            method: 'POST',  
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
            answers: this.userAnswers
            })
        })
        .then(response => {
            if (!response.ok) {
            throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(data => {
            console.log('Server response:', data);
            this.$router.push("/results");
        })
        .catch(error => {
            console.error('Error submitting quiz:', error);
        });
      },
    },
  };
  </script>
  

  



<style scoped>
h2 {
    display: table;
    margin: 500px auto 0 auto;
    text-align: center;
}

button {
    width: 400px;
    height: 100px;
    font-size: 32px;
    margin: 10px 0;
    border: none;
    background-color: aqua;
    border-radius: 50px;
    transition: 0.5s;
}

#questions {
    display: grid;    
    justify-content: center;
}

.next-button {
	position: absolute;
	bottom: 200px;
  	right: 100px;
}

.back-button {
	position: absolute;
	bottom: 200px;
  	left: 100px; 
}

.isSelected {
    background-color: red;
}
</style>





<!-- <script>
import NextButton from "@/components/NextButton.vue";
export default {
    components: {
        NextButton,
    },
};
</script> -->