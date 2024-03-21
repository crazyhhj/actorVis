<template>    
    <div class="slugRelation">
        <!-- <h1>{{ $store.state.default_value }}</h1>
        <h1>{{ this.screen_num }}</h1> -->
        <!-- <button @click="getLinks">①请先获得人物关系数据</button> -->
        <!-- <button @click="drawRelation">456789</button> -->
        <div id="relationArea"  style="width: 100%; height: 100%;"></div>
        <!-- <div id="operatingFloor">
            <div id="progress-control">
                
                <button class="retreat" @click="back"><i class="fa fa-backward fa-3x"></i></button>
                <button class="play" @click="play_slug"><i class="fa fa-play fa-3x"></i></button>
                <button class="speed" @click="speed"><i class="fa fa-forward fa-3x" aria-hidden="true"></i>  </button>
            </div>
        </div> -->
    </div>
</template>

<script>
import axios from "axios";
import * as d3 from "d3"
import { toRaw } from "vue";
import store from "../store/index";
store

export default {
    // name: 'App',
    // components: {
        
    // },
    data() {
        return {
            value1:0,
            screen_num:this.$store.state.slugIndexList,
        };
    },
    computed:{
        key(){
            return this.$store.state.slugIndexList;
        }
    },
    
    mounted() {
        // this.eventBus.on("click-send-slugIndex",(msgData)=>(this.screen_num = msgData));
        
    },
    beforeUnmount() {
        // this.eventBus.off("click-send-slugIndex")
    },
    watch: {
        key(val){
            console.log("监听",val);
        },

        screen_num:{
            handler: function (screen_num){

                const slugIndexList = screen_num[screen_num.length - 1]
                this.drawRelationByIndex(slugIndexList);
            },deep:true   
        }

    },
    created() {
    },
    methods: {
        getLinks(){
            let _self =this;
            axios.get('http://127.0.0.1:5000/api/post/relationactor')
                .then(
                    res => {
                        let msg = res.data;
                        _self.relation = msg;
                    }
                )
                .catch((error)=>{
                    console.log(error);
                });
            // console.log(_self.relation);
        },

        drawRelation(){
            const nodeLink = toRaw(this.relation);
            const data0 = nodeLink.map(d => ({nodes: Array.from(new Set(d.flatMap(l => [l.source, l.target])),id=>({id})), links:d}))
            const data = data0[7]
            // console.log(rData);
            const data1 = {
            nodes: [
               {id: "Microsoft"}
             , {id: "Amazon"}
             , {id: "HTC"}
             , {id: "Samsung"}
             , {id: "Apple"}
             , {id: "Motorola"}
             , {id: "Nokia"}
             , {id: "Kodak"}
             , {id: "Barnes & Noble"}
             , {id: "Foxconn"}
             , {id: "Oracle"}
             , {id: "Google"}
             , {id: "Inventec"}
             , {id: "LG"}
             , {id: "RIM"}
             , {id: "Sony"}
             , {id: "Qualcomm"}
             , {id: "Huawei"}
             , {id: "ZTE"}
             , {id: "Ericsson"}
            ],
            links: [
                   {source: "Microsoft", target: "Amazon", type: "licensing"}
                 , {source: "Microsoft", target: "HTC", type: "licensing"}
                 , {source: "Samsung", target: "Apple", type: "suit"}
                 , {source: "Motorola", target: "Apple", type: "suit"}
                 , {source: "Nokia", target: "Apple", type: "resolved"}
                 , {source: "HTC", target: "Apple", type: "suit"}
                 , {source: "Kodak", target: "Apple", type: "suit"}
                 , {source: "Microsoft", target: "Barnes & Noble", type: "suit"}
                 , {source: "Microsoft", target: "Foxconn", type: "suit"}
                 , {source: "Oracle", target: "Google", type: "suit"}
                 , {source: "Apple", target: "HTC", type: "suit"}
                 , {source: "Microsoft", target: "Inventec", type: "suit"}
                 , {source: "Samsung", target: "Kodak", type: "resolved"}
                 , {source: "LG", target: "Kodak", type: "resolved"}
                 , {source: "RIM", target: "Kodak", type: "suit"}
                 , {source: "Sony", target: "LG", type: "suit"}
                 , {source: "Kodak", target: "LG", type: "resolved"}
                 , {source: "Apple", target: "Nokia", type: "resolved"}
                 , {source: "Qualcomm", target: "Nokia", type: "resolved"}
                 , {source: "Apple", target: "Motorola", type: "suit"}
                 , {source: "Microsoft", target: "Motorola", type: "suit"}
                 , {source: "Motorola", target: "Microsoft", type: "suit"}
                 , {source: "Huawei", target: "ZTE", type: "suit"}
                 , {source: "Ericsson", target: "ZTE", type: "suit"}
                 , {source: "Kodak", target: "Samsung", type: "resolved"}
                 , {source: "Apple", target: "Samsung", type: "suit"}
                 , {source: "Kodak", target: "RIM", type: "suit"}
                 , {source: "Nokia", target: "Qualcomm", type: "suit"}
            ]
            }
            console.log(data);
            console.log(data1);
            const height = 600,width = 600;
            const types = Array.from(new Set(data.nodes.map(d=>d.id)))
            // const types1 = Array.from(new Set(data.nodes.map(d=>d.t)))

            const color = d3.scaleOrdinal(types, [...d3.schemeTableau10,...d3.schemeCategory10])
            function linkArc(d) {
                const r = Math.hypot(d.target.x - d.source.x, d.target.y - d.source.y);
                return `
                    M${d.source.x},${d.source.y}
                    A${r},${r} 0 0,1 ${d.target.x},${d.target.y}
                `;
                }
            var drag = simulation => {
  
                function dragstarted(event, d) {
                    if (!event.active) simulation.alphaTarget(0.3).restart();
                    d.fx = d.x;
                    d.fy = d.y;
                }
                
                function dragged(event, d) {
                    d.fx = event.x;
                    d.fy = event.y;
                }
                
                function dragended(event, d) {
                    if (!event.active) simulation.alphaTarget(0);
                    d.fx = null;
                    d.fy = null;
                }
                
                return d3.drag()
                    .on("start", dragstarted)
                    .on("drag", dragged)
                    .on("end", dragended);
                }
            const links = data.links.map(d => Object.create(d));
            const nodes = data.nodes.map(d => Object.create(d));

            const simulation = d3.forceSimulation(nodes)
                .force("link", d3.forceLink(links).id(d => d.id))
                .force("charge", d3.forceManyBody().strength(-10000))
                .force("x", d3.forceX())
                .force("y", d3.forceY());
            console.log([...d3.schemeTableau10,...d3.schemeCategory10]);
            const svg = d3.select('#relationArea')
                .append("svg")
                .attr("viewBox", [-width / 2, -height / 2, width, height])
                .style("font", "12px sans-serif");

            // Per-type markers, as they don't inherit styles.
            // svg.append("defs").selectAll("marker")
            //     .data(types)
            //     .join("marker")
            //     .attr("id", d => `arrow-${d}`)
            //     .attr("viewBox", "0 -5 10 10")
            //     .attr("refX", 15)
            //     .attr("refY", -0.5)
            //     .attr("markerWidth", 6)
            //     .attr("markerHeight", 6)
            //     .attr("orient", "auto")
            //     .append("path")
            //     .attr("fill", color)
            //     .attr("d", "M0,-5L10,0L0,5");

            const link = svg.append("g")
                .attr("fill", "none")
                .attr("stroke-width", 1)
                .selectAll("path")
                .data(links)
                .join("path")
                .attr("stroke", d => color(d.source))
                .attr("stroke-width", d=>d.value)

                // .attr("stroke", 'pink')
                .attr("marker-end", d => `url(${new URL(`#arrow-${d.source}`, location)})`);

            const node = svg.append("g")
                .attr("fill", "currentColor")
                .attr("stroke-linecap", "round")
                .attr("stroke-linejoin", "round")
                .selectAll("g")
                .data(nodes)
                .join("g")
                .call(drag(simulation));

            node.append("circle")
                .attr("stroke", "white")
                .attr("stroke-width", 1.5)
                .attr("r", 4);

            node.append("text")
                .attr("x", 8)
                .attr("y", "0.31em")
                .text(d => d.id)
                .clone(true).lower()
                .attr("fill", "none")
                .attr("stroke", "white")
                .attr("stroke-width", 3);

            simulation.on("tick", () => {
                link.attr("d", linkArc);
                node.attr("transform", d => `translate(${d.x},${d.y})`);
            });

        },
 
        

        drawRelationByIndex(index){
            const nodeLink = toRaw(this.$store.state.relation);
            // console.log("nodeLink 是",nodeLink);
            const data0 = nodeLink.map(d => ({nodes: Array.from(new Set(d.flatMap(l => [l.source, l.target])),id=>({id})), links:d}))
            const data = data0[index]
            // console.log(rData);
            // const uniformVariableValue = 400
            const uniformVariableValue = '100%';
            
            const height = uniformVariableValue,width = uniformVariableValue;
            const types = Array.from(new Set(data.nodes.map(d=>d.id)))
            const types1 = Array.from(new Set(data.links.map(d=>d.type)))

            const color = d3.scaleOrdinal(types, [...d3.schemeTableau10,...d3.schemeCategory10])

            //定义一个线性渐变
            // var defs = svg.append("defs");
            
            // var linearGradient = defs.append("linearGradient")
            //                         .attr("id","linearColor")
            //                         .attr("x1","0%")
            //                         .attr("y1","0%")
            //                         .attr("x2","100%")
            //                         .attr("y2","0%");
            
            // linearGradient.append("stop")
            //                 .attr("offset","0%")
            //                 .style("stop-color",'yellow');
            
            // linearGradient.append("stop")
            //                 .attr("offset","100%")
            //                 .style("stop-color",'black');

            function linkArc(d) {
                const r = Math.hypot(d.target.x - d.source.x, d.target.y - d.source.y);
                return `
                    M${d.source.x},${d.source.y}
                    A${r},${r} 0 0,1 ${d.target.x},${d.target.y}
                `;
                }
            var drag = simulation => {
  
                function dragstarted(event, d) {
                    if (!event.active) simulation.alphaTarget(0.3).restart();
                    d.fx = d.x;
                    d.fy = d.y;
                }
                
                function dragged(event, d) {
                    d.fx = event.x;
                    d.fy = event.y;
                }
                
                function dragended(event, d) {
                    if (!event.active) simulation.alphaTarget(0);
                    d.fx = null;
                    d.fy = null;
                }
                
                return d3.drag()
                    .on("start", dragstarted)
                    .on("drag", dragged)
                    .on("end", dragended);
                }
            const links = data.links.map(d => Object.create(d));
            const nodes = data.nodes.map(d => Object.create(d));

            const simulation = d3.forceSimulation(nodes)
                .force("link", d3.forceLink(links).id(d => d.id))
                .force("charge", d3.forceManyBody().strength(-5000))
                .force("x", d3.forceX())
                .force("y", d3.forceY());
            // console.log([...d3.schemeTableau10,...d3.schemeCategory10]);

            d3.select("#content").remove()
            const svgOrg = d3.select('#relationArea')
                .append("svg")
                .attr("width",width)
                .attr("height",height)
                // .style("background-color", "yellow")
                // .style("opacity", 0.2)
                .attr("viewBox", [-width / 2, -height / 2, width, height])
                // .attr("viewBox", [0,0, width, height])
                .attr("id","content")
                .style("font", "12px sans-serif");
            const svg = svgOrg.append("g").attr("id","picRelation")
                                // .attr("width",width)
                                // .attr("height",height)
            
            // svg
            //     .append("rect")
            //     .attr("x",0)
            //     .attr("y",0)
            //     .attr("width",width)
            //     .attr("height",height)
            //     .style("stroke","blue")
            //     .attr("stroke-width","1")
            //     .attr("fill-opacity",0)
            // Per-type markers, as they don't inherit styles.
            svg.append("defs").selectAll("marker")
                .data(types1)
                .join("marker")
                .attr("id", d => `arrow-${d}`)
                .attr("viewBox", "0 -5 10 10")
                .attr("refX", 15)
                .attr("refY", -0.5)
                .attr("markerWidth", 6)
                .attr("markerHeight", 6)
                .attr("orient", "auto")
                .append("path")
                .attr("id","ttt")
                .attr("fill", "red")
                .attr("stroke-width", 1)
                .attr("d", "M0,-5L10,0L0,5");

            const link = svg.append("g")
                .attr("fill", "none")
                .attr("stroke-width", 1)
                .selectAll("path")
                .data(links)
                .join("path")
                .attr("stroke", d => color(d.source))
                .attr("stroke-width", d=>3*d.value)

                // .attr("stroke", 'pink')
                // .attr("marker-end", d => `url(${new URL(`#arrow-${d.type}`, location)})`);
            
            const link2 = svg.append("g")
                .attr("fill", "none")
                .attr("stroke-width", 1)
                .selectAll("path")
                .data(links)
                .join("path")
                .attr("stroke", d => color(d.source))
                .attr("stroke-width", 1.8)

                // .attr("stroke", 'pink')
                .attr("marker-end", d => `url(${new URL(`#arrow-${d.type}`, location)})`);

            const node = svg.append("g")
                .attr("fill", "currentColor")
                .attr("stroke-linecap", "round")
                .attr("stroke-linejoin", "round")
                .selectAll("g")
                .data(nodes)
                .join("g")
                .call(drag(simulation));

            node.append("circle")
                .attr("stroke", "white")
                .attr("stroke-width", 1.5)
                .attr("r", 4);

            node.append("text")
                .attr("x", 8)
                .attr("y", "0.31em")
                .text(d => d.id)
                .clone(true).lower()
                .attr("fill", "none")
                .attr("stroke", "white")
                .attr("stroke-width", 3);

            simulation.on("tick", () => {
                link.attr("d", linkArc);
                node.attr("transform", d => `translate(${d.x},${d.y})`);
                link2.attr("d",linkArc)
            });

            const zoom = d3.zoom()
                        // .extent([[0,0],[400,400]])
                        .scaleExtent([.5,3])
                        .on("zoom",zoomed)
            svgOrg.call(zoom);
            function zoomed({transform}){
                let g = d3.select('#picRelation')
                // console.log(transform);
                // g.attr('transform',"scale("+transform.k+")");
                g.attr('transform',transform);
            } 
        },

        speed(){
            const count = this.screen_num;
            this.screen_num = count+1;
        },
        back(){
            const count = this.screen_num;
            this.screen_num = count-1;
        },
        play_slug(){

        }
}
}

    

</script>

<style>
.slugRelation {
    width: 100%;
    height: 100%;
}
/* .slugRelation {
    width: 1000px;
    height: 1300px;
}

#relationArea {
    width: 1000px;
    height: 1000px;
}

button {
    background-color: white;
    border-color: none;
    border: 0;
} */
</style>