/* global d3 */

const xVal = 'petalLength';
const xAxisLabel = 'Petal Length';

const yVal = 'petalWidth';
const yAxisLabel = 'Petal Width';

const margin = {
  top: 30,
  right: 50,
  bottom: 40,
  left: 40,
};
const width = 960 - margin.left - margin.right;
const height = 550 - margin.top - margin.bottom;

function myGraph(data) {
  const dom = d3.extent(data, (d) => d[xVal]);
  const ran = d3.extent(data, (d) => d[yVal]);

  const xScale = d3.scaleLog()
    .domain([dom[1] + 1, dom[0]])
    .range([0.1, width - 50]);

  const yScale = d3.scaleLog()
    .domain([ran[0], ran[1] + 1])
    .range([0.1, height - 100]);

  const svg = d3.select('body')
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', `translate( ${margin.left}, ${margin.top} )`);

  const xAxis = d3.axisTop(xScale);
  svg.append('g')
    .attr('transform', `translate( 0, ${120} )`)
    .call(xAxis);

  svg.append('text')
    .attr('transform', `translate( ${((width - 50) / 2)}, ${80} )`)
    .style('text-anchor', 'middle')
    .text(xAxisLabel);

  const yAxis = d3.axisRight(yScale);
  svg.append('g')
    .attr('transform', `translate( ${(width - 50)}, ${120})`)
    .call(yAxis);

  svg.append('text')
    .attr('transform', 'rotate(-90)')
    .attr('y', width)
    .attr('x', 0 - ((height + 100) / 2))
    .attr('dy', '1em')
    .style('text-anchor', 'middle')
    .text(yAxisLabel);

  svg.append('text')
    .attr('transform', `translate( ${70}, ${10})`)
    .style('text-anchor', 'middle')
    .style('font-size', '30px')
    .text('Flower Power');

  svg.append('text')
    .attr('transform', `translate( ${260}, ${40})`)
    .style('text-anchor', 'middle')
    .style('font-size', '20px')
    .text('Illustrates petal length versus petal width in a reverse log scatterplot');

  svg
    .selectAll('point')
    .data(data)
    .join('circle')
    .attr('class', (d) => `${(d.species)}`)
    .attr('r', 3.5)
    .attr('cx', (d) => xScale(d[xVal]))
    .attr('cy', (d) => yScale(d[yVal]))
    .attr('transform', `translate(0, ${120} )`);

  svg.append('circle')
    .attr('cx', 0)
    .attr('cy', 180)
    .attr('r', 3.5)
    .style('fill', 'rgb(102, 194, 165)');

  svg.append('circle')
    .attr('cx', 0)
    .attr('cy', 210)
    .attr('r', 3.5)
    .style('fill', 'rgb(252, 141, 98)');

  svg.append('circle')
    .attr('cx', 0)
    .attr('cy', 240)
    .attr('r', 3.5)
    .style('fill', 'rgb(141, 160, 203)');

  svg.append('text')
    .attr('x', 20)
    .attr('y', 182)
    .text('Setosa')
    .style('font-size', '15px')
    .attr('alignment-baseline', 'middle');

  svg.append('text')
    .attr('x', 20)
    .attr('y', 212)
    .text('Versicolor')
    .style('font-size', '15px')
    .attr('alignment-baseline', 'middle');

  svg.append('text')
    .attr('x', 20)
    .attr('y', 242)
    .text('Virginica')
    .style('font-size', '15px')
    .attr('alignment-baseline', 'middle');
}

d3.json('./iris.json')
  .then((data) => myGraph(data))
  .catch((error) => console.log(error));
