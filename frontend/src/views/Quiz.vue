<template>
    <div>
        <transition name="fade" mode="out-in">
            <h2 :key="currentIndex">{{ currentQuestion.text }}</h2>
        </transition>

  
        <div id="questions">
            <button v-for="(option, index) in currentQuestion.options" :key="index" @click="selectAnswer(option)" :class="{ isSelected: userAnswers[currentIndex] === option }"> {{ option }}</button>
        </div>
  
            <button class="back-button"  v-if="currentIndex > 0" @click="prevQuestion">Back</button>
            <button class="next-button" v-if="currentIndex < questions.length - 1" :disabled="!isAnswerSelected" @click="nextQuestion">Next</button>        
            <button class="submit-button" v-if="currentIndex === questions.length - 1" :disabled="!isAnswerSelected" @click="submitQuiz">Submit</button>  

        <div id="progress-bar-positioning">
            <div class="progress-container">
                <div class="progress-bar" :style="{ width: progressPercentage + '%' }"></div>
            </div>
        </div>
    </div>

</template>
  
  
<style scoped>
h2 {
    text-align: center;
    position: absolute;
    right: 0;
    left: 0;
    top: 400px;
    max-width: 900px;
    margin-left: auto;
    margin-right: auto;
    transition: opacity 0.3s ease-in-out;
}

#questions {
    position: absolute;
    right: 0;
    left: 0;
    top: 800px;
    display: grid;
    justify-content: center;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
  
.progress-container {
    width: 75%;
    height: 10px;
    background-color: #e0e0e0;
    border-radius: 5px;
    overflow: hidden;
    margin: 10px auto;
    position: relative;
    top: 1400px;
}
  
.progress-bar {
    height: 100%;
    background-color: #7A2048;
    transition: width 0.3s ease-in-out;
}

button {
    width: 700px;
    height: 100px;
    font-size: 36px;
    margin: 15px 0;
    border: none;
    background-color: #408EC6;
    border-radius: 50px;
    transition: 0.5s;
    color: #EDEDED;
}

button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
    opacity: 0.6;
}
  
.next-button, .submit-button {
    position: absolute;
    bottom: 200px;
    right: 100px;
    width: 280px;
    height: 100px;
}
  
.back-button {
    position: absolute;
    bottom: 200px;
    left: 100px;
    width: 280px;
    height: 100px;
}
  
.isSelected {
    background-color: #7A2048;
}
</style>

<script>
export default {
  data() {
    return {
      currentIndex: 0,
      questions: [],
      userAnswers: [],
    };
  },

  computed: {
    currentQuestion() {
      return this.questions[this.currentIndex] || { text: '', options: [] };
    },
    progressPercentage() {
      return this.questions.length
        ? ((this.currentIndex + 1) / this.questions.length) * 100
        : 0;
    },
    isAnswerSelected() {
      return !!this.userAnswers[this.currentIndex];
    }
  },

  methods: {
    async loadQuestions() {
      try {
        const res = await fetch('/frontend/public/questionnaire.json'); 
        const data = await res.json();
        this.questions = data;
      } catch (error) {
        console.error("Failed to load questions:", error);
      }
    },
    selectAnswer(option) {
      this.userAnswers[this.currentIndex] = option;
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
      const correctCount = this.questions.reduce((count, question, index) => {
        return count + (this.userAnswers[index] === question.answer ? 1 : 0);
      }, 0);

      fetch('http://localhost:3000/submit-quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers: this.userAnswers })
      })
      .then(response => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.text();
      })
      .then(() => {
        this.$router.push({
          path: '/results',
          query: { score: correctCount, total: this.questions.length }
        });
      })
      .catch(error => {
        console.error('Error submitting quiz:', error);
      });
    }
  },

  mounted() {
    this.loadQuestions();
  }
};
</script>  
  
