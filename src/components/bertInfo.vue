<template>
    <div id="tt" style="width: 200px; white-space:normal;">
        <!-- {{ this.$store.state.exBertInfo }}ss -->
    </div>
</template>
  
<script>
import * as d3 from 'd3'
import { mapState } from 'vuex'


export default {
    name: 'bertPic',
    components: {

    },
    data() {
        return {

        }
    },
    mounted() {

    },
    computed: {
        ...mapState({
            exBertInfo: 'exBertInfo'
        })
    }

    ,
    watch: {
        exBertInfo: {
            handler: function (newVal) {
                this.drawBand(newVal)
            }, deep: true
        }
    },
    methods: {
        drawBand(contentInfo){
            let freSub = contentInfo.fre[0];
            let emoData = this.$store.state.actorEmoSlug;
            let indexList = this.$store.state.slugIndexList;
            let index = indexList[indexList.length-1]
            let emoIndex = emoData[index]
            let namePre = []
            for (let i in emoIndex){
                let tmp={};
                tmp['name'] = emoIndex[i].name;
                tmp['fre'] = emoIndex[i].emotion.length;
                namePre.push(tmp)
            }

            d3.select("#tt").selectAll("*").remove()
            let nameList = [];
            for (let i in freSub){
                let tmpDict = {}
                tmpDict['name'] = i
                tmpDict['fre'] = freSub[i]
                nameList.push(tmpDict)
            }
            nameList = [...nameList, ...namePre]
            console.log(nameList);
            const svg = d3.select("#tt").append("svg").attr("width",400).attr("height",550)
            
            const colorScale = d3.scaleLinear().domain([0,18]).range(['white','blue'])
            svg.selectAll("rect")
                .data(nameList)
                .join("rect")
                .attr("width",20)
                .attr("height",20)
                .attr('x',50)
                .attr('y',(d,i)=>30*i + 50)
                .style('fill',d=>colorScale(d.fre))
            svg.append("rect")
                .attr("width",300)
                .attr("height",nameList.length*30 + 10)
                .attr('x',40)
                .attr('y',40)
                .style('fill','none')
                .style('stroke','pink')

            svg.selectAll("text")
                .data(nameList)
                .join("text")
                .attr('x',100)
                .attr('y',(d,i)=>30*i + 70)
                .text(d=>d.name)
            var gradient = svg.append("defs")
                .append("linearGradient")
                .attr("id","gradient")
                .attr("x1","0%")
                // .attr("y1","0%")
                .attr("x2","100%")
                // .attr("y2","100%")
                .attr("spreadMethod","pad");

            gradient.append("stop")
                .attr("offset","0%")
                .attr("stop-color","white")
                .attr("stop-opacity", 1);

            gradient.append("stop")
                .attr("offset","100%")
                .attr("stop-color","blue")
                .attr("stop-opacity", 1);

            svg.append("rect")
                .attr("width", 200)
                .attr("height", 20)
                .attr('x',50)
                .attr('y',500)
                .style("fill","url(#gradient)");  
            svg.append('text')
                .attr('x',40)
                .attr('y',520)
                .text('0')  
            svg.append('text')
                .attr('x',260)
                .attr('y',520)
                .text('18')  
            }
            
    }
}
</script>
  
<style></style>
  