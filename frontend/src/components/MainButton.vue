<template>
  <button type="button" :class="buttonClass" @click="$emit('click')">
    <slot></slot>  
  </button>
</template>

<script>
export default {
    name: "MainButton",
    props: {
        type: {
        type: String,
        default: "primary", 
        },
    },
    computed: {
        buttonClass() {
            return {
                "btn-primary": this.type === "primary",
                "btn-secondary": this.type === "secondary",
            };
        },
    },
};
</script>


<style scoped>
button {
    padding: 10px 20px;
    border: none;
    cursor: pointer;
    font-size: 16px;
    border-radius: 25px;
    transition: 500ms;
}

.btn-primary {
    background-color: #007bff;
    color: white;
    width: 300px;
    height: 60px;
    font-size: 24px;
    border-radius: 50px;
}

.btn-secondary {
    background-color: #6c757d;
    color: white;
    width: 300px;
    height: 60px;
    font-size: 24px;
    border-radius: 50px;
}

.isSelected {
  background-color: red !important;
}
</style>
