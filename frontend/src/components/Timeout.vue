<template>
    <!-- Full screen overlay with transparency and modal -->
    <div class="fullscreen-overlay" v-if="showModal">
        <!-- Modal dialog -->
        <div id="timeout" class="modal-container">
            <div class="modal">
                <img src="/frontend/public/img/eyes.gif" alt="Eyes animation">
                <h2>Are you still there?</h2>
                <div class="countdown">{{countdown}}</div>

                <ul>
                    <li><button id="reset" @click="$router.push('/')">Reset</button></li>
                    <li><button id="continue" @click="stayActive">Continue</button></li>
                </ul>
                
            </div>
        </div>
    </div>
</template>

<style scoped>
.fullscreen-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7); 
    z-index: 9;
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal-container {
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10;
}

.modal {
    width: 800px;
    height: 700px;
    border-radius: 25px;
    background: #ffffff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 40px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
}

img {
    margin: 0 auto;
    display: block;
    width: 150px;
}

h2 {
    color: #1E2761;
    text-align: center;
    font-size: 55px;
}

.countdown {
    color: #1E2761;
    font-size: 120px;
    font-weight: bold;
    text-align: center;
}

ul {
  margin: 0;
  padding: 0;
  list-style-type: none;
}

ul li {
  display: inline-block;
  margin: 0 25px; 
}

#reset {
    width: 300px;
    height: 100px;
    font-size: 32px;
    margin: 15px 0;
    border: none;
    background-color: #7A2048;
    border-radius: 50px;
    transition: all 0.3s ease;
    color: #EDEDED;
    cursor: pointer;
}

#continue {
    width: 300px;
    height: 100px;
    font-size: 32px;
    margin: 15px 0;
    border: none;
    background-color: #408EC6;
    border-radius: 50px;
    transition: all 0.3s ease;
    color: #EDEDED;
    cursor: pointer;
}
</style>

<script setup>
import { onMounted, onUnmounted, ref, watch } from 'vue'

