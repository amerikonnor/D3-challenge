//initializing some variables for now
var xAxis = 'age'
var yAxis = 'smokes'


var svgArea = d3.select('body').select('svg');


var svgWidth = 960;
var svgHeight = 750;

var chartMargin = {
    top: 30,
    right: 30,
    bottom: 100,
    left: 100
};

var chartWidth = svgWidth - chartMargin.left - chartMargin.right;
var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;

var svg = d3.select("#scatter")
            .append('svg')
            .attr('height',svgHeight)
            .attr('width', svgWidth);

var chartGroup = svg.append('g')
    .attr('transform', `translate(${chartMargin.left}, ${chartMargin.top})`)
    .classed('chart',true)


/*
The graphing work!
*/

    d3.csv('assets/data/data.csv').then(function(censusData) {
    
    //Getting all the numeric data converted to numbers!
    censusData.forEach(function(data){
        data.age = +data.age
        data.smokes = +data.smokes
        data.poverty = +data.poverty
        data.income = +data.income
        data.healthcare = +data.healthcare
        data.obesity = +data.obesity
    })

    
    var yScale = d3.scaleLinear()
        .domain(d3.extent(censusData,d=>d.smokes))
        .range([chartHeight,0]);

    var xScale = d3.scaleLinear()
        .domain(d3.extent(censusData,d=>d.age))
        .range([0,chartWidth]);
    
    var leftAxis = d3.axisLeft(yScale);
    var bottomAxis = d3.axisBottom(xScale);

    chartGroup.append('g').attr('id','x-axis').attr('transform', `translate(0,${chartHeight})`).call(bottomAxis);
    chartGroup.append('g').attr('id','y-axis').call(leftAxis);

    

    var circles = chartGroup.append('g').selectAll('circle').data(censusData);


    circles.enter()
        .append('circle')
        .classed('stateCircle',true)
        .attr('cx',d => xScale(d.age))
        .attr('cy',d => yScale(d.smokes))
        .attr('r',8)
        .attr('stroke-width',2);


    var stateText = chartGroup.append('g').selectAll('text');

    stateText.data(censusData)
        .enter()
        .append('text')
        .classed('stateText',true)
        .attr('transform',d => `translate(${xScale(d.age)},${yScale(d.smokes)+3})`)
        .text(d => d.abbr)
        .attr('font-size','8px')

    var ageXLabel = chartGroup.append('text')
        .attr('id','age')
        .attr('transform',`translate(${chartWidth/2}, ${chartHeight+chartMargin.top + 20})`)
        .classed('aText active',true)
        .text('Age Median')
    
    var incomeXLabel = chartGroup.append('text')
        .attr('id','income')
        .attr('transform',`translate(${chartWidth/2}, ${chartHeight+chartMargin.top + 40})`)
        .classed('aText inactive',true)
        .text('Household Income (Median)')

    var healthcareXLabel = chartGroup.append('text')
        .attr('id','healthcare')
        .attr('transform', `translate(${(chartWidth)/2}, ${chartHeight + chartMargin.top + 60})`)
        .classed('aText inactive',true)
        .text('Lacks Healthcare (%)')

    var smokesYLabel = chartGroup.append('text')
        .attr('id','smokes')
        .attr('transform',`translate(${-80}, ${chartHeight/2}) rotate(-90)`)
        .classed('aText active',true)
        .text('Smokes (%)')

    var povertyYLabel = chartGroup.append('text')
        .attr('id','poverty')
        .attr('transform',`translate(${-60}, ${chartHeight/2}) rotate(-90)`)
        .classed('aText inactive',true)
        .text('Poverty (%)')

    var obesityYLabel = chartGroup.append('text')
    .attr('id','obesity')
    .attr('transform',`translate(${-40}, ${chartHeight/2}) rotate(-90)`)
    .classed('aText inactive',true)
    .text('Obese (%)')


    ageXLabel.on('mouseover',function(){
            d3.select(this).style('cursor','pointer')
        })
        .on('mouseout',function(){
            d3.select(this).style('cursor','default')
        })
        .on('click',function(){
            xAxis = 'age';
            theyClickedSomething(xAxis,yAxis);
            d3.select(this).attr('class','aText active');
            d3.select('#income').attr('class','aText inactive');
            d3.select('#healthcare').attr('class','aText inactive');
        })

    incomeXLabel.on('mouseover',function(){
        d3.select(this).style('cursor','pointer')
    })
    .on('mouseout',function(){
        d3.select(this).style('cursor','default')
    })
    .on('click',function(){
        xAxis = 'income';
        theyClickedSomething(xAxis,yAxis);
        d3.select(this).attr('class','aText active');
        d3.select('#age').attr('class','aText inactive');
        d3.select('#healthcare').attr('class','aText inactive');
    })
    
    healthcareXLabel.on('mouseover',function(){
        d3.select(this).style('cursor','pointer')
    })
    .on('mouseout',function(){
        d3.select(this).style('cursor','default')
    })
    .on('click',function(){
        xAxis = 'healthcare';
        theyClickedSomething(xAxis,yAxis);
        d3.select(this).attr('class','aText active');
        d3.select('#age').attr('class','aText inactive');
        d3.select('#income').attr('class','aText inactive');
    })

    smokesYLabel.on('mouseover',function(){
        d3.select(this).style('cursor','pointer')
        })
        .on('mouseout',function(){
            d3.select(this).style('cursor','default')
        })
        .on('click',function(){
            yAxis = 'smokes';
            theyClickedSomething(xAxis,yAxis);
            d3.select(this).attr('class','aText active');
            d3.select('#poverty').attr('class','aText inactive');            
            d3.select('#obesity').attr('class','aText inactive');
        });

    povertyYLabel.on('mouseover',function(){
        d3.select(this).style('cursor','pointer')
        })
        .on('mouseout',function(){
            d3.select(this).style('cursor','default')
        })
        .on('click',function(){
            yAxis = 'poverty';
            theyClickedSomething(xAxis,yAxis);
            d3.select(this).attr('class','aText active');
            d3.select('#smokes').attr('class','aText inactive');
            d3.select('#obesity').attr('class','aText inactive');
        });
    
    obesityYLabel.on('mouseover',function(){
        d3.select(this).style('cursor','pointer')
        })
        .on('mouseout',function(){
            d3.select(this).style('cursor','default')
        })
        .on('click',function(){
            yAxis = 'obesity';
            theyClickedSomething(xAxis,yAxis);
            d3.select(this).attr('class','aText active');
            d3.select('#smokes').attr('class','aText inactive');
            d3.select('#poverty').attr('class','aText inactive');
        });

}).catch(function(error){
    console.log(error);

});

