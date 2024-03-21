<template>
    <div v-if="true">
        <a href="https://www.zhihu.com/hot" @click.prevent>点击跳转</a>
    <div id="imageArea"></div>
    <button @click="drawHeartDog">♥</button>
    <button @click="drawPath">自由画布</button><button @click="clearDog">clear</button>
    <button @click="getXY">获得坐标</button>
    <div id="reda">
    </div>
    <button @click="drawReda">获得雷达图</button>
    
    <div id="animation">

    </div>
    <button @click="drawBroke">动画示例</button>
    <select name="ease" id="ease">
        <option value="" ></option>
    </select>
    <button @click="tan">tan</button>

    <div id="relationMatrix">

    </div>
    <button @click="drawMatrix">得到一个关系矩阵</button>

    <div id="mixLine"></div>
    <button @click="drawMixLine">🍃🍃🍃🍃</button>

    <div id="mixLine1"></div>
    <button @click="drawMixLine1">复合线1</button>
    <div style="background-color: bisque; width: 200px; height: 200px; opacity: 0; position:absolute; left: 1000px; top: 100px; "></div>
    <button @click="drawRing">RING</button>
    <div id="ring">
    </div>

    <button @click="groupTrans" id="zubianhuan">组变换</button>
    <div id="divide"> 
    </div>
</div>
    <button @click="dialogueBox" >对话框</button>
    <div id="dialogueBox_pra" style="overflow: scroll; width: 350px; height: 500px; background-color: #f7f7f7;">
        <!-- <p v-for="d in dia">{{ d }}</p> -->
    </div>

    <h1>下方</h1>
    <div>
        <div id="addSelectActor">
            <select name="" id="">
                <option v-for="item in nameList" :value="item" key="item">{{ item }}</option>
            </select>
            <button>+sdadasdada</button>
        </div>
    </div>
    <button @click="cirGen">扇形圆</button>
    <button @click="mixScriptLineGenerate">generate diabox</button>
    <div id="emotionPending"></div>
    <div id="emoDiaBox"></div>

    <div id="personSketch">
        <div class="personBaseFloor">
            <div class="personCoverFloor" style="width: 30%;"></div>
            <div class="personCoverFloor" style="width: 70%;"></div>
        </div>
        <div class="personBaseFloor">
            <div class="personCoverFloor" style="width: 50%;"></div>
            <div class="personCoverFloor" style="width: 50%;"></div>
        </div>
        
    </div>
    
</template>

