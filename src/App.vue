<template>
 <div class="todo-container">
    <div class="todo-wrap">
      <Header :addTodo='addTodo'/>
      <List :todos='todos' :deleteTodo='deleteTodo' :updateTodo='updateTodo'/>
      <Footer :todos='todos'/>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">

  import Header from './components/Header.vue'
  import List from './components/List.vue'
  import Footer from './components/Footer.vue'
  import './base.css'
  export default {
    data () {
      return {
        todos: [
          {id: 1, title: 'haha', complete: false},
          {id: 2, title: 'haha1', complete: false},
          {id: 3, title: 'haha2', complete: true}
          ]
      }
    },
    methods: {
      addTodo (todo) {
        this.todos.unshift(todo)
      },
      updateTodo (todo, value) {
        todo.complete = value
      },
      deleteTodo (index) {
        this.todos.splice(index, 1)
      }
    },
    components: {
      Header,
      List,
      Footer
    }
  }
</script>

<style   scoped>
/*app*/
.todo-container {
  width: 600px;
  margin: 0 auto;
}
.todo-container .todo-wrap {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}
</style>
