<template>
    <div id="personAnalysisRounder">
        <div class="wall">
            <el-row :gutter="10">
                <el-col :xl="100">
                    <!-- <div class="grid-content head main_sub_title" style="background-color:rgb(148, 178, 210) ;color: white;">Script Control</div> -->
                    <div class="grid-content head view_title main_sub_title" style="background-color:rgb(148, 178, 210) ;color: rgb(104, 92, 92);height: 73px;">SCRIPT CONTROL</div>
                </el-col>
            </el-row>
            <div class="wall grid-content interface-body">
                   <!-- script -->
                   <div class="pillar">
                    <div class="brick optional ">
                        <el-row :gutter="10" class="czjz">
                            <el-col :span="6" :offset="2">
                                <div class="sign">Script</div>
                                <!-- <div class="sign">剧本集</div> -->
                            </el-col>
                            <el-col :span="15">
                                <div class="person-content">
                                    <el-select v-model="place" placeholder="film" class="person-select">
                                        <el-option v-for="item in options" :key="item.value" :label="item.label"
                                            :value="item.value">
                                        </el-option>
                                    </el-select>
                                </div>
                            </el-col>
                        </el-row>
                    </div>
                    <!-- <div class="brick optional ">
                        <el-row :gutter="10" class="czjz">
                            <el-col :span="6" :offset="6">
                                <button class="submit add czjz">add</button>
                            </el-col>
                            <el-col :span="8">
                                <button class="submit show czjz">submit-show</button></el-col>
                        </el-row>
                    </div> -->
                </div>
                <!-- role -->
                <div class="pillar">
                    <div class="brick optional ">
                        <el-row :gutter="10" class="czjz">
                            <el-col :span="6" :offset="2">
                                <div class="sign">SrcPlay</div>
                                <!-- <div class="sign">章节</div> -->
                            </el-col>
                            <el-col :span="15">
                                <div class="person-content">
                                    <el-slider v-model="value_screen"  show-stops :max="127">
                                    </el-slider>
                                </div>
                            </el-col>
                        </el-row>
                    </div>
                </div>
                   <!-- person -->
                   <div class="pillar">
                    <div class="brick optional ">
                        <el-row :gutter="10" class="czjz">
                            <el-col :span="6" :offset="2">
                                <div class="sign">Character</div>
                                <!-- <div class="sign">人物</div> -->
                            </el-col>
                            <el-col :span="15">
                                <div class="person-content czjz">
                                    <el-select v-model="roleName" placeholder="person" class="person-select" size="medium" >
                                        <el-option v-for="item in personList" :key="item.value" :label="item.label"
                                            :value="item.value" @click="showRole(item.value)">
                                            {{ item.label }}
                                        </el-option>
                                    </el-select>

                                </div>
                            </el-col>
                        </el-row>
                    </div>
                </div>
             
                <!-- button -->
                <div class="pillar">
                    <div class="brick optional ">
                        <el-row :gutter="40" class="czjz">
                            <el-col :span="6" :offset="8">
                                <button class="submit add czjz" @click="deal_actor">Add</button>
                                <!-- <button class="submit add czjz" @click="deal_actor">上传</button> -->
                            </el-col>
                            <el-col :span="8">
                                <button class="submit show czjz" @click="submit">Submit</button></el-col>
                                <!-- <button class="submit show czjz" @click="submit">确认修改</button></el-col> -->
                        </el-row>
                    </div>
                </div>
            </div>
        </div>
        <!-- <div class="wall">
            <el-row :gutter="0" class="czjz">
                <el-col :span="19" :offset="0">
                    <div class="candidate"></div>
                </el-col>
                <el-col :span="5">
                    <div class="checkPerson"></div>
                </el-col></el-row>
        </div> -->
        <div class="wall" style="height: 10px;"></div>
        <!-- mapping view -->
        <!-- <div class="wall" style="height: 6%;">
            <div class="person-info perTab">
               
                <el-button @click="dialogVisible = true" style="background-color: #d3dce6; border-color: #8da8c5;margin-top:0px">Mapping View</el-button>
                <el-dialog v-model="dialogVisible" title="章节人物分布预览图" width="70%" height="70%" :before-close="handleClose">
                    <distribute/>
                    <template #footer>
                        <span class="dialog-footer">
                            <el-button @click="dialogVisible = false">Cancel</el-button>
                            <el-button type="primary" @click="dialogVisible = false">
                                Confirm
                            </el-button>
                        </span>
                    </template>
                </el-dialog>
            </div>
        </div> -->
        <div class="wall" style="height: 25%;"  >
            <div id="emememe" class="perTab">
                <!-- 生平介绍  -->
               <h4> Biography</h4> 
                {{ this.lifeList[this.roleName] }}
            </div>
        </div>
        <div class="wall " style="height: 25%;">
            <div class = "perTab">
                <!-- 关系/社群视图 -->
               <h4> Relationship</h4>
                <RelationAct />
            </div>
        </div>
        <div class="wall" style="height: 35%;">
            <div class = "perTab">
                <!-- 人物情感雷达图 -->
                <h4>Sentiment Radar</h4>
                <redaPic />
            </div>
        </div>
        <!-- <div class="wall" style="height: 10%;">
            <div class = "perTab copyright">
                CopyRight 
                <br/>
                2023 @HeHongJie
            </div>
        </div> -->
    </div>
