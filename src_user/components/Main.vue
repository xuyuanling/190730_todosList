<template>
    <div>
        <h1 v-if="FirstView">请输入关键字搜索</h1>
        <h1 v-else-if="Loading">Loading...</h1>
        <h1 v-else-if="errorMsg">{{errorMsg}}</h1>
        <div class="row" v-else>
            <div class="card" v-for="user in users" :key="user.username">
                <a :href="user.url" target="_blank">
                <img :src="user.avatar_url" style='width: 100px'/>
                </a>
                <p class="card-text">{{user.username}}</p>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import axios from 'axios'
  export default {
      data () {
          return {
              FirstView: true,
              Loading: false,
              users: [],
              errorMsg: ''

          }
      },
      mounted () {
          this.$EventBus.$on('search', async (searchName) => {
              this.FirstView = false
              this.Loading = true
              const url = `https://api.github.com/search/users?q=${searchName}`
              try {
                  const response = await axios(url)
                const users = response.data.items.map(user => ({
                      username: user.login,
                      url: user.html_url,
                      avatar_url: user.avatar_url
                  }))
                  this.Loading = false
                  this.users = users
             } catch (error) {
                  this.Loading = false
                  this.errorMsg = error.message
              }
          })
      }
  }
</script>
<style   scoped>
    .card {
    float: left;
    width: 33.333%;
    padding: .75rem;
    margin-bottom: 2rem;
    border: 1px solid #efefef;
    text-align: center;
    }

    .card > img {
    margin-bottom: .75rem;
    border-radius: 100px;
    }

    .card-text {
    font-size: 85%;
    }
</style>
