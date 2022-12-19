<template>
  <div>
    <el-container>
      <el-aside id="side-bar" width="200px">
        <div>
          <h5>Vocalisation samples</h5>
          <el-menu default-active="1" class="el-menu-vertical">
            <el-scrollbar class="side-bar">
              <el-menu-item v-for="i in 50" :key="i" :index="i.toString()">
                <el-icon>
                  <VideoPlay />
                </el-icon>
                <span>Vocalisation {{ i }}</span>
              </el-menu-item>
            </el-scrollbar>
          </el-menu>
        </div>

        <div>
          <p>Your progress: TODO/50 </p>
          <el-progress :percentage="10" />
        </div>
      </el-aside>

      <el-main>
        <el-scrollbar max-height="100vh">
          <el-row justify="center">
            <el-col id="main-col" :xs="23" :sm="23" :md="22" :lg="18" :xl="13">
              <div>
                <h2>Vocalisation {{ vocIdx }}</h2>
                <el-icon class="clickable" size="70px">
                  <VideoPlay />
                </el-icon>
                <p>Click to play</p>
              </div>

              <!-- Scales -->
              <div>
                <template v-for="scale in scales" :key="scale.id">
                  <h4 style="margin-block-start: 2em; margin-block-end: 0.8em">{{ scale.title }}</h4>
                  <template v-for="s in scale.data" :key="s.id">
                    <el-row justify="center">
                      <el-popover placement="top" :width="500" trigger="hover" :content="s.help">
                        <template #reference>
                          <p class="hint" style="max-width:50px">{{ s.type }}</p>
                        </template>
                      </el-popover>
                    </el-row>
                    <el-row class="scale" justify="space-between">
                      <el-card class="clickable" v-for="val in 9" :key="val" :body-style="{ padding: '0px' }"
                        shadow="hover">
                        <img v-if="val % 2" :src="require(`@/assets/imgs/${s.type}_${(11 - val) / 2}.svg`)"
                          class="image" />
                      </el-card>
                    </el-row>
                  </template>
                </template>
                <p class="hint">*Hint: hover your mouse on the blue "Valence" and "Arousal" texts to see their meanings.
                </p>
                <p>You can select any image or the empty space between the images.</p>
              </div>
            </el-col>
          </el-row>
        </el-scrollbar>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "sam-page",
  data() {
    return {
      vocIdx: 1,
      scales: [
        {
          id: 1, title: 'How you think the speaker felt?', target: 'speaker',
          data: [{ id: 1, type: 'Valence', help: 'Rate how positive or negative the emotion you think the speaker felt, ranging from unpleasant feelings to pleasant feelings.' },
          { id: 2, type: 'Arousal', help: 'Rate how excited or calm the emotion you think the speaker felt, ranging from frantic excitement to relaxed or boredom.' }]
        },
        {
          id: 2, title: 'How you feel?', target: 'participant',
          data: [{ id: 1, type: 'Valence', help: 'Rate how positive or negative the emotion is that you feel, ranging from unpleasant feelings to pleasant feelings.' },
          { id: 2, type: 'Arousal', help: 'Rate how excited or apathetic the emotion is that you feel, ranging from frantic excitement to sleepiness or boredom.' }]
        }]
    }
  }
}
</script>

<style scoped>
.el-aside {
  text-align: left;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
  padding-bottom: 12px;
}

.el-main {
  padding: 0px;
}

.scale {
  flex-wrap: nowrap;
}

#main-col {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}

.el-card {
  margin: 6px;
  width: 100%;
}

.clickable {
  cursor: pointer;
}

.image {
  width: 100%;
  display: block;
}

.side-bar {
  height: calc(100vh - 160px);
}

.hint {
  color: blue;
  text-decoration-line: underline;
  margin-block-start: 0.5em;
  margin-block-end: 0.2em;
}
</style>