</template>

<script>
import * as d3 from 'd3'
import redaPic from './redaPic.vue'
import RelationAct from './relationAct.vue'
import distribute from './distribute.vue'
export default {
    components: {
        redaPic,
        RelationAct,
        distribute,
    },
    data() {
        return {
            screen_num: this.$store.state.slugIndexList,
            personList: [],
            options: [{
                value: '选项1',
                label: 'JOKER(2019)'
            }, {
                value: '选项2',
                label: 'PULP FICTION'
            }, {
                value: '选项3',
                label: 'GONE WITH THE WIND'
            }, {
                value: '选项4',
                label: 'RED AND BLACK'
            }, {
                value: '选项5',
                label: 'RAIN MAN'
            }],
            // options:[],
            value_screen: 0,
            lifeList: [],
            roleName: '',
            place: '',
            dialogVisible: false,
        }
    },
    computed() {

    },
    mounted() {
        // deal_actor()
    },
    watch: {

    },
    methods: {
        deal_actor() {
            this.personList = Object.entries(this.$store.state.actorFre).sort((a, b) => b[1] - a[1]).map((d, idx) => {
                return {
                    value: idx,
                    label: d[0]
                }
            })
            let str = [
                `Arthur Fleck:\n The main character portrayed by Joaquin Phoenix. Arthur is a struggling comedian living in a poverty-stricken neighborhood of Gotham City. He faces a series of hardships and injustices from society, which eventually leads him to transform into the Joker.`,
                `Sophie:\n Sophie is a single mother and a neighbor of Arthur Fleck. She is portrayed by Zazie Beetz. Sophie forms a connection with Arthur and their relationship develops throughout the film.`,
                `Mom (Debbie): \n Arthur Fleck's mother, portrayed by Frances Conroy. Debbie is Arthur's only family member, but their relationship is not very close. She plays a significant role in Arthur's backstory and his mental state.`,
                `Murray Franklin: \n Murray Franklin is a popular late-night talk show host in Gotham City. He is portrayed by Robert De Niro. Arthur idolizes Murray and dreams of appearing on his show, which becomes a significant turning point in the story.`,
                `Randall: \n Randall is a co-worker of Arthur at the clown agency. He is portrayed by Glenn Fleshler. Randall plays a minor role, but he becomes a target of Arthur's anger and frustration.`,
                `Social Worker: \n The social worker is a character who is responsible for Arthur's mental health and therapy sessions. She is portrayed by Sharon Washington. The social worker tries to help Arthur, but he becomes disillusioned with the system and stops attending the sessions.`,
                `Social Worker: \n The social worker is a character who is responsible for Arthur's mental health and therapy sessions. She is portrayed by Sharon Washington. The social worker tries to help Arthur, but he becomes disillusioned with the system and stops attending the sessions.`,
                `Thomas Wayne: \n Thomas Wayne is a wealthy businessman and philanthropist in Gotham City. He is portrayed by Brett Cullen. In the movie, Thomas Wayne plays a role in Arthur's life and has a connection to his past.`,
            ]
            this.lifeList = [...str];
        },
        showRole(value) {
            console.log(value);
        },
        submit() {
            let roleName = this.personList[this.roleName].label;
            let index = this.value_screen
            this.eventBus.emit("click-send-slugIndex", index);
            this.$store.commit('sendIndexToRelation', index);
            console.log(roleName, this.value_screen);
        },
    },
}
</script>

