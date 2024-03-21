<template>
    <!-- {{ this.$store.state.slugInfromation }} -->
    <div style="height: 100%;">
        <el-collapse  v-for="(slug,index) in this.$store.state.slugInfromation" :key="slug">
            <el-collapse-item >
                <!-- <template > -->
                <template #title>
                    <div class="sluglines" @click="sendMessage(index, slug.content)">{{ slug.screen }}</div>
                </template>
                <div class="dia" >{{ slug.content }}</div>
            </el-collapse-item>
        </el-collapse>
    </div>

    <!-- <div v-for="(item,index) in items" :key="item">
        {{ item.text }}
        {{index}}
    </div> -->
    

    
</template>

<script>
import axios from 'axios'
export default {
    name: 'sonSlide',
    components: {

    },
    // props: ['slugInfromation'],
    data() {
        return {
            activeName: '1',
            items:[
                {text:'a'},
                {text:'a'},
                {text:'a'},
            ],
            message:'收到了吗，朋友',
        }
    },
    mounted() {



    },
    watch: {

    },
    created() {

    },
    methods: {
        getInfo() {
            let _self = this;
            axios.get('http://127.0.0.1:5000/api/post/fenbu')
                .then(
                    res => {
                        let msg = res.data;
                        console.log(msg);
                        _self.distrData = msg;
                    }
                )
                .catch((error) => {
                    console.log(error);
                })
        },
        sendMessage(index, content) {
            this.eventBus.emit("click-send-slugIndex", index);
            //index list 
            console.log(index);
            this.$store.commit('sendIndexToRelation',index);
            this.$store.commit('sendContent',content);
            this.$store.getters.getIndex;
            
        }




    },


}


</script>

<style>
.el-collapse {
    --el-collapse-header-height: 70px; 
    /* --el-collapse-header-width: 70px; */
}
.el-collapse-item__header{
    display: block;
    
}
.sluglines{
    /* display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden; */

    display: inline-block;
    /* line-height: 24px;
    padding: 5px 0;
    margin-right: 10px; */
    word-wrap: break-word;
    word-break: break-all;
    overflow: hidden; 

}
.dia {
    white-space: pre-wrap;
    text-align: center;

    height: 309px; overflow-y: scroll;display: block; font-size: 14pt;  border: 3px;
}
.dia::-webkit-scrollbar {
    width: 0;
}
</style>