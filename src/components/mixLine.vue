<template>
    <!-- <div id="mixline" class="tab" style="width: 200px; white-space:normal;"> -->
    <div class="tab" id="mixLine" style="width: 130%; height: 1270px; ">

        <!-- <button @click="initPlot" id="button_line" style="display: flex;">🍃🍃🍃🍃</button> -->
        <button @click="screenDot" id="button_line" style="display: flex; position: absolute; top: 2%; left: 2%;">Ⅲ</button>
        <button @click="initPlot" id="button_plot" style="display: flex; position: absolute; top: 5%; left: 2%;">🚪</button>
        <button @click="plot_river" id="button_brushed"
            style="display: flex; position: absolute; top: 8%; left: 2%;">✒</button>
        <button @click="reorderDoor" id="button_brushed"
            style="display: flex; position: absolute; top: 11%; left: 2%;">🔒</button>
    </div>
    
</template>
  
<script>
import * as d3 from 'd3'
import { carouselContextKey } from 'element-plus';
import { mapState } from "vuex";

export default {
    name: 'mixLine',
    components: {

    },
    data() {
        return {
            plotInitData: '',
            selectArea_dot: [],
            screen_num: this.$store.state.slugIndexList,
            initList: '',
        }
    },
    mounted() {
        this.setCanvas();
        // this.initPlot()
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
                // this.screenDot();

            }, deep: true
        },
        slugId: {
            handler: function (newVal) {
                // console.log('yyyyyyyyyyyy', newVal);
            }, deep: true
        },

    },
    methods: {
        curvelink_globel(sx,sy,tx,ty) {
            



                let path = d3.path();
                let cs_x = sx,
                    cs_y = (sy+ty)/2,
                    ce_x = tx,
                    ce_y = (sy+ty)/2;
                path.moveTo(sx,sy)
                path.bezierCurveTo(sx+(tx - sx)/10, ty, tx - (tx - sx)/10, sy, tx,ty)
                

                // let t = `M${start_dot[0]},${start_dot[1]} Q${half_half_dot[0]},${half_half_dot[1]} ${half_dot[0]},${half_dot[1]} T${end_dot[0]},${end_dot[1]}`
                return path.toString();
            },


        setCanvas() {
            const svg = d3.select('#mixLine')
                .append('svg')
                .attr('id', 'mixCanvas')
                // .attr('viewbox', '0 0 200 200')
                .attr('width', '100%')
                .attr('height', '100%')

            
        },
        screenDot() {
            this.calcu();

            let scheduling = this.$store.getters.getScheduling;
            let initData = this.initList.flat()
            scheduling.map((d, r) => d['id'] = r)
            const svg = d3.select('#mixCanvas')

            const rScale = d3.scaleSqrt().domain([0, 10000]).range([2, 15])
            const dot_container = svg.append('g').attr('id', 'screen_dot').attr('transform','translate(0,1150)')
            const screen_dot = dot_container.selectAll('.schedulingRect')
                .data(scheduling)
                .join("circle")
                .attr("class", "schedulingRect")
                .attr("id", (d, r) => `${r + 1}scheduling`)
                .attr('r', d => rScale(d.content))
                .attr("cx", (d, r) => 40 + r * 11)
                .attr("cy", 50)
                .style("fill", (d, r) => initData.includes(r + 1) ? 'green' : 'blue')
                .style("opacity", d => rScale(d.content) / 15)

            const brush = d3.brush()
                .extent([[0, 1150], [40+ scheduling.length*11, 1230]])
                .on('start brush end', this.brushed)
            svg.append('g')
                .call(brush)

            //图例编写
            const icon = svg.append('g').attr('class', "icon").attr('transform', 'translate('+(40+ scheduling.length*11)+', 15)')
            icon.selectAll('.screenIcon')
                .data(new Array(3).fill(0))
                .join('circle')
                    .attr('class', 'screenIcon')
                    .attr('r', 7)
                    .attr('cx', 15)
                    .attr('cy', (d,r)=> r*30)
                    .style('fill', (d,r)=>{
                        let c = ['blue', 'green', 'red']
                        return c[r]
                    })
                    .style('opacity', .4)
            icon.selectAll('.textIcon')
                .data(new Array(3).fill(0))
                .join('text')
                    .text((d,r)=>{
                        let c = ['original sluglines', 'Initial selection sluglines', 'user choose sluglines']
                        return c[r]
                    })
                    .attr('x', 20)
                    .attr('y', (d,r)=>r*30)
                    .attr('font-size', 10)
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
            this.initList = coun_list;

            locData.data.map(d => d.map(l => loc_index[`${l}`]++))
            let loc_index_list = [];
            Object.keys(loc_index).forEach(function (key) {
                let value = loc_index[key];
                loc_index_list.push({ "key": key, "value": value });
            });
            //----------------------------------------//
            this.caluPlotData()
            // let group_Plot = this.initList
            // console.log('group_Plot', group_Plot);
            // const eventDialogue = this.$store.state.eventDialogue;
            // function create(d) {
            //     let temp = {}; temp['name'] = '', temp['children'] = d; return temp;
            // }

            // let group_Plot_data = group_Plot.map((d, r) => {
            //     let child = d.map(l => {
            //         let tic = create(eventDialogue[l].map(a => create(a.map(b => b))));
            //         return tic
            //     })
            //     let tmp = { id: r, type: 'nan', children: child };
            //     return tmp
            // })
            // this.plotInitData = group_Plot_data;
        },

        caluPlotData(){
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
        },

        initPlot() {
            //40 +r*11
            let plotData = this.plotInitData;
            console.log('PLOTDATA', plotData);
            const _self = this;
            const svg = d3.select('#mixCanvas')
            // let plotNum = 6;

            let door_width = 70,
                door_height = 730,
                dot_in_door_radius = 10,
                door_padding = 90,
                door_pos_top = 200;

            let initShape = svg.append('g').attr('id', 'shapeInit');
            initShape.append('defs')

            const plotDoor_g = svg.append('g').attr('id', 'door');

            const door_group = plotDoor_g
                .selectAll('.doorG')
                .data(plotData)
                .join('g')
                .attr('class', 'doorG')
                .attr('id', d => `${d.id}`)
                .attr('transform', (d, r) => `translate(${100 + door_padding * r}, ${r % 2 == 0 ? door_pos_top : 1 * door_pos_top})`)

            const plotDoor = door_group
                .selectAll('.plotGroup')
                .data(d => [d])
                .join('rect')
                .attr('class', 'plotGroup')
                .attr('x', 0)
                .attr('y', 0)
                .attr('rx', 20)
                .attr('ry', 20)
                .attr('width', door_width)
                .attr('height', door_height)
                // .attr('transform',(d,r)=>`translate(${100 +door_padding*r}, ${r%2==0?door_pos_top:1.5*door_pos_top})`)
                .style('fill', 'none')
                .style('stroke', 'gray')
                .style('stroke-width', 5)
                .on('click', function () {
                    let slugDot = _self.selectArea_dot
                    let door = d3.select(this.parentNode)
                    let id = Number(door.attr('id'))
                    _self.initList[id] = slugDot
                    _self.caluPlotData()
                    door
                        .selectAll('.plotDot')
                        .data(calculateCirclePositions(door_width, dot_in_door_radius, slugDot.length))
                        .join('circle')
                        .attr('class', 'plotDot')
                        .attr('r', 10)
                        .attr('cx', d => d.x)
                        .attr('cy', d => d.y + 210)
                        .style('fill', 'sandybrown')
                        .style('fill-opacity', .5)
                        .style('stroke', 'black')
                        .style('stroke-width', 2)
                })
            // let a = this.initList
            console.log('--------++++', _self.initList);
            const aa = plotDoor_g
                .selectAll('.plotline_g')
                .data(_self.initList)
                .join('g')
                .attr('class', 'plotline_g')
                .attr('id',(d,r)=>`${r}`)

            aa
                .selectAll('.plotline')
                .data((d,r) => d.map(l=>{
                    return {'id':l, 'g':r}
                }))
                .join('path')
                .attr('class', 'plotline')
                .attr('d',d=>{
                    return _self.curvelink_globel((40+d['id']*11), 50, (100 + door_padding * d['g'] + door_width/2 ),door_pos_top-100
                    )
                }
                )
                .attr('fill', 'none')
                .attr('stroke-width', 2)
                .attr('stroke', 'gray')


            const signDotScale = d3.scaleOrdinal().domain([1, 2, 3]).range(['green', 'greenyellow', 'white'])
            door_group
                .selectAll('.signDot')
                .data([1, 2, 3])
                .join('circle')
                .attr('r', d => 20 / d)
                .attr('cx', (d, r) => door_width - door_width / (2 + r))
                .attr('cy', (d, r) => 20 + 15 / (2 + r))
                .style('fill', d => signDotScale(d))
                .on('mousedown', function () {
                    d3.select(this).style('stroke', 'green')
                    let curDoor = d3.select(this.parentNode).attr('id');
                    console.log('情节序列号', _self.initList[curDoor]);
                    _self.chainDorr(curDoor)

                    plotDoor.style('fill', 'none')

                    plotDoor.filter(d => {
                        if (d.id == Number(curDoor)) {
                            return d
                        }
                    }).style('fill', '#baa2da')
                })
                .on('mouseup', function () {
                    d3.select(this).style('stroke', 'none')
                })

            function calculateCirclePositions(width, radius, n) {
                let position = []
                for(let i =0; i<n; i++){
                    let tmp = {'x':width/2, 'y':200+ i*radius*2.2}
                    position.push(tmp)
                }

                return position;
            }



        },
        drawMixLine(slugList) {

            const svg = d3.select('#mixCanvas')
            svg.selectAll('text').remove()
            svg.append('text')
                .attr('x', 10)
                .attr('y', 10)
                .attr('font-size', 20)
                .text(slugList)
        },
        screenDotBrushed() {
            console.log(this.selectArea_dot);
        },
        addPlotDot() {

        },
        reorderDoor() {
            const svg = d3.select('#mixCanvas')
            svg.selectAll('.doorG')
                .selectAll('*')
                
                .attr('rx', 0)
                .attr('ry', 0)
                .attr('width', 90)
                .attr('height', 50)
                .attr('transform', 'translate(0,-100)')
            svg.selectAll('.doorG')
                .selectAll('.plotDot')
                
                .attr('transform', (d,r)=>`translate(0,${-22*r - 450})`)

        },

        chainDorr(slug_door_index) {
            slug_door_index = Number(slug_door_index)
            let width = 1800,
                height = 1300;
            let border = {
                top: 250,
                left: 100
            }
            let chainData = this.plotInitData[slug_door_index]
            console.log('dasdas', chainData);
            const svg = d3.select('#mixCanvas')
            svg.append('g').attr('id', 'chainInitShape')

            d3.selectAll('#all_chain_door').selectAll('*').remove()

            let hierarchy_data = d3.hierarchy(chainData).count()
            let partition = d3.partition()
                .size([600, 1500])
                .padding(3);
            partition(hierarchy_data)

            // this.drawMixLine1()
            // console.log(chainData);
            // console.log('子孙后代',hierarchy_data.descendants());
            const chainDoor = svg.append('g').attr('id', 'all_chain_door')
            // const chain_plot = chainDoor
            //     .selectAll('.plotslug')
            //     .data(chainData.children)
            //         .join('rect')
            //         .attr('x',border.left)
            //         .attr('y',(d,r)=>border.top + r*80)
            //         .transition()
            //         .duration(200)
            //         .attr('width',60)
            //         .attr('height',30)
            //         .style('fill', 'blue')
            // let aa =hierarchy_data.descendants().filter(
            //             function(d){
            //                 if(d.depth>0){
            //                     return d
            //                 }
            //             }
            //         )
            // console.log(aa);

            //---------------------         ------------------------
            //---------++++++++++++++++++++++++++++++++++-----------
            //---------++++++++++++++++++++++++++++++++++-----------
            //---------++++++++++++++++++++++++++++++++++-----------
            //----------------------         -----------------------
            //INIT SHAPE
            let arc = d3.arc()
                .innerRadius(0)
                .outerRadius(30)
                .startAngle(Math.PI)
                .endAngle(2 * Math.PI)

            const defs = d3.select('#chainInitShape')
                .append('def')

            defs.append('path')
                .attr('id', 'chain_semcircle')
                .attr('d', arc)
                .style('fill', '#c4cdc8')
            defs.append('svg:image')
                .attr('id', "dialogue")
                .attr('width', "30")
                .attr('height', "30")
                .attr('xlink:href', "https://www.svgrepo.com/show/429831/conversation-chat-message.svg")
            defs.append('svg:image')
                .attr('id', "event")
                .attr('width', "30")
                .attr('height', "30")
                .attr('xlink:href', "https://cdn-icons-png.flaticon.com/512/2736/2736190.png")



            //INIT DATA
            let slug_half_dot = hierarchy_data.descendants().filter(d => {
                if (d.depth == 1) {
                    return d
                }
            })

            let event_dialogue_data = slug_half_dot.map(d => {
                let tmp = d.descendants().filter(l => {
                    if (l.depth == 3) {
                        return l
                    }
                })
                return tmp
            })
            console.log(event_dialogue_data);

            chainDoor
                .selectAll('.chain_plot_semcircle')
                .data(slug_half_dot)
                .join('use')
                .attr('y', (d, r) => 300 + r * ((height * .75 - 400) / slug_half_dot.length))
                .attr('x', 100)

                .attr('xlink:href', "#chain_semcircle")

            const event_dia_group = chainDoor.selectAll('.event_dialoge_group')
                .data(event_dialogue_data)
                .join('g')
                .attr('class', 'event_dialoge_group')
                .attr('transform', (d, r) => `translate(150, ${300 + r * ((height * .75 - 400) / slug_half_dot.length)})`)
            event_dia_group
                .append('rect')
                .attr('x', 0)
                .attr('y', -25)
                .attr('width', 1000)
                .attr('height', 50)
                .style('fill', '#e1ece4')

            event_dia_group
                .selectAll('.unit_plot')
                .data(d => d)
                .join('use')
                .attr('x', (d, r) => 30 * r)
                .attr('y', -10)
                .attr('xlink:href', d => Object.keys(d.data).length > 3 ? '#event' : '#dialogue')
                .on('click', function (d) {
                    console.log(d3.select(this).data()[0]['data']);
                })
            // chainDoor
            //         .selectAll('rect.node')
            //         .data(hierarchy_data.descendants().filter(d=> {
            //             if(d.depth == 1){
            //                 return d
            //             }
            //         }))
            //         .join('rect')
            //         // .attr('rx', 2)
            //         // .attr('ry', 4)
            //         .attr('y', d => d.x0 +400)
            //         .attr('x', d => d.y0 )
            //         .attr('height', d => d.x1 - d.x0)
            //         .attr('width', d => d.depth ==2?30 :d.y1 - d.y0)
            //         // .style('fill', 'palegoldenrod')
            //         .style('fill', 'none')
            //         .style('opacity', 1)
            //         .on('mouseover', function(event){
            //             let data = d3.select(this).data()
            //             console.log(data);
            //             chainDoor
            //                 .selectAll('rect.node')
            //                 .data(data[0].descendants())
            //                 .join('rect')

            //                 .attr('y', d => d.x0 +400)
            //                 .attr('x', d => d.y0 -600)
            //                 .attr('height', d => d.x1 - d.x0)
            //                 .attr('width', d => d.depth ==2?30 :d.y1 - d.y0)
            //                 .style('fill', 'red')
            //                 .style('opacity', 1)
            //         })



        },
        drawRiver() {
            const svg = d3.select('#mixCanvas')
            const chart = svg.append('g').attr('id', 'act_dia_plot')
            let width = 1000, height = 1000
            const nodes = ['A', 'B', 'C', 'D'].map(n => ({ node: n }));

            const links = [
                { source: 0, target: 1, value: 3 },
                { source: 0, target: 3, value: 3 },
                //  {source: 4, target: 1, value: 1},
                { source: 2, target: 1, value: 3 },

            ];
            const sankey = d3.sankey().nodePadding(300)
                .extent([[50, 50], [700, 450]])
            //  .iterations(100);
            const graph = sankey({ nodes: nodes, links: links });

            console.log(graph);

            const color = d3.scaleOrdinal(d3.schemeCategory10).domain([0,
                nodes.length]);

            chart.selectAll('g.node')
                .data(graph.nodes).join("g")
                .attr("transform", d => `translate(${[d.x0, d.y0]})`)
                .attr("class", "node")
                .each(function (d, i) {
                    d3.select(this).append("rect")
                        .attr("width", d.x1 - d.x0)
                        .attr("height", d.y1 - d.y0)
                        .style("fill", color(i))
                    d3.select(this).append("text")
                        .attr("x", (d.x1 - d.x0) / 2)
                        .attr("y", (d.y1 - d.y0) / 2 + 2)
                        .text(d.node);
                });
            console.log(graph.links);
            chart.selectAll('path.link')
                .data(graph.links).join("path")
                .attr("class", "link")
                .attr("d", d3.sankeyLinkHorizontal())
                .style("fill", 'none')
                .style("opacity", .5)
                .style("stroke-width", d => d.width)
                .style("stroke", d => color(d.source.index));
        },


        plot_river(){
            let door_width = 70,
                door_height = 230,
                dot_in_door_radius = 10,
                door_padding = 90,
                river_pos_top = 940;

            let plotList = this.initList
            const nodeLink = this.$store.state.relation;
            const data0 = nodeLink.map(d => ({nodes: Array.from(new Set(d.flatMap(l => [l.source, l.target])),id=>({id})), links:d}))
            let plotPerson = plotList.map(d=>{
                let tmpArray = d.map(l=>{
                    let node = data0[l]
                    if(node.nodes.length>0){
                        // console.log(node.nodes);
                        return node.nodes.map(q=>{
                            if(q.id.includes('(')){
                                return /.+(?= \()/.exec(q.id)[0]
                            }
                            else{
                                return q.id
                            }
                        })
                    }
                    
                })
                let a  = tmpArray.filter(d=>d)
                // console.log('THIS IS', new Set(a.flat()));
                return Array.from(new Set(a.flat()))
            })
            let personSet = plotPerson.flat()
            function personSort(personArray) {
                let perFre={};

                for(let i=0; i<personArray.length; i++){
                    let element = personArray[i];
                    if(element in perFre){
                        perFre[element]++;
                    }
                    else{
                        perFre[element] = 1;
                    }
                }
                let sorted = Object.keys(perFre).sort((a,b)=>{return perFre[b]-perFre[a]})
                return sorted
            }
            let personOrder = personSort(personSet);
            const personScale_top_three = d3.scaleOrdinal().domain(personOrder.slice(0,3)).range(['#670d17', '#f79320', '#234b4d'])
            
            function getCordianry(personplot) {
                let personMemory = {}
                let cor = personplot.map((d,x)=>{
                    let data = d.map((c,y)=>{
                    let source_x = x*door_padding + 100,
                        source_y = x%2 == 0 ?river_pos_top + y*13:river_pos_top*1.03 + y*13,
                        target_x = x*door_padding + 100 +door_width/2,
                        target_y = x%2 == 0 ?river_pos_top + y*13:river_pos_top*1.03 + y*13;


                    let tmp = {}
                    tmp[`${c}`] = {}
                    if(personMemory[`${c}`]){
                        tmp[`${c}`]['sourceX'] = personMemory[`${c}`]['x']
                        tmp[`${c}`]['sourceY'] = personMemory[`${c}`]['y']
                        personMemory[`${c}`] = {'x': target_x,'y':target_y}

                    }
                    else{
                        personMemory[`${c}`] = {'x': target_x,'y':target_y}
                        tmp[`${c}`]['sourceX'] = source_x - 13*y 
                        tmp[`${c}`]['sourceY'] = x%2 == 0?source_y-100 - 13*y: source_y+100- 13*y
                    }
                    tmp[`${c}`]['targetX'] = target_x
                    tmp[`${c}`]['targetY'] = target_y


                    return tmp
                    })
                    return data
                })

                return cor
            }
            function curvelink(sx,sy,tx,ty) {
                console.log('dsda');
                let path = d3.path();
                let cs_x = sx,
                    cs_y = (sy+ty)/2,
                    ce_x = tx,
                    ce_y = (sy+ty)/2;
                path.moveTo(sx,sy)
                path.quadraticCurveTo(cs_x, cs_y, sx+(Math.abs(sy-ty)/2), cs_y)
                path.lineTo(tx - (Math.abs(sy-ty)/2), ce_y)
                path.quadraticCurveTo(ce_x, ce_y, tx, ty)
                return path.toString();
            }
            // console.log(getCordianry(plotPerson));
            
            
            const svg = d3.select('#mixCanvas')
            const chart = svg.append('g').attr('id', 'act_dia_plot')
            chart.selectAll('*').remove()

            const personGroup = chart.selectAll('.personGroup')
                .data(plotPerson)
                .join('g')
                    .attr('class', 'personGroup')
                    .attr('transform', (d,r)=>`translate(${r*door_padding + 100},${r%2==0?river_pos_top:river_pos_top*1.03})`)

            personGroup.append('rect')
            
            .attr('x', -8+door_width/2)
            .attr('y', -8)
            .attr('rx', 6)
            .attr('ry', 6)
            .attr('width', 16)
            .attr('height', d=>d.length * 16)
            .style('fill','none')
            .style('stroke','black')
            .style('stroke-width','1')


            personGroup.selectAll('.person_in_plot')
                .data(d=>d)
                .join('circle')
                    .attr('class', 'person_in_plot')
                    .attr('id', d=>d)
                    .attr('cx', door_width/2)
                    .attr('cy', (d,r)=>r*13)
                    
                    .attr('r', 5)
                    .style('fill', 'gray')
                    

            let personXY = getCordianry(plotPerson)
            // console.log(personXY);
            const linkGroup = chart.selectAll('.linkGroup')
                .data(personXY)
                .join('g')
                    .attr('class', 'linkGroup')


            linkGroup.selectAll('.person_target')
                .data(d=>d)
                .join('circle')
                    .attr('class', 'person_target')
                    // .transition()
                    // .duration(1500)
                    .attr('r', 5)
                    .attr('cx', d=>{
                        let tmp = d[Object.keys(d)[0]]
                        return tmp.sourceX
                    })
                    .attr('cy', d=>{
                        let tmp = d[Object.keys(d)[0]]
                        return tmp.sourceY
                    })
                    .attr('fill', d=>{
                        console.log(Object.keys(d)[0], personOrder.slice(0,3));
                        if( personOrder.slice(0,3).includes(Object.keys(d)[0]))
                        {
                            return personScale_top_three(Object.keys(d)[0])
                        }
                        else{
                            return '#454e46'
                        }
                    })
                    .on('mouseover', function(event){
                        let t = d3.select(this).data()
                        let t1 = Object.keys(t[0])[0]
                        console.log(t1);
                        let xy = d3.pointer(event);
                        console.log(xy);
                        chart
                            .append('rect')
                            .attr('id', 'context')
                            .attr('x',xy[0])
                            .attr('y',xy[1])
                            .attr('width',100)
                            .attr('height',100)
                            .style('fill','none')
                            .style('stroke-width', 3)
                            .style('opacity',.3)
                        chart
                            .append('text')
                            .attr('id', 'context')
                            .attr('x',xy[0]+10)
                            .attr('y',xy[1]+10)
                            .style('font-size', '13')
                            .text(`${t1}`)
                        
                    })
                    .on('mouseout',function () {
                        chart.selectAll('#context').remove()
                    })
                    
            const _self = this       
            
            
            linkGroup
                .selectAll('.linkPerson')
                .data(d=>d)
                .join('path')
                    .attr('class','linkPerson')
                    .attr('id', d=>`${d}`)
                    
                    .attr('d', d=>{
                        let tmp = d[Object.keys(d)[0]]
                        // console.log(tmp);
                        return _self.curvelink_globel(tmp.sourceX, tmp.sourceY, tmp.targetX, tmp.targetY)
                    })
                    .attr('fill', 'none')
                    .attr('stroke-width', 2)
                    .attr('stroke', d=>{
                        console.log(Object.keys(d)[0], personOrder.slice(0,3));
                        if( personOrder.slice(0,3).includes(Object.keys(d)[0]))
                        {
                            return personScale_top_three(Object.keys(d)[0])
                        }
                        else{
                            return '#af9ece'
                            // return '#af9ece'
                        }
                    })
                    .attr('stroke-opacity', 1)
            
            // svg.append('path')
            //     .attr('d',curvelink(100,400,1000,700))
            //     .attr('fill', 'none')
            //         .attr('stroke-width', 10)
            //         .attr('stroke', 'red')
                chart.attr('transform', 'translate(0,-400)')
            
        }

    }
}
</script>
  
<style>
.asd {
    color: #3d8de9;
}
</style>
  