function theyClickedSomething(x,y){
    
    d3.csv('assets/data/data.csv').then(function(censusData) {
    
        //Getting all the numeric data converted to numbers!
        censusData.forEach(function(data){
            data.age = +data.age
            data.smokes = +data.smokes
            data.poverty = +data.poverty
            data.income = +data.income
            data.healthcare = +data.healthcare
            data.obesity = +data.obesity
        })
    
    
        var newXScale = d3.scaleLinear()
            .domain(d3.extent(censusData,d=>d[x]))
            .range([0,chartWidth]);

        var newYScale = d3.scaleLinear()
            .domain(d3.extent(censusData,d=>d[y]))
            .range([chartHeight,0]);
    
        var newLeftAxis = d3.axisLeft(newYScale);
        var newBottomAxis = d3.axisBottom(newXScale); 

        d3.select('#y-axis')
            .transition()
            .duration(500)
            .call(newLeftAxis)
        
        d3.select('#x-axis')
            .transition()
            .duration(500)
            .call(newBottomAxis)
        
        
        var circles = d3.selectAll('circle').data(censusData);
        circles.transition()
            .duration(500)
            .attr('cx',d => newXScale(d[x]))
            .attr('cy',d => newYScale(d[y]));

        var text = d3.selectAll('.stateText').data(censusData);
        text.transition()
            .duration(500)
            .attr('transform',d => `translate(${newXScale(d[x])},${newYScale(d[y])+3})`)

            
    })
}


