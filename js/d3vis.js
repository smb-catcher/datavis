// Let's draw something

/**
 * Created by Salman on 23/05/2015.
 */

var body = d3.select('body');
var graphics = body.append('svg');

var width = 900;
var height = 600;

graphics.attr('width', width);
graphics.attr('height', height);

/*
graphics.append('rect')
    .attr('x', 50)
    .attr('y', 20)
    .attr('height', 30)
    .attr('width', 60);
*/

/*
 graphics.append('circle')
 .attr('r', 15)
 .attr('cx', 20)
 .attr('cy', 20);
 */

/*
 graphics.append('rect')
 .attr('x', 50)
 .attr('y', 20)
 .attr('height', 30)
 .attr('width', 60);
 */

/*
 graphics.append('line')
 .attr('x1', 100)
 .attr('y1', 50)
 .attr('x2', 180)
 .attr('y2', 10)
 .attr('stroke', '#000000')
 .attr('sroke-width', 2);
 */

function makeAxes(svg, origin, xlen, ylen){
    var yax = [origin[0], origin[1]-ylen];
    var xax = [origin[0]+xlen, origin[1]];


    svg.append('line')
        .attr('x1', origin[0])
        .attr('y1', origin[1])
        .attr('x2', yax[0])
        .attr('y2', yax[1])
        .attr('stroke', '#000000');

    svg.append('line')
        .attr('x1', origin[0])
        .attr('y1', origin[1])
        .attr('x2', xax[0])
        .attr('y2', xax[1])
        .attr('stroke', '#000000');

    return svg

}

function makeBars(svg, origin, heights, width, pad){
    for(var b = 0; b < heights.length; b++){
        var x = origin[0] + (width + pad)*b + pad;
        var h = heights[b]
        var y = origin[1] - h;
        svg.append('rect')
            .attr('x', x)
            .attr('y', y)
            .attr('height', h)
            .attr('width', width);
    }

    return svg;
}

function makeGraph(svg, origin, bheights, bwidth, bpad){
    var xlen  = (bwidth + bpad)*bheights.length;
    var ylen  = (Math.max(bheights));

    svg = makeAxes(svg, origin, xlen, ylen);
    svg = makeBars(svg, origin, bheights, bwidth, bpad);

    return svg;
}


//makeGraph(graphics, origin = [100, 200], [10, 20, 30, 40, 50, 60, 70, 80, 90, 100], 10, 3)


/*
 graphics.append('circle')
 .attr('r', 15)
 .attr('cx', 20)
 .attr('cy', 20);
 */


 graphics.append('circle')
 .attr('r', 100)
 .attr('cx', 200)
 .attr('cy', 200)
 .style('fill', '#4682B4')
 .style('stroke', '#CCCCCC')
 .style('stroke-width', '3px')
 .style('opacity', '0.5');

graphics.append('circle')
 .attr('r', 20)
 .attr('cx', 160)
 .attr('cy', 180);

graphics.append('circle')
    .attr('r', 20)
    .attr('cx', 240)
    .attr('cy', 180);