<style>
body{
    font-family: Avenir, Helvetica, Arial, sans-serif;
}
h4{
    margin-top:10px;
    margin-bottom:10px;
}
.main_sub_title {
    vertical-align: top;
   width: 100%;
    top: 0px;
    /* height: 73px; */
    /* border: 2px solid white; */
    border-right: none;
    word-wrap: break-word;
   
        justify-content: center;
        align-items: center;
    font-size: 1.1em;
    
    font-family: Avenir, Helvetica, Arial, sans-serif;
}

#personAnalysisRounder {
    /* 居中 */
    margin: auto;

    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    /* border: solid skyblue 2px; */
    /* padding: 1px; */
    gap: 0px;
    font-family: Avenir, Helvetica, Arial, sans-serif;
}



.wall {
    width: 100%;
    display: flex;
    flex-direction: column;
    /* border-top: solid 0.5px rgb(137, 162, 231); */
    /* border: solid 1px white; */
    /* border-color: #8da8c5; */
    /* border-color: rgb(211, 220, 230); */
    overflow: hidden;
    
}

.person-info {
    /* border: solid black 3px; */
    width: 100%;
    height: 100%;
    display: flex;
      justify-content: center;
      align-items: center;
}


.pillar {
    flex: 1;

    width: 100%;
    /* border: solid blueviolet 2px; */
    display: flex;
    flex-direction: row;
    padding: 2px;
    gap: 5px;

    /* 垂直居中 */
    align-items: center;
}

.czjz {
    align-items: center;
    text-align: center;
    
    font-family: Avenir, Helvetica, Arial, sans-serif;

}

.brick {
    flex: 1;
    height: 11px;
}

/* elementUI  CSS */
.el-col {
    border-radius: 4px;
}

.bg-purple-dark {
    background: #99a9bf;
}

.bg-purple {
    background: #d3dce6;
}

.bg-purple-light {
    background: #e5e9f2;
}

.grid-content {
    /* border-radius: 4px; */
    min-height: 48px;
}

.sign {
    /* background: #9a9a9a; */
    height: 18px;
    border-radius: 4px;
    padding:2px;
    font-family: Avenir, Helvetica, Arial, sans-serif;
   
}

.candidate {
    /* background: #e9e9e9; */
    background: #82b6d0;
    height: 35px;
    border-radius: 9px;
    /* border: solid black 3px; */

}

.checkPerson {
    /* background: #e9e9e9; */
    background: #82b6d0;
    height: 35px;
    border-radius: 9px;
}

.person-content {
    background: #e9e9e9;
    height: 22px;
    border-radius: 2px;
    font-family: Avenir, Helvetica, Arial, sans-serif;

}

.interface-body {
    padding: 7px 0 7px 0;
    background-color: #e9e9e9;
    height: 192px;
}

/* elementUI  CSS */

/* button style */
.submit {
    width: 100%;
    height: 24px;
    font-size: 15px;
    line-height: 10px;
    display: flex;

    border-radius: 3px;
}

.add {
    background: white;
    border: none;
}

.show {
    /* background: #3595f9; */
    background-color: #94b2d2;
    border: none;
    padding-left: 10px;
}

.show:hover {
    background: rebeccapurple;
}

.person-select{
    font-family: Avenir, Helvetica, Arial, sans-serif;
}
.el-select {
    display: block;
    background: #fdfdfd;
    height: 11px;
    border-radius: 2px;

    /* width: 184px; */
    height: 20px;

    .el-input__inner {
        height: 25px;
    }

    .el-input__prefix,
    .el-input__suffix {
        height: 20px;
    }

    /* 下面设置右侧按钮居中 */
    .el-input__suffix {
        top: 0px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: nowrap;
        flex-direction: row;
        align-content: flex-start;
    }

    /* 输入框加上上下边是 32px + 2px =34px */
    .el-input__icon {
        line-height: 10px;
    }
}

#emememe{
  white-space: pre-wrap;
    text-align: center;
    /* overflow-y: scroll; */
    display: block;
    
    overflow: hidden;
}

.perTab{
    /* box-shadow:  0 0  8px rgba(0, 0, 0, 0.2); */
    box-shadow:  0 0  8px rgba(27, 75, 232, 0.826);
    border-top: solid 0.5px rgb(158, 179, 231);
    /* margin: 10px; */
    font-family: Avenir, Helvetica, Arial, sans-serif;
    /* color:white; */
    width: calc(100% - 10px);
    height: calc(100% - 10px);
}
.copyright{
    vertical-align:middle;
    text-justify: auto;
    font-size: 2em;
    margin-top: 20px;
}

:deep(.el-dialog) {
    height: 70%;
}
</style>