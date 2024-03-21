<template>
    <div>
        
        <button @click="test">test $store</button>
        
        <div id="flowArea">
            <button @click="zoom">!!!!</button>
        </div>
        <div id="locationArea">
            <button @click="getLocationInfo">
                get loc information
            </button>
            <button @click="drawLocDemo">
                look data
            </button>
        </div>
    </div>
</template>

<script>
import * as d3 from 'd3'
import axios from 'axios'

export default {
    name: 'locationArea',
    components: {

    },
    data(){
        return{
            locData:'',
            dialogTableVisible:false,
        }
    },
    mounted(){
            
        },
    watch: {
        locData:{
            handler:function(locData){
                console.log(locData);
            }

        }
    },
    created() {
        
    },
    methods:{
        test() {
            this.$store.dispatch('increment');
            this.locData = this.$store.getters.doneTodos
            
        },
        getLocationInfo(){
                let _self = this;
                axios.get('http://127.0.0.1:5000/api/post/locationInfo')
                .then(
                    res=>{
                        let msg = res.data;
                        console.log(msg);
                        _self.locData = msg;
                    }
                )
                .catch((error)=>{
                    console.log(error);
                })
            },
        zoom() {
            const height = 400, width = 400;
            const svg = d3.select("#flowArea")
                            .append("svg")
                            .attr("width",width)
                            .attr("height",height)
                            .attr("viewBox",[width/2,height/2,width,height])

            const group = svg.append("g").attr("id","circle-g").style("pointer-events", "all")
            group
                .append("circle")
                .attr("r", 15)
                .attr("cx", 50)
                .attr("cy", 50);
            group
                .append("rect")
                .attr("x",0)
                .attr("y",0)
                .attr("width",400)
                .attr("height",400)
                .style("stroke","blue")
                .attr("stroke-width","1")
                .attr("fill-opacity",0)

            //define a zoom behavior
            const zoom = d3.zoom()
                        .extent([[0,0],[200,200]])
                        .scaleExtent([.5,3])
                        .on("zoom",zoomed)
            svg.call(zoom);
            function zoomed({transform}){
                let g = d3.select('#circle-g')
                // g.attr('transform',"scale("+transform.k+")");
                g.attr('transform',transform);
                console.log(transform);
            }
        },
        drawLocDemo() {
            this.dialogTableVisible = true
            const orgData = this.locData;
            let index = 1;
            const data = []
            for (let key in orgData.data) {
                const tmp = {};
                tmp['id'] = index;
                index = index + 1;
                tmp['loc'] = orgData.data[key];
                data.push(tmp)
            }
            console.log(data);

            const locList = orgData.class;
            const slugLength = data.length;
            const width = 5000, height = 1500;
            const margin = {
                bottom: 200,
                top: 100,
                left: 200,
                right: 100
            }
            const svg = d3.select("#locationArea")
                            .append("svg")
                            .attr("width",width)
                            .attr("height",height)

            const xScale = d3.scaleLinear().domain([1,slugLength]).range([margin.left, width - margin.right]);
            const yScale = d3.scaleBand().domain(locList).range([height - margin.bottom, margin.top])

            const xAxis = d3.axisBottom(xScale)
            const yAxis = d3.axisLeft(yScale)

            svg
                .append('g')
                .attr("class", "x-lineaxis")
                .attr('transform', `translate(0,${height - margin.bottom})`)
                .call(xAxis)
                .selectAll(".x-lineaxis text")
                .attr("transform", "translate(-10,10)rotate(-45)")
                .style("text-anchor", "end")
                .style("font-size", 50)
                .style("fill", "#69a3b2")
            
            svg
                .append('g')
                .attr("class", "y-lineaxis")
                .attr('transform', `translate(${margin.left},0)`)
                .call(yAxis)
            var groups = svg.selectAll(null)
                .data(data)
                .enter()
                .append("g");
                // .attr("cx",d=>d.slug)

            var rects = groups.selectAll(null)
                // .data(function(d) {
                //     return d3.entries(d.emotion)
                // })
                .data(d=>d.loc)
                .enter()
                .append("circle")
                .attr("id",(d,i)=>`${i}cirle`);
            
            rects 
                .attr("r",10)
                .attr("cy",d=>yScale(d))
                .style("fill","gray")
                .style("fill-opacity",'.5')
                .attr("cx",function() {
                    return xScale(d3.select(this.parentNode).datum().id);
                })
        }, 

        

    },


}


</script>