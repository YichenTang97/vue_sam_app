<template>
  <div class="finish">
    <h3>Thank you for taking part in this study!</h3>
    <p>Your answers have been saved, and you can close the window any time.</p>
    <p>To download your ratings, click the following button:</p>
    <el-button @click="downloadCSV">Download your ratings</el-button>
    <p>You can also click the following button to go back and change your answers:</p>
    <el-button type="primary" @click="back">Go back</el-button>
  </div>
</template>

<script>
import SAMDataService from '@/services/SAMDataService';
import router from '../router'

export default {
  name: "finish-page",
  methods: {
    back() {
      router.push("/sam")
    },
    downloadCSV() {
      const blob = new Blob([SAMDataService.getRatingsCSV()], { type: "text/csv"});
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.setAttribute('href', url);
      a.setAttribute('download', `ratings_${this.$store.state.user.username}_${new Date().toISOString()}.csv`);
      a.click();
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