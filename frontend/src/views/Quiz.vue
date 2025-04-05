<template>
    <div>
        <h2>{{ currentQuestion.text }}</h2>
        <h4>{{ currentIndex + 1 }}/{{ questions.length }}</h4>
  
        <div class="progress-container">
            <div class="progress-bar" :style="{ width: progressPercentage + '%' }"></div>
        </div>
  
        <div id="questions">
            <button v-for="(option, index) in currentQuestion.options" :key="index" @click="selectAnswer(option)" :class="{ isSelected: userAnswers[currentIndex] === option }"> {{ option }}</button>
        </div>
  
        <div>
            <button class="back-button"  v-if="currentIndex > 0" @click="prevQuestion">Back</button>
            <button class="next-button" v-if="currentIndex < questions.length - 1" :disabled="!isAnswerSelected" @click="nextQuestion">Next</button>
            <button class="submit-button" v-if="currentIndex === questions.length - 1" @click="submitQuiz">Submit</button>          
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
          { text: "What is the color of the sky?", options: ["Blue", "Green", "Red"], answer: "Blue" }
        ],
        userAnswers: [],
      };
    },

    computed: {
        currentQuestion() {
            return this.questions[this.currentIndex];
        },
        progressPercentage() {
            return ((this.currentIndex + 1) / this.questions.length) * 100;
        },
        isAnswerSelected() {
            return !!this.userAnswers[this.currentIndex];
        }
    },

    methods: {
        selectAnswer(option) {
            this.userAnswers[this.currentIndex] = option;
        },
        // nextQuestion() {
        //     if (this.userAnswers[this.currentIndex]) {
        //         if (this.currentIndex < this.questions.length - 1) {
        //             this.currentIndex++;
        //         }
        //     } 
        // },

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
    margin: 50px auto;
    text-align: center;
}
  
.progress-container {
    width: 100%;
    height: 10px;
    background-color: #e0e0e0;
    border-radius: 5px;
    overflow: hidden;
    margin-top: 10px;
}
  
.progress-bar {
    height: 100%;
    background-color: #4caf50;
    transition: width 0.3s ease-in-out;
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

button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
    opacity: 0.6;
}
  
#questions {
    display: grid;
    justify-content: center;
}
  
.next-button, .submit-button {
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
  