<script>
import * as d3 from 'd3'
import NP, { divide } from 'number-precision'
// const dialogTableVisible = ref(false)

    export default {
    data() {
        return {
            pathData: [],
            dialogTableVisible: false,
            dia: [1, 2, 3],
            nameList: ['chaA', 'chaB', 'Adsa', 'gdsfs', 'dsaffd', 'fd'],
            message: '',
            height:0
        };
    },
    computed() {
    },
    mounted() {
        const svg = d3.select("#imageArea").append("svg").attr("width", 700).attr("height", 700).style("background-color", "antiquewhite");
        let svg_g = svg.append("g").attr("id", 'manager');
        const data = [[1, 2, 3, 3.5], [2.5, 3], [1.5, 2, 4, 4.5], [2, 2.5, 4.5], [.5, 1.2, 4.6, 5]];
        const catGroup = svg_g
            .selectAll("cat-g")
            .data(data)
            .join("g")
            .attr("class", "cat-g")
            .attr('transform', (d, i) => `translate(0,${i * 100})`);
        catGroup
            .selectAll("cat")
            .data(d => d)
            .join("svg:image")
            .attr("class", "cat")
            .attr('x', d => d * 100)
            .attr('y', 10)
            .attr('width', 50)
            .attr('height', 50)
            .on("click", function () {
            d3.select(this).style("display", "none");
        })
            .attr("xlink:href", "https://cdn-icons-png.flaticon.com/512/10197/10197183.png");
        svg_g.append("text")
            .attr("class", "zero")
            .attr("x", 100)
            .attr("y", 100)
            .text("hello")
            .on("click", function () {
            console.log(svg.select("#zero").text());
        });
        const zoom = d3.zoom()
            .extent([[0, 0], [700, 700]])
            .scaleExtent([.5, 3])
            .on("zoom", zoomed);
        svg.call(zoom);
        function zoomed({ transform }) {
            let g = d3.select("#manager");
            g.attr('transform', transform);
        }
        d3.select("#imageArea").append("canvas");
    },
    watch: {},
    methods: {
        
        drawHeartDog() {
            const res = this.drawHeart(10);
            console.log(res);
            const svg = d3.select("#imageArea").append("svg").attr("width", 700).attr("height", 700).style("background-color", "antiquewhite");
            const groupHert = svg
                .append("g")
                .attr("class", "cat-g")
                .attr('transform', `translate(${250},${250})`);
            groupHert
                .selectAll("cat-heart")
                .data(res)
                .join("svg:image")
                .attr("class", "cat-heart")
                .attr('x', d => d.x * 10)
                .attr('y', d => d.y * 10)
                .attr('width', 50)
                .attr('height', 50)
                .attr("xlink:href", "https://cdn-icons-png.flaticon.com/512/10197/10197221.png");
        },
        drawPath() {
            const _self = this;
            //define svg
            let svg = d3.select("#imageArea").append("svg").attr("id", "freeSvg").attr("width", 700).attr("height", 700).style("background-color", "antiquewhite")
                .on("mousedown", start)
                .on("mousemove", draw)
                .on("mouseup", end);
            //define path data
            let control = false;
            function start() {
                // pathData = [];
                control = true;
                // path.attr("d",line(pathData))
            }
            function draw(event) {
                if (!control) {
                    return;
                }
                // pathData = []
                let x = d3.pointer(event)[0];
                let y = d3.pointer(event)[1];
                _self.pathData.push({ 'x': x, 'y': y });
                // svg.selectAll("circle")
                //     .data(pathData)
                //     .join("circle")
                //     // .transition()
                //     // .duration(100)
                //     .attr("r",1)
                //     .attr("fill","blue")
                //     .attr("cx",d=>d.x)
                //     .attr("cy",d=>d.y)
                svg.selectAll("cat-heart")
                    .data(_self.pathData)
                    .join("svg:image")
                    .attr("class", "cat-heart")
                    .attr('x', d => d.x)
                    .attr('y', d => d.y)
                    .attr('width', 30)
                    .attr('height', 30)
                    .attr("xlink:href", "https://cdn-icons-png.flaticon.com/512/10197/10197221.png");
            }
            function end() {
                // pathData = [];
                control = false;
            }
        },
        clearDog() {
            d3.select("#freeSvg").selectAll("*").remove();
            this.pathData = [];
        },
        drawHeart(a) {
            let start = 0;
            let x = 0, y = 0;
            const acceleration = .11, max = a; //*10;
            const point = [];
            while (start <= max) {
                const cal = 2 * start;
                const xy = {};
                // x = a*(2*Math.cos(start) - Math.cos(cal));
                x = a * (Math.cos(cal) - 2 * Math.cos(start));
                // y = a*(2*Math.sin(start) - Math.sin(cal));
                y = a * (Math.sin(cal) - 2 * Math.sin(start));
                xy["x"] = y;
                xy["y"] = x;
                point.push(xy);
                start = start + acceleration;
            }
            return point;
        },
        getXY() {
            console.log("ss", d3.select("#be").attr("x"));
        },
        drawReda() {
            const svg = d3.select("#reda")
                .append("svg")
                .attr("width", 500)
                .attr("height", 500);
            const group = svg.append("g")
                .attr("id", "redaManager")
                .attr("transform", "translate(250,250)");
            // function coordinate (valueArray){
            // }
            let data = [13, 2, 4, 17, 20, 1];
            let dataForArea = [...data, ...data.slice(0, 1)];
            // alert(-d3.max(data)+5)
            const valueScale = d3.scaleSqrt().domain([0, d3.max(data)]).range([0, d3.max(data)]);
            function coordinateTransformer(d, i) {
                d = valueScale(d);
                const angle = (1 / 6 + i / 3) * Math.PI;
                let polar = {};
                polar.x = d * Math.cos(angle);
                polar.y = d * Math.sin(angle);
                return polar;
            }
            // const redaData  = dataForArea.map((d,i)=>{
            //         d = valueScale(d)
            //         const angle = (1/6 + i/3)*Math.PI;
            //         let polar = {};
            //         polar.x = d * Math.cos(angle); polar.y = d * Math.sin(angle);
            //         return polar
            //     })
            const redaData = dataForArea.map((d, i) => coordinateTransformer(d, i));
            // console.log(redaData);
            const xScale = d3.scaleLinear().domain([-20, 20]).range([-200, 200]);
            const yScale = d3.scaleLinear().domain([-20, 20]).range([-200, 200]);
            //builds out axes
            let axesData = new Array(data.length - 1).fill(Math.ceil(d3.max(data) / 5));
            axesData = axesData.map((d, i) => d * (i + 1));
            function coordinateAxes(axesValue) {
                const cda = new Array(7).fill(axesValue);
                let polar = cda.map((d, i) => coordinateTransformer(d, i));
                return polar;
            }
            let axesArray = axesData.map(d => coordinateAxes(d));
            console.log(redaData);
            console.log(axesArray);
            const line = d3.line()
                .x(d => xScale(d.x))
                .y(d => yScale(d.y));
            const axesGruop = group.selectAll(".axes-g")
                .data(axesArray)
                .join("g")
                .attr("class", "axes-g");
            axesGruop.selectAll(".axe")
                // .datum(d => d)
                .data(d => [d])
                .join("path")
                .attr("class", "axe")
                .attr("d", line)
                .style("fill", "none")
                .style("stroke-width", "3")
                .style("stroke", "gray");
            group.selectAll(".level")
                .data([1, 2, 3, 4, 5, 6])
                .join("line")
                .attr("x1", 0)
                .attr("x2", 0)
                .attr("y1", 0)
                .attr("y2", 200)
                .style("fill", "none")
                .style("stroke-width", "3")
                .style("stroke", "gray")
                .style("transform", d => `rotate(${d * 60}deg)`);
            group.append("path")
                .datum(redaData)
                .attr("class", "redaArea")
                .attr("d", line)
                .style("fill", "#2b9c9d")
                .style("opacity", .5)
                .style("stroke", "black");
            group.selectAll(".redapoint")
                .data(redaData)
                .join("circle")
                .attr("class", "redapoint")
                .attr("r", 10)
                .attr("cx", d => xScale(d.x))
                .attr("cy", d => yScale(d.y))
                .style("fill", "blue");
        },
        drawBroke() {
            const svg = d3.select("#animation").append("svg").attr("width", 1000).attr("height", 500);
            // const colorScale = d3.schemeTableau10
            svg.selectAll("circle")
                .data(d3.shuffle([1, 2, 3, 4, 5]))
                .join("circle")
                .attr("r", 20)
                .attr("cx", d => d * 170)
                .attr("cy", 250)
                .style("fill", "blue")
                .transition()
                .delay((d, i) => i * 200)
                .attr("cx", d => d * 170 + 50)
                .style("fill", (d, i) => d3.schemeTableau10[i])
                .style("opacity", .5);
            svg.append("rect")
                .attr("x", 0)
                .attr("y", 400)
                .attr("width", 20)
                .attr("height", 20);
            const easeNames = Object.keys(d3).filter(d => {
                return d.slice(0, 4) === 'ease'; // 抓出所有方法中，名稱內有ease的方法
                
            });
            console.log(easeNames);
            d3.select('#ease')
                .selectAll('option')
                .data(easeNames)
                .join('option')
                .attr('value', function (d) { return d; })
                .text(function (d) { return 'd3.' + d; });
            // svg.transition().delay(3000)
            // .remove()
        },
        tan() {
            let easeName = d3.select('#ease').node().value;
            console.log(easeName);
            d3.select("rect")
                .attr('x', 0) // 回原點
                .transition()
                .ease(d3[easeName]) // 設定動畫效果
                .attr('x', 200);
        },
        drawMatrix() {
            const character = ['Joker', 'Batman', 'Shpore', 'Grity', 'Zero'];
            const width = 500, height = 500;
            const svg = d3.select("#relationMatrix").append("svg").attr("width", width).attr("height", height);
            svg.selectAll("text")
                .data(character)
                .join('text')
                .attr("x", (d, i) => i * 100)
                .attr("y", 40)
                .text(d => d);
        },
        drawMixLine1() {
            const sluglinesMeta = this.$store.state.sluglinesMeta;
            const group_data = this.$store.state.transScreen;
            let timeArray = sluglinesMeta.map(d => d.time);
            let timeSet = new Set(timeArray);
            timeArray = Array.from(timeSet);
            timeArray = ['EARLY MORNING', 'MORNING', 'DAY', 'AFTERNOON', 'NEXT AFTERNOON',
                'LATE AFTERNOON', 'MAGIC HOUR', 'DUSK', 'EVENING', 'NIGHT', 'LATE NIGHT', 'LATER', 'SECONDS LATER', ''];
            let timeColorArray = ['#b4edf6', '#39b9e0', '#fefffa', '#f1b962', '#fda960', '#eb5126', '#f48fad', '#ee4e40', '#372183', '#526d82', '#324563', '#aca098', '#aca098', '#aca098'];
            console.log(timeArray);
            console.log('1---', sluglinesMeta);
            let eDiaData = this.$store.state.eventDialogue;
            let grop_data = [];
            for (let i in group_data) {
                let temp = i > 0 ? eDiaData.slice(group_data[i - 1].trans_index, group_data[i].trans_index) : eDiaData.slice(0, group_data[i].trans_index);
                grop_data.push(...temp);
                grop_data.push([]);
            }
            let data = eDiaData.slice(0, 20);
            console.log('组间数据', data);
            let width = 2000;
            let height = 2000;
            const svg = d3.select('#mixLine1').append('svg').attr('width', width).attr('height', height);
            let length_event = 16;
            let length_emo = 6;
            //scale
            //color
            const emoConstrast = this.$store.state.emoConstrast;
            const axeConstrast = this.$store.state.axeConstrast;
            const emotionScale = d3.scaleOrdinal().domain(emoConstrast).range(axeConstrast);
            const colorScale = d3.scaleOrdinal([0, 1, 2, 3, 4, 5], d3.schemeTableau10);
            const timeColorScale = d3.scaleOrdinal().domain(timeArray).range(timeColorArray);
            function caLe(i) {
                // console.log(i,arr);
                let arr = data;
                let sum = 0;
                for (let x = 0; x < i; x++) {
                    let arry = arr[x];
                    if (arry.length % 2 == 0) {
                        sum = sum + arry.length * (length_event + length_emo) / 2;
                    }
                    else {
                        sum = sum + (arry.length - 1) * (length_event + length_emo) / 2 + length_event;
                    }
                }
                return sum;
            }
            function border(i) {
                let group = Math.floor((caLe(i) + 6) / width);
                return group;
            }
            //init define shape
            svg.append('defs')
                .append('polygon').attr('id', 'triangle').attr('points', '0,0  10,10 5,8.6');
            //screenplay rail    IIIIIII .o·0O°
            //                   IIIIIII
            const railSlug = svg.append('g').attr('class', 'railSlug');
            railSlug.selectAll('.rail')
                .data(data)
                .join('rect')
                .attr('class', 'rail')
                .attr('width', (d, i) => caLe(i) - caLe(i - 1) - 4)
                .attr('height', 20)
                .attr('x', (d, i) => {
                let group = Math.floor((caLe(i - 1) + 8) / width);
                return caLe(i - 1) + 8 - width * group;
            })
                .attr('y', (d, i) => {
                let group = Math.floor((caLe(i - 1) + 8) / width);
                return 10 + height * group / 4;
            })
                .style('fill', '#b2dbca');
            railSlug.selectAll('.rail_sleeper')
                .data(data)
                .join('line')
                .attr('class', 'rail_sleeper')
                // .attr('width',(d,i)=>caLe(i)-caLe(i-1)-4)
                // .attr('height',10)
                .attr('x1', (d, i) => caLe(i) + 6 - width * border(i))
                .attr('x2', (d, i) => caLe(i) + 6 - width * border(i))
                .attr('y1', (d, i) => 10 + border(i) * height / 4)
                .attr('y2', (d, i) => 500 + border(i) * height / 4)
                .attr('stroke', 'black')
                .attr('stroke-width', 1);
            railSlug.selectAll('.railtext')
                .data(data)
                .join('text')
                .attr('class', 'railtext')
                .attr('x', (d, i) => caLe(i - 1) + 6 - width * border(i))
                .attr('y', (d, i) => 10 + border(i) * height / 4)
                .text((d, i) => `${i}`)
                .style('font-size', 13);
            railSlug.selectAll('rect.railtime')
                .data(data)
                .join('rect')
                .attr('class', 'railtime')
                .attr('width', (d, i) => (caLe(i) - caLe(i - 1) - 4) * .9)
                .attr('height', height / 5)
                .attr('x', (d, i) => {
                let group = Math.floor((caLe(i - 1) + 8) / width);
                return caLe(i - 1) + 8 - width * group + (caLe(i) - caLe(i - 1) - 4) * .05;
            })
                .attr('y', (d, i) => {
                let group = Math.floor((caLe(i - 1) + 8) / width);
                return 10 + height * group / 4 + 30;
            })
                .style('fill', (d, i) => timeColorScale(sluglinesMeta[i].time))
                .style('opacity', .2);
            const screenplay = svg.selectAll('.slug')
                .data(data)
                .join('g')
                .attr('class', `slug`);
            // .attr('transform',(d,i)=>{
            //     let q = caLe(i, data)
            //     return `translate(${q*0},0)`
            // }) 
            //添加组别
            let distance = 0;
            const unit = screenplay.selectAll('.unit')
                .data(d => d)
                .join('g')
                .attr('class', d => {
                if (Object.keys(d[0]).length > 2) {
                    return 'event';
                }
                else {
                    return 'dialogue';
                }
            })
                .attr('transform', (d) => {
                // console.log('dsadsa',d,i);
                if (Object.keys(d[0]).length > 2) {
                    distance = distance + 16;
                    let group = Math.floor(distance / width);
                    return `translate(${distance - width * group},${group * 500})`;
                }
                else {
                    distance = distance + 6;
                    let group = Math.floor(distance / width);
                    return `translate(${distance - width * group},${group * 500})`;
                }
            })
                .attr('x', distance = 0);
            // .call(g=>{
            //         let a = d3.select(g.nodes());
            //         // let className = a.attr('class')
            //         console.log(a);
            //         let className = 'event'
            //         if (className == 'event'){
            //             g.append('circle')
            //                 .attr('r',2)
            //                 .attr('cx',2)
            //                 .attr('cy',100)
            //                 .style('fill','none')
            //                 .style('stroke','blue')
            //         }
            // else{
            //     g.append('rect')
            //         .attr('width',5)
            //         .attr('height',50)
            //         .attr('x',0)
            //         .attr('y',50)
            //         .style('fill','yellow')
            //         .style('stroke','blue')
            // }
            // })
            // .call(g=>{
            //     let temp = g.datum()
            //     console.log(temp);
            //     g.append('text')
            //         .text(`${temp}`)
            // })
            unit;
            // Event and dialogue
            let eventData = data.map(slug => slug.map(unit => {
                if (Object.keys(unit[0]).length > 2) {
                    return unit;
                }
            }));
            let emoData = data.map(slug => slug.map(unit => {
                if (Object.keys(unit[0]).length == 2) {
                    return unit;
                }
            }));
            eventData = eventData.map(d => d.filter(Boolean));
            emoData = emoData.map(d => d.filter(Boolean));
            // console.log(eventData, emoData);
            const eventPic = d3.selectAll('.slug')
                .data(eventData)
                .selectAll('.event')
                .data(d => d);
            eventPic.selectAll('use.child')
                .data(d => d)
                .join('use')
                // .attr('r',6)
                .attr('x', -5)
                .attr('y', (d, i) => 46 + i * 20)
                .attr("xlink:href", "#triangle")
                .style('fill', 'blue')
                .style('opacity', .5)
                .style('stroke', 'black');
            const emoPic = d3.selectAll('.slug')
                .data(emoData)
                .selectAll('.dialogue')
                .data(d => d);
            emoPic.selectAll('.child')
                .data(d => d)
                .join('rect')
                .attr('width', 4)
                .attr('height', 25)
                .attr('x', 0)
                .attr('y', (d, i) => 40 + i * 26)
                .style('fill', d => colorScale(emotionScale(d.emotion)))
                .style('stroke', d => colorScale(emotionScale(d.emotion)));
        },
        drawMixLine() {
            // const sluglinesMeta = this.$store.state.sluglinesMeta;
            const group_data = this.$store.state.transScreen;
            let eDiaData = this.$store.state.eventDialogue;
            let grop_data = [];
            for (let i in group_data) {
                let temp = i > 0 ? eDiaData.slice(group_data[i - 1].trans_index, group_data[i].trans_index) : eDiaData.slice(0, group_data[i].trans_index);
                grop_data.push(temp);
            }
            let width = 2000;
            let height = 2000;
            function create(d) {
                let temp = {};
                temp['name'] = '', temp['children'] = d;
                return temp;
            }
            let layout_data = [grop_data.slice(0, 10)].map(d => create(d.map(l => create(l.map(i => create(i))))));
            // let partition_data =  grop_data.map(d=>create(d.map(l=>create(l))))
            layout_data = layout_data[0];
            let hierarchy_data = d3.hierarchy(layout_data).count();
            let partition = d3.partition()
                .size([2100, 2100])
                .padding(1);
            partition(hierarchy_data);
            console.log('一代', hierarchy_data);
            console.log('2代', hierarchy_data.descendants());
            const depthScale = d3.scaleOrdinal().domain([0, 1, 2, 3, 4]).range([20, 20, 100, 100, 100]);
            const yScale = d3.scaleOrdinal().domain([0, 1, 2, 3, 4]).range([0, 25, 50, 160, 260]);
            const svg = d3.select('#mixLine').append('svg').attr('width', width).attr('height', height);
            svg
                .selectAll('rect.node')
                .data(hierarchy_data.descendants())
                .enter()
                .append('rect')
                .classed('node', true)
                .attr('x', d => d.x0)
                .attr('y', d => yScale(d.depth))
                .attr('width', d => d.x1 - d.x0)
                .attr('height', d => {
                return d.height == 0 ? 50 * d.data.length : depthScale(d.depth);
            })
                .style('fill', 'blue')
                .style('opacity', .2);
            let tree_data = d3.hierarchy(layout_data).count();
            let treeLayout = d3.tree()
                .size([2100, 2100]);
            treeLayout(tree_data);
            svg
                .selectAll('line.node')
                .data(tree_data.links())
                .enter()
                .append('line')
                .classed('node', true)
                .attr('x1', function (d) { return d.source.x; })
                .attr('y1', function (d) { return d.source.y; })
                .attr('x2', function (d) { return d.target.x; })
                .attr('y2', function (d) { return d.target.y; })
                .attr('stroke', "darkgray")
                .attr('stroke-width', 2);
            svg
                .selectAll('circle.node')
                .data(tree_data.descendants())
                .enter()
                .append('circle')
                .classed('node', true)
                .attr('r', 10)
                .attr('cx', d => d.x)
                .attr('cy', d => d.y)
                .style('fill', 'red')
                .style('opacity', 1);
        },
        drawRing() {
            const groupdata = this.$store.state.transScreen;
            const sluglinesMeta = this.$store.state.sluglinesMeta;
            const actorEverySlug = this.$store.state.actorEverySlug;
            const screenPlay = this.$store.state.screenPlay;
            const relation = this.$store.state.relation;
            let chapter_to_actor = [];
            let actor_hover_dot = {};
            function ex_actor(li) {
                let name = [];
                for (let i in li) {
                    name.push(nameTrans(li[i].source), nameTrans(li[i].target));
                }
                let name_set = Array.from(new Set(name));
                return name_set;
            }
            function nameTrans(d) {
                return d.replace(/(\W)/g, '-');
            }
            //名字角度set
            chapter_to_actor = relation.map(d => d.length ? ex_actor(d) : []);
            //把名字变成处理过的名字
            let metaLen = sluglinesMeta.length;
            let group_Sum = [];
            let group_s = [];
            let tick = 0;
            let all_chapterAngle = []; //记录章节角度，用于绘制连线使用
            for (let i = 0; i < sluglinesMeta.length; i++) {
                group_s.push(sluglinesMeta[i]);
                if (sluglinesMeta[i].id == groupdata[tick].trans_index) {
                    tick = tick + 1;
                    group_Sum.push(group_s);
                    group_s = [];
                }
            }
            let midGroup = [];
            for (let i = 0; i < groupdata.length; i++) {
                if (i == 0) {
                    midGroup.push({ 'border': groupdata[i].trans_index, 'mid': groupdata[i].trans_index });
                    continue;
                }
                let mid = (groupdata[i - 1].trans_index + 1 + groupdata[i].trans_index) / 2;
                midGroup.push({ 'border': groupdata[i].trans_index, 'mid': mid });
            }
            const width = 2000, height = 2000;
            const chapter_loop_radius = .865 * width / 2, chapter_loop_height = .015 * width / 2, chapter_loop_width = .025 * width / 2, chapter_group_arc_innerRadius = .85 * width / 2, chapter_group_arc_outerRadius = .9 * width / 2, actor_arc_innerRadius = .38 * width / 2, actor_arc_outerRadius = .4 * width / 2, patch_circle_radius = .01 * width / 2;
            console.log(group_Sum);
            const svg = d3.select('#ring').append('svg').attr('width', width).attr('height', height);
            const main_g = svg.append('g').append('g').attr('transform', `translate(${width / 2},${height / 2})`).attr('class', 'main');
            svg.append('defs')
                .append('polygon').attr('id', 'triangle').attr('points', '0,0  10,10 5,8.6');
            const chapterGroup = main_g
                .selectAll('.trans-group')
                .data(group_Sum)
                .join('g')
                .attr('class', 'trans-group');
            var arc = d3.arc()
                .innerRadius(chapter_group_arc_innerRadius)
                .outerRadius(chapter_group_arc_outerRadius)
                .startAngle(d => { return (d[0].id - .2) / metaLen * 2 * Math.PI - Math.asin(chapter_loop_width / (2 * chapter_loop_radius)); })
                .endAngle(d => { return (d[0].id + d.length - .2) / metaLen * 2 * Math.PI - Math.asin(chapter_loop_width / (2 * chapter_loop_radius)); })
                .padAngle(.005);
            chapterGroup
                .selectAll('.chapter-arc')
                .data(d => [d])
                .join('path')
                .attr('d', arc)
                .style('fill', 'blue')
                .style('opacity', 0.05);
            chapterGroup
                .selectAll('.unit')
                .data(d => d)
                .join('rect')
                .attr('class', 'unit')
                .attr('width', chapter_loop_width)
                .attr('height', chapter_loop_height)
                .attr('rx', .007 * width / 2)
                .attr('x', -chapter_loop_width / 2)
                .attr('y', chapter_loop_radius)
                .attr('transform', d => {
                for (let i = 0; i < midGroup.length; i++) {
                    if (d.id < midGroup[i].border + 1) {
                        all_chapterAngle.push({ 'angle': 180 + d.id / metaLen * 360 - NP.divide(NP.minus(d.id, midGroup[i].mid), 3), 'slug': d.slug, 'id': d.id });
                        // console.log('章节角度', 180 + d.id/metaLen * 360 - NP.divide(NP.minus(d.id, midGroup[i].mid), 3));
                        return `rotate(${180 + d.id / metaLen * 360 - NP.divide(NP.minus(d.id, midGroup[i].mid), 3)})`;
                    }
                }
                all_chapterAngle.push({ 'angle': 180 + midGroup[midGroup.length - 1] * 360 - NP.divide(NP.minus(d.id, midGroup[midGroup.length - 1].mid), 3), 'slug': d.slug, 'id': d.id });
                // console.log('章节角度', 180 + midGroup[midGroup.length -1 ] * 360 - NP.divide(NP.minus(d.id, midGroup[midGroup.length -1].mid), 3));
                return `rotate(${180 + midGroup[midGroup.length - 1] / metaLen * 360 - NP.divide(NP.minus(d.id, midGroup[midGroup.length - 1].mid), 3)})`;
            })
                .style('fill', 'red')
                .style('opacity', '0.1')
                .style('stroke-width', '1')
                .style('stroke', 'gray');
            chapterGroup
                .selectAll('.chapter-hover-dot')
                .data(d => d)
                .join('circle')
                // .attr('class', 'chapter-hover-dot')
                .attr('class', d => `chapter-hover-dot${d.id}`)
                .attr('r', 2)
                .attr('cx', 0)
                .attr('cy', chapter_loop_radius)
                .attr('transform', d => {
                for (let i = 0; i < midGroup.length; i++) {
                    if (d.id < midGroup[i].border + 1) {
                        return `rotate(${180 + d.id / metaLen * 360 - (d.id - midGroup[i].mid) / 3})`;
                    }
                }
                return `rotate(${180 + midGroup[midGroup.length - 1] / metaLen * 360 - (d.id - midGroup[midGroup.length - 1].mid) / 3})`;
            })
                .style('fill', 'yellow')
                .style('stroke-width', '1')
                .style('stroke', 'gray');
            // .on('mouseenter', function(){
            //     let id = Number(d3.select(this).attr('class').slice(17, d3.select(this).attr('class').length)) - 1
            //     let one_chapter_for_actor_group = chapter_to_actor[id]
            //     line_chapter_actor(one_chapter_for_actor_group, id)
            // })
            // .on('mouseout', function () {
            //     d3.selectAll('.line-to-actor').remove()
            // })
            chapterGroup
                .selectAll('.chapter-sign--dot')
                .data(d => d)
                .join('circle')
                // .attr('class', 'chapter-hover-dot')
                .attr('class', d => `chapter-sign--dot${d.id}`)
                .attr('r', 10)
                .attr('cx', 0)
                .attr('cy', chapter_loop_radius * 1.06)
                .attr('transform', d => {
                console.log(d);
                for (let i = 0; i < midGroup.length; i++) {
                    if (d.id < midGroup[i].border + 1) {
                        return `rotate(${180 + d.id / metaLen * 360 - (d.id - midGroup[i].mid) / 3})`;
                    }
                }
                return `rotate(${180 + midGroup[midGroup.length - 1] / metaLen * 360 - (d.id - midGroup[midGroup.length - 1].mid) / 3})`;
            })
                .style('stroke-width', '3')
                .style('fill', 'black')
                .style('stroke', 'pink')
                .style('fill-opacity', '0')
                .on('mouseenter', function () {
                let id = Number(d3.select(this).attr('class').slice(17, d3.select(this).attr('class').length)) - 1;
                d3.select(`.chapter-hover-dot${id}`).style('fill', 'pink');
                console.log(d3.select(`.chapter-hover-dot${id}`));
                let one_chapter_for_actor_group = chapter_to_actor[id];
                line_chapter_actor(one_chapter_for_actor_group, id);
            })
                .on('mouseout', function () {
                d3.selectAll('.line-to-actor').remove();
            });
            chapterGroup
                .selectAll('.chapter-num')
                .data(d => d)
                .join('text')
                .attr('dx', -3)
                .attr('dy', '0.35em')
                .attr('transform', d => {
                for (let i = 0; i < midGroup.length; i++) {
                    if (d.id < midGroup[i].border + 1) {
                        let angle = 180 + d.id / metaLen * 360 - (d.id - midGroup[i].mid) / 3;
                        return `rotate(${angle + 90}) translate(${chapter_loop_radius + 10}) rotate(${-angle - 90})`;
                    }
                }
                let angle = 180 + midGroup[midGroup.length - 1] / metaLen * 360 - (d.id - midGroup[midGroup.length - 1].mid) / 3;
                return `rotate(${angle + 90}) translate(${chapter_loop_radius + 30}) rotate(${-angle - 90})`;
            })
                .style('font-size', '10px')
                .text(d => d.id);
            let fir = d3.selectAll('.main .trans-group').selectAll('.unit');
            fir.transition()
                .duration(5000).style('opacity', function (d, i) {
                return i ? .1 : 1;
            })
                .style('stroke-width', '1')
                .style('stroke', 'gray');
            // ===========================
            // ==+++++++++内环++++++++++==
            // ===========================
            // 内环 人物
            // const actorFreData = this.$store.state.actorFre;
            let actor_Fo = Object.entries(actorEverySlug);
            let actor_F = actor_Fo.map(d => {
                return { 'name': d[0].replace(/(\W)/g, '-'), 'fre': d[1].length };
            });
            let at = d3.groups(actor_F, d => d.fre)
                .sort((a, b) => d3.descending(a[0], b[0]));
            let actor_sort = at.map(d => d[1]);
            actor_sort = actor_sort.flat();
            //控制输出多少actor
            // let actor10 = actor_sort.slice(0,10)
            let actor10 = actor_sort;
            //控制输出多少actor
            let actor10_len = d3.sum(actor10.map(d => d.fre));
            let actor_angle_group = [];
            // console.log(actor10, actorFreData, actorEverySlug);
            const colorScale = d3.scaleOrdinal().domain(actor10.map(d => d.name)).range(d3.schemeCategory10);
            const actor_g = main_g
                .append('g')
                .attr('class', 'actor');
            var arc_actor = d3.arc()
                .innerRadius(actor_arc_innerRadius)
                .outerRadius(actor_arc_outerRadius)
                .startAngle((d, i) => (d3.sum(actor10.slice(0, i + 1).map(d => d.fre)) - d.fre) / actor10_len * 2 * Math.PI)
                .endAngle((d, i) => d3.sum(actor10.slice(0, i + 1).map(d => d.fre)) / actor10_len * 2 * Math.PI)
                .padAngle(.05);
            function change(c) {
                console.log('done');
                d3.selectAll(`.${c}`)
                    .transition()
                    .duration(500)
                    .style('fill', 'gray');
            }
            actor_g
                .selectAll('.actor')
                .data(actor10)
                .join('path')
                .attr('class', d => `${d.name}`)
                .attr('d', arc_actor)
                .style('fill', d => colorScale(d.name))
                .style('opacity', 1)
                .on("click", function () {
                change(d3.select(this).attr('class'));
                console.log(d3.select(this).node().getBBox());
            });
            actor_g
                .selectAll('.actor')
                .data(actor10)
                .join('circle')
                .attr('class', d => `${d.name}`)
                .attr('r', patch_circle_radius)
                .attr('cx', 0)
                .attr('cy', actor_arc_innerRadius + patch_circle_radius)
                .attr('transform', (d, i) => `rotate(${(d3.sum(actor10.slice(0, i + 1).map(d => d.fre)) - d.fre) / actor10_len * 360 + 180 + 2.18})`)
                .style('fill', d => colorScale(d.name))
                .style('opacity', 1);
            actor_g
                .selectAll('.actor')
                .data(actor10)
                .join('circle')
                .attr('class', d => `${d.name}`)
                .attr('r', patch_circle_radius)
                .attr('cx', 0)
                .attr('cy', actor_arc_innerRadius + patch_circle_radius)
                .attr('transform', (d, i) => `rotate(${(d3.sum(actor10.slice(0, i + 1).map(d => d.fre))) / actor10_len * 360 + 180 - 2.18})`)
                .style('fill', d => colorScale(d.name))
                .style('opacity', 1);
            actor_g
                .selectAll('.actor')
                .data(actor10)
                .join('text')
                .attr('x', 0)
                .attr('y', 0)
                .text(d => d.name)
                .style('font-size', 10)
                .attr('transform', (d, i) => `rotate(
                            ${(d3.sum(actor10.slice(0, i + 1).map(d => d.fre)) - d.fre / 2) / actor10_len * 360 - 90}
                            ), 
                            translate(${.4 * width / 2 + 10},0),
                            rotate(${0})
                            `);
            main_g
                .selectAll('.test')
                .data(actor10)
                .join('circle')
                .attr('r', 5)
                .attr('cx', 0)
                .attr('cy', d => {
                actor_hover_dot[d.name] = actor_arc_outerRadius + Math.sqrt(1000 * d.name.length);
                return actor_arc_outerRadius + Math.sqrt(1000 * d.name.length);
            })
                .attr('transform', (d, i) => {
                actor_angle_group[`${d.name}`] = (d3.sum(actor10.slice(0, i + 1).map(d => d.fre)) - d.fre / 2) / actor10_len * 360 + 180;
                return `rotate(${(d3.sum(actor10.slice(0, i + 1).map(d => d.fre)) - d.fre / 2) / actor10_len * 360 + 180})`;
            })
                .attr('fill', d => colorScale(d.name))
                .attr('class', function (d) {
                return `${d.name}`;
            })
                .on('mouseenter', function () {
                tes(d3.select(this).attr('class'), (d3.select(this).attr('transform')), d3.select(this).attr('cy'));
            })
                .on('mouseout', function () {
                d3.selectAll(`.line-${d3.select(this).attr('class')}`).remove();
            });
            // ===========================
            // ==+++++++++path++++++++++==
            // ===========================
            const nameScale = d3.scaleOrdinal().domain(actor_F.map(d => d.name)).range(actor_Fo.map(d => d[0]));
            let actorEverySLug_sub = { ...actorEverySlug };
            let idData = Object.keys(actorEverySlug).map(d => actorEverySlug[d].map(d => screenPlay.indexOf(d.slug)));
            Object.keys(actorEverySLug_sub).map((d, i) => {
                actorEverySLug_sub[d] = idData[i];
            });
            let one_actor_Angle = 0, actor_chapter_group = [];
            // source_radius = 0;
            const link_group = svg
                .append('g')
                .attr('class', 'link-main')
                .attr('transform', `translate(${width / 2},${height / 2})`);
            function create_actor_chapter_lines(d, realAngle, chapterAngle, source_radius, target_radius) {
                console.log('hover 函数中是', d, realAngle, chapterAngle);
                let source_actor_angle = realAngle, 
                // target_chapter_angle = chapterAngle[d].angle;
                target_chapter_angle = chapterAngle;
                const angle_radiusScale = d3.scaleLinear().domain(source_radius > target_radius ? [0, 180] : [180, 0]).range(source_radius > target_radius ? [target_radius * 1.1, source_radius * .95] : [source_radius * 1.1, target_radius * .95]);
                if (source_actor_angle < 0) {
                    source_actor_angle = source_actor_angle + 360;
                }
                while (source_actor_angle > target_chapter_angle) {
                    target_chapter_angle = target_chapter_angle + 360;
                }
                let angle_difference_value = target_chapter_angle - source_actor_angle;
                angle_difference_value = angle_difference_value < 180 ? angle_difference_value : 360 - angle_difference_value;
                console.log(angle_difference_value);
                let a = (source_actor_angle + 90) / 360 * 2 * Math.PI, b = target_chapter_angle - source_actor_angle > 180 ? (source_actor_angle + 90 - angle_difference_value * 0.1) / 360 * 2 * Math.PI : (source_actor_angle + 90 + angle_difference_value * 0.1) / 360 * 2 * Math.PI, c = (target_chapter_angle + 90) / 360 * 2 * Math.PI, dd = target_chapter_angle - source_actor_angle > 180 ? (target_chapter_angle + 90 + angle_difference_value * 0.1) / 360 * 2 * Math.PI : (target_chapter_angle + 90 - angle_difference_value * 0.1) / 360 * 2 * Math.PI;
                let x1 = source_radius * Math.cos(a), y1 = source_radius * Math.sin(a), x2 = angle_radiusScale(angle_difference_value) * Math.cos(b), y2 = angle_radiusScale(angle_difference_value) * Math.sin(b);
                let xx1 = target_radius * Math.cos(c), yy1 = target_radius * Math.sin(c), xx2 = angle_radiusScale(angle_difference_value) * Math.cos(dd), yy2 = angle_radiusScale(angle_difference_value) * Math.sin(dd);
                let origin_x = angle_radiusScale(angle_difference_value) * Math.cos(a), origin_y = angle_radiusScale(angle_difference_value) * Math.sin(a), end_x = angle_radiusScale(angle_difference_value) * Math.cos(c), end_y = angle_radiusScale(angle_difference_value) * Math.sin(c);
                var path = d3.path();
                path.arc(0, 0, angle_radiusScale(angle_difference_value), target_chapter_angle - source_actor_angle > 180 ? (source_actor_angle + 90) / 360 * 2 * Math.PI - angle_difference_value / 360 * 0.1 * 2 * Math.PI : ((source_actor_angle + 90) / 360) % 1 * 2 * Math.PI + angle_difference_value / 360 * 0.1 * 2 * Math.PI, target_chapter_angle - source_actor_angle > 180 ? (target_chapter_angle + 90) / 360 * 2 * Math.PI + angle_difference_value / 360 * 0.1 * 2 * Math.PI : ((target_chapter_angle + 90) / 360) % 1 * 2 * Math.PI - angle_difference_value / 360 * 0.1 * 2 * Math.PI, target_chapter_angle - source_actor_angle > 180 ? true : false);
                path.moveTo(x2, y2);
                path.quadraticCurveTo(origin_x, origin_y, x1, y1);
                path.moveTo(xx2, yy2);
                path.quadraticCurveTo(end_x, end_y, xx1, yy1);
                return path.toString();
            }
            function tes(name, angle, cy) {
                let realName = nameScale(name);
                one_actor_Angle = Number(angle.slice(7, angle.length - 1));
                // source_radius = cy;
                actor_chapter_group = actorEverySLug_sub[realName]; //获得演员对应的slug组
                // console.log(realAngle, actor_chapter_group);
                link_group
                    .selectAll('.actor-hover-chapter-link')
                    .data(actor_chapter_group)
                    .join('path')
                    .attr('d', d => create_actor_chapter_lines(d, one_actor_Angle, all_chapterAngle[d].angle, cy, chapter_loop_radius))
                    .attr('class', `line-${name}`)
                    .attr('fill', 'none')
                    .attr('stroke-width', '5')
                    .attr('stroke', `${colorScale(name.replace(/(\W)/g, '-'))}`);
            }
            // =======================================
            // ============chapter hover link=========
            // =======================================
            link_group
                .selectAll('.sasd')
                .data(all_chapterAngle)
                .join('circle')
                .attr('cx', 0)
                .attr('cy', d => 400 + d.angle / 360 * 250)
                .attr('r', 5)
                .attr('opacity', .3)
                .attr('transform', d => `rotate(${d.angle})`);
            function line_chapter_actor(one_chapter_all_actor_group, id) {
                // console.log(one_chapter_all_actor_group.map(d=>actor_angle_group[d]));
                // console.log(all_chapterAngle[id]);
                let source_chapter_angle = all_chapterAngle[id];
                main_g
                    .selectAll('.chapter-hover-show-actor')
                    .data(one_chapter_all_actor_group)
                    .join('path')
                    .attr('d', d => create_actor_chapter_lines(d, source_chapter_angle.angle, actor_angle_group[d], chapter_loop_radius, actor_hover_dot[d]))
                    .attr('class', 'line-to-actor')
                    .attr('fill', 'none')
                    .attr('stroke-width', '5')
                    .attr('stroke', d => `${colorScale(d)}`);
            }
            // ======================================
            // =============内环的chord==============
            // ======================================
            //create a relation matrix
            function ex_actor_no_trans(li) {
                let name = [];
                for (let i in li) {
                    name.push(li[i].source, li[i].target);
                }
                let name_set = Array.from(new Set(name));
                return name_set;
            }
            let nameList = Array.from(new Set(relation.map(d => d.length ? ex_actor_no_trans(d) : []).flat()));
            const relation_nameScale = d3.scaleBand().domain(nameList).range([0, nameList.length]);
            let relation_matrix_all = new Array(nameList.length).fill().map(() => new Array(nameList.length).fill(0));
            let relation_matrix_chapter = new Array(relation.length).fill().map(() => new Array(nameList.length).fill().map(() => new Array(nameList.length).fill(0)));
            // console.log(relation_nameScale);
            // console.log(relation);
            // console.log(relation_matrix_chapter);
            // console.log(relation.length);
            function get_relation_matrix_all(relation) {
                for (let i in relation) {
                    for (let j in relation[i]) {
                        relation_matrix_all[relation_nameScale(relation[i][j].source)][relation_nameScale(relation[i][j].target)] = relation_matrix_all[relation_nameScale(relation[i][j].source)][relation_nameScale(relation[i][j].target)] + relation[i][j].value;
                    }
                }
            }
            function get_relation_matrix_chapter(relation) {
                for (let i in relation) {
                    for (let j in relation[i]) {
                        relation_matrix_chapter[i][relation_nameScale(relation[i][j].source)][relation_nameScale(relation[i][j].target)] = relation_matrix_chapter[i][relation_nameScale(relation[i][j].source)][relation_nameScale(relation[i][j].target)] + relation[i][j].value;
                    }
                }
            }
            get_relation_matrix_all(relation);
            get_relation_matrix_chapter(relation);
            console.log(relation_matrix_all);
            console.log(relation_matrix_chapter);
            console.log('actor10 ', actor10);
            function generateRandomArrayWithFixedSum(length, sum) {
                // 生成初始数组
                const initialArray = Array.from({ length }, () => sum / length);
                // 随机化数组
                const randomArray = initialArray.map((value) => value + (Math.random() - 0.5) * value);
                return randomArray;
            }
            let m = actor10.slice(0, 10).map(d => generateRandomArrayWithFixedSum(10, d.fre));
            // let m = [
            //     [0,1.1,1.2,1.3,1.4],
            //     [2.75,0,0,0,0],
            //     [1.75,0,0,0,0],
            //     [1.375,0,0,0,0],
            //     [0.125,0,0,0,0]];
            var chord = d3.chord()
                .padAngle(Math.PI / 150);
            var chords = chord(m);
            var ribbon = d3.ribbon()
                .radius(actor_arc_innerRadius * .9);
            const chord_inner = main_g
                .selectAll(".pathsda")
                .data(chords)
                .enter()
                .append("path")
                .attr('class', 'chord')
                .attr("d", ribbon)
                .attr("fill", (d, r) => d3.schemeCategory10[r % 10])
                .attr("stroke", "gray")
                .attr("stroke-width", 1);
            chord_inner.attr('transform', 'rotate(5)');
        },
        groupTrans() {
            const sluglinesMeta = this.$store.state.sluglinesMeta;
            const eventDialogue = this.$store.state.eventDialogue;
            const locData = this.$store.state.locData;
            const svg = d3.select('#divide').append('svg').attr('width', 2000).attr('height', 2000);
            svg.append('def')
                .append('rect').attr('id', 'triangle3').attr('width', 30).attr('height', 15).style('fill', 'coral')
                .append('circle').attr('id', 'triangle').attr('r', 10).style('fill', 'cornflowerblue');
            let index = 1;
            const data = [];
            for (let key in locData.data) {
                const tmp = {};
                tmp['id'] = index;
                index = index + 1;
                tmp['loc'] = locData.data[key];
                data.push(tmp);
            }
            console.log('locData.data', locData.data);
            let loc_index = {};
            locData.class.map(d => loc_index[`${d}`] = 0);
            locData.data.map(d => d.map(l => loc_index[`${l}`]++));
            console.log(loc_index);
            let loc_index_list = [];
            Object.keys(loc_index).forEach(function (key) {
                let value = loc_index[key];
                loc_index_list.push({ "key": key, "value": value });
            });
            console.log(loc_index_list);
            svg.selectAll('.loc')
                .data(loc_index_list)
                .join('rect')
                .attr('class', 'loc')
                .attr('width', 4)
                .attr('height', d => 4 * Number(d.value))
                .attr('x', (d, r) => r * 5)
                .attr('y', 200)
                .style('fill', 'cornflowerblue')
                .call(drag());
            svg.selectAll('.loc1')
                .data(loc_index_list)
                .join('circle')
                .attr('class', 'loc1')
                .attr('r', d => 4 * Number(d.value))
                .attr('cx', (d, r) => r * 5)
                .attr('cy', 500)
                .style('fill', 'cornflowerblue')
                .call(drag());
            const loc_chap = svg
                .selectAll('.loc_chap')
                .data(locData.data)
                .join('g')
                .attr('transform', (d, r) => `translate(${r * 15}, 100)`);
            // .attr('x',(d,r)=>r*5)
            // .attr('y',100)
            loc_chap
                .selectAll('.unit_loc')
                .data(d => d)
                .join('circle')
                .attr('r', d => loc_index[`${d}`] * 5)
                // .attr('r',2)
                .attr('cx', 0)
                .attr('cy', 0)
                .attr('fill', 'pink').attr('opacity', 0.2)
                .call(drag());
            function drag() {
                function dragstarted() {
                    d3.select(this).raise().attr("stroke", "red");
                }
                function dragged(event, d) {
                    d3.select(this).attr("x", event.x - d3.select(this).attr('width') / 2).attr("y", event.y - d3.select(this).attr('height') / 2).attr("cx", event.x).attr("cy", event.y);
                    var path = d3.path();
                    path.moveTo(event.x, event.y);
                    path.quadraticCurveTo(1000, 500, 100, 100);
                    path.moveTo(100, 100);
                    svg.selectAll('.son')
                        .data(d.leaves())
                        .join('rect')
                        .attr('x', d => d.x0)
                        .attr('y', d => d.depth > 1 ? 415 : 400)
                        .transition()
                        .duration(300)
                        .attr('width', 4)
                        .attr('height', 60)
                        .attr('fill', 'yellow');
                }
                function dragended() {
                    d3.select(this).attr("stroke", null);
                }
                return d3.drag()
                    .on("start", dragstarted)
                    .on("drag", dragged)
                    .on("end", dragended);
            }
        },
        dialogueBox() {
            const dialogue = this.$store.state.textForGpt;
            const relation = this.$store.state.relation;
            let index = 1;
            const dialogueData = dialogue[index];
            // let height = dialogue.length
            // dialogueData.map(d=>{
            //     return{'name':'narratage', 'text':d}
            // })
            let outCome = [];
            for (let index = 0; index < dialogueData.length; index++) {
                const element = dialogueData[index];
                if (element[0] == '$') {
                    let person = element.match(/.*?\$(.*?)\:/)[1].slice(1);
                    let content = element.match(/.*?\"(.*?)\"/)[1].slice(1);
                    outCome.push(person, content);
                }
                else {
                    outCome.push(element);
                }
            }
            // relation
            let relationData = relation[index - 1];
            let name_unit = [...new Set(relationData.map(d => {
                    return [d.source, d.target];
                }).flat())];
            console.log(name_unit);
            this.dia = outCome;
            const box = d3.select('#dialogueBox_pra');
            let tick = 0;
            box
                .selectAll('div')
                .data(outCome)
                .join('div')
                .text(d => "😀" + d)
                .attr('class', d => {
                if (name_unit.includes(d)) {
                    let index = name_unit.indexOf(d) % 2;
                    if (index == 0) {
                        tick = 1; //poster
                        return 'poster_man';
                    }
                    else {
                        tick = -1; //senter
                        return 'senter_man';
                    }
                }
                else {
                    if (tick == 1) {
                        tick = 0;
                        return 'poster';
                    }
                    else if (tick == -1) {
                        tick = 0;
                        return 'senter';
                    }
                }
                return 'outside';
            });
            // const svg = d3.select('#dialogueBox').append('svg').attr('width', 300).attr('height', 1500)
        },
        commi() {
            var width = 800, height = 600;
            var svg = d3.select("body").append("svg")
                .attr("width", width)
                .attr("height", height);
            d3.json("data.json", function (data) {
                var nodes = data.nodes;
                var links = data.links;
                var color = d3.scaleOrdinal(d3.schemeCategory10);
                var simulation = d3.forceSimulation(nodes)
                    .force("link", d3.forceLink(links).id(function (d) { return d.id; }))
                    .force("charge", d3.forceManyBody())
                    .force("center", d3.forceCenter(width / 2, height / 2));
                var link = svg.selectAll(".link")
                    .data(links)
                    .enter().append("line")
                    .attr("class", "link");
                var node = svg.selectAll(".node")
                    .data(nodes)
                    .enter().append("path")
                    .attr("class", "node")
                    .attr("d", d3.symbol().type(function (d) { return d.shape; }))
                    .style("fill", function (d) { return color(d.community); });
                simulation.on("tick", function () {
                    link.attr("x1", function (d) { return d.source.x; })
                        .attr("y1", function (d) { return d.source.y; })
                        .attr("x2", function (d) { return d.target.x; })
                        .attr("y2", function (d) { return d.target.y; });
                    node.attr("transform", function (d) { return "translate(" + d.x + "," + d.y + ")"; });
                });
            });
        },
        cirGen() {
            d3.select("#emotionPending").selectAll("*").remove();
            const emoPendSvg = d3.select('#emotionPending').append("svg").attr('width', 300).attr('height', 200);
            let emo = new Array(3).fill(0).map(d => Math.random(d));
            let emointerval = [0, ...emo];
            const emoRe = emoPendSvg.selectAll("rect")
                .data(emo)
                .join("rect")
                .attr("x", (d, idx) => {
                let x = 100 * emointerval.slice(0, idx + 1).reduce((a, b) => a + .01 + b);
                console.log(d, x);
                return x;
            })
                .attr("width", d => 100 * d)
                .attr("y", 50)
                .attr("height", 50)
                .attr("fill", d => {
                let ans = "#" + Math.floor((d * 16777215)).toString(16);
                return ans;
            });
            let srcHeight = 100;
            let srcWidth = 100;
            let innerRadius = 10, outerRadius = 40, roundRadius = 50;
            let all = emo.reduce((a, b) => a + b);
            const srcRegion = emoPendSvg.append('g').attr("id", "srcRegion");
            const arc = d3.arc()
                .innerRadius(innerRadius)
                .outerRadius(outerRadius)
                .startAngle((d, r) => {
                let ans = 2 * Math.PI * (emointerval.slice(0, r + 1).reduce((a, b) => a + b + .01) / all);
                return ans;
            })
                .endAngle((d, r) => {
                let ans = 2 * Math.PI * (emointerval.slice(0, r + 2).reduce((a, b) => a + b + .01) / all);
                return ans;
            });
            const emoArc = srcRegion.append("g").attr("id", "emoArc");
            const emoArcs = emoArc.selectAll(".emosingle")
                .data(emo)
                .join("path")
                .attr("class", "emosingle")
                .attr("d", arc)
                .attr("fill", d => "#" + Math.floor((d * 16777215)).toString(16));
            srcRegion.attr("transform", `translate(${(srcWidth / 2) + 50},${(srcHeight / 2) + 100})`);
            // circle in core
            const coreCir = srcRegion.append('g').attr('id', "coreCir");
            coreCir.selectAll("#coreCir circle")
                .data(emo)
                .join("circle")
                .attr("cx", 0)
                .attr("cy", 0)
                .attr("r", innerRadius - 1)
                .attr("fill", d => "#" + Math.floor((d * 16777215)).toString(16))
                .style("opacity", 0.3);
            // .append("circle").attr("cx",0).attr("cy",0).attr("r", innerRadius-1).attr("fill", "blue")
        },
        mixScriptLineGenerate() {
            const dialogueTextData = ["Hi. Do you like to laugh? ", "It's okay. How would you know. It's okay. How would you know. It's okay. How would you know.", "I got fired. From the bank.", "Okay. Well, all the info is right there on the flyer."];
            let parentBox = d3.select("#emoDiaBox");
            let mixdia = parentBox.selectAll(".mixdia")
                .data(dialogueTextData)
                .join("div")
                .attr("class", "mixdia");
            let that = this;
            mixdia.each(function (d, idx) {
                let div = d3.select(this);
                div.append("div")
                    .attr("class", "dialogueActor")
                    .text(d);
                let emoRing = div.append("div").attr("class", "emoRing");
                that.emoRingDraw(emoRing);
                console.log(d, idx, div);
            });
        },
        emoRingDraw(div) {
            div.selectAll("svg").remove();
            let srcHeight = 70;
            let srcWidth = 70;
            const emoPendSvg = div.append("svg").attr('width', srcWidth).attr('height', srcHeight);
            let emo = new Array(3).fill(0).map(d => Math.random(d));
            let emointerval = [0, ...emo];
            let innerRadius = 7, outerRadius = 28, roundRadius = 50;
            let all = emo.reduce((a, b) => a + b);
            const srcRegion = emoPendSvg.append('g').attr("id", "srcRegion");
            const arc = d3.arc()
                .innerRadius(innerRadius)
                .outerRadius(outerRadius)
                .startAngle((d, r) => {
                let ans = 2 * Math.PI * (emointerval.slice(0, r + 1).reduce((a, b) => a + b + .01) / all);
                return ans;
            })
                .endAngle((d, r) => {
                let ans = 2 * Math.PI * (emointerval.slice(0, r + 2).reduce((a, b) => a + b + .01) / all);
                return ans;
            });
            const emoArc = srcRegion.append("g").attr("id", "emoArc");
            const emoArcs = emoArc.selectAll(".emosingle")
                .data(emo)
                .join("path")
                .attr("class", "emosingle")
                .attr("d", arc)
                .attr("fill", d => "#" + Math.floor((d * 16777215)).toString(16));
            srcRegion.attr("transform", `translate(${(srcWidth / 2)},${(srcHeight / 2)})`);
            // circle in core
            const coreCir = srcRegion.append('g').attr('id', "coreCir");
            d3.quadtree();
            coreCir.selectAll("#coreCir circle")
                .data(emo)
                .join("circle")
                .attr("cx", 0)
                .attr("cy", 0)
                .attr("r", innerRadius - 1)
                .attr("fill", d => "#" + Math.floor((d * 16777215)).toString(16))
                .style("opacity", 0.3);
        }
    },
    components: { divide }
}
</script>

<style>
    /* button{
        display: inline-block;
        padding: 10px 15px;
        border: 2px solid #b2b2b2;
        border-radius: 20px;
        background-color: #f5f5f5;
        color: #333;
        font-size: 16px;
        font-weight: bold;
        text-decoration: none;
        text-align: center;
        text-transform: uppercase;
        box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.3);
        transition: background-color 0.3s ease-in-out;
    }
    button:hover {
        background-color: #b2b2b2;
        color: #fff;
    } */

    .page-container {
        position:relative;
        
        max-width: 800px;
        margin: 0 auto;
        padding: 20px;
        font-family: "SF Pro Text", "Myriad Set Pro", "SF UI Text", "Helvetica Neue", "Helvetica", "Arial", sans-serif;
        font-size: 16px;
        line-height: 1.5;
        color: #333;
        background-color: #f5f5f5;
        box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
        color: #aca098;
        color: salmon;
    }
/* --------------- */
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
        font-size: 6px;
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
        font-size: 3pt;
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
    #emotionPending{
        margin: auto;
        width: 500px;
        height: 400px;
        border: solid red 2px;
    }
    #emoDiaBox{
        margin: auto;
        width: 500px;
        height: 1000px;
        border: solid rgb(171, 183, 255) 2px;
    }
    #personSketch{
        margin: auto;
        width: 500px;
        height: 500px;
        border: solid rgb(171, 183, 255) 2px;
        display: flex;
        overflow: hidden;
        flex-direction: column;
        gap: 20px;
        padding: 20px;
    }
    .personBaseFloor{
        margin: 0px;
        flex: 1;
        /* width: 100%;
        height: 40%; */
        border: solid rgb(231, 110, 35) 2px;

        display: flex;
        flex-direction:row;
        padding: 10px;
        gap: 10px;
    }
    .personCoverFloor{
        /* height: 20%; */
        /* flex: 1; */
        border: solid rgb(229, 75, 249) 2px;
    }
    .mixdia{
        margin: 1px;
        border-radius: 10px;
        overflow: hidden;
        width: 100%;
        height: 70px;
        /* border: solid rgb(196, 59, 196) 2px; */
        border: solid gainsboro 2px;

    }
    .emoRing{
        float: left;
        width: 30%;
        height: 100%;
        /* background-color: rgb(171, 214, 217);8aa3c8 */
        background-color: #b3cbef;
    }
    .dialogueActor{
        padding: 5px;

        width: 70%;
        height: 100%;
        float: right;
        /* line-height: 70px;
        text-align: center; */
        word-wrap: break-word;
        white-space: normal;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
    }

    #self-adap{
        width: 100%;
        display: flex;
        word-wrap: break-word;
        white-space: normal;
        overflow: hidden;

    }
    div{
        font-family: Georgia, 'Nimbus Roman No9 L', 'Century Schoolbook L', serif;
    }
    button{
        font-family: Georgia, 'Nimbus Roman No9 L', 'Century Schoolbook L', serif;

    }
</style>