<template>
  <button v-on:click="doCountPlus">You clicked me {{ count }} times.</button>
</template>

<script type = "text/javascript" >
export default {
  name: 'button-counter',
  data() {
    return {
      count: 0
    }
  },
  methods: {
    doCountPlus () {
       this.count++;
    }
  }
};
