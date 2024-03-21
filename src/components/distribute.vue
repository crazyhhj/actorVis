<template>
        <!-- <button @click="drawBar">■ ■ ■ ■ ■ ■ ■ ■</button> -->
        <!-- <p>slideText 说了 {{ msg }}</p> -->
        <!-- <div id="rangeMapping"></div> -->
    <div class="tab" id="ring" style="width: 100%; height: 100%;">
        <!-- <button @click="getInfo" style="display:flex ;">get actor information</button> -->
        <button @click="drawRing" style="display:flex ;">⚪⚪⚪⚪⚪⚪</button>
    </div>
</template>

<script>
import * as d3 from 'd3'
import axios from 'axios'
import NP from 'number-precision'


export default {
    name: 'cirFenBu',
    components: {

    },
    data(){
        return{
            screen_num:this.$store.state.slugIndexList,
            distrData:'',
            slugId:'',
            msg:'',
        }
    },
    mounted(){
        this.eventBus.on("click-send-slugIndex",(msgData)=>(this.msg = msgData));
    },
    beforeUnmount() {
        this.eventBus.off("click-send-slugIndex")
    },
    watch: {
       
    },
    created() {
        
    },
    methods:{
        getInfo(){
                let _self = this;
                axios.get('http://127.0.0.1:5000/api/post/fenbu')
                .then(
                    res=>{
                        let msg = res.data;
                        console.log(msg);
                        _self.distrData = msg;
                    }
                )
                .catch((error)=>{
                    console.log(error);
                })
            },



        // drawCir(){
        //     //饼图

        //     const filmData = this.distrData;
        //     const rangeList = filmData.map(d=>{const l = d.range.slice(-1);return l[0]})

        //     let maxValue = d3.max(rangeList,d=>d)*1.1
        //     console.log(maxValue);
        //     const nameList = filmData.map(d=>d.name)
        //     //控制整张图表的大小
        //     const ratio = .55
        //     const breadth = 1.5

        //     const width = 1000*ratio, height = 2000*ratio; height
        //     const pieheight=2000*ratio, piewidth=2000*ratio;
            
        //     const svg = d3.select("#day6")
        //         .append("svg")
        //         .attr("id","donut")
        //         .attr("width",'100%')
        //         .attr("height",'100%')
        //     //zoom
        //     const zoom = d3.zoom()
        //                     .extent([[0,0],[piewidth,pieheight]])
        //                     .scaleExtent([.5,6])
        //                     .on("zoom",zoomed)
        //     svg.call(zoom);
        //     function zoomed({transform}) {
        //         let g = d3.select("#manager")
        //         console.log(transform);
        //         g.attr('transform',transform);
        //     }

            
        //     svg.select("#donut").append("circle").attr("r",20).attr("cx",100).attr("cy",100).style("fill","none").style("stroke","red")
        //     const donutSvg = svg.append("g").attr("id","manager")

        //     const innerRadius = breadth * 0.35 * pieheight/2, outerRadius = 0.9 * piewidth/2;

        //     const xpieScale = d3.scaleBand().domain(nameList).range([0,2*Math.PI]) ;
        //     const ypieScale = d3.scaleLinear().domain([0,maxValue]).range([innerRadius,outerRadius,]);
            
        //     const colorpieScale = d3.scaleLinear().domain([0,50]).range(['#bbb','steelblue'])

        //     // 通过arc函数来计算放置形状的内径外径距离  同时得到放置角度  
        //     var arc = d3.arc()
        //             .innerRadius(d=>ypieScale(d.range[0]))
        //             // .innerRadius(400)
        //             .outerRadius(d=>ypieScale(d.range.slice(-1)[0]+1))
        //             // .outerRadius(200)
        //             .startAngle(d=>xpieScale(d.name))
        //             .endAngle(d=>xpieScale(d.name)+xpieScale.bandwidth())
        //             .padAngle(0.01)
        //             // .padRadius(innerRadius)
        //     // console.log(arc());
        //     const xpieAxis = g =>g
        //         .attr('text-anchor', 'middle')
        //         .call(g=>g.selectAll('g')
        //             .data(nameList)
        //             .join('g')
        //                 .attr('transform',(d,i,arr)=>`
        //                 rotate(${360*(-0.25+i/arr.length+xpieScale.bandwidth()/(4*Math.PI))})
        //                 translate(${outerRadius},0)
        //                 `)
        //                 .call(g => g.append('line')
        //                     // .attr('x1', -.58*width)
        //                     .attr('x1', -outerRadius + innerRadius)
        //                     .attr('x2', 0)
        //                     .style('stroke', '#aaa'))
        //                 .call(g => g.append('text')
        //                     .attr('transform', (d,i,arr) => (360*(0.75+i/arr.length) % 360 > 180
        //                         ? "rotate(90)translate(0,16)"
        //                         : "rotate(-90)translate(0,-9)"))
        //                     .style('font-family', 'sans-serif')
        //                     .style('font-size', 4*ratio)
        //                     .text(d => d))     
        //             )
        //     const ypieAxis = g=>g
        //         .attr('text-anchor','middle')
        //         .call(g=>g.append('text')
        //             .attr('text-anchor','end')
        //             .attr('x','0')
        //             .attr('y',-.95*width)
        //             // .attr('y',ypieScale(ypieScale.ticks(5).pop()) - 10)
        //             .attr('dy','1em')
        //             .attr('font-size','2em')
        //             .style('fill','#1a1a1a')
        //             .text("SLUGLINES(EXT.INT.)"))
        //         .call(g=>g
        //             .selectAll('g')
        //             .data(ypieScale.ticks(3))
        //             .join('g')
        //                 .attr('fill','none')
        //                 .call(
        //                     g=>g
        //                     .append('circle')
        //                     .attr('r',ypieScale)
        //                     .style('stroke', '#aaa')
        //                     .style('stroke-opacity', 0.5)
        //                 )
        //                 .call(
        //                     g=>g
        //                     .append('text')
        //                     .attr('y',d=>-ypieScale(d))
        //                     .attr('dy', '0.35em')
        //                     .style('stroke', '#fff')
        //                     .style('stroke-width', 5) 
        //                     .style("fill",'#1a1a1a')
        //                     .text(ypieScale.tickFormat(6,'s'))
        //                 .clone(true)
        //                     .style('stroke','none')
        //                 )
        //         )

        //     var randomColor =  function(){
        //         const num = Math.floor(Math.random()*16777215).toString(16);
        //         return "#"+num;
        //     }
        //     const container =  donutSvg.append("g")
        //         .attr("class","pieContainer")
        //         .attr("transform",`translate(${ width },${height/2})`)
        //         .style('font-size',10)
        //         .style('font-family','sans-serif')
        //     container
        //         .selectAll('path')
        //         .data(filmData)
        //         .join('path') 
        //         .style("fill",d=>colorpieScale(d.sign))
        //         .attr('d',arc)
        //         .on("mouseenter mouseout",function(){
        //             d3.select(this)
        //             .style("fill",randomColor)
        //         })
        //     container.append('g')
        //         .call(xpieAxis)
        //     container.append('g')
        //         .call(ypieAxis)
            
        // },

        drawRing() {
                const groupdata = this.$store.state.transScreen;
                const sluglinesMeta = this.$store.state.sluglinesMeta;
                const actorEverySlug = this.$store.state.actorEverySlug;
                const screenPlay = this.$store.state.screenPlay;
                const relation = this.$store.state.relation;

                let chapter_to_actor = []
                let actor_hover_dot = {}
                function ex_actor(li) {
                    let name = []
                    for (let i in li){
                        name.push(nameTrans(li[i].source), nameTrans(li[i].target))
                    }
                    let name_set = Array.from(new Set(name))

                    return name_set
                }
                function nameTrans(d) {
                    return d.replace(/(\W)/g,'-')
                }
                
                //名字角度set
                chapter_to_actor = relation.map(d=>d.length? ex_actor(d):[])
                //把名字变成处理过的名字

                let metaLen = sluglinesMeta.length;
                let group_Sum = [];
                let group_s = [];
                let tick = 0;
                let all_chapterAngle = [];//记录章节角度，用于绘制连线使用

                for(let i = 0; i < sluglinesMeta.length; i++){
                    group_s.push(sluglinesMeta[i]);
                    if(sluglinesMeta[i].id == groupdata[tick].trans_index){
                        tick = tick+1;
                        group_Sum.push(group_s);
                        group_s = [];
                    }
                }
                let midGroup = []
                for(let i = 0; i < groupdata.length; i++){
                    if (i == 0){
                        midGroup.push({'border':groupdata[i].trans_index, 'mid':groupdata[i].trans_index})
                        continue
                    }
                    let mid = (groupdata[i-1].trans_index +1 + groupdata[i].trans_index)/2
                    midGroup.push({'border':groupdata[i].trans_index, 'mid':mid})
                }

                // let scale = .38
                let scale = .6

                const width = 2000*scale, height = 2000*scale;
                const chapter_loop_radius = .865*width/2,
                    chapter_loop_height = .015*width/2,
                    chapter_loop_width = .025*width/2,
                    chapter_group_arc_innerRadius = .85*width/2,
                    chapter_group_arc_outerRadius = .9*width/2,

                    actor_arc_innerRadius = .18*width/2,
                    actor_arc_outerRadius = .2*width/2,
                    patch_circle_radius = .01*width/2;
                
                console.log(group_Sum);
                const svg = d3.select('#ring').append('svg').attr('viewbox', '0 0 2000 2000').attr('width', width).attr('height',height).attr('transform','translate(-0,0)')
                
                const main_g = svg.append('g').append('g').attr('transform', `translate(${width/2},${height/2})`).attr('class', 'main_g')
                svg.append('defs')
                    .append('polygon').attr('id', 'triangle').attr('points', '0,0  10,10 5,8.6')
                
                const chapterGroup = main_g
                    .selectAll('.trans-group')
                    .data(group_Sum)
                    .join('g')
                    .attr('class', 'trans-group')
                
                var arc = d3.arc()
                    .innerRadius(chapter_group_arc_innerRadius)
                    .outerRadius(chapter_group_arc_outerRadius)
                    .startAngle(d=>{ return (d[0].id  -.2)/metaLen * 2*Math.PI - Math.asin(chapter_loop_width/(2 * chapter_loop_radius))})
                    .endAngle(d=>{return (d[0].id + d.length -.2 )/metaLen * 2*Math.PI - Math.asin(chapter_loop_width/(2 * chapter_loop_radius))})
                    .padAngle(.005)
                chapterGroup
                    .selectAll('.chapter-arc')
                    .data(d=>[d])
                    .join('path')
                        .attr('d', arc)
                        .style('fill', 'blue')
                        .style('opacity', 0.05)

                chapterGroup
                    .selectAll('.unit')
                    .data(d=>d)
                    .join('rect')
                        .attr('class', 'unit')
                        .attr('width',chapter_loop_width)
                        .attr('height', chapter_loop_height)
                        .attr('rx', .007*width/2)
                        .attr('x',- chapter_loop_width/2)
                        .attr('y',chapter_loop_radius)
                        .attr('transform', d=>{
                            for(let i = 0; i < midGroup.length; i++){
                                if (d.id < midGroup[i].border + 1 ){
                                    all_chapterAngle.push({'angle':180 + d.id/metaLen * 360 - NP.divide(NP.minus(d.id, midGroup[i].mid), 3), 'slug':d.slug, 'id':d.id})
                                    // console.log('章节角度', 180 + d.id/metaLen * 360 - NP.divide(NP.minus(d.id, midGroup[i].mid), 3));
                                    return `rotate(${180 + d.id/metaLen * 360 - NP.divide(NP.minus(d.id, midGroup[i].mid), 3)})`
                                }
                            }
                            all_chapterAngle.push({'angle':180 + midGroup[midGroup.length -1 ] * 360 - NP.divide(NP.minus(d.id, midGroup[midGroup.length -1].mid), 3), 'slug':d.slug, 'id':d.id})
                            // console.log('章节角度', 180 + midGroup[midGroup.length -1 ] * 360 - NP.divide(NP.minus(d.id, midGroup[midGroup.length -1].mid), 3));
                            return `rotate(${180 + midGroup[midGroup.length -1 ]/metaLen * 360 - NP.divide(NP.minus(d.id, midGroup[midGroup.length -1].mid), 3)})`
                        })
                        .style('fill', 'red')
                        .style('opacity', '0.1')
                        .style('stroke-width','1')
                        .style('stroke','gray')
                chapterGroup
                    .selectAll('.chapter-hover-dot')
                    .data(d=>d)
                    .join('circle')
                        // .attr('class', 'chapter-hover-dot')
                        .attr('class', d=>`chapter-hover-dot${d.id}`)
                        .attr('r', 2*scale)
                        .attr('cx',0)
                        .attr('cy',chapter_loop_radius)
                        .attr('transform', d=>{
                            for(let i = 0; i < midGroup.length; i++){
                                if (d.id < midGroup[i].border + 1 ){
                                    return `rotate(${180 + d.id/metaLen * 360 - (d.id-midGroup[i].mid)/3})`
                                }
                            }
                            return `rotate(${180 + midGroup[midGroup.length -1 ]/metaLen * 360 - (d.id-midGroup[midGroup.length -1 ].mid)/3 })`
                        })
                        .style('fill', 'yellow')
                        .style('stroke-width','1')
                        .style('stroke','gray')
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
                    .data(d=>d)
                    .join('circle')
                        // .attr('class', 'chapter-hover-dot')
                        .attr('class', d=>`chapter-sign--dot${d.id}`)
                        .attr('r', scale*10)
                        .attr('cx',0)
                        .attr('cy',chapter_loop_radius*1.06)
                        .attr('transform', d=>{
                            console.log(d);
                            for(let i = 0; i < midGroup.length; i++){
                                if (d.id < midGroup[i].border + 1 ){
                                    return `rotate(${180 + d.id/metaLen * 360 - (d.id-midGroup[i].mid)/3})`
                                }
                            }
                            return `rotate(${180 + midGroup[midGroup.length -1 ]/metaLen * 360 - (d.id-midGroup[midGroup.length -1 ].mid)/3 })`
                        })
                        .style('stroke-width','3')
                        .style('fill','black')
                        .style('stroke','pink')        
                        .style('fill-opacity','0')        
                        .on('mouseenter ', function(){
                            let id = Number(d3.select(this).attr('class').slice(17, d3.select(this).attr('class').length)) - 1
                            d3.select(`.chapter-hover-dot${id}`).style('fill', 'pink')
                            console.log( d3.select(`.chapter-hover-dot${id}`));
                            let one_chapter_for_actor_group = chapter_to_actor[id]
                            line_chapter_actor(one_chapter_for_actor_group, id)
                        })
                        .on('mouseout', function () {
                            d3.selectAll('.line-to-actor').remove()
                        })

                chapterGroup
                    .selectAll('.chapter-num')
                    .data(d=>d)
                    .join('text')
                        .attr('dx',-3)
                        .attr('dy','0.35em')
                        .attr('transform', d=>{
                            for(let i = 0; i < midGroup.length; i++){
                                if (d.id < midGroup[i].border + 1 ){
                                     let angle = 180 + d.id/metaLen * 360 - (d.id-midGroup[i].mid)/3;
                                    return `rotate(${angle + 90}) translate(${chapter_loop_radius + 10}) rotate(${- angle -90})`
                                }
                            }
                            let angle = 180 + midGroup[midGroup.length -1 ]/metaLen * 360 - (d.id-midGroup[midGroup.length -1 ].mid)/3;
                            return `rotate(${ angle + 90}) translate(${chapter_loop_radius + 30}) rotate(${- angle - 90})`
                        })
                        .style('font-size', '10px')
                        .text(d=>d.id)
                        

                let fir = d3.selectAll('.main .trans-group').selectAll('.unit')
                fir.transition()
                    .duration(5000).style('opacity', function(d, i) {
                    return i ? .1 : 1
                    })
                    .style('stroke-width','1')
                    .style('stroke','gray')
                

                // ===========================
                // ==+++++++++内环++++++++++==
                // ===========================
                
                // 内环 人物
                // const actorFreData = this.$store.state.actorFre;
                let actor_Fo = Object.entries(actorEverySlug);
                let actor_F = actor_Fo.map(d=>{
                    return {'name':d[0].replace(/(\W)/g,'-'), 'fre':d[1].length}
                })
                let at = d3.groups(actor_F, d => d.fre)
                    .sort((a, b) => d3.descending(a[0], b[0])); 

                let actor_sort = at.map(d=>d[1])
                actor_sort = actor_sort.flat()

                //控制输出多少actor
                // let actor10 = actor_sort.slice(0,10)
                let actor10 = [...actor_sort.slice(0,1),...actor_sort.slice(12,15),...actor_sort.slice(58, actor_sort.length)]
                //控制输出多少actor

                let actor10_len = d3.sum(actor10.map(d=>d.fre))
                let actor_angle_group = []
                // console.log(actor10, actorFreData, actorEverySlug);

                const colorScale = d3.scaleOrdinal().domain(actor10.map(d=>d.name)).range(d3.schemeCategory10)
                const actor_g = main_g
                    .append('g')
                    .attr('class','actor')

                var arc_actor = d3.arc()
                    .innerRadius(actor_arc_innerRadius)
                    .outerRadius(actor_arc_outerRadius)
                    .startAngle((d,i)=> (d3.sum(actor10.slice(0,i+1).map(d=>d.fre)) - d.fre)/actor10_len * 2*Math.PI)
                    .endAngle((d,i)=> d3.sum(actor10.slice(0,i+1).map(d=>d.fre))/actor10_len * 2*Math.PI )
                    .padAngle(.05)
                function change (c){
                    console.log('done');
                    d3.selectAll(`.${c}`)
                        .transition()
                        .duration(500)
                        .style('fill', 'gray')
                }

                actor_g
                    .selectAll('.actor')
                    .data(actor10)
                    .join('path')
                        .attr('class', d=>`${d.name}`)
                        .attr('d', arc_actor)
                        .style('fill', d=>colorScale(d.name))
                        .style('opacity', 1)
                        .on("click",function(){
                            change(d3.select(this).attr('class'));
                            console.log(d3.select(this).node().getBBox());
                        })
                
                actor_g
                    .selectAll('.actor')
                    .data(actor10)
                    .join('circle')
                        .attr('class', d=>`${d.name}`)
                        .attr('r', patch_circle_radius)
                        .attr('cx', 0)
                        .attr('cy', actor_arc_innerRadius + patch_circle_radius)
                        .attr('transform', (d,i)=>`rotate(${(d3.sum(actor10.slice(0,i+1).map(d=>d.fre)) - d.fre)/actor10_len * 360 +180 + 2.18})`)
                        .style('fill', d=>colorScale(d.name))
                        .style('opacity', 1)
                actor_g
                    .selectAll('.actor')
                    .data(actor10)
                    .join('circle')                        
                        .attr('class', d=>`${d.name}`)
                        .attr('r', patch_circle_radius)
                        .attr('cx', 0)
                        .attr('cy', actor_arc_innerRadius + patch_circle_radius)
                        .attr('transform', (d,i)=>`rotate(${(d3.sum(actor10.slice(0,i+1).map(d=>d.fre)))/actor10_len * 360 +180 - 2.18})`)
                        .style('fill', d=>colorScale(d.name))
                        .style('opacity', 1)
                actor_g
                    .selectAll('.actor')
                    .data(actor10)
                    .join('text')
                        .attr('x', 0)
                        .attr('y', 0)
                        .text(d=>d.name)
                        .style('font-size', 10)
                        .attr('transform',(d,i)=>`rotate(
                            ${(d3.sum(actor10.slice(0,i+1).map(d=>d.fre))-d.fre/2)/actor10_len * 360 -90}
                            ), 
                            translate(${actor_arc_outerRadius + 10},0),
                            rotate(${0})
                            `)
                
                main_g
                    .selectAll('.test')
                    .data(actor10)
                    .join('circle')
                        .attr('r',10*scale)
                        .attr('cx',0)
                        .attr('cy',d=>{
                            actor_hover_dot[d.name] = actor_arc_outerRadius + Math.sqrt(1000*d.name.length)
                            return actor_arc_outerRadius + Math.sqrt(1000*d.name.length)
                        })
                        .attr('transform',(d,i)=>{
                            actor_angle_group[`${d.name}`] = (d3.sum(actor10.slice(0,i+1).map(d=>d.fre)) - d.fre/2)/actor10_len * 360 +180;

                            return `rotate(${(d3.sum(actor10.slice(0,i+1).map(d=>d.fre)) - d.fre/2)/actor10_len * 360 +180})`
                        })
                        .attr('fill', d=>
                            colorScale(d.name))
                        .attr('class',function(d){
                            return `${d.name}`
                        })
                        .on('mouseenter', function(){
                            tes(d3.select(this).attr('class'), (d3.select(this).attr('transform')), d3.select(this).attr('cy'));
                        })
                        .on('mouseout', function(){
                            d3.selectAll(`.line-${d3.select(this).attr('class')}`).remove()
                        })
                
                
                // ===========================
                // ==+++++++++path++++++++++==
                // ===========================
                
                const nameScale = d3.scaleOrdinal().domain(actor_F.map(d=>d.name)).range(actor_Fo.map(d=>d[0]));
                let actorEverySLug_sub = {...actorEverySlug}
                let idData = Object.keys(actorEverySlug).map(d=>actorEverySlug[d].map(d=>screenPlay.indexOf(d.slug)))
                Object.keys(actorEverySLug_sub).map((d,i)=>{
                    actorEverySLug_sub[d] = idData[i]
                });
                let one_actor_Angle = 0,
                    actor_chapter_group = [];
                    // source_radius = 0;

                const link_group = svg
                    .append('g')
                    .attr('class','link-main')
                    .attr('transform', `translate(${width/2},${height/2})`)

                function create_actor_chapter_lines(d, realAngle, chapterAngle, source_radius, target_radius) {
                    console.log('hover 函数中是',d, realAngle, chapterAngle);
                    let source_actor_angle = realAngle ,
                        // target_chapter_angle = chapterAngle[d].angle;
                        target_chapter_angle = chapterAngle;
                    
                    const angle_radiusScale = d3.scaleLinear().domain(source_radius > target_radius? [0, 180]: [180,0]).range(source_radius > target_radius?[target_radius * 1.1, source_radius*.95] :[source_radius * 1.1, target_radius*.95])
                    if (source_actor_angle<0){
                        source_actor_angle = source_actor_angle + 360
                    }
                    while(source_actor_angle > target_chapter_angle){
                        target_chapter_angle = target_chapter_angle + 360
                    }
                    
                    let angle_difference_value = target_chapter_angle - source_actor_angle;
                    angle_difference_value = angle_difference_value <180 ? angle_difference_value :360 - angle_difference_value;
                    console.log(angle_difference_value);


                    let a = (source_actor_angle + 90)/360 * 2 *Math.PI,
                        b = target_chapter_angle - source_actor_angle >180 ?(source_actor_angle + 90 - angle_difference_value* 0.1)/360 * 2 *Math.PI :(source_actor_angle + 90 + angle_difference_value* 0.1)/360 * 2 *Math.PI ,
                        c = (target_chapter_angle + 90)/360 * 2 *Math.PI,
                        dd = target_chapter_angle - source_actor_angle >180 ?(target_chapter_angle + 90 + angle_difference_value* 0.1)/360 * 2 *Math.PI :(target_chapter_angle + 90 - angle_difference_value* 0.1)/360 * 2 *Math.PI ;

                    let x1 = source_radius * Math.cos(a),
                        y1 = source_radius * Math.sin(a),
                        x2 = angle_radiusScale(angle_difference_value) * Math.cos(b),
                        y2 = angle_radiusScale(angle_difference_value) * Math.sin(b);
                    
                    let xx1 = target_radius * Math.cos(c),
                        yy1 = target_radius * Math.sin(c),
                        xx2 = angle_radiusScale(angle_difference_value) * Math.cos(dd),
                        yy2 = angle_radiusScale(angle_difference_value) * Math.sin(dd);

                    let origin_x = angle_radiusScale(angle_difference_value) * Math.cos(a),
                        origin_y = angle_radiusScale(angle_difference_value) * Math.sin(a),
                        end_x = angle_radiusScale(angle_difference_value) * Math.cos(c),
                        end_y = angle_radiusScale(angle_difference_value) * Math.sin(c);

                    var path = d3.path();
                    path.arc(0, 0, 
                        angle_radiusScale(angle_difference_value),
                        target_chapter_angle - source_actor_angle >180 ? (source_actor_angle + 90)/ 360 * 2* Math.PI - angle_difference_value/360*0.1*2* Math.PI: ((source_actor_angle + 90)/ 360) % 1 * 2* Math.PI + angle_difference_value/360 *0.1*2* Math.PI,
                        target_chapter_angle - source_actor_angle >180 ? (target_chapter_angle + 90)/ 360 * 2* Math.PI + angle_difference_value/360 *0.1*2* Math.PI: ((target_chapter_angle + 90)/ 360) % 1 * 2* Math.PI - angle_difference_value/360 *0.1*2* Math.PI,
                        target_chapter_angle - source_actor_angle >180 ? true : false
                        )
                    path.moveTo(x2, y2)
                    path.quadraticCurveTo(origin_x, origin_y, x1, y1)
                    path.moveTo(xx2, yy2)
                    path.quadraticCurveTo(end_x, end_y, xx1, yy1)
                    return path.toString();

                    
                }
                
                function tes(name, angle, cy){
                    let realName = nameScale(name);
                    one_actor_Angle = Number(angle.slice(7,angle.length-1));
                    // source_radius = cy;
                    actor_chapter_group = actorEverySLug_sub[realName]; //获得演员对应的slug组

                    // console.log(realAngle, actor_chapter_group);

                    link_group
                        .selectAll('.actor-hover-chapter-link')
                        .data(actor_chapter_group)
                        .join('path')
                            .attr('d', d=>create_actor_chapter_lines(d, one_actor_Angle, all_chapterAngle[d].angle, cy, chapter_loop_radius))
                            .attr('class', `line-${name}`)
                            .attr('fill', 'none')
                            // .attr('stroke-width', 7*scale)
                            .attr('stroke-width', 4*scale)
                            .attr('stroke', `${colorScale(name.replace(/(\W)/g,'-'))}`)


                }

                // =======================================
                // ============chapter hover link=========
                // =======================================
                // link_group
                //     .selectAll('.sasd')
                //     .data(all_chapterAngle)
                //     .join('circle')
                //         .attr('cx', 0)
                //         .attr('cy', d=>400 + d.angle/360 * 250) 
                //         .attr('r', 5*scale)
                //         .attr('opacity',.3)
                //         .attr('transform', d=>`rotate(${d.angle})`)  

                function line_chapter_actor(one_chapter_all_actor_group, id){
                    // console.log(one_chapter_all_actor_group.map(d=>actor_angle_group[d]));
                    // console.log(all_chapterAngle[id]);
                    let source_chapter_angle = all_chapterAngle[id];
                    main_g
                        .selectAll('.chapter-hover-show-actor')
                        .data(one_chapter_all_actor_group)
                        .join('path')
                            .attr('d', d=>create_actor_chapter_lines(d, source_chapter_angle.angle,  actor_angle_group[d], chapter_loop_radius, actor_hover_dot[d]))
                            .attr('class', 'line-to-actor')
                            .attr('fill', 'none')
                            .attr('stroke-width', 5*scale)
                            .attr('stroke', d=>`${colorScale(d)}`)
                }

                // ======================================
                // =============内环的chord==============
                // ======================================
                
                //create a relation matrix

                function ex_actor_no_trans(li) {
                    let name = []   
                    for (let i in li){
                        name.push(li[i].source, li[i].target)
                    }
                    let name_set = Array.from(new Set(name))

                    return name_set
                }
                
                
                let nameList = Array.from(new Set(relation.map(d=>d.length? ex_actor_no_trans(d):[]).flat()))
                const relation_nameScale = d3.scaleBand().domain(nameList).range([0,nameList.length])
                let relation_matrix_all = new Array(nameList.length).fill().map(()=>new Array(nameList.length).fill(0))
                let relation_matrix_chapter = new Array(relation.length).fill().map(()=>new Array(nameList.length).fill().map(()=>new Array(nameList.length).fill(0)))    
                // console.log(relation_nameScale);
                // console.log(relation);
                // console.log(relation_matrix_chapter);
                // console.log(relation.length);

                function get_relation_matrix_all(relation){
                    for (let i in relation){
                        for (let j in relation[i]){
                            relation_matrix_all[relation_nameScale(relation[i][j].source)][relation_nameScale(relation[i][j].target)] = relation_matrix_all[relation_nameScale(relation[i][j].source)][relation_nameScale(relation[i][j].target)] + relation[i][j].value
                        }
                    }
                }

                function get_relation_matrix_chapter(relation){
                    for (let i in relation){
                        for (let j in relation[i]){
                            relation_matrix_chapter[i][relation_nameScale(relation[i][j].source)][relation_nameScale(relation[i][j].target)] = relation_matrix_chapter[i][relation_nameScale(relation[i][j].source)][relation_nameScale(relation[i][j].target)] + relation[i][j].value
                        }
                    }
                }

                get_relation_matrix_all(relation)  
                get_relation_matrix_chapter(relation)  
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
                let m = actor10.slice(0,10).map(d=>generateRandomArrayWithFixedSum(10,d.fre))
                // let m = [
                //     [0,1.1,1.2,1.3,1.4],
                //     [2.75,0,0,0,0],
                //     [1.75,0,0,0,0],
                //     [1.375,0,0,0,0],
                //     [0.125,0,0,0,0]];
                var chord = d3.chord()
                    .padAngle(Math.PI/150);
                var chords = chord(m)
                var ribbon = d3.ribbon()
                    .radius(actor_arc_innerRadius*.9);

//                 const chord_inner = main_g
//                     .selectAll(".pathsda")
//                     .data(chords)
//                     .enter()
//                     .append("path")
//                     .attr('class',
//                          'chord'
// )
//                     .attr("d", ribbon)
//                     .attr("fill", (d,r)=>d3.schemeCategory10[r % 10])
//                     .attr("stroke", "gray")
//                     .attr("stroke-width", 1);
//                 chord_inner.attr('transform', 'rotate(5)')


        },

    },


}


</script>

<style>
    .di{
        color: #af9ece
    }
</style>