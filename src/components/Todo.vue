<template>
  <div @dblclick.prevent="editing">
    <input type="checkbox" @click="onComplete" :checked="todo.completed"/>
    <div class="view">
      <label>{{ todo.content }}</label>
    </div>
    <input
      type="text"
      :value="todo.content"
      class="edit"
      @keyup.enter="handleItemContent"
      @focusout="handleItemContent"
      >
    <button @click="deleteTodo(todo)">
      delete
    </button>
  </div>
</template>

<script>
  export default {
    name: 'Todo',
    props: ['todo'],
    methods: {
      deleteTodo(todo) {
        this.$emit('onDelete', todo);
      },
      onComplete(e) {
        this.todo.completed = e.target.checked;
        this.$emit('onComplete', this.todo);
      },
      editing() {
        this.todo.editing = true;
        this.$emit('onEditing', this.todo);
      },
      handleItemContent(e) {
        this.todo.content = e.target.value;
        this.todo.editing = false;
        this.$emit('oneEditingComplete', this.todo)
      }
    }
  }
</script>

<style>
  #todo-list li.editing {
  }

  #todo-list li.editing .view {
    display: none;
  }

  #todo-list li.editing .edit {
    display: block;
  }

  #todo-list li .edit {
    display: none;
  }
</style>
