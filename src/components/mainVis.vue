<template>
    <div class="tab" id="mainVis" style="width: 100%; height: 100%;">
        <div class="main_title" style="width: 100%; height: 5%; background-color: #94b2d2; ">
            <div class="main_sub_title" style="width: 80px; left: 0px;">
                <!-- <span>场景 <br> 视图</span> -->
                <span>SENCE <br> RECT</span>
            </div>
            <div class="main_sub_title" style="width: 110px; "> <span> MERGER </span></div>
            <!-- <div class="main_sub_title" style="width: 110px; "> <span> 归并 </span></div> -->
            <div class="main_sub_title" style="width: 260px; "><span>PERSON DROWN</span> </div>
            <!-- <div class="main_sub_title" style="width: 260px; "><span>人物具现</span> </div> -->
            <div class="main_sub_title" style="width: 1427px;  border-right:1px dashed black;"><span>ANALYSIS MAIN INTERFACE</span></div>
            <!-- <div class="main_sub_title" style="width: 1427px;  border-right:1px dashed black;"><span>分析主界面</span></div> -->
        </div>
        <div style="width: 19.5%; height: 94.5%; float: left; box-shadow: 0 4px  8px rgba(0, 0, 0, 0.2); margin: 5px;">
            <svg id="mainSvg" style="width: 100%; height: 100%; float: left;">
            <rect x="50" y="10" style="width: 30px; height: 5px; " @click="slugRect"></rect>
            <rect x="290" y="10" style="width: 30px; height: 5px; fill: blueviolet;" @click="drown"></rect>
            <rect x="850" y="10" style="width: 30px; height: 5px; fill: rgb(169, 34, 202);" @click="mixTrend"></rect>
            <defs>
                <polygon id="plotGuide" points="0,0 5,10 0,20 0,17 3,10 0,3" transform="scale(1)"></polygon>
                <polygon id="detail" points="0,0 7.5,5 0,10" transform="scale(1)"></polygon>
            </defs>

            </svg>
        </div>
       
        <div id="rhythm-line" style="float: left; width: 79.5%; height: 94.5%; box-shadow: 0 0px  8px rgba(0, 0, 0, 0.2); 
        margin-bottom: 5px;
        margin-right: 5px;
        margin-top: 5px;
        ">
            <rhythm />
        </div>
    </div>
</template>

