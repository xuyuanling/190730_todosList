<template>
        <li :style="{background: bgColor}" @mouseenter='handleEnter(true)' @mouseleave='handleEnter(false)'>
          <label>
            <input type="checkbox" v-model="isCheck"/>
            <span>{{todo.title}}</span>
          </label>
          <button class="btn btn-danger" v-show = "isShow" @click='deleteItem'>删除</button>
        </li>
</template>

<script type="text/ecmascript-6">
import Pubsub from 'pubsub-js'
  export default {
      props: ['todo', 'index', 'updateTodo'],
      data () {
          return {
              bgColor: 'white',
              isShow: false
          }
      },
      methods: {
          handleEnter (isEnter) {
              if (isEnter) {
                  this.bgColor = '#ccc'
                  this.isShow = true
              } else {
                  this.bgColor = 'white'
                  this.isShow = false
              }
          },
          deleteItem () {
              if (confirm('确定删除吗')) {
                  this.$EventBus.$emit('deleteTodo', this.index)
              }
          }
      },
      computed: {
          isCheck: {
              get () {
                  return this.todo.complete
              },
              set (value) {
                  Pubsub.publish('updateTodo', {todo: this.todo, value})
              }
          }
      }
  }
</script>

<style   scoped>
/*item*/
li {
  list-style: none;
  height: 36px;
  line-height: 36px;
  padding: 0 5px;
  border-bottom: 1px solid #ddd;
}

li label {
  float: left;
  cursor: pointer;
}

li label li input {
  vertical-align: middle;
  margin-right: 6px;
  position: relative;
  top: -1px;
}

li button {
  float: right;
  margin-top: 3px;
}

li:before {
  content: initial;
}

li:last-child {
  border-bottom: none;
}
</style>
