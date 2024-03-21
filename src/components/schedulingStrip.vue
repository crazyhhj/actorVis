<template>
    <!-- <input type="range" min=0 :max=scheduling.length name="" id="" v-model="index"> -->
   <div id="topStrip">
    <button id="once" @click="drawScheduling"> get data </button>
   </div>
</template>

<script>
import * as d3 from 'd3'

    export default {
        data(){
            return{
                scheduling:'',
                index:this.$store.state.slugIndexList,
            }
        },
        computed() {
        },
        mounted() {
            // this.drawScheduling();

        },
        watch:{
            index:{
                handler:function (index) {
                    //input is a list 
                    this.drawTicks(index)
                },deep:true
            }
        },
        methods:{
            drawScheduling () {
                this.scheduling = this.$store.getters.getScheduling;
                console.log( '顶部数据',this.scheduling)
                //data ↓↓↓↓↓↓
                const crudeData = this.scheduling;
                console.log(crudeData);
                //data ↑↑↑↑↑↑
                const width = 2580, height = 100; 
                const margin = {top:10,right:100,left:100,bottom:10};
                const svg = d3.select("#topStrip")
                                .append("svg")
                                .attr("width",width)
                                .attr("height",height)
                const agency = svg.append("g").attr("id","schedulingManager")
                //scale 
                const slugList = crudeData.map(d=>d.screen);
                const valueList = d3.extent(crudeData.map(d=>d.content));
                
                const xScale = d3.scaleBand().domain(slugList).range([margin.left,width-margin.right])
                const yScale = d3.scaleLinear().domain(valueList).range([height-margin.bottom,margin.top])
                const xAxis = d3.axisBottom(xScale)
                const yAxis = d3.axisLeft(yScale)

                const rectWidth = .99*Math.floor(width/slugList.length)
                //rect redius/width/height = [7,130,20]
                agency
                    .selectAll(".schedulingRect")
                    .data(crudeData)
                    .join("rect")
                        .attr("class","schedulingRect")
                        .attr("x", d=>xScale(d.screen))
                        .attr("y", d=>Math.floor(yScale(d.content)/10)*10)
                        .attr("id",d=>`${d.screen}`)
                        .attr("width",rectWidth)
                        .attr("height",2)
                        .attr("fill","#000000")
                
                agency
                    .append("g")
                    .attr("id","xAxisScheduling")
                    .attr("transform",`translate(0,${height-margin.bottom})`)
                    .call(xAxis)
                    .selectAll("text")
                    .style("opacity", 0);
                agency
                    .append("g")
                    .attr("id","yAxisScheduling")
                    .attr("transform",`translate(${margin.left},0)`)
                    .call(yAxis)
                    .selectAll("text")
                    .style("opacity", 0);
                
                // rhomboid
                const rhomboid = g=>g
                    .attr("class","schedulingTick")
                    .attr("d", "M 0 25 L 15 0 L 15 170 L 0 195 Z")
                    .style("storke", "black")
                    .style("fill", "#f7aa01")

                const revoleData = [crudeData[10],crudeData[70],crudeData[110]]
                agency
                    .selectAll(".schedulingTick")
                    .data(revoleData)
                    .join("path")
                    .call(rhomboid)
                    .attr("transform",d=>`translate(${xScale(d.screen)+rectWidth/3}, ${yScale(d.content)-rectWidth*2.3}) scale(.2)`)
                d3.select("#once").style("display","none")
            },
            
            drawTicks (index) {
                console.log(index);
                const crudeData = this.scheduling
                const slugList = crudeData.map(d=>d.screen);
                const valueList = d3.extent(crudeData.map(d=>d.content));

                const width = 2580, height = 100; 
                const margin = {top:10,right:100,left:100,bottom:10};
                const rectWidth = .99*Math.floor(width/slugList.length)

                const agency = d3.select("#schedulingManager")

                const xScale = d3.scaleBand().domain(slugList).range([margin.left,width-margin.right])
                const yScale = d3.scaleLinear().domain(valueList).range([height-margin.bottom,margin.top])
                                // rhomboid
                const rhomboid = g=>g
                    .attr("class","schedulingTick")
                    .attr("d", "M 0 25 L 15 0 L 15 170 L 0 195 Z")
                    .style("storke", "black")
                    .style("fill", "#f7aa01")
                
                const revoleData = [crudeData[index[index.length-1]]]
                // const revoleData = index.map(d=>crudeData[d])
                agency
                    .selectAll(".schedulingTick")
                    .data(revoleData)
                    .join("path")
                    .transition()
                    .duration(1000)
                    .call(rhomboid)
                    .attr("transform",d=>`translate(${xScale(d.screen)+rectWidth/3}, ${yScale(d.content)-rectWidth*2.3}) scale(.2)`)
                agency
                    .selectAll(".shadow")
                    .data(revoleData)
                    .join("rect")
                    .transition()
                    .duration(1000)
                    .attr("class","shadow")
                    .attr("x", margin.left)
                    .attr("y", margin.top)
                    .attr("width", d=>xScale(d.screen)-margin.left + rectWidth/3)
                    .attr("height",height - margin.top - margin.bottom)
                    .style("fill","green")
                    .style("opacity",0.1)
            },

        },
}
</script>

<style>

</style>