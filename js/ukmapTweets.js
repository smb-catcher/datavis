var mapProjection  = d3.geo.albers()
	.center([2, 56])
	.rotate([0,0,0])
	.scale(4000);

var width = 900;
var height = 700;

var graphics = d3.select("body")
	.append("svg")
	.attr("width", width)
	.attr("height", height);

// Don't forget to change the data file name!
d3.json("data/uk.json", loadData);

function loadData(error, dataset) {
	if (error) {
		console.log(error);
	}
	else {
		console.log(dataset);
		drawData(dataset);
	}
};


function drawData(dataset) {
	// Draw your data
	var subunits = topojson.feature(dataset, dataset.objects.subunits).features;

	var geoPath = d3.geo.path()
		.projection(mapProjection);

	var color = d3.scale.ordinal()
		.domain(['ENG', 'SCT', 'WLS', 'NIR'])
		.range(['#dcd', '#ddc', '#cdd', '#cdc'])


	/*
	var tip = d3.tip()
		.attr('class', 'd3-tip')
		.offset([-10, 0])
		.html(function(c) {
			return "<strong>Frequency:</strong> <span style='color:red'>" + c.id + "</span>";
		});

	//svg.call(tip)

	*/

	graphics.selectAll('path')
		.data(subunits)
		.enter()
		.append('path')
		.attr('d', geoPath)
		.style('fill', function(subunit){
			return color(subunit.id);
		});
}

function loadUserData(error, dataset){
	if(error){
		console.log(error);
	}else{
		drawUserData(dataset);
	}
}

function mapUser(user){
		console.log(user);
		var lng = user.tweets[0].geo.coordinates[0];
		var lat = user.tweets[0].geo.coordinates[1];
		var coords = [lat, lng];
		console.log(coords);
		var trstr = 'translate(' + mapProjection(user.geo) + ')';
		console.log(trstr);
		return trstr;
}

function drawUserData(dataset){
	//helper
	for(var u = 0; u < dataset.nodes.length; u++){
		var lng = dataset.nodes[u].tweets[0].geo.coordinates[0];
		var lat = dataset.nodes[u].tweets[0].geo.coordinates[1];
		var coords = [lat, lng];
		dataset.nodes[u].geo = coords;
	}

	//new vis
	graphics.append('circle')
		.attr('r', 10)
		.attr('cx', mapProjection([0.1275, 51.5072])[0])
		.attr('cy', mapProjection([0.1275, 51.5072])[1])
		.style('fill', 'red');

	console.log(dataset.nodes[0])

	graphics.selectAll('.tweet')
		.data(dataset.nodes)
		.enter()
		.append('circle')
		.attr('class', '.tweet')
	.attr('r', 2,5)
		.style('fill', '#800015')
		.attr('transform', mapUser);

	graphics.selectAll('.link')
		.data(dataset.links)
		.enter()
		.append('line')
		.attr('class', 'link')
		.style('stroke', '#999')
		.style('opacity', 0.1)
		.attr('x1', function(link){return mapProjection(dataset.nodes[link.source].geo)[0]})
		.attr('y1', function(link){return mapProjection(dataset.nodes[link.source].geo)[1]})
		.attr('x2', function(link){return mapProjection(dataset.nodes[link.target].geo)[0]})
		.attr('y2', function(link){return mapProjection(dataset.nodes[link.target].geo)[1]});
}

d3.json('data/usersGraph.json', loadUserData);