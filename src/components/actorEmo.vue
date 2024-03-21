<template>
    <div>
        <button @click="getInfo">get information</button>
        <button @click="drawActEmo">得到图表</button>
        <el-select v-model="value" placeholder="请选择">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
        </el-select>
        <button @click="drawActEmo2">得到图表</button>
        <div id="actEmo">

        </div>
    </div>
</template>

<script>
import * as d3 from 'd3'
import axios from 'axios'

export default {
    name: 'txtNotice',
    components: {

    },
    data() {
        return {
            actorInfo: '',
            sluglines: '',
            options:'',
            value:'',

        }
    },
    mounted() {

        d3.select("#actEmo").append("svg").attr("id", "charts").attr("width", 20000).attr("height", 2000);
        d3.select("#charts")
            .append("circle")
            .attr("r", 20)
            .attr("cx", 40)
            .attr("cy", 40)
            .style("stroke", "blue")
            .attr("storke-width", 1)
            .attr("fill-opacity", 0)
    },
    watch: {

    },
    created() {
        window.char = this;
    },
    methods: {
        getInfo() {
            let _self = this;
            axios.get('http://127.0.0.1:5000/api/post/actoremo')
                .then(
                    res => {
                        let msg = res.data;
                        console.log(msg);
                        _self.actorInfo = msg;
                    }
                )
                .catch((error) => {
                    console.log(error);
                })

            axios.get('http://127.0.0.1:5000/api/post/screenplay')
                .then(
                    res => {
                        let msg = res.data;
                        console.log(msg);
                        _self.sluglines = msg;
                    }
                )
            const orgData = _self.actorInfo;
            const actorList = []
            for (let key in orgData) {
                const tmp = {};
                tmp['label']=key;
                tmp['value']=key;
                actorList.push(tmp)
            }
            _self.options = actorList;
        },

        drawActEmo() {
            const orgData = this.actorInfo;
            const actorList = [];
            // const colorList = [];
            const data = [];

            const emoConstrast = [
                //一般  blue 4
                'caring', 'faithful',
                'trusting', 'impressed',
                //坏的 red 10
                'guilty', 'sad',
                'devastated', 'disgusted',
                'ashamed', 'furious',
                'anxious', 'surprised',
                'disappointed', 'annoyed',
                //好的  green 10
                'joyful', 'hopeful',
                'grateful', 'excited',
                'confident', 'anticipating',
                'content', 'afraid',
                'angry', 'proud',
                // 一般 gray 7
                'nostalgic', 'sentimental',
                'lonely', 'jealous',
                'apprehensive', 'prepared',
                'embarrassed',
            ]
            const colorConstrast = [
                "blue", "blue", "blue", "blue",
                "red", "red", "red", "red", "red", "red", "red", "red", "red", "red",
                "green", "green", "green", "green", "green", "green", "green", "green", "green", "green",
                "gray", "gray", "gray", "gray", "gray", "gray", "gray",
            ]
            console.log(colorConstrast.length, emoConstrast.length)
            for (let key in orgData) {
                data.push(orgData[key])
                actorList.push(key)
            }
            // console.log(data, actorList);
            const sluglinesLis = this.sluglines;
            const sluglinesList = [0].concat(sluglinesLis);
            const role = 'JOKER'
            // const role = 'MOM'
            const dataRole = this.actorInfo[role];
            const gatherFre = dataRole.map(d => d.fre);
            const maxFre = Math.ceil(d3.max(gatherFre) * 1.1);

            const width = 20000, height = 2000;
            const margin = {
                bottom: 200,
                top: 100,
                left: 50,
                right: 100
            }
            // const colorScale = d3.scaleBand().domain(actorList).range(["#000000","#ffffff"])
            const xScale = d3.scaleBand().domain(sluglinesList).range([margin.left, width - margin.right]);
            const yScale = d3.scaleLinear().domain([0, maxFre]).range([height - margin.bottom, margin.top])

            const xAxis = d3.axisBottom(xScale)
            const yAxis = d3.axisLeft(yScale)

            // console.log(xScale(`25   INT. KITCHEN, MOM'S APARTMENT - LATE NIGHT                   25\n`));
            // console.log(yScale(dataRole[0].fre));
            // console.log(colorScale('JOKER'));
            const line = d3.line()
                .x(d => xScale(d.slug))
                .y(d => yScale(d.fre))
                .curve(d3.curveNatural)
            const mainSvg = d3.select("#charts")
            const finalData = [dataRole]
            // console.log(finalData);

            mainSvg
                .append('g')
                .attr("class", "x-lineaxis")
                .attr('transform', `translate(0,${height - margin.bottom})`)
                .call(xAxis)
                .selectAll(".x-lineaxis text")
                .attr("transform", "translate(-10,10)rotate(-45)")
                .style("text-anchor", "end")
                .style("font-size", 5)
                .style("fill", "#69a3b2")
            mainSvg
                .append('g')
                .attr("class", "y-lineaxis")
                .attr('transform', `translate(${margin.left},0)`)
                .call(yAxis)
            mainSvg
                .append('g')
                .attr('id', `${role}area`)
                .selectAll('path')
                .data(finalData)
                .join('path')
                .attr('class', `${role}-line`)
                .attr('d', line)
                // .style('stroke', "green")
                .style("stroke", function () {
                    return "hsl(" + Math.random() * 360 + ",100%,50%)";
                })
                // .style('stroke', d=>colorScale(d.name))
                .style('stroke-width', 2)
                .style('fill', 'transparent')

            mainSvg
                .selectAll('text.label')
                .data(finalData)
                .join('text')
                .attr('class', 'label')
                .attr('x', d => xScale(d[d.length - 1].slug) + 20)
                .attr('y', d => yScale(d[d.length - 1].fre))
                .attr('dy', '0.35em')
                .style('fill', 'red')
                // .style('fill',"blue")
                .style('font-family', 'sans-serif')
                .style('font-size', 12)
                .text(d => d[0].name)

            const colorCirScale = d3.scaleOrdinal().domain(emoConstrast).range(colorConstrast);
            const yCirScale = d3.scaleBand().domain(["blue", "red", "green", "gray"]).range([500, 1500])
            console.log(colorCirScale('caring'));
            // console.log(dataRole);


            var groups = mainSvg.selectAll(null)
                .data(dataRole)
                .enter()
                .append("g");
                // .attr("cx",d=>d.slug)

            var rects = groups.selectAll(null)
                // .data(function(d) {
                //     return d3.entries(d.emotion)
                // })
                .data(d=>d.emotion)
                .enter()
                .append("circle");
            
            rects 
                .attr("r",10)
                .attr("cy",(d,i)=>yCirScale(colorCirScale(d))-10*i)
                .style("fill",d=>colorCirScale(d))
                .style("fill-opacity",'.5')
                .attr("cx",function() {
                    return xScale(d3.select(this.parentNode).datum().slug);
                })

        },

        drawActEmo2() {
            d3.select('#charts').selectAll('*').remove();
            const orgData = this.actorInfo;
            const actorList = [];
            // const colorList = [];
            const data = [];

            const emoConstrast = [
                //一般  blue 4
                'caring', 'faithful',
                'trusting', 'impressed',
                //坏的 red 10
                'guilty', 'sad',
                'devastated', 'disgusted',
                'ashamed', 'furious',
                'anxious', 'surprised',
                'disappointed', 'annoyed',
                //好的  green 10
                'joyful', 'hopeful',
                'grateful', 'excited',
                'confident', 'anticipating',
                'content', 'afraid',
                'angry', 'proud',
                // 一般 gray 7
                'nostalgic', 'sentimental',
                'lonely', 'jealous',
                'apprehensive', 'prepared',
                'embarrassed',
            ]
            const colorConstrast = [
                "blue", "blue", "blue", "blue",
                "red", "red", "red", "red", "red", "red", "red", "red", "red", "red",
                "green", "green", "green", "green", "green", "green", "green", "green", "green", "green",
                "gray", "gray", "gray", "gray", "gray", "gray", "gray",
            ]
            console.log(colorConstrast.length, emoConstrast.length)
            for (let key in orgData) {
                data.push(orgData[key])
                actorList.push(key)
            }
            // console.log(data, actorList);
            const sluglinesLis = this.sluglines;
            const sluglinesList = [0].concat(sluglinesLis);
            const role = this.value;
            // const role = 'MOM'
            const dataRole = this.actorInfo[role];
            const gatherFre = dataRole.map(d => d.fre);
            const maxFre = Math.ceil(d3.max(gatherFre) * 1.1);

            const width = 2000, height = 2000;
            const margin = {
                bottom: 200,
                top: 100,
                left: 50,
                right: 100
            }
            // const colorScale = d3.scaleBand().domain(actorList).range(["#000000","#ffffff"])
            const xScale = d3.scaleBand().domain(sluglinesList).range([margin.left, width - margin.right]);
            const yScale = d3.scaleLinear().domain([0, maxFre]).range([height - margin.bottom, margin.top])

            const xAxis = d3.axisBottom(xScale)
            const yAxis = d3.axisLeft(yScale)

            // console.log(xScale(`25   INT. KITCHEN, MOM'S APARTMENT - LATE NIGHT                   25\n`));
            // console.log(yScale(dataRole[0].fre));
            // console.log(colorScale('JOKER'));
            const line = d3.line()
                .x(d => xScale(d.slug))
                .y(d => yScale(d.fre))
                .curve(d3.curveNatural)
            const mainSvg = d3.select("#charts")
            const finalData = [dataRole]
            console.log(finalData);

            mainSvg
                .append('g')
                .attr("class", "x-lineaxis")
                .attr('transform', `translate(0,${height - margin.bottom})`)
                .call(xAxis)
                .selectAll(".x-lineaxis text")
                .attr("transform", "translate(-10,10)rotate(-45)")
                .style("text-anchor", "end")
                .style("font-size", 5)
                .style("fill", "#69a3b2")
            mainSvg
                .append('g')
                .attr("class", "y-lineaxis")
                .attr('transform', `translate(${margin.left},0)`)
                .call(yAxis)
            mainSvg
                .append('g')
                .attr('id', `${role}area`)
                .selectAll('path')
                .data(finalData)
                .join('path')
                .attr('class', `${role}-line`)
                .attr('d', line)
                // .style('stroke', "green")
                .style("stroke", function () {
                    return "hsl(" + Math.random() * 360 + ",100%,50%)";
                })
                // .style('stroke', d=>colorScale(d.name))
                .style('stroke-width', 2)
                .style('fill', 'transparent')

            mainSvg
                .selectAll('text.label')
                .data(finalData)
                .join('text')
                .attr('class', 'label')
                .attr('x', d => xScale(d[d.length - 1].slug) + 20)
                .attr('y', d => yScale(d[d.length - 1].fre))
                .attr('dy', '0.35em')
                .style('fill', 'red')
                // .style('fill',"blue")
                .style('font-family', 'sans-serif')
                .style('font-size', 12)
                .text(d => d[0].name)
            
            mainSvg
                .selectAll('signn')
                .data(finalData)
                .join('rect')
                .attr('class', 'signn')
                .attr('x', d => xScale(d[d.length - 1].slug))
                .attr('y', d => yScale(d[d.length - 1].fre))
                .attr('width',"10")
                .attr('height',"10")
                .style('fill',"black")
                .style('fill-opacity','.5')
           

            const colorCirScale = d3.scaleOrdinal().domain(emoConstrast).range(colorConstrast);
            const yCirScale = d3.scaleBand().domain(["blue", "red", "green", "gray"]).range([500, 1500])
            console.log(colorCirScale('caring'));
            console.log(dataRole);


            var groups = mainSvg.selectAll(null)
                .data(dataRole)
                .enter()
                .append("g");
                // .attr("cx",d=>d.slug)

            var rects = groups.selectAll(null)
                // .data(function(d) {
                //     return d3.entries(d.emotion)
                // })
                .data(d=>d.emotion)
                .enter()
                .append("circle");
            
            rects 
                .attr("r",10)
                .attr("cy",(d,i)=>yCirScale(colorCirScale(d))-10*i)
                .style("fill",d=>colorCirScale(d))
                .style("fill-opacity",'.5')
                .attr("cx",function() {
                    return xScale(d3.select(this.parentNode).datum().slug);
                })
            

            // console.log(dataRole);
            // console.log(finalData);
            // var sign = mainSvg
            //     .data(finalData)
            //         .enter()
            //         .append("g");
            // sign
            //     .selectAll('finalrect')
            //     .data(d=>d)
            //     .join('rect')
            //     .attr("class","finalrect")
            //     .attr('x', d => xScale(d.slug))
            //     .attr('y', d => yScale(d.fre))
            //     .attr('width',"10")
            //     .attr('height',"10")
            //     .style('fill',"black")
            //     // .attr('transform',"rotate(90)")


        },
    }
}
</script>