<template>
  <div v-if="true">
    <!-- <button @click="show">项目</button> -->
    <div v-if="switch2" id="main-manager">

      <el-container>
        <!-- <el-header style="height: 105px;">
          <div>
            <scheduling />
          </div>
        </el-header> -->
        <el-container>
          <el-aside style="width: 300px;">
            <!-- <div class="page-container" style="height: 80px; background-color: #b6caf5"  id="headAssembly"> -->
              <!-- <button class="exist" @click="getSlug" style="float: left;">获得章节、人物关系数据</button> -->
            <personAnalysis/>
          </el-aside>

          <el-container>
            <!-- <el-main>Main1<router-view>
                <distribute />
              </router-view></el-main> -->
            <div style="width: 100%">
              <!-- <div class="tab-container" style="width: 1580px; height: 1270px; transform: translate(-155px, 155px) rotate(90deg);">
              <mixLine />
              </div> -->
              <div class="tab-container" style="width: 100%; height: 100%;overflow: hidden; ">
              <mainVis/>
              </div>
              <!-- <div class="tab-container" style="width: 100%; height: 25%;">
                <div class="tab" style="width: 100%; height: 100%;">
                  <div class="containerSlug">
                    
                    <div class="slugline-primary">
                      {{ $store.state.slugInfromation[$store.state.metaIndex].screen }}
                    </div>
                    <div class="slugline-secondary">
                      {{$store.state.sluglinesMeta[$store.state.metaIndex].door}}-----
                      {{$store.state.sluglinesMeta[$store.state.metaIndex].place}}-----
                      {{$store.state.sluglinesMeta[$store.state.metaIndex].time}}
                    </div>
                    <div class="text">
                      wait to be used
                    </div>
                  </div>
                </div>
              </div> -->
            </div>
            <!-- <el-main>Main2<router-view>
              </router-view></el-main>
            <el-footer></el-footer> -->
          </el-container>

          <!-- <el-aside style="width: 0px;">
            
            <div class="tab-container" style="box-sizing: border-box; width: 100%; height: 50%;  ">
              <div class="tab" style="width: 61%; height: 100%; display: inline-block;">
                <distribute />
              </div>
              <div class="tab" style="width: 39%; height: 100%; display: inline-block;">
                <dialogueBox />
              </div>
            </div>
            <div class="tab-container" style="width: 100%; height: 50%; ;">
              <div class="tab"
                style="box-sizing: border-box; width: 61.8%; height: 100%; display:inline-block; border: none;"> <heartLine/> </div>
              <div class="tab"
                style="box-sizing: border-box; width: 38.2%; height: 100%; display: inline-block; border: none;">
                <redaPic />
              </div>
            </div>
          </el-aside> -->

        </el-container>
      </el-container>
      <div id="flat" style="display: none;">
        <relationAct />
      </div>
    </div>
    <div style="width: 500px; margin-left: 800px;">
      <!-- <slideText/> -->
    </div>
    <div v-if="false">
      <actorEmo />

      <location />

      <mixLine/>
      <pracitePic /> 
    </div>
    <!-- {{ trend }} -->
    <div>
     
    </div>
  </div>
  
  <!-- ____---------------____---------------____---------------____---------------____---------------____---------------____--------------- -->
</template>
  
<script>
import distribute from './components/distribute.vue';
import actorEmo from './components/actorEmo.vue';
import relationAct from './components/relationAct.vue';
import location from './components/location.vue';
import slideText from './components/slideText.vue';
import pracitePic from './components/pracitePic.vue';
import scheduling from './components/schedulingStrip.vue';
import redaPic from './components/redaPic.vue';
import bertInfo from './components/bertInfo.vue';
// import mixLine from './components/mixLine.vue';
import dialogueBox from './components/dialogueBox.vue';
import heartLine from './components/heartLine.vue';
import mainVis from './components/mainVis.vue'
import personAnalysis from './components/personAnalysis.vue';
import rhythm from './components/rhythm.vue';

import axios from 'axios';


export default {
  name: 'App',
  components: {
    distribute,
    actorEmo,
    relationAct,
    location,
    slideText,
    pracitePic,
    scheduling,
    redaPic,
    bertInfo,
    // mixLine,
    dialogueBox,
    heartLine,
    mainVis,
    personAnalysis,
    rhythm,
  },
  data() {
    return {
      switch: false,
      switch2: true,

      slugInfromation: '',
      index:0,
      dialogVisible: false,
      trend: this.$store.state.trendList,

    }
  },
  mounted() {
    // console.log(this.$parent);
    this.getSlug()
  },
  watch: {

  },
  created() {

  },
  methods: {
    show() {
      this.switch = !this.switch;
      this.switch2 = !this.switch2;
    },
    getSlug() {
      // let _self = this;
      axios.get('http://127.0.0.1:5000/api/post/textscreen')
        .then(
          res => {
            let msg = res.data;
            // _self.slugInfromation = msg;
            this.$store.state.slugInfromation = msg;
          }
        )
        .catch((error) => {
          console.log(error);
        })
      this.getSchedulingData();
      this.$store.commit('getScreenPlay');
      this.$store.commit('getLinks');
      this.$store.commit('getActorEmoSlug');
      this.$store.commit('gainSlugInfo');
      this.$store.commit('get_event_dialogue_data');
      this.$store.commit('getScreenByTrans');
      this.$store.commit('getActorFre');
      this.$store.commit('getActorEverySLug');
      this.$store.commit('getLocationInfo');
      this.$store.commit('getDialogue');
      this.$store.commit('getAllTextToGpt');
      this.$store.commit('getEventType');
      this.$store.commit('getGptText');
      this.$store.commit('getRhythmDetail');
      this.$store.commit('getEmotionAll');
    },
    getSchedulingData() {
      axios.get("http://127.0.0.1:5000/api/post/scheduling")
        .then(
          res => {
            let msg = res.data;
            this.$store.state.schedulingData = msg;
          }
        )
        .catch((error) => {
          console.log(error);
        })
    }
  }
}
</script>
  
