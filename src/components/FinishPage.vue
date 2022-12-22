<template>
  <div class="finish">
        <h3>Thank you for taking part in this study!</h3>
        <p>Your answers have been saved, and you can close the window any time.</p>
        <p>You can also click the following button to go back and change your answers:</p>
        <el-button type="primary" @click="back">Go back</el-button>
</div>
</template>

<script>
import router from '../router'

export default {
  name: "finish-page",
  methods: {
    back() {
      router.push("/sam")
    }
  }
};
</script>

<style scoped>
.finish {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
}
</style>