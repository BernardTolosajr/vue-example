<template>
  <div>
    <input v-model="content" type='text'>
    <button v-on:click="add()">
      Create
    </button>
  </div>
</template>

<script>
  export default {
    name: 'AddTodo',
    data () {
      return {
        id: 0,
        content: '',
      }
    },
    methods: {
      add() {
        const id = String(+ new Date());
        const content = this.content;
        this.$emit('create-todo', {
          id,
          content,
          completed: false,
          editing: false
        });
      }
    }
  }
</script>
