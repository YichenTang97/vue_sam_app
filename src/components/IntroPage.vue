<template>
  <el-scrollbar max-height="100vh">
    <el-row justify="center">
      <el-col :xs="23" :sm="23" :md="22" :lg="18" :xl="13">
        <h2>Self-Assessment Manikin</h2>
        <p>This is a picture-based assessment tool for measuring emotion.</p>
        <p>You will listen to 50 vocalisations and for each, rate both how you think the speaker felt when making the
          speech and how you felt when listening to the vocalisation.</p>
        <p>You will need to rate on two scales, named <strong>valence</strong> and <strong>arousal</strong>.</p>

        <h4>Valence</h4>
        <p>This is the scale for how positive or negative the emotion was, ranging from unpleasant feelings to pleasant
          feelings.</p>

        <h4>Arousal</h4>
        <p>This is the sacle for how excited or calm/apathetic the emotion was, ranging from frantic excitement to
          relaxed/sleepiness or boredom.</p>

        <el-divider />

        <p>Each scale comprises five pictures and four blank squares in between representing nine points. The blank
          squares indicate ratings somewhere in between the pictures beside them.</p>
        <p>You can select either a picture or a blank square like the following:</p>
        <el-row class="scale" justify="space-between">
          <el-card v-for="val in 9" :key="val" :body-style="{ padding: '0px' }"
            :style="[val == 3 ? { 'border': '2px solid #4f98f2' } : {}]" shadow="never">
            <img v-if="val % 2" :src="require(`@/assets/imgs/Valence_${(11 - val) / 2}.svg`)" class="image" />
          </el-card>
        </el-row>

        <el-row class="scale" justify="space-between">
          <el-card v-for="val in 9" :key="val" :body-style="{ padding: '0px' }"
            :style="[val == 4 ? { 'border': '2px solid #4f98f2' } : {}]" shadow="never">
            <img v-if="val % 2" :src="require(`@/assets/imgs/Arousal_${(11 - val) / 2}.svg`)" class="image" />
          </el-card>
        </el-row>

        <el-divider />

        <p>When ready, press the following button to start.</p>
        <el-button type="primary" @click="start">Start</el-button>

      </el-col>
    </el-row>
  </el-scrollbar>
</template>

<script>
import router from '../router'

export default {
  name: "intro-page",
  methods: {
    start() {
      router.push("/sam")
    }
  }
};
</script>

<style scoped>
.el-card {
  margin: 6px;
  width: 100%;
}
.scale {
  flex-wrap: nowrap;
}

.image {
  width: 100%;
  display: block;
}
</style>