<style>
/* 1582 */
#main-manager {
  width: 2560px;
  /* width: 2880px; */
  /* height: 1690px; */
  height: 1440px;
  /* height: 1225px; */
  font-family: Avenir, Helvetica, Arial, sans-serif;
}

#flat {
  position: absolute;
  /* top: 650px; */
  top: 600px;
  /* left: 700px; */
  left: 650px;


}

.el-header,
.el-footer {
  /* background-color: #B3C0D1; */
  background-color: #fff;
  color: #333;
  text-align: center;
  line-height: 60px;
}


.el-aside {
  height: 1440px;
  /* height: 1225px; */
  background-color: #D3DCE6;
  color: #333;
  text-align: center;
  /* line-height: 200px; */
}

.el-aside::-webkit-scrollbar {
  width: 10px;
}

.el-aside::-webkit-scrollbar-track {
  background: #f2f2f2;
}

.el-aside::-webkit-scrollbar-thumb {
  background: #ccc;
  border-radius: 5px;
}

.el-aside::-webkit-scrollbar-thumb:hover {
  background: #aaa;
}


.el-main {
  height: 1440px;

  background-color: #E9EEF3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

body>.el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}

.tab-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f5f5f5;
  border: 1px solid #ccc;
  border-radius: 5px;
  /* padding: 10px; */
  padding: 0% 0% 0% 0%;

  width: 400px;
}

.tab {
  /* padding: 10px 20px; */
  background-color: #fff;
  color: #666;
  font-weight: bold;
  /* overflow-y: auto; */
  transition: background-color 0.2s ease-in-out;
  /* padding: 0% 1% 0% 0%;
  border-bottom: #e42b2b; */
  
}
.tab::-webkit-scrollbar {
  width: 0;
  height: 0;
}

div {
  box-sizing: border-box;
  font-family: Avenir, Helvetica, Arial, sans-serif;
}

/* Container for the title and text */
.containerSlug {
  width: 97%;
  height: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f2f2f2;
  padding: 20px;
  border: 1px solid #ccc;
  box-shadow: 0px 0px 10px #ccc;
  margin: 20px;
}

/* Primary heading */
.slugline-primary {
  display: inline;
  font-size: 36px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
  text-shadow: 2px 2px 2px #ccc;
}

/* Secondary heading */
.slugline-secondary {
  display: inline;

  font-size: 24px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 10px;
  color: #666;
  text-shadow: 1px 1px 1px #ccc;
}

/* Text */
.text {
  font-size: 18px;
  font-weight: normal;
  text-align: justify;
  line-height: 1.5;
  padding: 10px;
  border: 1px solid #ccc;
  box-shadow: 0px 0px 5px #ccc;
}

</style>


<!-- 根据时间地点为两个变量，对sluglines进行重排 找出同地点相似人物的片段，让用户进行比较。 -->
<!-- 探索历史树 -->

<!-- 1、总览出场人物，以及剧情大致起伏
2、按单元章节进行探索，得到章节内人物关系 人物重要性，以及情感分析 -->

<!-- 设计理念一定是和功能紧密结合的，也就是从功能的角度出发，完整的触发完一整套的功能需要用到哪些组件，对这些组件进行设计探索
[
  [
    {
      'screen':sluglines, content:
                                  [
                                    {
                                      'action lines':[lines1, lines2, ...]
                                    },
                                    {
                                      'dialogue':
                                      [
                                        {'name':'', 'sentence':''}
                                      ]
                                    }
                                  ],
    }
  ]
]
数据步骤
  1、选择文件上传
  2、在后台处理好数据并且传回前端VueX中统一管理
        （根据视图来）用到的数据：{}
可视化步骤
(可视化目标:1、导读，帮助(对剧本不了解)用户厘清登场人物)
  一、初始可视化
    1、总览出场人物，以及剧情大致起伏
      用到的组件[

      ]
  二、分析可视化
    1、时间
      对比  场景 of 不同时间内  事件[行为模式]：“ 例如通常来说，人在白天的行为模式和在晚上的行为模式是不同的；这里例举几个行为模式”
        [
          {行为模式:{
            语言多寡:语言又分为交流式语言和独白式语言,对这两种不同维度上的语言进行分析，通过多寡来进行评判，
              [对剧本进行电影类型进行识别可能是不必要的]甚至可以通过内心独白性的语言或者交流式语言对该剧本进行类型分类}
          }
        ] -->
