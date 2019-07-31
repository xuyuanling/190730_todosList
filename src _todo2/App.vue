<template>
 <div class="todo-container">
    <div class="todo-wrap">
      <Header ref="header"/>
      <List :todos='todos' />
      <!--<Footer :todos='todos' :selectAll='selectAll' :deleteCompleted='deleteCompleted'/> -->
      <Footer>
        <input type="checkbox" v-model="checkAll" slot="left"/>
        <span slot='middle'>
          <span>已完成{{completeCount}}</span> / 全部{{todos.length}}
        </span>
        <button class="btn btn-danger" v-if="completeCount>0" @click="deleteCompleted" slot="right">清除已完成任务</button>
      </Footer>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Pubsub from 'pubsub-js'
  import Header from './components/Header.vue'
  import List from './components/List.vue'
  import Footer from './components/Footer.vue'
  import './base.css'
  export default {
    data () {
      return {
        todos: JSON.parse(localStorage.getItem('todos_key') || '[]')
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
      },
      selectAll (value) {
        this.todos.forEach(todo => (todo.complete = value))
      },
      deleteCompleted () {
       this.todos = this.todos.filter(todo => !todo.complete)
      }
    },
    computed: {
          completeCount () {
              return this.todos.reduce((pre, todo) => pre + (todo.complete ? 1 : 0), 0)
          },
          checkAll: {
            get () {
              return this.todos.length === this.completeCount && this.completeCount > 0
            },
            set (value) {
              this.selectAll(value)
            }
          }
      },
    mounted () {
      // 通过ref 进行父子间通信
      this.$refs.header.$on('addTodo', this.addTodo)
      // 通过事件总线绑定自定义监听
      this.$EventBus.$on('deleteTodo', this.deleteTodo)
      // this.$EventBus.$on('updateTodo', this.updateTodo)
      Pubsub.subscribe('updateTodo', (msg, {todo, value}) => {
        this.updateTodo(todo, value)
      })
    },
    watch: {
        // 深度 watcher
        todos: {
          deep: true, // 深度监视: 内部发生任何变化都会回调
          handler: function (value) {
            // 保存todos
            localStorage.setItem('todos_key', JSON.stringify(value))
          }
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