const props = defineProps({
  currentPath: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['reset'])

const showModal = ref(false)
const countdown = ref(10)

let inactivityTimer = null
let autoResetTimer = null
let countdownTimer = null

const TIME_LIMIT = 5000
const RESET_TIME = 10000
const ATTRACT_PATH = '/'

// Don't run on the root (/) aka the Attract screen
function isAttractScreen() {
  return props.currentPath === ATTRACT_PATH
}

// Reset the time if there is activity
function resetTimer() {
  if (isAttractScreen()) {
    cancelAllTimers()
    return
  }
  clearTimeout(inactivityTimer)
  inactivityTimer = setTimeout(() => {
    if (!isAttractScreen()) showModal.value = true
  }, TIME_LIMIT)
}

// Keeps page alive
function stayActive() {
  showModal.value = false
  resetTimer()
}

// Countdowns every sec
function startCountdown() {
  countdown.value = 10
  clearInterval(countdownTimer)
  countdownTimer = setInterval(() => {
    if (countdown.value > 0) countdown.value--
    if (countdown.value === 0) clearInterval(countdownTimer)
  }, 1000)
}

function triggerReset() {
  showModal.value = false
  setTimeout(() => emit('reset'), 500)
}

function cancelAllTimers() {
  clearTimeout(inactivityTimer)
  clearTimeout(autoResetTimer)
  clearInterval(countdownTimer)
  showModal.value = false
  countdown.value = 10
}

function activityListener() {
  if (!showModal.value && !isAttractScreen()) resetTimer()
}

function manageActivityListeners(action = 'add') {
  const method = action === 'add' ? 'addEventListener' : 'removeEventListener'
  window[method]('mousemove', activityListener)
  window[method]('keydown', activityListener)
  window[method]('touchstart', activityListener)
  window[method]('click', activityListener)
}

onMounted(() => {
  if (!isAttractScreen()) resetTimer()
  manageActivityListeners('add')
})

onUnmounted(() => {
  cancelAllTimers()
  manageActivityListeners('remove')
})

watch(showModal, (newVal) => {
  if (newVal) {
    startCountdown()
    clearTimeout(autoResetTimer)
    autoResetTimer = setTimeout(triggerReset, RESET_TIME)
  } else {
    clearInterval(countdownTimer)
    clearTimeout(autoResetTimer)
  }
})

watch(() => props.currentPath, (newPath) => {
  if (newPath === ATTRACT_PATH) {
    cancelAllTimers()
  } else {
    resetTimer()
  }
}, { immediate: true })
</script>














<!-- <script setup>
import { onMounted, onUnmounted, ref, watch } from 'vue'

// Accept currentPath as a prop to know which route path we're on
const props = defineProps({
  currentPath: {
    type: String,
    required: true
  }
})

const showModal = ref(false)
const countdown = ref(10) // Start with 10 seconds countdown
let timer = null
let resetTimeout = null
let countdownInterval = null
const TIME_LIMIT = 5000 // Show modal after X seconds of inactivity
const RESET_TIME = 10000 // Go to attract screen after 10 seconds with no response
const ATTRACT_PATH = '/' // The root path is the attract screen

const emit = defineEmits(['reset'])

// Check if we're on the attract/root screen
function isAttractScreen() {
  return props.currentPath === ATTRACT_PATH
}

function resetTimer() {
    // Safety check - don't run timer on Attract screen
    if (isAttractScreen()) {
        cancelAllTimers()
        return
    }
    clearTimeout(timer)
    
    // Start new timer
    timer = setTimeout(() => {
        // Double-check we're not on attract screen before showing modal
        if (!isAttractScreen()) {
            showModal.value = true
        }
    }, TIME_LIMIT)
}

function stayActive() {
    showModal.value = false
    resetTimer()
}

function startCountdown() {
    // Reset countdown value
    countdown.value = 10
    
    // Clear any existing interval
    clearInterval(countdownInterval)
    
    // Start new countdown interval
    countdownInterval = setInterval(() => {
        if (countdown.value > 0) {
            countdown.value--
        }
        
        // When countdown reaches 0, the resetTimeout will handle the redirect
        if (countdown.value === 0) {
            clearInterval(countdownInterval)
        }
    }, 1000)
}

function cancelAllTimers() {
    clearTimeout(timer)
    clearTimeout(resetTimeout)
    clearInterval(countdownInterval)
    showModal.value = false
    countdown.value = 10
}

function activityListener() {
    // Only reset timer if the modal isn't showing and we're not on attract screen
    if (!showModal.value && !isAttractScreen()) {
        resetTimer()
    }
}

// Setup event listeners for user activity
onMounted(() => {
    console.log('Timeout component mounted, path:', props.currentPath)
    
    // Only start the timer if we're not on the Attract screen
    if (!isAttractScreen()) {
        resetTimer()
    }

    window.addEventListener('mousemove', activityListener)
    window.addEventListener('keydown', activityListener)
    window.addEventListener('touchstart', activityListener)
    window.addEventListener('click', activityListener)
})

// Clean up on unmount
onUnmounted(() => {
    console.log('Timeout component unmounted')
    cancelAllTimers()
    window.removeEventListener('mousemove', activityListener)
    window.removeEventListener('keydown', activityListener)
    window.removeEventListener('touchstart', activityListener)
    window.removeEventListener('click', activityListener)
})

// Watch for modal state changes
watch(showModal, (newVal) => {
    // If the modal just became visible
    if (newVal) {
        console.log('Modal shown')
        // Double check we're not on attract screen
        // if (isAttractScreen()) {
        //     showModal.value = false
        //     return
        // }
        
        // Start the visual countdown
        startCountdown()
        
        // Clear any existing reset timeout
        clearTimeout(resetTimeout) 
        
        // Set new timeout to go to attract screen if no action is taken
        resetTimeout = setTimeout(() => {
            console.log('No interaction - resetting to attract')
            
            // First hide the modal with a complete transition
            showModal.value = false
            
            // Small delay before navigation to ensure modal is fully hidden
            setTimeout(() => {
                emit('reset')
            }, 500)
        }, RESET_TIME)
    } else {
        // Modal was closed - clear the countdown and reset timeout
        clearInterval(countdownInterval)
        clearTimeout(resetTimeout)
    }
})

// Watch for route change via props
watch(() => props.currentPath, (newPath) => {
    console.log('Path in Timeout component changed to:', newPath)
    
    if (newPath === ATTRACT_PATH) {
        // We're on the Attract screen - cancel everything
        cancelAllTimers()
    } else {
        // We've navigated to any other page - start the inactivity timer
        resetTimer()
    }
}, { immediate: true })
</script> -->