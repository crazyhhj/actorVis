import { createApp, reactive } from 'vue'
import { createStore } from 'vuex'
import axios from 'axios'
// 创建一个新的 store 实例
const store = createStore({
  state: {
    countSlug: 200,
    initTrendList:[],
    slugInfromation: new Array(200).fill({ 'screen': '' }),
    schedulingData: '',
    rhythmDetailData: '',
    metaIndex: 0,
    sluglinesMeta: [{ 'door': '', 'place': '', 'time': '' }],
    locData: {},
    emotionAll:'',
    // 每个人物出现章节 以及感情信息
    actorEverySlug: {},
    screenPlay: [],
    // 通过过渡词划分的章节数据
    transScreen: [],
    //组件数据-绘图用
    relation: '', //from relationAct.vue
    actorEmoSlug: '',
    eventDialogue: [],
    event_type: [],
    actorFre: {},
    //交互数据
    slugInit: new Array(200).fill(0),
    slugIndexList: [], //探索变量 之一的 情景序号

    //gpt
    gptText: [],

    //通过bert模型从念白文本中提取的信息
    exBertInfo: { fre: '1' },

    dialogue: '',
    textForGpt: [],

    social: [],

    //emotion map
    emoConstrast: [
      //一般  blue 3
      'caring', 'faithful',
      'impressed',
      //坏的消极 red 7
      'guilty', 'sad',
      'ashamed', 'disgusted',
      'anxious', 'afraid',
      'disappointed',
      //坏的积极 yellow 5
      'devastated', 'furious', 'surprised', 'annoyed', 'angry',
      //好的对自己  green 5
      'joyful',
      'excited',
      'confident', 'anticipating',
      'proud',
      //好的对别人  green 4
      'hopeful', 'grateful', 'trusting', 'content',
      // 一般 gray 7
      'nostalgic', 'sentimental',
      'lonely', 'jealous',
      'apprehensive', 'prepared',
      'embarrassed',
    ],
    axeConstrast: [
      0, 0, 0,
      1, 1, 1, 1, 1, 1, 1,
      2, 2, 2, 2, 2,
      3, 3, 3, 3, 3,
      4, 4, 4, 4,
      5, 5, 5, 5, 5, 5, 5
    ],

    trendList:[],
  },
  mutations: {
    // input    2限制条件   3 特殊情况
    //得到relation 关系图的index //得到 schedule 进度图中tick 的index 列表  多选值
    // 限制条件 
    //特殊情况 indexList 为空时
    sendIndexToRelation(state, index) {
      let current = state.slugInit[index] + 1
      state.slugInit[index] = current;
      let tmp = state.slugIndexList;

      if (current % 2 == 1) {
        tmp.push(index)
      }
      state.slugIndexList = tmp;
      // console.log(state.slugIndexList);
    },

    setTrendList(state, indexList){
      // console.log(indexList);
      state.trendList = indexList;
    },
    setinitTrendList(state, indexList){
      state.initTrendList = indexList;
    },

    getScreenPlay(state) {
      let _self = state;
      axios.get('http://127.0.0.1:5000/api/post/screenplay')
        .then(
          res => {
            let msg = res.data;
            _self.screenPlay = msg;
            console.log(_self.screenPlay);
          }
        )
        .catch((error) => {
          console.log(error);
        });

    },
    getLinks(state) {
      let _self = state;
      axios.get('http://127.0.0.1:5000/api/post/relationactor')
        .then(
          res => {
            let msg = res.data;
            console.log(res.data);
            _self.relation = msg;
          }
        )
        .catch((error) => {
          console.log(error);
        });

    },
    getActorEmoSlug(state) {
      let _self = state;
      axios.get('http://127.0.0.1:5000/api/post/actorEmotionSlug')
        .then(
          res => {
            let msg = res.data;
            // console.log(res.data);
            _self.actorEmoSlug = msg;
          }
        )
        .catch((error) => {
          console.log(error);
        });

    },
    getEmotionAll(state) {
      let _self = state;
      axios.get('http://127.0.0.1:5000/api/post/emotion')
        .then(
          res => {
            let msg = res.data;
            // console.log(res.data);
            _self.emotionAll = msg;
          }
        )
        .catch((error) => {
          console.log(error);
        });

    },
    sendContent(state, content) {
      axios.post('http://10.1.115.30:5000/api/get/slug_content', { data: content })
        .then(response => {
          state.exBertInfo = reactive(response.data);
          // _self.$set(state.exBertInfo, 0,response.data)
          console.log('通过bert模型从念白文本中提取的信息', state.exBertInfo);
        })
        .catch(error => {
          console.log(error);
        })
    },
    gainSlugInfo(state) {
      let _self = state;
      axios.get('http://127.0.0.1:5000/api/post/sluginfo')
        .then(
          res => {
            let msg = res.data;
            console.log('slugMeta', res.data);
            _self.sluglinesMeta = msg;
          }
        )
        .catch((error) => {
          console.log(error);
        });
    },

    get_event_dialogue_data(state) {
      let _self = state;
      axios.get('http://127.0.0.1:5000/api/post/event_dialogue')
        .then(
          res => {
            let msg = res.data;
            let temp = []
            for (let index = 0; index < msg.length; index++) {
              const element = msg[index];
              let tmp = []
              for (let i = 0; i < element.length; i++) {
                const ellement = element[i]
                let dd = [];
                for (let indexx = 0; indexx < ellement.length; indexx++) {
                  const elementt = ellement[indexx];
                  if (elementt['Person'] == '') {
                    continue
                  }
                  else {
                    dd.push(elementt)
                  }

                }
                if (dd.length == 0) {
                  continue
                }
                else {
                  tmp.push([...dd])
                }
              }
              if (tmp.length == 0) {
                temp.push([])
              }
              else {
                temp.push([...tmp])
              }

            }
            temp.push([[
              {
                ActionVerb
                  :
                  "None",
                Behavior
                  :
                  "not laughing",
                Person
                  :
                  "Nobody",
                Place
                  :
                  "booth",
                sentence
                  :
                  " Nobody's laughing in the booth.",
                slugIndex
                  :
                  110,
              }
            ]])
            console.log(temp);
            _self.eventDialogue = temp;

          }
        )
        .catch((error) => {
          console.log(error);
        });
    },
    getLocationInfo(state) {
      let _self = state;
      axios.get('http://127.0.0.1:5000/api/post/locationInfo')
        .then(
          res => {
            let msg = res.data;
            _self.locData = msg;

          }
        )
        .catch((error) => {
          console.log(error);
        })
    },
    getEventType(state) {
      let _self = state;
      axios.get('http://127.0.0.1:5000/api/post/event_type')
        .then(
          res => {
            let msg = res.data;
            _self.event_type = msg
            console.log(_self.event_type);
          }
        )
        .catch((error) => {
          console.log(error);
        })
    },
    getGptText(state) {
      let _self = state;
      axios.get('http://127.0.0.1:5000/api/post/gpttext')
        .then(
          res => {
            let msg = res.data;
            _self.gptText = msg
            // console.log(_self.gptText);
          }
        )
        .catch((error) => {
          console.log(error);
        })
    },
    getScreenByTrans(state) {
      let _self = state;
      axios.get('http://127.0.0.1:5000/api/post/screenplay_group')
        .then(
          res => {
            let msg = res.data;
            _self.transScreen = msg;

          }
        )
        .catch((error) => {
          console.log(error);
        })
    },
    // 人物频次
    getActorFre(state) {
      let _self = state;
      axios.get('http://127.0.0.1:5000/api/post/actor')
        .then(
          res => {
            let msg = res.data;
            _self.actorFre = msg;

          }
        )
        .catch((error) => {
          console.log(error);
        })
    },
    getSocial(state) {
      let _self = state;
      axios.get('http://127.0.0.1:5000/api/post/social')
        .then(
          res => {
            let msg = res.data;
            _self.social = msg;

          }
        )
        .catch((error) => {
          console.log(error);
        })
    },
    getRhythmDetail(state) {
      let _self = state;
      axios.get('http://127.0.0.1:5000/api/post/rhythmDetail')
        .then(
          res => {
            let msg = res.data;
            _self.rhythmDetailData = msg;

          }
        )
        .catch((error) => {
          console.log(error);
        })
    },
    getActorEverySLug(state) {
      let _self = state;
      axios.get('http://127.0.0.1:5000/api/post/actoremo')
        .then(
          res => {
            let msg = res.data;
            _self.actorEverySlug = msg;
            console.log('现在是', state.actorEverySlug);
          }
        )
        .catch((error) => {
          console.log(error);
        })
    },

    getDialogue(state) {
      let _self = state;
      axios.get('http://127.0.0.1:5000/api/post/dialogue')
        .then(
          res => {
            let msg = res.data;
            _self.dialogue = msg;
          }
        )
        .catch((error) => {
          console.log(error);
        })
    },

    getAllTextToGpt(state) {
      let _self = state;
      axios.get('http://127.0.0.1:5000/api/post/alltext')
        .then(
          res => {
            let msg = res.data;
            console.log('ALLTEXT', msg);
            _self.textForGpt = msg;
          }
        )
        .catch((error) => {
          console.log(error);
        })
    },
    
    clearTrendList(state){
      state.trendList = [];
    }
  },
  getters: {
    getCountSlug(state) {
      return state.countSlug;
    },

    getSlugInfromation(state) {
      // console.log("Have been called");
      return state.slugInfromation;
    },
    getScheduling(state) {
      // console.log("be used", state.schedulingData);
      return state.schedulingData;
    },
    getIndex(state) {
      let initIndex = state.slugIndexList;
      if (initIndex.length > 0) {
        state.metaIndex = initIndex[initIndex.length - 1]
      }
      else { state.metaIndex = 0 }
    },
  },
  actions: {
    increment(context) {
      context.commit('increment')
    },

  }
})

const app = createApp({ /* 根组件 */ })

// 将 store 实例作为插件安装
app.use(store)
export default store;