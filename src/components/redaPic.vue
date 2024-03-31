<template>
    <div id="actorEmoArea" style=" width: 100%; height: 100%;" >
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
    computed() {

    },
    mounted() {
    },
    watch: {
        screen_num: {
            handler: function (screen_num) {
                const index = screen_num[screen_num.length - 1]
                this.drawRedaChart(index);
            }, deep: true
        }
    },
    methods: {
        drawRedaChart(index) {
            // ↓↓↓↓↓↓↓↓↓↓data↓↓↓↓↓↓↓↓↓↓
            d3.select("#actorEmoArea").selectAll("*").remove()
            const emoData = this.$store.state.actorEmoSlug[index]
            // console.log(emoData);

            //emotion map
            const emoConstrast = [
                //一般  blue 3
                'caring', 'faithful',
                'impressed',
                //坏的消极 red 7
                'guilty', 'sad',
                'ashamed', 'disgusted',
                'anxious', 'afraid',
                'disappointed',
                //坏的积极 yellow 5
                'devastated', 'furious', 'surprised', 'annoyed', 'angry',
                //好的对自己  green 5
                'joyful',
                'excited',
                'confident', 'anticipating',
                'proud',
                //好的对别人  green 4
                'hopeful', 'grateful', 'trusting', 'content',
                // 一般 gray 7
                'nostalgic', 'sentimental',
                'lonely', 'jealous',
                'apprehensive', 'prepared',
                'embarrassed',
            ]
            const axeConstrast = [
                0, 0, 0,
                1, 1, 1, 1, 1, 1, 1,
                2, 2, 2, 2, 2,
                3, 3, 3, 3, 3,
                4, 4, 4, 4,
                5, 5, 5, 5, 5, 5, 5
            ]
            const typeEmo = ['angry', 'sad', 'calm', 'content', 'afraid', 'proud']
            // const typeEmo = ['冷静','抑郁','好斗','内向积极','外向积极','无感情']
            let actor = emoData.map(d => d.name)
            const emotionMap = d3.scaleOrdinal().domain(emoConstrast).range(axeConstrast)
            function sumEmotion(emoAy) {
                let staArray = new Array(6).fill(0);
                emoAy.map(d => {
                    staArray[emotionMap(d)]++;
                });
                return staArray;
            }
            let emo = emoData.map(d => sumEmotion(d.emotion));
            emo = emo.map(d => d.map(d => d + .1))
            //得到大小值
            const maxValue = d3.max(emo.map(d => (d3.max(d))));
            // console.log(actor, emo, maxValue);
            //↑↑↑↑↑↑↑↑data↑↑↑↑↑↑↑↑

            const measure = '100%';
            // const width = 700, height = 700;
            const width = measure, height = measure;
            const redaSize = 120;
            // const redaSize = 80;


            // let data = [13,2,4,17,20,1];
            // let dataForArea = [...data, ...data.slice(0,1)]
            let dataForArea = emo.map(d => [...d, ...d.slice(0, 1)])
            const valueScale = d3.scaleSqrt().domain([0, maxValue]).range([0, maxValue])
            //坐标转换
            function coordinateTransformer(d, i) {
                d = valueScale(d)
                const angle = (1 / 6 + i / 3) * Math.PI;
                let polar = {};
                polar.x = d * Math.cos(angle); polar.y = d * Math.sin(angle);
                return polar
            }

            const border = valueScale(5 * Math.ceil(maxValue / 5))
            const redaData = dataForArea.map(d => d.map((d, i) => coordinateTransformer(d, i)))
            const xScale = d3.scaleLinear().domain([-border, border]).range([-redaSize, redaSize])
            const yScale = d3.scaleLinear().domain([-border, border]).range([-redaSize, redaSize])
            const colorScale = d3.scaleOrdinal([0, 1, 2, 3, 4, 5, 6], d3.schemeTableau10)
            // const 
            console.log("leidadata",redaData);

            //builds out axes
            let axesData = new Array(5).fill(Math.ceil(maxValue / 5))
            axesData = axesData.map((d, i) => d * (i + 1))
            function coordinateAxes(axesValue) {
                const cda = new Array(7).fill(axesValue);
                // console.log(cda);
                let polar = cda.map((d, i) => coordinateTransformer(d, i));
                return polar
            }
            let axesArray = axesData.map(d => coordinateAxes(d))
            // console.log("坐标轴数据", axesArray);
            const svg = d3.select("#actorEmoArea")
                .append("svg")
                .attr("width", width)
                .attr("height", height)
            const group = svg.append("g")
                .attr("id", "redaManager")
                .attr("transform", "translate(150,150)")
            const line = d3.line()
                .x(d => xScale(d.x))
                .y(d => yScale(d.y))

            const axesGruop = group.selectAll(".axes-g")
                .data(axesArray)
                .join("g")
                .attr("class", "axes-g")

            axesGruop.selectAll(".axe")
                // .datum(d => d)
                .data(d => [d])
                .join("path")
                .attr("class", "axe")
                .attr("d", line)
                .style("fill", "none")
                .transition()
                .duration(1000)
                .style("stroke-width", "3")
                .style("stroke", "gray")
            axesGruop.selectAll("tickText")
                .data((d, i) => [[d[4], i]])
                .join("text")
                .attr("class", "tickText")
                .attr("x", d => xScale(d[0].x))
                .attr("y", d => yScale(d[0].y) + 13)
                .text(d => `${(d[1] + 1) * Math.ceil(maxValue / 5)}`)


            group.selectAll(".level")
                .data([1, 2, 3, 4, 5, 6])
                .join("line")
                .attr("class", "level")
                .attr("x1", 0)
                .attr("x2", 0)
                .attr("y1", 0)
                .attr("y2", xScale(valueScale(5 * Math.ceil(maxValue / 5))))
                .style("fill", "none")
                .transition()
                .duration(1000)
                .style("stroke-width", "3")
                .style("stroke", "gray")
                .style("transform", d => `rotate(${d * 60}deg)`)

            



   
            // 添加文本到雷达图的每个角
            group.selectAll(".emoType")
                .data(typeEmo)
                .join("g")
                .attr("class", "emoType")
                .call(g =>
                    g.append('text')
                        .attr("x", (d, i) => {
                            const angle = i * (2 * Math.PI / typeEmo.length); // 根据数据点数量动态计算角度
                            return 140 * Math.cos(angle - Math.PI / 2); // 设置文本的水平位置
                        })
                        .attr("y", (d, i) => {
                            const angle = i * (2 * Math.PI / typeEmo.length); // 根据数据点数量动态计算角度
                            return 140 * Math.sin(angle - Math.PI / 2); // 设置文本的垂直位置
                        })
                        .attr("dy", "0.25em")  // 垂直偏移量，用于微调文本位置
                        .style('text-anchor', 'middle') // 文本水平居中对齐
                        .text(d => d)
                );








          

            group.selectAll(".level")
                .data([1, 2, 3, 4, 5, 6])
                .join("line")
                .attr("class", "level")
                .attr("x1", 0)
                .attr("x2", 0)
                .attr("y1", 0)
                .attr("y2", xScale(valueScale(5 * Math.ceil(maxValue / 5))))
                .style("fill", "none")
                .style("stroke-width", "3")
                .style("stroke", "gray")
                .style("transform", d => `rotate(${d * 60}deg)`)

            const actorGroup = group.selectAll(".actorAll")
                .data(redaData)
                .join("g")
                .attr("class", "actorAll")
                .style("fill", "#2b9c9d")

            actorGroup.append("path")
                .datum((d, i) => [d, i])
                .attr("class", "redaArea")
                .attr("d", d => line(d[0]))
                .transition()
                .duration(300)
                .style("fill", d => colorScale(d[1]))
                .style("opacity", .5)
                .style("stroke", "black")

            actorGroup.selectAll(".redapoint")
                .data(d => d)
                .join("circle")
                .attr("class", "redapoint")
                .attr("r", 5)
                .attr("cx", d => xScale(d.x))
                .attr("cy", d => yScale(d.y))
                .style("fill", "blue")

            //图例
            const legendHeight = 200;

            const tickPath = "M10,35 L30,55 L70,15";
            let count_ci = false
            actorGroup.selectAll(".label")
                .data(actor)
                .join("text")
                .attr("class", "label")
                .attr("transform", "translate(0, 28)")
                .attr("x", -1/2 * legendHeight)
                .attr("y", (d, r) => 11 / 18 * legendHeight + r * 18)
                .style("fill", 'black')
                .text(d => d)

            actorGroup.selectAll(".icon")
                .data(actor)
                .join("rect")
                .attr("class", "icon")
                .attr("transform", "translate(0, 28)")
                .attr("x", -1/2 * legendHeight - 10)
                .attr("y", (d, r) => 11 / 18 * legendHeight + r * 18 - 10)
                .attr("width", 10)
                .attr("height", 10)
                .style("fill", (d, r) => colorScale(r))
                .text(d => d)

            
            // 为图例矩形添加点击事件监听器
            actorGroup.selectAll('.icon')
            .on('click', function(d, i) {
                console.log(i,d)
                // 获取点击的图例索引
                const legendIndex = i;
                
                
                
                // 根据雷达图数据，判断是否已经显示
                const isDisplayed = true;

                // 根据需要，显示或隐藏雷达图数据
                if (isDisplayed) {
                    // 如果已经显示，则隐藏
                    d3.selectAll('.redaArea').filter((d, j) => {j === legendIndex;
                    console.log(d,j)})
                        .style('opacity', 0);
                    d3.select(this).classed('displayed', false);
                } else {
                    // 如果未显示，则显示
                    d3.selectAll('.redaArea').filter((d, j) => j === legendIndex)
                        .style('opacity', 1);
                    d3.select(this).classed('displayed', true);
                }
            });


        },
        showD() {
            console.log(this.$store.state.actorEmoSlug);
        }
    },
}
</script>

<style>
/* button {
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
} */

button:hover {
    background-color: #b2b2b2;
    color: #fff;
}
</style>