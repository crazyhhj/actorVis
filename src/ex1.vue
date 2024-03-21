/* eslint-disable */
<template>
    <div>
        <svg id="chart" width="1000" height="200"></svg>
        <div id="my_dataviz"></div>
        <div id="da"></div>
    </div>
</template>
  
<script>
import * as d3 from "d3"



export default {
    name: 'App',
    components: {
        
    },
    data() {
        return {};
    },

    mounted() {
        const array = [100, 200, 300, 400, 500]
        // const dian = d3.select("#chart")
        //   .selectAll("circle")
        d3.select("#chart")
            .selectAll("circle")
            .data(array)
            .enter()
            .append("circle")
            .attr("r", 10)
            .attr("cy", 50)
            .attr("cx", (d) => d)
            .attr("fill", "yellow");

        setTimeout(function () {
            d3.select("#chart")
                .selectAll("circle")
                .data([50, 155, 220, 360, 470])
                .transition()
                .duration(1000)
                .attr("r", 5)
                .attr("cx", (y) => y)
                .style("fill", 'red');

        }, 1000);
        var margin = { top: 20, right: 30, bottom: 40, left: 90 },
            width = 460 - margin.left - margin.right,
            height = 400 - margin.top - margin.bottom;

        // append the svg object to the body of the page
        var svg = d3.select("#my_dataviz")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");
        console.log(svg);


        var dataset = [1, 2, 3, 4, 5];
        var set = [1, 2, 3, 4, 5];
        d3.select("da").selectAll("p")
                 .data(dataset,set)
                 .enter()
                 .append("p")
                 .text("say say say you love me");
    }
}


</script>
  
<style></style>