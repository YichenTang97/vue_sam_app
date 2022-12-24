<template>
  <div>
    <el-container>
      <el-aside width="200px">
        <div>
          <h5>Vocalisation samples</h5>
          <el-menu default-active="1" class="el-menu-vertical">
            <el-scrollbar class="side-bar">
              <el-menu-item v-for="i in 50" :key="i" :index="i.toString()" @click="changeVoc(i)">
                <el-icon>
                  <Check v-if="this.$store.state.vocalisationCompleted[i-1]" />
                  <VideoPlay v-else />
                </el-icon>
                <span>Vocalisation {{ i }}</span>
              </el-menu-item>
            </el-scrollbar>
          </el-menu>
        </div>

        <div>
          <p>Your progress: {{ getNumCompleted() }}/{{ this.$store.state.numVocalisations }} </p>
          <el-progress :percentage="100*getNumCompleted()/this.$store.state.numVocalisations" />
          <el-button style="margin-top: 12px;" type="primary" 
            :disabled="getNumCompleted() == this.$store.state.numVocalisations ? false : true" @click="finish">Save and complete</el-button>
        </div>
      </el-aside>

      <el-main>
        <el-scrollbar max-height="100vh">
          <el-row justify="center">
            <el-col id="main-col" :xs="23" :sm="23" :md="22" :lg="18" :xl="13">
              <div>
                <h2>Vocalisation {{ vocIdx }}</h2>
                <el-icon v-if="!isAudioPlaying" class="clickable" size="70px" @click="playAudio">
                  <VideoPlay />
                </el-icon>
                <el-icon v-else size="70px">
                  <Headset />
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
                          <p class="hint" style="max-width:50px">{{ s.name }}</p>
                        </template>
                      </el-popover>
                    </el-row>
                    <el-row class="scale" justify="space-between">
                      <el-card class="clickable" v-for="val in 9" :key="val" :body-style="{ padding: '0px' }"
                        shadow="hover" 
                        :style="[10 - val == this.$store.state.ratings[scale.target][s.type][vocIdx-1] ? { 'border': '2px solid #4f98f2' } : { 'border': '2px solid #ebeef5' }]"
                        @click="rate(scale.target, s.type, 10 - val)">
                        <img v-if="val % 2" :src="require(`@/assets/imgs/${s.name}_${(11 - val) / 2}.svg`)"
                          class="image" />
                        <img v-else :src="require(`@/assets/imgs/empty.svg`)" class="image" />
                      </el-card>
                    </el-row>
                  </template>
                </template>
                <p class="hint">*Hint: hover your mouse on the blue "Valence" and "Arousal" texts to see their meanings.
                </p>
                <p>You can select any image or the empty space between the images.</p>
                <el-button v-if="this.$store.state.isDemo" @click="quickFillAll">Quick-fill all (demo mode only)</el-button>
              </div>
            </el-col>
          </el-row>
        </el-scrollbar>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import router from '@/router';
import SAMDataService from '@/services/SAMDataService';

export default {
  name: "sam-page",
  data() {
    return {
      vocIdx: 1,
      audio: new Audio(require(`@/assets/vocs/${this.$store.state.vocalisationList[0]}`)),
      isAudioPlaying: false,
      scales: [
        {
          id: 1, title: 'How you think the speaker felt?', target: 'speaker',
          data: [{ id: 1, name: 'Valence', type: 'valence', help: 'Rate how positive or negative the emotion you think the speaker felt, ranging from unpleasant feelings to pleasant feelings.' },
          { id: 2, name: 'Arousal', type: 'arousal', help: 'Rate how excited or calm the emotion you think the speaker felt, ranging from frantic excitement to relaxed or boredom.' }]
        },
        {
          id: 2, title: 'How you feel?', target: 'participant',
          data: [{ id: 1, name: 'Valence', type: 'valence', help: 'Rate how positive or negative the emotion is that you feel, ranging from unpleasant feelings to pleasant feelings.' },
          { id: 2, name: 'Arousal', type: 'arousal', help: 'Rate how excited or apathetic the emotion is that you feel, ranging from frantic excitement to sleepiness or boredom.' }]
        }]
    }
  },
  methods: {
    changeVoc(newIdx) {
      this.vocIdx = newIdx;
      this.audio = new Audio(require(`@/assets/vocs/${this.$store.state.vocalisationList[this.vocIdx - 1]}`));
    },
    playAudio() {
      this.audio.play();
      this.isAudioPlaying = true;
      this.audio.onended = () => {
        this.isAudioPlaying = false;
      };
    },
    rate(target, type, rating) {
      SAMDataService.rate(this.vocIdx - 1, target, type, rating); // Idx - 1 to convert to list indices
    },
    getNumCompleted() {
      return this.$store.state.vocalisationCompleted.filter(Boolean).length;
    },
    quickFillAll() {
      SAMDataService.quickFillAll();
    },
    async finish() {
      SAMDataService.save();
      router.push('/finish');
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
  height: calc(100vh - 200px);
}

.hint {
  color: blue;
  text-decoration-line: underline;
  margin-block-start: 0.5em;
  margin-block-end: 0.2em;
}
</style>