<script>
import * as d3 from 'd3'
import { mapState } from "vuex";
import * as echarts from 'echarts'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import rhythm from './rhythm.vue'
export default {
    name: 'mainVis',
    components: {
        rhythm
    },
    data() {
        return {
            plotInitData: '',
            plotVaildData: '',
            selectArea_dot: [],
            screen_num: this.$store.state.slugIndexList,
            initList: '',

            systemColor: {
                mainDark: '#2327fa',
                mainLight: '#b6caf5',
                beacon: '#e4040c'
            }

        }
    },
    mounted() {
    },
    computed: {
        ...mapState({
            slugId: state => state.slugIndexList
        })
    },
    watch: {
        screen_num: {
            handler: function (screen_num) {
                this.drawMixLine(screen_num)

            }, deep: true
        },
        slugId: {
            handler: function (newVal) {
                // console.log('yyyyyyyyyyyy', newVal);
            }, deep: true
        },

    },
    methods: {
        curvelink_globel(sx, sy, tx, ty) {
            let path = d3.path();
            let cs_x = sx,
                cs_y = (sy + ty) / 2,
                ce_x = tx,
                ce_y = (sy + ty) / 2;
            path.moveTo(sx, sy)
            if (sx < tx) {
                path.bezierCurveTo(sx + (tx - sx) / 10, ty, tx - (tx - sx) / 10, sy, tx, ty)
            }
            else {
                path.bezierCurveTo(sx + (tx - sx) / 10, ty, tx - (tx - sx) / 10, sy, tx, ty)

            }

            // path.bezierCurveTo(sx+(tx - sx)/10, ty, tx - (tx - sx)/10, sy, tx,ty)
            return path.toString();
        },


        setCanvas() {
            const _self = this;
            const svg = d3.select('#mainVis')
                .append('svg')
                .attr('id', 'mainSvg')
                .attr('width', '100%')
                .attr('height', '95%')
            svg.append('rect')
                .attr('x', 10)
                .attr('y', 10)
                .attr('width', 30)
                .attr('height', 5)
                .style('fill', 'gray')
                .on('click', () => {
                    _self.slugRect()
                })


        },

        slugRect() {
            const that = this;
            const line_Pos = {
                slugRectLine: 80,
                guideLine: 190
            }

            this.calcu();
            let scheduling = this.$store.getters.getScheduling;

            // let vaildCount = [];
            // vaildEvent.forEach(element => {

            // });

            let initData = this.initList.flat()
            scheduling.map((d, r) => d['id'] = r)

            const svg = d3.select('#mainSvg')



            const widthScale = d3.scaleSqrt().domain([0, 10000]).range([10, 40])
            const rect_container = svg.append('g').attr('id', 'screen_rect').attr('transform', 'translate(40,0)')
            const screen_rect = rect_container.selectAll('.schedulingRect')
                .data(scheduling)
                .join("rect")
                .attr("class", "schedulingRect")
                .attr("id", (d, r) => `${r}scheduling`)
                .attr('width', d => widthScale(d.content))
                .attr('height', 4)
                .attr('x', 0)
                .attr('y', (d, r) => 20 + r * 11)
                .attr('transform', (d, r) => `translate(${-widthScale(d.content) / 2})`)
                .style("fill", (d, r) => initData.includes(r) ? '#2327fa' : 'gray')
            rect_container
                .selectAll('text')
                .data(initData)
                .join('text')
                .attr('x', -25)
                .attr('y', d => 18 + (d + 1) * 11)
                .style('font-size', '10px')
                .attr('color', 'red')
                .text(d => d + 1)
            // .style("opacity", d => widthScale(d.content) / 40)
            svg.append('line')
                .attr('x1', line_Pos.slugRectLine)
                .attr('x2', line_Pos.slugRectLine)
                .attr('y1', 20)
                .attr('y2', 1500)
                .style("stroke", "black")
                .style("stroke-width", .5)
                .style("stroke-dasharray", "5,5");

            const group_plot = svg.append('g').attr('id', 'group_plot')

            const plotG = group_plot
                .selectAll('.plot')
                .data(this.initList)
                .join('g')
                .attr('class', 'plot')
                .attr('transform', (d, r) => 'translate(120,' + (50 + r * 90) + ')')
            plotG
                .append('text')
                .attr('x', -5)
                .attr('y', -15)
                .style('font-size', '10px')
                .text(d => {
                    let c = d3.extent(d)
                    return c[0] + 1
                })
            plotG
                .append('text')
                .attr('x', d => 4 * d.length)
                .attr('y', -15)
                .style('font-size', '10px')
                .text(d => {
                    let c = d3.extent(d)
                    return c[1] + 1
                })
            plotG
                .selectAll('use.plotArr')
                .data(d => d) 
                .join('use')
                .attr('class', 'plotArr')
                .attr('xlink:href', '#plotGuide')
                .attr('x', (d, r) => 4 * r)
                .attr('y', -10)
                // .attr('width', 2)      
                // .attr('height', 20)     
                .style('fill', '#2327fa')
            svg.selectAll('.index')
                .data(this.initList)
                .join('use')
                .attr('class', 'index')
                .attr('xlink:href', '#detail')
                .attr('x', 180)
                .attr('y', (d, r) => r * 90 + 50 - 5)
                // .style('fill','none')
                .style('stroke', 'black')
                .style('stroke-width', '1')
                .on('click', (e, d) => that.submintTrendList(d))

            svg.append('line')
                .attr('x1', line_Pos.guideLine)
                .attr('x2', line_Pos.guideLine)
                .attr('y1', 70)
                .attr('y2', 1500)
                .style("stroke", "black")
                .style("stroke-width", .5)
                .style("stroke-dasharray", "5,5");


        },


        brushed(event) {
            const selection = event.selection;
            const screen_dot = d3.select('#mixCanvas').selectAll('.schedulingRect')
            let selectedDot = screen_dot.filter(
                function (d, r) {
                    return selection != null && selection[0][0] <= (40 + r * 11) && (40 + r * 11) <= selection[1][0] && selection[0][1] <= 1230 && 1230 <= selection[1][1];
                }
            );
            this.selectArea_dot = selectedDot.data().map(d => {
                return d.id
            })

            selectedDot.style('fill', 'red')
        },

        calcu() {
            const sluglinesMeta = this.$store.state.sluglinesMeta;
            const locData = this.$store.state.locData;

            let index = 1;
            const data = []
            for (let key in locData.data) {
                const tmp = {};
                tmp['id'] = index;
                index = index + 1;
                tmp['loc'] = locData.data[key];
                data.push(tmp)
            };

            let loc_index = {};
            locData.class.map(d => loc_index[`${d}`] = 0)

            let locSplit = locData.data.map(d => {
                let tmp = [];
                d.map(l => {
                    tmp.push(...l.split(' '))
                })
                let res = Array.from(new Set(tmp)).filter(d => d !== '');
                return res
            })

            function hasIntersection(list1, list2) {
                return list1.some(x => list2.includes(x));
            }

            function findDuplicateItems(list) {
                const result = [];
                for (let i = 0; i < list.length - 2; i++) {
                    let bo = hasIntersection(list[i], list[i + 1])
                    if (bo == true) {
                        result.push([i, i + 1])
                    }
                }
                return result;
            }
            let index_li = findDuplicateItems(locSplit);
            console.log(locSplit, index_li);
            let coun_list = []
            //coun_list  第零个就是第一个sluglines
            function continue_li(list) {

                let i = 0
                while (i < index_li.length - 1) {
                    coun_list.push([])
                    while (list[i][1] == list[i + 1][0] && i < index_li.length - 2) {
                        coun_list[coun_list.length - 1].length ? coun_list[coun_list.length - 1].push(list[i + 1][1]) : coun_list[coun_list.length - 1].push(list[i][0], list[i + 1][1])
                        i = i + 1
                    }
                    i = i + 1
                    coun_list[coun_list.length - 1].length ? 0 : coun_list.pop()
                }
            }
            continue_li(index_li)

            for(let i in coun_list){
                if (coun_list[i][0]==30){
                    coun_list[i] = [35,36,37,38,39]
                }
            }

            this.initList = coun_list.map(d => {
                let limit = d3.extent(d)
                let n = limit[0],
                    m = limit[1];
                
                return Array.from({ length: m - n + 1 }, (_, i) => n + i)
            });
            this.$store.commit('setinitTrendList', this.initList);
            console.log('初定义',this.initList, coun_list);

            locData.data.map(d => d.map(l => loc_index[`${l}`]++))
            let loc_index_list = [];
            Object.keys(loc_index).forEach(function (key) {
                let value = loc_index[key];
                loc_index_list.push({ "key": key, "value": value });
            });
            //----------------------------------------//
            this.caluPlotData()

        },

        caluPlotData() {
            let group_Plot = this.initList
            const eventDialogue = this.$store.state.eventDialogue;
            function create(d) {
                let temp = {}; temp['name'] = '', temp['children'] = d; return temp;
            }

            let group_Plot_data = group_Plot.map((d, r) => {
                let child = d.map(l => {
                    let tic = create(eventDialogue[l].map(a => create(a.map(b => b))));
                    return tic
                })
                let tmp = { id: r, type: 'nan', children: child };
                return tmp
            })
            this.plotInitData = group_Plot_data;

            // const vaildEvent = this.$store.state.event_type;
            // function create(d) {
            //     let temp = {}; temp['name'] = '', temp['children'] = d; return temp;
            // }

            // let group_vaildEvent_data = vaildEvent.map((d, r) => {
            //     let child = d.map(l => {
            //         let tic = create(vaildEvent[l].map(a => create(a.map(b => b))));
            //         return tic
            //     })
            //     let tmp = { id: r, type: 'nan', children: child };
            //     return tmp
            // })
            // this.plotInitData = group_Plot_data;
            // this.plotVaildData = group_vaildEvent_data;
        },


        drown() {
            const line_Pos = {
                drownLine: 500
            }
            const systemColor = this.systemColor;
            let door_width = 70,
                door_height = 230,
                dot_in_door_radius = 10,
                door_padding = 90;
            // river_pos_top = 940;

            let plotList = this.initList
            const nodeLink = this.$store.state.relation;
            const data0 = nodeLink.map(d => ({ nodes: Array.from(new Set(d.flatMap(l => [l.source, l.target])), id => ({ id })), links: d }))
            let plotPerson = plotList.map(d => {
                let tmpArray = d.map(l => {
                    let node = data0[l]
                    if (node.nodes.length > 0) {
                        return node.nodes.map(q => {
                            if (q.id.includes('(')) {
                                return /.+(?= \()/.exec(q.id)[0]
                            }
                            else {
                                return q.id
                            }
                        })
                    }

                })
                let a = tmpArray.filter(d => d)
                return Array.from(new Set(a.flat()))
            })
            // console.log('MEANS:', plotPerson);
            let personSet = plotPerson.flat()
            function personSort(personArray) {
                let perFre = {};

                for (let i = 0; i < personArray.length; i++) {
                    let element = personArray[i];
                    if (element in perFre) {
                        perFre[element]++;
                    }
                    else {
                        perFre[element] = 1;
                    }
                }
                let sorted = Object.keys(perFre).sort((a, b) => { return perFre[b] - perFre[a] })
                return sorted
            }
            let personOrder = personSort(personSet);
            // console.log("MEANS:", personOrder);
            const personScale_top_three = d3.scaleOrdinal().domain(personOrder.slice(0, 3)).range([systemColor.beacon, systemColor.mainDark, systemColor.mian])

            function getCordianry(personplot) {
                let personMemory = {}
                let cor = personplot.map((d, x) => {
                    let data = d.map((c, y) => {
                        let source_x = x % 2 == 0 ? 250 : 450,
                            source_y = 0 + x * 90 - 13 * y,
                            target_x = x % 2 == 0 ? 250 + 50 + y * 13 : 250 + 100 + y * 13,
                            target_y = 0 + x * 90 + 50;

                        let tmp = {}
                        tmp[`${c}`] = {}
                        if (personMemory[`${c}`]) {
                            tmp[`${c}`]['sourceX'] = personMemory[`${c}`]['x']
                            tmp[`${c}`]['sourceY'] = personMemory[`${c}`]['y']
                            personMemory[`${c}`] = { 'x': target_x, 'y': target_y }

                        }
                        else {
                            personMemory[`${c}`] = { 'x': target_x, 'y': target_y }
                            // tmp[`${c}`]['sourceX'] = source_x
                            // tmp[`${c}`]['sourceY'] = source_y
                            tmp[`${c}`]['sourceX'] = target_x
                            tmp[`${c}`]['sourceY'] = target_y
                        }
                        // tmp[`${c}`]['sourceX'] = target_x
                        // tmp[`${c}`]['sourceY'] = target_y
                        tmp[`${c}`]['targetX'] = target_x
                        tmp[`${c}`]['targetY'] = target_y


                        return tmp
                    })
                    return data
                })
                return cor
            }

            const svg = d3.select('#mainSvg')
            const chart = svg.append('g').attr('id', 'act_dia_plot')

            chart.selectAll('*').remove()

            const personGroup = chart.selectAll('.personGroup')
                .data(plotPerson)
                .join('g')
                .attr('class', (d,r)=>'personGroup'+`${r}`)
                .attr('transform', (d, r) => `translate(${r % 2 == 0 ? 250 : 300},${0 + r * door_padding + 50})`)
                .on('mouseenter', function(e,d,r){
                    // d3.select(this).selectAll('*').attr('transform', 'scale(1.5)')
                    d3.select(this)
                    .append('rect')
                    .attr('class', 'sign_modfiy')
                    .attr('width',d => (d.length -1 )*13 +64)
                    .attr('height',64)
                    .attr('x',-32 +50)
                    .attr('y',-32)
                    .attr('rx', 8)
                    .attr('ry', 8)
                    .style('fill', 'none')
                    .style('stroke', 'pink')
                    .style('stroke-width', '5')
                })
                .on('mouseout', function(){
                    d3.select(this).selectAll('.sign_modfiy').remove()
                })
            

            //岛屿外边框，容器
            personGroup.append('rect')
                .attr('x', -8 + 50)
                .attr('y', -8)
                .attr('rx', 6)
                .attr('ry', 6)
                .attr('width', d => (d.length - 1) * 13 + 16)
                .attr('height', 16)
                .style('fill', 'white')
                .style('stroke', 'black')
                .style('stroke-width', '1')
                

            //岛屿角色-底色
            personGroup.selectAll('.person_in_plot')
                .data(d => d)
                .join('circle')
                .attr('class', 'person_in_plot')
                .attr('id', d => d)
                .attr('cx', (d, r) => 50 + r * 13)
                .attr('cy', 0)

                .attr('r', 5)
                .style('fill', 'gray')

            let personXY = getCordianry(plotPerson)
            // console.log('print drown pic data',personXY)
            // personXY = personXY.map(d=>{
            //     d.map(l=>{
            //         console.log(Object.entries(l))
            //     })
            // })
            const linkGroup = chart.selectAll('.linkGroup')
                .data(personXY)
                .join('g')
                .attr('class', 'linkGroup')

            //岛屿角色
            linkGroup.selectAll('.person_target')
                .data(d => d)
                .join('circle')
                .attr('class', 'person_target')
                .attr('r', 5)
                .attr('cx', d => {
                    let tmp = d[Object.keys(d)[0]]
                    return tmp.sourceX
                })
                .attr('cy', d => {
                    let tmp = d[Object.keys(d)[0]]
                    return tmp.sourceY
                })
                .attr('fill', d => {
                    // console.log(Object.keys(d)[0], personOrder.slice(0,3));
                    if (personOrder.slice(0, 3).includes(Object.keys(d)[0])) {
                        return personScale_top_three(Object.keys(d)[0])
                    }
                    else {
                        return '#454e46'
                    }
                })
                .on('mouseover', function (event) {
                    let t = d3.select(this).data()
                    let t1 = Object.keys(t[0])[0]
                    // console.log(t1);
                    let xy = d3.pointer(event);
                    // console.log(xy);
                    chart
                        .append('rect')
                        .attr('id', 'context')
                        .attr('x', xy[0])
                        .attr('y', xy[1])
                        .attr('width', 100)
                        .attr('height', 100)
                        .style('fill', 'none')
                        .style('stroke-width', 3)
                        .style('opacity', .3)
                    chart
                        .append('text')
                        .attr('id', 'context')
                        .attr('x', xy[0] + 10)
                        .attr('y', xy[1]-15)
                        .style('font-size', '13')
                        .text(`${t1}`)

                })
                .on('mouseout', function () {
                    chart.selectAll('#context').remove()
                })

            const _self = this


            linkGroup
                .selectAll('.linkPerson')
                .data(d => d)
                .join('path')
                .attr('class', 'linkPerson')
                .attr('id', d => `${Object.keys(d)[0]}`)

                .attr('d', d => {
                    let tmp = d[Object.keys(d)[0]]
                    return _self.curvelink_globel(tmp.sourceX, tmp.sourceY, tmp.targetX, tmp.targetY)
                })
                .attr('fill', 'none')
                .attr('stroke-width', 2)
                .attr('stroke', d => {
                    // console.log(Object.keys(d)[0], personOrder.slice(0,3));
                    if (personOrder.slice(0, 3).includes(Object.keys(d)[0])) {
                        return personScale_top_three(Object.keys(d)[0])
                    }
                    else {
                        return '#af9ece'
                    }
                })
                .attr('stroke-opacity', 1)
            svg.append('line')
                .attr('x1', line_Pos.drownLine)
                .attr('x2', line_Pos.drownLine)
                .attr('y1', 20)
                .attr('y2', 1500)
                .style("stroke", "black")
                .style("stroke-width", .5)
                .style("stroke-dasharray", "5,5");

            // this.mixTrend()
        },
        drawMixLine(slugList) {
            slugList
            // const svg = d3.select('#mainSvg')
            // svg.selectAll('text').remove()
            // svg.append('text')
            //     .attr('x', 10)
            //     .attr('y', 10)
            //     .attr('font-size', 20)
            //     .text(slugList)
        },

        mixTrend() {
            const _self = this;
            const vaildEvent = this.$store.state.event_type;
            console.log('事件类型', vaildEvent);
            const sluglinesMeta = this.$store.state.sluglinesMeta;
            let initList = this.initList;
            console.log(initList);
            let vaildList = []
            let timeList = []
            let mixList = []
            
            initList.forEach(element => {
                let tmp = [];
                let temp = [];
                let add = 0;
                element.forEach(slug => {
                    tmp.push(vaildEvent[slug])
                    let len = vaildEvent[slug].length
                    temp.push({ 'time': sluglinesMeta[slug]['time'], 'len': vaildEvent[slug].length, 'pos': add })
                    add = add + len;
                });
                vaildList.push(tmp)
                timeList.push(tmp)

                mixList.push({ 'context': tmp, 'time': temp })
            });
            // console.log(vaildList);
            // console.log(timeList);
            // console.log(mixList);



            //draw line and time bloak
            //#eaeaea #c0c0c0 #808080 #404040
            let timeArray = ['EARLY MORNING', 'MORNING', 'DAY', 'AFTERNOON', 'NEXT AFTERNOON',
                'LATE AFTERNOON', 'MAGIC HOUR', 'DUSK', 'EVENING', 'NIGHT', 'LATE NIGHT', 'LATER', 'SECONDS LATER', '']
            let colorTimeArray = ['#eaeaea', '#eaeaea', '#eaeaea', '#c0c0c0', '#c0c0c0',
                '#c0c0c0', '#c0c0c0', '#808080', '#808080', '#404040', '#404040', '#404040', '#404040', '#eaeaea']
            const timeColorScale = d3.scaleOrdinal().domain(timeArray).range(colorTimeArray)
            const yScale = d3.scaleLinear().domain([0, 370]).range([0, -80])

            let door_width = 70,
                door_height = 230,
                dot_in_door_radius = 10,
                door_padding = 90;

            const svg = d3.select('#mainSvg')

            const trendGroup = svg.selectAll('g .trendGroup')
                .data(mixList)
                .join('g')
                .attr('class', 'trendGroup')
                .attr('transform', (d, r) => `translate(550, ${r * door_padding + 110})`)
            trendGroup
                .selectAll('rect .timeRect')
                .data(d => d.time)
                .join('rect')
                .attr('class', 'timeRect')
                .attr('x', d => d.pos * 7)
                .attr('y', 40)
                .attr('width', d => 7 * d.len)
                .attr('height', 10)
                .style('fill', d => timeColorScale(d.time))
                .style('stroke', 'white')
                .style('stroke-width', .5)
                .on('mouseover', function (event) {
                    let t = d3.select(this).data()
                    let t1 = t[0]['time']
                    // let xy = d3.pointer(event);
                    let xy = [event.pageX - 290, event.pageY - 190]
                    // console.log(event.pageX, event.pageY, xy);
                    // svg
                    //     .append('rect')
                    //     .attr('id', 'context')
                    //     .attr('x',xy[0])
                    //     .attr('y',xy[1])
                    //     .attr('width',100)
                    //     .attr('height',100)
                    //     .style('fill','none')
                    //     .style('stroke-width', 3)
                    //     .style('opacity',.3)
                    svg
                        .append('text')
                        .attr('id', 'context')
                        .attr('x', xy[0])
                        .attr('y', xy[1] + 10)
                        .style('font-size', '13')
                        .text(`${t1}`)

                })
                .on('mouseout', function () {
                    svg.selectAll('#context').remove()
                })

            trendGroup
                .append('line')
                .attr('x1', 0)
                .attr('x2', 600)
                .attr('y1', 0)
                .attr('y2', 0)
                .style('stroke', 'white')
                .style('stroke-width', 1)
            const line = d3.line()
                .x((d, r) => r * 7)
                .y(d => yScale(d['sentence'].length))

            vaildList = vaildList.map(d => {
                return d.flat()
            })
            console.log(d3.extent(vaildList.flat().map(d => d['sentence'].length)));




            const trendLine = svg.append('g').attr('class', 'trendLineG')
            const personDes = trendLine.selectAll('g .personDescribe')
                .data(vaildList)
                .join('g')
                .attr('class', 'personDescribe')
                .attr('transform', (d, r) => `translate(550, ${r * door_padding + 150})`)
            personDes
                .selectAll('rect .perDe')
                .data(d => d)
                .join('rect')
                .attr('class', 'perDe')
                .attr('x', (d, r) => r * 7)
                .attr('y', -30)
                .attr('width', d => {
                    // console.log(d);
                    return 2
                })
                .attr('height', 15)
                .style('fill', d => {
                    if (d['type'] == 'character description') {
                        return 'red'
                    }
                    else if (d['type'] == 'action interaction') {
                        return '#af9ece'
                    }
                    else {
                        return 'none'
                    }
                })




            trendLine.selectAll('path .trendLine')
                .data(vaildList)
                .join('path')
                .attr('class', 'trendLine')
                .attr('d', line.curve(d3.curveBasis))
                .attr('transform', (d, r) => `translate(550, ${r * door_padding + 150})`)
                .style('fill', 'none')
                .style('stroke', '#4e79a7')
                .style('stroke-width', 3)

            trendLine.selectAll('line .li')
                .data(vaildList)
                .join('line')
                .attr('class', 'li')
                .attr('x1', 0)
                .attr('x2', 600)
                .attr('y1', 0)
                .attr('y2', 0)
                .style('stroke', '#4e79a7')
                .style('stroke-width', 1)
                .attr('transform', (d, r) => `translate(550, ${r * door_padding + 150})`)

            const yAxis = d3.axisLeft(yScale)

            var defs = svg.append("defs");
            var filter = defs.append("filter")
                .attr("id", "drop-shadow")
                .attr("height", "130%");
            filter.append("feGaussianBlur")
                .attr("in", "SourceAlpha")
                .attr("stdDeviation", 2)
                .attr("result", "blur");
            filter.append("feOffset")
                .attr("in", "blur")
                .attr("dx", 2)
                .attr("dy", 2)
                .attr("result", "offsetBlur");

            var feMerge = filter.append("feMerge");
            feMerge.append("feMergeNode").attr("in", "offsetBlur");
            feMerge.append("feMergeNode")
                .attr("in", "SourceGraphic");

            trendLine.selectAll('line .yAxis')
                .data(vaildList)
                .join('line')
                .attr('x0', 0)
                .attr('x1', 0)
                .attr('y0', 0)
                .attr('y1', -75)
                .attr("transform", (d, r) => `translate(550, ${r * door_padding + 150})`)
                .style('fill', 'none')
                .style('stroke', '#4e79a7')
                .style('stroke-width', 1)
            // .style("filter", "url(#drop-shadow)")

            // const trendLineRect = svg.selectAll('g .lineRect')
            //         .data(vaildList)
            //             .join('g')
            //             .attr("transform", (d,r)=>`translate(550, ${(r+1)*door_padding + 100})`)
            //             .call(yAxis);










        },

        perAction() {
            const gptText = this.$store.state.gptText
            console.log(gptText);
            let chapterIndex = 0
            let personName = 'Joker'


            for (let slug of gptText.slice(5, 10)) {
                for (let unit of slug) {
                    // console.log(unit['sentence']);
                    if ('Person' in unit) {
                        if (unit['Person'].includes('Joker') || unit['Person'].includes('He')) {

                            let divv = d3.select('#behaviorBox')
                                .append('div')
                                .attr('class', 'behaviorUnit')
                                .text(unit['Behavior'].slice(0, 15))

                            // .append('br')
                            d3.select('#behaviorBox')
                                .append('br')

                            // divv.append('span')
                            //     .text(unit['Behavior'])

                            console.log(unit);
                        }
                    }

                }
            }
        },
        submintTrendList(index) {
            // console.log(index);
            this.$store.commit('setTrendList', index);
        }
    },

}
</script>

<style>
.main_sub_title {
    vertical-align: top;
    position: relative;
    display: inline-block;
    top: 0px;
    height: 100%;
    border: 1px dashed black;
    border-right: none;
    word-wrap: break-word;
    float: left;

    display: flex;
        justify-content: center;
        align-items: center;
}

.main_title {
    width: 100%;
    height: 5%;
    background-color: #b6caf5;
}

.behaviorUnit {
    white-space: normal;
    word-wrap: break-word;
    height: 95px;
}

</style>