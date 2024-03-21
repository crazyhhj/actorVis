<template>
    <div id="dialogueBoxMain">
        <!-- <div class="main_title" style="width: 508px; height: 80px; position: absolute; top: 104px;left:2370px"></div> -->
        <div class="mian_title" style="height: 80px;"></div>
        <!-- <button @click="dialogueBox" st>dialogue</button> -->
        <div id="dialogueBox" style="overflow: scroll; width: 450px; height: 780px; background-color: transparent;"></div>
    </div>
</template>

<script>
import * as d3 from 'd3'
    export default{
        data(){
            return{
            screen_num: this.$store.state.slugIndexList,
            }
        },
        mounted(){

        },

        watch:{
            screen_num: {
            handler: function (screen_num) {

                const index = screen_num[screen_num.length - 1]

                this.dialogueBox(index);
            }, deep: true
        }
        },
        methods:{
            dialogueBox(index){
                const dialogue = this.$store.state.textForGpt.slice(1);
                const relation = this.$store.state.relation;
                const dialogueData = dialogue[index]
                // let height = dialogue.length
                // dialogueData.map(d=>{
                //     return{'name':'narratage', 'text':d}
                // })
                let outCome = []
                for (let index = 0; index < dialogueData.length; index++) {
                    const element = dialogueData[index];
                    if(element[0]=='$'){
                        let person = element.match(/.*?\$(.*?)\:/)[1].slice(1)
                        let content = element.match(/.*?\"(.*?)\"/)[1].slice(1)
                        outCome.push(person, content)
                    }
                    else
                    {
                        outCome.push(element)
                    }
                    
                }
                // relation
                let relationData = relation[index]
                let name_unit = [...new Set( relationData.map(d=>{
                    return [d.source, d.target]
                }).flat())]
                console.log(name_unit);
                this.dia = outCome
                const box = d3.select('#dialogueBox')
                let tick = 0
                box.selectAll('*').remove()
                box 
                    .selectAll('div')
                    .data(outCome)
                        .join('div')
                        .text( d=>"😀"+d)
                        .attr('class',d=>{
                            if(name_unit.includes(d)){
                                let index = name_unit.indexOf(d)%2;
                                if(index == 0){
                                    tick = 1//poster
                                    return 'poster_man'
                                }
                                else{
                                    tick = -1//senter
                                    return 'senter_man'
                                }
                            }
                            else{
                                if(tick == 1){
                                    tick = 0
                                    return 'poster'
                                }
                                else if(tick == -1){
                                    tick = 0
                                    return 'senter'
                                }
                            }
                            return 'outside'
                        })
                // const svg = d3.select('#dialogueBox').append('svg').attr('width', 300).attr('height', 1500)
            },
        }
    }
    
</script>

<style>
#dialogueBox{
    all:initial
}
.outside{
        width: 250px;
        white-space: normal;
        overflow-y: auto;

        font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
        font-size: 4px;
        margin: 3rem 3rem 70px 2rem;
        padding: .5rem;
        color: #333;

        box-shadow: 0 0 2rem rgba(0, 0, 0, 0.075), 0rem 1rem 1rem -1rem rgba(0, 0, 0, 0.1);


    }

    .poster_man{
        width: 80px;
        white-space: normal;

        font-family: sans-serif;
        font-size: 8px;

        margin: 1rem 1rem auto 1rem ;
        padding: 1rem;

        background: rgb(41, 46, 51);
        color: rgb(214, 240, 255);
        /* overflow-y: auto; */
        border-radius: 2rem 2rem 2rem 2rem;
       
        
    }
    .senter_man{
        width: 80px;
        white-space: normal;

        font-family: sans-serif;
        font-size: 8px;

        margin: 1rem 1rem 1rem auto;
        padding: 1rem;

        background: rgb(217, 230, 236);
        color: rgb(32, 66, 82);
        /* overflow-y: auto; */
        border-radius: 2rem 2rem 2rem 2rem;
    }
    .senter{
        width: 200px;
        white-space: normal;

        font-family:cursive;
        font-size: 20px;
        /* display: inline-flex; */

        padding: 1rem;
        white-space: normal;
        margin: 1rem 1rem 1rem auto;
        border-radius: 1.125rem 1.125rem 0 1.125rem;
        background: #333;
        color: white;
        overflow-y: auto;

        box-shadow: 0 0 2rem rgba(0, 0, 0, 0.075), 0rem 1rem 1rem -1rem rgba(0, 0, 0, 0.1);

    }
    .poster{
        width: 200px;
        font-family:cursive;
        font-size: 20px;
        /* display: inline-flex; */
        padding: 1rem;
        white-space: normal;
        margin: 1rem 1rem  auto 1rem;
        border-radius: 1.125rem 1.125rem 1.125rem 0;
        background: #fff;
        color: #333;
        overflow-y: auto;

        box-shadow: 0 0 2rem rgba(0, 0, 0, 0.075), 0rem 1rem 1rem -1rem rgba(0, 0, 0, 0.1);
    }
</style>