<template>
  <div>
    <button-counter />
    <ul>
      <li v-for="todo in todos">
        {{ todo.name }}
      </li>
    </ul>
  </div>
</template>

<script type = "text/javascript" >

import ButtonCounter from './ButtonCounter'

export default {
  name: 'TodoList',
  components: {
    ButtonCounter
  },
  data() {
    return {
      todos: [
        {name: 'a'},
        {name: 'b'}
      ]
    }
  }
};

</script>
<style>
</style>
