<template>
    <div>
        <div class="chang"></div>
        <input type="range" min="0" max="100" id="yin" v-model="slider.y" >
        <input type="range" min="0" max="6" id="xin" v-model="slider.x" >
        <input type="range" min="0" max="100" id="colorin" v-model="slider.color" >
        <div id="cir"></div>
        <div id="rangeMapping"></div>
        <!-- <div id="test"></div> -->
        <div id="day6"></div>
        <button @click="getInfo">get actor information</button>
        <button @click="draw">--------------------------</button>
        <div id="day7"></div>

    </div>

</template>


<script>
    import * as d3 from 'd3'
    import axios from 'axios'
// import { lowerCase } from 'lodash'
    
    export default{
        data(){
            return{
                actorInfo:'',
                distrData:'',
                slider:{
                    x:0,
                    y:0,
                    color:50
                }
            }
        },
        mounted(){
        // const dian = d3.select("#chart")
        //   .selectAll("circle")
        const mainSvg = d3.select("#cir")
            .append("svg")
            .attr("id","main")
            .attr("width",2000)
            .attr("height",2000)
        
        const array = [100, 200, 300, 400, 500]
        
        mainSvg
            .selectAll("one")
            .data(array)
            .enter()
            
            .append("rect")
            .attr("class","one")
            .attr("y", 50)
            .attr("x", (d) => d)
            .attr("width",20)
            .attr("height",20)
            .attr("fill", "green");

        
        d3.selectAll(".one")
            // .attr("x",d => d-10)
            // .attr("y",0)
            .transition()
            .duration(3000)
            .attr("x",d=>d*0.9)
            .attr("y",30)
            .attr("width",30)
            .attr("height",30)
            .attr("fill", "blue");

        let frame=(x,y,w,h)=> {d3.select("#main")
            .append("rect")
            .attr("id","yi")
            .attr('x',x).attr("y",y)
            .attr("width",w).attr("height",h)
            .attr("stroke","black")
            .attr("storke-width",1)
            .attr("fill-opacity",0)}
        frame(20,100,420,100);
                    
        mainSvg
            .selectAll("er")
            .data([40,120,200,280,360])
            .enter()
            .append("rect")
            .attr("class","er")
            .attr("x",d=>d)
            .attr("y",120)
            .attr("width",60)
            .attr("height",60)
            .style("fill","yellow")

        const circles = mainSvg.selectAll("circle")
        const cirData = [1,2,3,4]
        circles
            .data(cirData)
            .join("circle")
                .attr("r",10)
                .attr("cx",d=>d*100)
                .attr("cy",300)
                .style("fill","red")
        
        frame(20,400,200,200);

        frame(300,400,160,160);
        const data=[0,1,2,3,4];
        const maxHeight = 130;
       
        const xBarScale = d3.scaleOrdinal().domain(data).range([310,340,370,400,430])
        const heightBarScale = d3.scaleLinear().domain([0,4]).range([10,10+maxHeight])
        const colorBarScale = d3.scaleLinear().domain([0,4]).range(['#eee','steelblue'])
        // alert('barrect')
        d3.select("#main")
            .selectAll("barrect")
            .data(data)
            .enter()
            .append("rect")
            .attr("id","barrect")
            .attr("width",20)
            .attr("y",410)
            .attr("x",(d) => xBarScale(d))
            .attr("height",(d)=> heightBarScale(d))
            .style("fill",(d)=> colorBarScale(d))
            .on("click",function(){
                d3.select(this)
                    .attr('width',25)
            })
        d3.select("#main")
            .append("text").attr("x",500).attr("y",500).text("this  is  a line");
           

//爱心曲线
        d3.select("#test")
            .append("svg")
            .attr("id","ceshi")
            .attr("width",2000)
            .attr("height",2000)
        let heart=(r,x,y,color,size,id)=>{
            const point = this.drawHeart(r)
            d3.select("#ceshi")

            .selectAll(id)
            .data(point)
            .enter()

            .append("circle")
            .attr("id",id)
            .attr("r",size)
            .attr("cx",(d)=>d.x+x)
            .attr("cy",(d)=>d.y+y)
            .style("fill",color)

        }
        // heart(100,1000,1000,"pink",7,"love1");

        heart(1000,1000,1000,"pink",7,"love1");
        // heart(30,750,1200,"blue",3,"love2");
        // heart(40,1000,1000,"red",3,"love3");
        // heart(50,1250,1200,"green",3,"love4");

        const rangeArray = [{name:"bob",range:[0,14],value:7,id:"1"},
                            {name:"ttt",range:[2,10],value:8,id:"2"},
                            {name:"eee",range:[5,17],value:9,id:"3"},
                            {name:"xxx",range:[6,20],value:10,id:"4"},
                            {name:"aaa",range:[9,16],value:13,id:"5"},
                            {name:"ooo",range:[13,15],value:14,id:"6"},
                            {name:"ppp",range:[18,24],value:20,id:"7"},
                        ];
        let xrangeScale = d3.scaleLinear().domain([0,30]).range([100,700])
        let yrangeScale = d3.scaleLinear().domain([1,2,3,4,5,6,7]).range([975,925,875,825,775,725,675,625])
        let widthRangeScale = (data)=>{
            const leth = data.range[1]-data.range[0];
            return leth*20
        }


        d3.select("#rangeMapping")
            .append("svg")
            .attr("id","zone")
            .attr("width",2000)
            .attr("height",2000)

        let subSvg=d3.select("#zone");

        const gData=[
            {name:"Group1"},
            {name:"Group2"},
            {name:"Group3"},
            ]
        const fib=[0,1,2,3,5,8]
        const groups = subSvg
            .selectAll("g")
            .data(gData)
            .join("g")
                .attr('transform', (d,i) => 'translate(' + (100 * i) + ',0)')

        groups
            .selectAll('rect')
            .data( fib )
            .join('rect')
            .attr('x', 10)
            .attr('y', 30)
            .attr('width', d => d * 10)
            .attr('height', d => d * 10)
            .style('fill', 'transparent')
            .style('stroke', '#ff7b57')
            .style('stroke-width', 2)
        groups
            .append("text")
            .attr("x",10)
            .attr("y",20)
            .attr('dy', '0.35em')
            .style('font-family', 'sans-serif')
            .style('font-size', 12)
            .text(d => d.name)

        subSvg
            .selectAll("#rrt")
            .data(rangeArray)

            .enter()
            .append("rect")
            .attr("id","rrt")
            .attr("x",(d) => xrangeScale(d.range[0]))
            // .attr("x",(d) => d.range[0]*10+100)
            .attr("y",(d) => yrangeScale(d.id))

            // .attr("y",(d) => 1000 - 50*d.id)
            .attr("width",(d)=>widthRangeScale(d))
            // .attr("width",100)
            .attr("height",40)
            .style("fill","#90c1f8")

        subSvg
            .selectAll("dian")
            .data(rangeArray)

            .enter()
            .append("circle")
            .attr("id","rrt")
            // .attr("class","dian")
            .attr("r",2)
            .attr("cx",(d) => 100+20*d.value)
            .attr("cy",(d) => yrangeScale(d.id)+20)

            // const yearData = [
            //         { year: 2005, value: 734.69 },
            //         { year: 2006, value: 750.70 },
            //         { year: 2007, value: 755.13 },
            //         { year: 2008, value: 694.19 },
            //         { year: 2009, value: 681.83 },
            //         { year: 2010, value: 718.98 },
            //         { year: 2011, value: 740.57 },
            //         { year: 2012, value: 752.24 },
            //         { year: 2013, value: 767.24 },
            //         { year: 2014, value: 802.45 },
            //         { year: 2015, value: 805.65 },
            //         { year: 2016, value: 935.58 },
            //         { year: 2017, value: 967.13 },
            //         { year: 2018, value: 1007.24 },
            //         ]
        // const filmData = [{'name': 'JOKER', 'range': [1, 4, 7, 8, 9, 12, 14, 15, 21, 23, 24, 25, 31, 35, 36, 37, 40, 42, 43, 45, 46, 47, 48, 49, 50, 52, 53, 56, 61, 62, 64, 71, 74, 77, 81, 83, 84, 86, 88, 90, 106, 109, 111, 113, 115, 117, 119, 127], 'sign': 48}, {'name': 'SOCIAL WORKER', 'range': [1, 43], 'sign': 2}, {'name': "JOKER (CONT'D)", 'range': [1, 50, 84], 'sign': 3}, {'name': 'KID #1', 'range': [2], 'sign': 1}, {'name': 'KID #2', 'range': [2], 'sign': 1}, {'name': 'WOMAN ON BUS', 'range': [4], 'sign': 1}, {'name': 'SOPHIE (OS)', 'range': [7, 47], 'sign': 2}, {'name': 'SOPHIE', 'range': [7, 31, 42, 47, 48, 81], 'sign': 6}, {'name': 'MOM (OS)', 'range': [8, 23, 44, 50], 'sign': 4}, {'name': 'MOM', 'range': [9, 21, 24, 45, 50, 80, 84], 'sign': 7}, {'name': 'ANNOUNCER (ON TV)', 'range': [9], 'sign': 1}, {'name': 'RECEPTIONIST', 'range': [12], 'sign': 1}, {'name': 'RANDALL (OS)', 'range': [14], 'sign': 1}, {'name': 'RANDALL', 'range': [14, 52, 53, 90], 'sign': 4}, {'name': 'GARY', 'range': [14, 52, 90], 'sign': 3}, {'name': 'HOYT', 'range': [15], 'sign': 1}, {'name': 'BRANCH MANAGER', 'range': [31], 'sign': 1}, {'name': 'JOKER (PRE-LAP)', 'range': [34], 'sign': 1}, {'name': 'HOYT (OVER PHONE)', 'range': [36], 'sign': 1}, {'name': 'WALL STREET #1', 'range': [37], 'sign': 1}, {'name': 'WALL STREET #2', 'range': [37], 'sign': 1}, {'name': 'WALL STREET #3', 'range': [37], 'sign': 1}, {'name': 'YOUNG WOMAN', 'range': [37], 'sign': 1}, {'name': 'BOBBY SHORT (SINGING)', 'range': [37, 38], 'sign': 2}, {'name': 'THOMAS WAYNE (ON TV)', 'range': [45], 'sign': 1}, {'name': 'MORNING" HOST (ON TV)', 'range': [45], 'sign': 1}, {'name': 'EMCEE (OS)', 'range': [46], 'sign': 1}, {'name': 'MURRAY FRANKLIN (ON TV)', 'range': [49, 63, 116, 118], 'sign': 4}, {'name': "MOM (OS) (CONT'D)", 'range': [50], 'sign': 1}, {'name': 'HA-HA CLOWN #1 (OS)', 'range': [52], 'sign': 1}, {'name': 'HA-HA CLOWN #2', 'range': [52], 'sign': 1}, {'name': 'MAGICIAN', 'range': [52], 'sign': 1}, {'name': "RANDALL (CONT'D)", 'range': [52], 'sign': 1}, {'name': 'NEXT AFTERNOON', 'range': [54], 'sign': 1}, {'name': 'ALFRED (OS)', 'range': [56], 'sign': 1}, {'name': 'ALFRED', 'range': [56], 'sign': 1}, {'name': 'DET. GARRITY', 'range': [61, 88, 97], 'sign': 3}, {'name': 'DET. BURKE', 'range': [61, 88, 97], 'sign': 3}, {'name': 'ER NURSE', 'range': [62], 'sign': 1}, {'name': 'ER RESIDENT', 'range': [62], 'sign': 1}, {'name': 'JOKER (ON TV)', 'range': [116, 120], 'sign': 2}, {'name': 'YOUNG DOCTOR (OS)', 'range': [64], 'sign': 1}, {'name': 'NURSE #1 (OS)', 'range': [64], 'sign': 1}, {'name': 'THOMAS WAYNE', 'range': [71], 'sign': 1}, {'name': 'CLERK', 'range': [77], 'sign': 1}, {'name': "CLERK (CONT'D)", 'range': [77], 'sign': 1}, {'name': 'MOM (VO)', 'range': [79], 'sign': 1}, {'name': 'DR. STONER', 'range': [80], 'sign': 1}, {'name': 'MOM (V0)', 'range': [80], 'sign': 1}, {'name': 'DR. STONER (VO)', 'range': [80], 'sign': 1}, {'name': 'PROTESTER #1 (ON TV)', 'range': [82], 'sign': 1}, {'name': 'PROTESTER #2 (ON TV)', 'range': [82], 'sign': 1}, {'name': 'SHOW BOOKER (ON MACHINE)', 'range': [83], 'sign': 1}, {'name': 'SHOW BOOKER (OVER PHONE)', 'range': [83], 'sign': 1}, {'name': 'GARY (OS)', 'range': [90], 'sign': 1}, {'name': 'JOKER (OS)', 'range': [94], 'sign': 1}, {'name': 'BURKE', 'range': [101], 'sign': 1}, {'name': 'GENE UFLAND', 'range': [105, 106], 'sign': 2}, {'name': 'MURRAY FRANKLIN', 'range': [105, 106, 107, 109, 111, 113, 115, 117, 119], 'sign': 9}, {'name': 'DR. SALLY FRIEDMAN', 'range': [107, 113], 'sign': 2}, {'name': 'ASSOCIATE PRODUCER', 'range': [108, 114], 'sign': 2}, {'name': 'DIRECTOR', 'range': [108, 110, 112, 114], 'sign': 4}, {'name': 'TECHNICAL DIRECTOR', 'range': [110, 114], 'sign': 2}, {'name': 'POLICE LIEUTENANT (OS)', 'range': [118], 'sign': 1}, {'name': 'POLICE OFFICER #1 (OS)', 'range': [122], 'sign': 1}, {'name': 'POLICE OFFICER #2 (OS)', 'range': [122], 'sign': 1}, {'name': 'PUNK', 'range': [126], 'sign': 1}, {'name': 'HOSPITAL DOCTOR', 'range': [127], 'sign': 1}]


        // const rangeList = rangeArray.map(d=>d.range.slice(-1))
        // console.log(rangeList);

        // let maxValue = d3.max(rangeList,d=>d)
        // console.log(maxValue);
        // const nameList = rangeArray.map(d=>d.name)
        // const width = 1000, height = 2000;
        // const margin = {top:20,right:50,left:50,bottom:50};
        // const xZoneScale = d3.scaleLinear().domain([0,maxValue]).range([margin.left,width-margin.right])
        // const yZoneScale = d3.scaleBand().domain(nameList).range([height-margin.bottom,margin.top]).padding(0.5)
        // const xAxis = d3.axisBottom(xZoneScale).ticks(maxValue);
        // const yAxis = d3.axisLeft(yZoneScale).tickSizeOuter(0);

        // subSvg
        //     .append("g")
        //     .attr("class","bars")
        //     .selectAll("rect")
        //     .data(rangeArray)
        //     .join("rect")
        //         .attr("class","personRange")
        //         .attr("x",(d)=>xZoneScale(d.range[0]))
        //         .attr("y",(d)=>yZoneScale(d.name))
        //         .attr("width",(d)=>xZoneScale(d.range.slice(-1))-xZoneScale(d.range[0]))
        //         .attr("height",yZoneScale.bandwidth())
        //         .style("fill","#ddff00")
        // subSvg
        //     .append("g")
        //     .attr("class","x-axis")
        //     .attr("transform",`translate(0,${height-margin.bottom})`)
        //     .call(xAxis)
        // subSvg
        //     .append("g")
        //     .attr("class","y-axis")
        //     .attr("transform",`translate(${margin.left},0)`)
        //     .call(yAxis)
        const filmData = this.distrData;
        const rangeList = filmData.map(d=>{const l = d.range.slice(-1);return l[0]})
        console.log(rangeList);

        let maxValue = d3.max(rangeList,d=>d)*1.1
        console.log(maxValue);
        const nameList = filmData.map(d=>d.name)
        const width = 1000, height = 2000;
        const margin = {top:20,right:50,left:200,bottom:50};
        const xZoneScale = d3.scaleLinear().domain([0,maxValue]).range([margin.left,width-margin.right])
        const yZoneScale = d3.scaleBand().domain(nameList).range([height-margin.bottom,margin.top]).padding(0.5)
        const xAxis = d3.axisBottom(xZoneScale).tickSizeOuter(0);
        const yAxis = d3.axisLeft(yZoneScale).tickSizeOuter(0);
        console.log(xZoneScale(2));
        subSvg
            .append("g")
            .attr("class","bars")
            .selectAll("rect")
            .data(filmData)
            .join("rect")
                .attr("class","personRange")
                .attr("x",(d)=>xZoneScale(d.range[0]))
                .attr("y",(d)=>yZoneScale(d.name))
                .attr("width",(d)=>(xZoneScale(d.range.slice(-1))-xZoneScale(d.range[0]-1)))
                .attr("height",yZoneScale.bandwidth())
                .style("fill","#666666")
        subSvg
            .append("g")
            .attr("class","x-axis")
            .attr("transform",`translate(0,${height-margin.bottom})`)
            .call(xAxis)
        subSvg
            .append("g")
            .attr("class","y-axis")
            .attr("transform",`translate(${margin.left},0)`)
            .call(yAxis)

        //饼图
        
        d3.select("#day6")
            .append("svg")
            .attr("id","donut")
            .attr("width",2000)
            .attr("height",2000)
        d3.select("#donut").append("circle").attr("r",20).attr("cx",100).attr("cy",100).style("fill","none").style("stroke","red")
        const donutSvg = d3.select("#donut")

        const pieheight=2000,piewidth=2000
        const innerRadius = 0.35 * pieheight/2, outerRadius = 0.9 * piewidth/2;

        const xpieScale = d3.scaleBand().domain(nameList).range([0,2*Math.PI]) ;
        const ypieScale = d3.scaleLinear().domain([0,maxValue]).range([innerRadius,outerRadius,]);
        // alert(ypieScale.ticks(5))
        // const colorDomain =()=> {
        //     const extent = d3.extent( data, d => d.sign ),
        //     interpolated = d3.interpolate( ...extent )
    
        //     return d3.quantize( interpolated, 7 )
        //     }
        // const  color = d3.scaleLinear(
        //     colorDomain,
        //     d3.quantize(d3.interpolateSpectral, 7).reverse()
        //     )
        const colorpieScale = d3.scaleLinear().domain([0,50]).range(['#bbb','steelblue'])

        // 通过arc函数来计算放置形状的内径外径距离  同时得到放置角度  
        var arc = d3.arc()
                .innerRadius(d=>ypieScale(d.range[0]))
                // .innerRadius(400)
                .outerRadius(d=>ypieScale(d.range.slice(-1)[0]+1))
                // .outerRadius(200)
                .startAngle(d=>xpieScale(d.name))
                .endAngle(d=>xpieScale(d.name)+xpieScale.bandwidth())
                .padAngle(0.01)
                // .padRadius(innerRadius)
        // console.log(arc());
        const xpieAxis = g =>g
            .attr('text-anchor', 'middle')
            .call(g=>g.selectAll('g')
                .data(nameList)
                .join('g')
                    .attr('transform',(d,i,arr)=>`
                    rotate(${360*(-0.25+i/arr.length+xpieScale.bandwidth()/(4*Math.PI))})
                    translate(${outerRadius},0)
                    `)
                    .call(g => g.append('line')
                        .attr('x1', -580)
                        .attr('x2', 0)
                        .style('stroke', '#aaa'))
                    .call(g => g.append('text')
                        .attr('transform', (d,i,arr) => (360*(0.75+i/arr.length) % 360 > 180
                            ? "rotate(90)translate(0,16)"
                            : "rotate(-90)translate(0,-9)"))
                        .style('font-family', 'sans-serif')
                        .style('font-size', 4)
                        .text(d => d))     
                )
        const ypieAxis = g=>g
            .attr('text-anchor','middle')
            .call(g=>g.append('text')
                .attr('text-anchor','end')
                .attr('x','0')
                .attr('y',-950)
                // .attr('y',ypieScale(ypieScale.ticks(5).pop()) - 10)
                .attr('dy','1em')
                .attr('font-size','2em')
                .style('fill','#1a1a1a')
                .text("SLUGLINES(EXT.INT.)"))
            .call(g=>g
                .selectAll('g')
                .data(ypieScale.ticks(3))
                .join('g')
                    .attr('fill','none')
                    .call(
                        g=>g
                        .append('circle')
                        .attr('r',ypieScale)
                        .style('stroke', '#aaa')
                        .style('stroke-opacity', 0.5)
                    )
                    .call(
                        g=>g
                        .append('text')
                        .attr('y',d=>-ypieScale(d))
                        .attr('dy', '0.35em')
                        .style('stroke', '#fff')
                        .style('stroke-width', 5) 
                        .style("fill",'#1a1a1a')
                        .text(ypieScale.tickFormat(6,'s'))
                    .clone(true)
                        .style('stroke','none')
                    )
            )

        var randomColor =  function(){
            const num = Math.floor(Math.random()*16777215).toString(16);
            return "#"+num;
        }
        const container =  donutSvg.append("g")
            .attr("class","pieContainer")
            .attr("transform",`translate(${ width },${height/2})`)
            .style('font-size',10)
            .style('font-family','sans-serif')
        container
            .selectAll('path')
            .data(filmData)
            .join('path') 
            .style("fill",d=>colorpieScale(d.sign))
            .attr('d',arc)
            .on("mouseenter mouseout",function(){
                d3.select(this)
                .style("fill",randomColor)
            })
        container.append('g')
            .call(xpieAxis)
        container.append('g')
            .call(ypieAxis)
        
        const lineData = [[
              {name: "United States", iso: "USA", date: 20000401, price: 2.51}
            , {name: "United States", iso: "USA", date: 20010401, price: 2.54}
            , {name: "United States", iso: "USA", date: 20020401, price: 2.49}
            , {name: "United States", iso: "USA", date: 20030401, price: 2.71}
            , {name: "United States", iso: "USA", date: 20040501, price: 2.9}
            , {name: "United States", iso: "USA", date: 20050601, price: 3.06}
            , {name: "United States", iso: "USA", date: 20060101, price: 3.15}
            , {name: "United States", iso: "USA", date: 20060501, price: 3.1}
            , {name: "United States", iso: "USA", date: 20070101, price: 3.22}
            , {name: "United States", iso: "USA", date: 20070601, price: 3.41}
            , {name: "United States", iso: "USA", date: 20080601, price: 3.57}
            , {name: "United States", iso: "USA", date: 20090701, price: 3.57}
            , {name: "United States", iso: "USA", date: 20100101, price: 3.58}
            , {name: "United States", iso: "USA", date: 20100701, price: 3.733333333}
            , {name: "United States", iso: "USA", date: 20110701, price: 4.065}
            , {name: "United States", iso: "USA", date: 20120101, price: 4.19722}
            , {name: "United States", iso: "USA", date: 20120701, price: 4.3275}
            , {name: "United States", iso: "USA", date: 20130101, price: 4.367395833}
            , {name: "United States", iso: "USA", date: 20130701, price: 4.556666667}
            , {name: "United States", iso: "USA", date: 20140101, price: 4.624166667}
            ],
            [
            {name: "Sweden", iso: "SWE", date: 20000401, price: 2.71493212669683}
            , {name: "Sweden", iso: "SWE", date: 20010401, price: 2.33463035019455}
            , {name: "Sweden", iso: "SWE", date: 20020401, price: 2.5}
            , {name: "Sweden", iso: "SWE", date: 20030401, price: 3.59712230215827}
            , {name: "Sweden", iso: "SWE", date: 20040501, price: 3.94218134034166}
            , {name: "Sweden", iso: "SWE", date: 20050601, price: 4.16655466250907}
            , {name: "Sweden", iso: "SWE", date: 20060101, price: 4.27910112942336}
            , {name: "Sweden", iso: "SWE", date: 20060501, price: 4.53013569815569}
            , {name: "Sweden", iso: "SWE", date: 20070101, price: 4.54464761228475}
            , {name: "Sweden", iso: "SWE", date: 20070601, price: 4.85890762922118}
            , {name: "Sweden", iso: "SWE", date: 20080601, price: 6.37492974995177}
            , {name: "Sweden", iso: "SWE", date: 20090701, price: 4.93099764197164}
            , {name: "Sweden", iso: "SWE", date: 20100101, price: 5.50684119117211}
            , {name: "Sweden", iso: "SWE", date: 20100701, price: 6.56400241403395}
            , {name: "Sweden", iso: "SWE", date: 20110701, price: 7.63985351685819}
            , {name: "Sweden", iso: "SWE", date: 20120101, price: 5.91306354379994}
            , {name: "Sweden", iso: "SWE", date: 20120701, price: 5.72868135202144}
            , {name: "Sweden", iso: "SWE", date: 20130101, price: 6.38809635544636}
            , {name: "Sweden", iso: "SWE", date: 20130701, price: 6.15687377003092}
            , {name: "Sweden", iso: "SWE", date: 20140101, price: 6.28751071734781}
            , {name: "Sweden", iso: "SWE", date: 20140701, price: 5.95377413692218}
            , {name: "Sweden", iso: "SWE", date: 20150101, price: 4.96859530363977}
            , {name: "Sweden", iso: "SWE", date: 20150701, price: 5.12751315611928}
            , {name: "Sweden", iso: "SWE", date: 20160101, price: 5.23143277318251}
            , {name: "Sweden", iso: "SWE", date: 20160701, price: 5.22871254297632}
            , {name: "Sweden", iso: "SWE", date: 20170101, price: 5.26053339616748}
            , {name: "Sweden", iso: "SWE", date: 20170701, price: 5.81892070131244}
            , {name: "Sweden", iso: "SWE", date: 20180101, price: 6.12311068987879}
            , {name: "Sweden", iso: "SWE", date: 20180701, price: 5.82684002467838}
            , {name: "Sweden", iso: "SWE", date: 20190101, price: 5.83859649122807}
            , {name: "Sweden", iso: "SWE", date: 20190709, price: 5.38255734798233}
            , {name: "Sweden", iso: "SWE", date: 20200114, price: 5.4444926050047}
            , {name: "Sweden", iso: "SWE", date: 20200701, price: 5.75593101637048}
            ],
            [
            {name: "China", iso: "CHN", date: 20000401, price: 1.19565217391304}
            , {name: "China", iso: "CHN", date: 20010401, price: 1.19565217391304}
            , {name: "China", iso: "CHN", date: 20020401, price: 1.26811594202899}
            , {name: "China", iso: "CHN", date: 20030401, price: 1.19565217391304}
            , {name: "China", iso: "CHN", date: 20040501, price: 1.256038647343}
            , {name: "China", iso: "CHN", date: 20050601, price: 1.26866753661012}
            , {name: "China", iso: "CHN", date: 20060101, price: 1.30206718666683}
            , {name: "China", iso: "CHN", date: 20060501, price: 1.30824819337154}
            , {name: "China", iso: "CHN", date: 20070101, price: 1.41491838493498}
            , {name: "China", iso: "CHN", date: 20070601, price: 1.44647389114626}
            , {name: "China", iso: "CHN", date: 20080601, price: 1.82908984489318}
            , {name: "China", iso: "CHN", date: 20090701, price: 1.82943785033735}
            , {name: "China", iso: "CHN", date: 20100101, price: 1.83091164752754}
            , {name: "China", iso: "CHN", date: 20100701, price: 1.9477932387965}
            , {name: "China", iso: "CHN", date: 20110701, price: 2.27307990690458}
            , {name: "China", iso: "CHN", date: 20120101, price: 2.43844509540021}
            , {name: "China", iso: "CHN", date: 20120701, price: 2.44971433043751}
            , {name: "China", iso: "CHN", date: 20130101, price: 2.57218185325703}
            , {name: "China", iso: "CHN", date: 20130701, price: 2.60836960597317}
            , {name: "China", iso: "CHN", date: 20140101, price: 2.74321220233669}
            , {name: "China", iso: "CHN", date: 20140701, price: 2.72655405514415}
            , {name: "China", iso: "CHN", date: 20150101, price: 2.76905739354423}
            , {name: "China", iso: "CHN", date: 20150701, price: 2.73787283385943}
            , {name: "China", iso: "CHN", date: 20160101, price: 2.68366320026837}
            , {name: "China", iso: "CHN", date: 20160701, price: 2.78526504941599}
            , {name: "China", iso: "CHN", date: 20170101, price: 2.82967112291745}
            , {name: "China", iso: "CHN", date: 20170701, price: 2.9171270718232}
            , {name: "China", iso: "CHN", date: 20180101, price: 3.17164179104478}
            , {name: "China", iso: "CHN", date: 20180701, price: 3.09574146783449}
            , {name: "China", iso: "CHN", date: 20190101, price: 3.05122852095712}
            , {name: "China", iso: "CHN", date: 20190709, price: 3.05028614589083}
            , {name: "China", iso: "CHN", date: 20200114, price: 3.12273057371097}
            , {name: "China", iso: "CHN", date: 20200701, price: 3.09845077461269}
            ],
            [
            {name: "Euro area", iso: "EUZ", date: 20000401, price: 2.38080000045235}
            , {name: "Euro area", iso: "EUZ", date: 20010401, price: 2.26160000072371}
            , {name: "Euro area", iso: "EUZ", date: 20020401, price: 2.37629999919206}
            , {name: "Euro area", iso: "EUZ", date: 20030401, price: 2.9810000002981}
            , {name: "Euro area", iso: "EUZ", date: 20040501, price: 3.2880000013152}
            , {name: "Euro area", iso: "EUZ", date: 20050601, price: 3.58313199823029}
            , {name: "Euro area", iso: "EUZ", date: 20060101, price: 3.51382499956077}
            , {name: "Euro area", iso: "EUZ", date: 20060501, price: 3.76691649704796}
            , {name: "Euro area", iso: "EUZ", date: 20070101, price: 3.80921099765962}
            , {name: "Euro area", iso: "EUZ", date: 20070601, price: 4.1668899487422}
            , {name: "Euro area", iso: "EUZ", date: 20080601, price: 5.34270458800347}
            , {name: "Euro area", iso: "EUZ", date: 20090701, price: 4.6171189975617}
            , {name: "Euro area", iso: "EUZ", date: 20100101, price: 4.84394399698368}
            , {name: "Euro area", iso: "EUZ", date: 20100701, price: 4.33252382664316}
            , {name: "Euro area", iso: "EUZ", date: 20110701, price: 4.92840183586624}
            , {name: "Euro area", iso: "EUZ", date: 20120101, price: 4.43070477464433}
            , {name: "Euro area", iso: "EUZ", date: 20120701, price: 4.34443469296111}
            , {name: "Euro area", iso: "EUZ", date: 20130101, price: 4.87803112862027}
            , {name: "Euro area", iso: "EUZ", date: 20130701, price: 4.65939148386547}
            , {name: "Euro area", iso: "EUZ", date: 20140101, price: 4.96184353491684}
            , {name: "Euro area", iso: "EUZ", date: 20140701, price: 4.95354246993891}
            , {name: "Euro area", iso: "EUZ", date: 20150101, price: 4.26383200194175}
            , {name: "Euro area", iso: "EUZ", date: 20150701, price: 4.05390499827466}
            , {name: "Euro area", iso: "EUZ", date: 20160101, price: 3.99900000059985}
            , {name: "Euro area", iso: "EUZ", date: 20160701, price: 4.20562899815015}
            , {name: "Euro area", iso: "EUZ", date: 20170101, price: 4.06177800194884}
            , {name: "Euro area", iso: "EUZ", date: 20170701, price: 4.46502449985779}
            , {name: "Euro area", iso: "EUZ", date: 20180101, price: 4.8357874973246}
            , {name: "Euro area", iso: "EUZ", date: 20180701, price: 4.735082}
            , {name: "Euro area", iso: "EUZ", date: 20190101, price: 4.6419075}
            , {name: "Euro area", iso: "EUZ", date: 20190709, price: 4.572252}
            , {name: "Euro area", iso: "EUZ", date: 20200114, price: 4.582058}
            , {name: "Euro area", iso: "EUZ", date: 20200701, price: 4.7861385}
]]
        console.log(lineData);
        console.log(d3.schemeCategory10);
        const linewidth = 2000, lineheight =2000;
        const lineMargin = {
                        top: 10,
                        right: 80,
                        bottom: 30,
                        left: 35
                        }
        d3.select("#day7").append("svg").attr("id","lineChart").attr("width",linewidth).attr("height",lineheight);
        
        
        let priceList = lineData.flat().map(d=>d.price);
        let dateList = lineData.flat().map(d=>d.date);
        const minDate = d3.min(dateList), maxDate=d3.max(dateList)
        
        const maxprice = d3.max([...priceList,8]);  
        console.log(maxprice,minDate,maxDate);
        const colorList = lineData.map(d=>d[0].name);
        const colors = d3.scaleOrdinal().domain(colorList).range(d3.schemeCategory10)

        const xLineScale = d3.scaleLinear().domain([minDate,maxDate]).range([lineMargin.left,linewidth-lineMargin.right]);
        const yLineScale = d3.scaleLinear().domain([1,maxprice]).range([lineheight-lineMargin.bottom,lineMargin.top])
        const yLineAxis = d3.axisLeft(yLineScale).tickFormat(d3.format("$.2f"));
        const xLineAxis = d3.axisBottom(xLineScale);

        const line = d3.line()
                        .x(d=>xLineScale(d.date))
                        .y(d=>yLineScale(d.price))
                        .curve(d3.curveNatural)
        
        d3.select("#lineChart")
            .append("g")
            .attr("id","linecontent")
            .selectAll("path")
            .data(lineData)
            .join("path")
            .attr('class', 'big-mac-line')
            // Using our line generator here
            .attr('d', line)
            // Every data point in the array has a name key
            // so we just grab the one from d[0]
            .style('stroke', "green")
            .style('stroke-width', 2)
            .style('fill', 'transparent')
        d3.select("#linecontent")
            .selectAll('text.label')
            .data(lineData)
            .join('text')
                .attr('class','label')
                .attr('x',linewidth-lineMargin.right+20)
                .attr('y',d=>yLineScale(d.slice(-1)[0].price))
                .attr('dy','0.35em')
                .style('fill',colors(d=>d[0].name))
                // .style('fill',"blue")
                .style('font-family', 'sans-serif')
                .style('font-size', 12)
            .text(d => d[0].name)

        d3.select("#linecontent")
            .append('g')
                .attr("class","x-lineaxis")
                .attr('transform',`translate(0,${lineheight-lineMargin.bottom})`)
            .call(xLineAxis)
        d3.select("#linecontent")
            .append('g')
                .attr("class","y-lineaxis")
                .attr('transform',`translate(${lineMargin.left},0)`)
            .call(yLineAxis)
        
        
        },

        

        created(){
		window.all = this;
	},	
        watch:{
            
            slider:{
                handler: function(slider){
                    console.log('succ');
                    // const sliderData = [0,1,2,3,4,5,6,7,8,9]
                    // const xSliderScale = d3.scaleOrdinal().domain([0,1,2,3,4,5]).range([20,40,60,80,100,120])
                    const xSliderScale = d3.scaleLinear().domain([0,6]).range([20,200]);

                    const ySliderScale = d3.scaleLinear().domain([0,100]).range([400,580]);
                    const colorScale = d3.scaleLinear().domain([0,100]).range(['#000000','#ddff00'])
                    // let xSliderValue = this.getVal("#xin");
                    // let ySliderValue = this.getVal("#yin");
                    // let colorSliderValue = this.getVal("#colorin")
                    let xSliderValue = slider.x;
                    let ySliderValue = slider.y;
                    let colorSliderValue = slider.color;
                    console.log(xSliderValue,slider.y,slider.color);
                    console.log(xSliderScale(slider.x));
                    console.log(xSliderScale(xSliderValue));
                    console.log(xSliderScale(1));
                    
                    d3.selectAll("#slider")
                        .transition()
                        .duration(50)
                        .remove()
                    d3.select("#main")
                        .append("rect")
                        .attr("id","slider")
                        .attr("width",20)
                        .attr("height",20)
                        .attr('x',xSliderScale(xSliderValue))
                        .attr("y",ySliderScale(ySliderValue))
                        .style("fill",colorScale(colorSliderValue))
                },deep:true
            }
        },
        methods:{
            getVal(id){
                const val = document.querySelector(id).value
                console.log(val);
                return val
            },
            getInfo(){
                let _self = this;
                axios.get('http://127.0.0.1:5000/api/post/actoremo')
                .then(
                    res=>{
                        let msg = res.data;
                        console.log(msg);
                        _self.actorInfo = msg;
                    }
                )
                .catch((error)=>{
                    console.log(error);
                })

                axios.get('http://127.0.0.1:5000/api/post/screenplay')
                .then(
                    res=>{
                        let msg = res.data;
                        _self.slugline = msg;
                    }
                )
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
            draw(){
        let subSvg=d3.select("#zone");

                const filmData = this.distrData;
        const rangeList = filmData.map(d=>{const l = d.range.slice(-1);return l[0]})
        console.log(rangeList);

        let maxValue = d3.max(rangeList,d=>d)*1.1
        console.log(maxValue);
        const nameList = filmData.map(d=>d.name)
        const width = 1000, height = 2000;
        const margin = {top:20,right:50,left:200,bottom:50};
        const xZoneScale = d3.scaleLinear().domain([0,maxValue]).range([margin.left,width-margin.right])
        const yZoneScale = d3.scaleBand().domain(nameList).range([height-margin.bottom,margin.top]).padding(0.5)
        const xAxis = d3.axisBottom(xZoneScale).tickSizeOuter(0);
        const yAxis = d3.axisLeft(yZoneScale).tickSizeOuter(0);
        console.log(xZoneScale(2));
        subSvg
            .append("g")
            .attr("class","bars")
            .selectAll("rect")
            .data(filmData)
            .join("rect")
                .attr("class","personRange")
                .attr("x",(d)=>xZoneScale(d.range[0]))
                .attr("y",(d)=>yZoneScale(d.name))
                .attr("width",(d)=>(xZoneScale(d.range.slice(-1))-xZoneScale(d.range[0]-1)))
                .attr("height",yZoneScale.bandwidth())
                .style("fill","#666666")
        subSvg
            .append("g")
            .attr("class","x-axis")
            .attr("transform",`translate(0,${height-margin.bottom})`)
            .call(xAxis)
        subSvg
            .append("g")
            .attr("class","y-axis")
            .attr("transform",`translate(${margin.left},0)`)
            .call(yAxis)

        //饼图
        
        d3.select("#day6")
            .append("svg")
            .attr("id","donut")
            .attr("width",2000)
            .attr("height",2000)
        d3.select("#donut").append("circle").attr("r",20).attr("cx",100).attr("cy",100).style("fill","none").style("stroke","red")
        const donutSvg = d3.select("#donut")

        const pieheight=2000,piewidth=2000
        const innerRadius = 0.35 * pieheight/2, outerRadius = 0.9 * piewidth/2;

        const xpieScale = d3.scaleBand().domain(nameList).range([0,2*Math.PI]) ;
        const ypieScale = d3.scaleLinear().domain([0,maxValue]).range([innerRadius,outerRadius,]);
        // alert(ypieScale.ticks(5))
        // const colorDomain =()=> {
        //     const extent = d3.extent( data, d => d.sign ),
        //     interpolated = d3.interpolate( ...extent )
    
        //     return d3.quantize( interpolated, 7 )
        //     }
        // const  color = d3.scaleLinear(
        //     colorDomain,
        //     d3.quantize(d3.interpolateSpectral, 7).reverse()
        //     )
        const colorpieScale = d3.scaleLinear().domain([0,50]).range(['#bbb','steelblue'])

        // 通过arc函数来计算放置形状的内径外径距离  同时得到放置角度  
        var arc = d3.arc()
                .innerRadius(d=>ypieScale(d.range[0]))
                // .innerRadius(400)
                .outerRadius(d=>ypieScale(d.range.slice(-1)[0]+1))
                // .outerRadius(200)
                .startAngle(d=>xpieScale(d.name))
                .endAngle(d=>xpieScale(d.name)+xpieScale.bandwidth())
                .padAngle(0.01)
                // .padRadius(innerRadius)
        // console.log(arc());
        const xpieAxis = g =>g
            .attr('text-anchor', 'middle')
            .call(g=>g.selectAll('g')
                .data(nameList)
                .join('g')
                    .attr('transform',(d,i,arr)=>`
                    rotate(${360*(-0.25+i/arr.length+xpieScale.bandwidth()/(4*Math.PI))})
                    translate(${outerRadius},0)
                    `)
                    .call(g => g.append('line')
                        .attr('x1', -580)
                        .attr('x2', 0)
                        .style('stroke', '#aaa'))
                    .call(g => g.append('text')
                        .attr('transform', (d,i,arr) => (360*(0.75+i/arr.length) % 360 > 180
                            ? "rotate(90)translate(0,16)"
                            : "rotate(-90)translate(0,-9)"))
                        .style('font-family', 'sans-serif')
                        .style('font-size', 4)
                        .text(d => d))     
                )
        const ypieAxis = g=>g
            .attr('text-anchor','middle')
            .call(g=>g.append('text')
                .attr('text-anchor','end')
                .attr('x','0')
                .attr('y',-950)
                // .attr('y',ypieScale(ypieScale.ticks(5).pop()) - 10)
                .attr('dy','1em')
                .attr('font-size','2em')
                .style('fill','#1a1a1a')
                .text("SLUGLINES(EXT.INT.)"))
            .call(g=>g
                .selectAll('g')
                .data(ypieScale.ticks(3))
                .join('g')
                    .attr('fill','none')
                    .call(
                        g=>g
                        .append('circle')
                        .attr('r',ypieScale)
                        .style('stroke', '#aaa')
                        .style('stroke-opacity', 0.5)
                    )
                    .call(
                        g=>g
                        .append('text')
                        .attr('y',d=>-ypieScale(d))
                        .attr('dy', '0.35em')
                        .style('stroke', '#fff')
                        .style('stroke-width', 5) 
                        .style("fill",'#1a1a1a')
                        .text(ypieScale.tickFormat(6,'s'))
                    .clone(true)
                        .style('stroke','none')
                    )
            )

        var randomColor =  function(){
            const num = Math.floor(Math.random()*16777215).toString(16);
            return "#"+num;
        }
        const container =  donutSvg.append("g")
            .attr("class","pieContainer")
            .attr("transform",`translate(${ width },${height/2})`)
            .style('font-size',10)
            .style('font-family','sans-serif')
        container
            .selectAll('path')
            .data(filmData)
            .join('path') 
            .style("fill",d=>colorpieScale(d.sign))
            .attr('d',arc)
            .on("mouseenter mouseout",function(){
                d3.select(this)
                .style("fill",randomColor)
            })
        container.append('g')
            .call(xpieAxis)
        container.append('g')
            .call(ypieAxis)
            },

            drawHeart(a){
                let start =0;
                let x = 0,y = 0;
                const acceleration =1,max = a//*10;
                const point = [];
                while(start<=max){
                    const cal = 2*start;
                    const xy={};
                    // x = a*(2*Math.cos(start) - Math.cos(cal));
                    x = a*(  Math.cos(cal)-2*Math.cos(start));
                    // y = a*(2*Math.sin(start) - Math.sin(cal));
                    y = a*(  Math.sin(cal)-2*Math.sin(start));
                    xy["x"] = y;xy["y"] = x;
                    point.push(xy);
                    start = start+acceleration;
                }
                return point
            }
        }
    }

</script>

<style>
    /* div{
        color: #ddff00;
    } */
</style>