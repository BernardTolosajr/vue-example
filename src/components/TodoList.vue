<template>
  <div>
    <ul id="todo-list">
      <add-todo v-on:create-todo="onCreate"></add-todo>
      <li v-for="todo in todos"
          :data-id="todo.id"
          :class="[{completed: todo.completed, editing: todo.editing}]"
        >
        <todo
          :todo="todo"
          v-on:oneEditingComplete="onEditingComplete"
          v-on:onEditing="onEditing"
          v-on:onDelete="onDelete"
          v-on:onComplete="onComplete"/>
      </li>
    </ul>
    <footer id="footer">
      <strong>{{ getActive.length }}</strong> {{ getActive.length == 1 ? 'item' : 'items'}} left
      <ul>
        <li>
          <a :class="selectedClass('all')" href="#/">All</a>
        </li>
        <li>
          <a :class="selectedClass('active')" href="#/active">Active</a>
        </li>
        <li>
          <a :class="selectedClass('completed')" href="#/completed">Completed</a>
        </li>
      </ul>
    </footer>
  </div>
</template>

<script>
import AddTodo from './AddTodo'
import Todo from './Todo'

export default {
  name: 'TodoList',
  components: {
    AddTodo,
    Todo
  },
  mounted() {
    this.state = this.getHashState();
    console.log(this.state);
    window.onhashchange = () => {
      this.state = this.getHashState();
    }
  },
  computed: {
     getAll() {
      return this.todos
     },
     getActive () {
      return this.todos
     },
     getCompleted () {
      return this.todos
     }
  },
  data() {
    return {
      todos: [],
      state: 'all'
    }
  },
  methods: {
    selectedClass(name) {
      return {
        selected: this.getHashState() === name
      };
    },
    getHashState() {
      return location.hash.replace('#/', '') || 'all';
    },
    onCreate(todo) {
      this.todos.push(todo)
    },
    onDelete(todo) {
      this.todos = this.todos.filter(item => item.id !== todo.id);
    },
    onComplete(todo) {
      const todoIndex = this.todos.indexOf(todo);
      this.todos[todoIndex].completed = todo.completed;
    },
    onEditing(todo) {
      const todoIndex = this.todos.indexOf(todo);
      this.todos[todoIndex].editing = todo.editing;
    },
    onEditingComplete(todo) {
      const todoIndex = this.todos.indexOf(todo);
      this.todos[todoIndex].content = todo.content;
    }
  }
};
</script>
<style>
  #todo-list li.completed label {
    color: #a9a9a9;
    text-decoration: line-through;
  }
</style>
