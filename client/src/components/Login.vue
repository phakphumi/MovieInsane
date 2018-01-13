<template>
  <div>
    <b-row class="py-5">
      <b-col offset-sm="5" sm="4">
        <b-button variant="secondary" @click="fbLogin">Facebook Login</b-button>
      </b-col>
    </b-row>
  </div>
</template>
  
<script>
export default {
  name: 'Login',
  methods: {
    fbLogin (e) {
      window.location = 'http://localhost:10101/auth/facebook'
    }
  }
}
</script>

<style>
</style>