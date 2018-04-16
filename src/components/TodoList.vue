<template>
  <div>
    <ul id="todo-list">
      <add-todo v-on:create-todo="onCreate"></add-todo>
      <li v-for="todo in data"
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
      <strong>{{ data.length }}</strong> {{ data.length == 1 ? 'item' : 'items'}} left
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
    <button
      @click.prevent="clearCompleted"
      >
      {{`Clear completed (${getCompleted.length})`}}
    </button>
  </div>
</template>

<script>
import AddTodo from './AddTodo'
import Todo from './Todo'
import storage from '../utils/localstorage'

export default {
  name: 'TodoList',
  components: {
    AddTodo,
    Todo
  },
  mounted() {
    this.state = this.getHashState();
    window.onhashchange = () => {
      this.state = this.getHashState();
    }
  },
  computed: {
    data () {
      switch (this.state) {
        case 'all':
          return this.getTodos(todo => {
            todo.editing = false
            return todo;
          });
        case 'active':
          return this.getTodos(todo => !todo.completed);
        case 'completed':
          return this.getTodos(todo => todo.completed);
      }
    },
    getCompleted () {
      return this.getTodos(todo => todo.completed);
    }
  },
  data() {
    return {
      todos: storage.get(),
      state: 'all'
    }
  },
  methods: {
    getTodos(func) {
      return this.todos.filter(func);
    },
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
      storage.set(this.todos);
    },
    onDelete(todo) {
      this.todos = this.todos.filter(item => item.id !== todo.id);
      storage.set(this.todos);
    },
    onComplete(todo) {
      const todoIndex = this.todos.indexOf(todo);
      this.todos[todoIndex].completed = todo.completed;
      storage.set(this.todos);
    },
    onEditing(todo) {
      const todoIndex = this.todos.indexOf(todo);
      this.todos[todoIndex].editing = todo.editing;
    },
    onEditingComplete(todo) {
      const todoIndex = this.todos.indexOf(todo);
      this.todos[todoIndex].content = todo.content;
      storage.set(this.todos);
    },
    clearCompleted() {
      this.todos = this.getTodos(item => !item.completed);
      storage.set(this.todos);
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
