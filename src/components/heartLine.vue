<template>
    <div id="heartLine" style="width: 100%; height: 100%;">
        
    </div>
</template>

<script>
import * as d3 from 'd3'
export default {
    data() {
        return {
            screen_num: this.$store.state.slugIndexList,
        }
    },
    mounted() {

    },

    watch: {
        screen_num: {
            handler: function (screen_num) {

                const index = screen_num[screen_num.length - 1]

                this.lineH(index);
            }, deep: true
        }
    },
    methods: {
        lineH(index) {
            //    console.log('heartData', '??Asd',heartData);
            
            const emoConstrast = [
                //一般  blue 3
                'caring', 'faithful',
                'impressed',
                //坏的消极 red 7
                'guilty', 'sad',
                'ashamed', 'disgusted',
                'anxious', 'afraid',
                'disappointed',
                //坏的积极 yellow 1
                'devastated', 'furious', 'surprised', 'annoyed', 'angry',
                //好的对自己  green 1
                'joyful',
                'excited',
                'confident', 'anticipating',
                'proud',
                //好的对别人  green 2
                'hopeful', 'grateful', 'trusting', 'content',
                // 一般 gray 7
                'nostalgic', 'sentimental',
                'lonely', 'jealous',
                'apprehensive', 'prepared',
                'embarrassed',

                'nn'
            ]
            const axeConstrast = [
                -1, -1, -1,
                -3, -3, -3, -3, -3, -3, -3,
                -2, -2, -2, -2, -2,
                3, 3, 3, 3, 3,
                2, 2, 2, 2,
                1, 1, 1, 1, 1, 1, 1,
                0
            ]
            const heartData = this.$store.state.actorEmoSlug
            let actorArray = []
            actorArray = []

            for (let index = 0; index < heartData.length; index++) {
                const element = heartData[index];
                for (let tick = 0; tick < element.length; tick++) {
                    const unit = element[tick];
                    if (!actorArray[unit['name']]) {
                        actorArray[unit['name']] = []
                        actorArray[unit['name']].push([...unit['emotion']])
                    }
                    else {
                        actorArray[unit['name']].push([...unit['emotion']])
                    }

                }

            }
            

            let name_set = [...new Set(heartData[index].map(d => d.name))]

            let actor_emo = name_set.map(d => {
                return { 'name': d, 'emo': actorArray[d] }
            })

            const emoScale = d3.scaleOrdinal().domain(emoConstrast).range(axeConstrast)

            const line = d3.line()
                .x((d, r) => {
                    
                    return r * 2
                })
                .y((d,r) => 100 + 10 * emoScale(d))
            

            d3.select("#heartLine").selectAll('*').remove()
            const svg = d3.select("#heartLine").append('svg').attr('width', '100%').attr('height', '100%')
            
            const lG = svg.append('g').attr('class', 'lg')
            let a = 0
            actor_emo.forEach(element => {
                let blank = new Array(10).fill('nn')

                
                let data = element['emo']
                let data_f = []
                if (element['name']=='JOKER') {
                    data = data.slice(index)
                }
                data.forEach(e => {
                data_f.push(...e);
                data_f.push(...blank)
            })
                lG.append('g').attr('transform', 'translate(0,'+100*a+')')
                    .append('path')
                    .attr('class','line')
                    .attr('d', line(data_f))
                    .attr('fill', 'none')
                    .style('stroke', d3.schemeTableau10[a])
                
                a+=1
  
            });

            


        },
    }
}

</script>

<style></style>