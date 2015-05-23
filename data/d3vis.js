/**
 * Created by Salman on 23/05/2015.
 */

var body = d3.select('body');
var graphics = body.append('svg');

var width = 900;
var height = 600;

graphics.attr('width', width);
graphics.attr('height', height);

graphics.append('circle')
    .attr('r', 15)
    .attr('cx', 20)
    .attr('cy', 20);