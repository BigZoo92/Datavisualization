let tKeys = [];
let tValues = [];
let index = -1;
let geolocation;
let dataset = [];
d3.json("https://data.nasa.gov/resource/gh4g-9sfh.json")
      .then(function(data) {
        for (let i = 0; i < 10; i++) {
          geolocation = JSON.stringify(data[i]["geolocation"]);
          geolocation = geolocation.replace("{", "")
          geolocation = geolocation.replace("}", "")
          console.log(geolocation);
          data[i]["geolocation"] = geolocation
          Object.entries(data[i]).forEach(e => {
            dataset.push(e);
          });        
        }
          d3.select('.container')
            .selectAll('p')
            .data(dataset)
            .enter()
            .append('p')
            .text( d => {
              return d
            })
            document.querySelectorAll('p').forEach((e) => {
              e.innerHTML = e.innerHTML.replace(",", " : ")
            })
       });
const width = 900;
const height = 600;
const inset = 20;
const outline = ({type: "Sphere"})
const graticule = d3.geoGraticule10()
const svg = d3.select('body').append('svg').attr('width', width).attr('height', height);

const projection = d3.geoOrthographic().fitExtent([[inset, inset], [width - inset, height - inset]], outline)
const path = d3.geoPath(projection);

const g = svg.append('g')

d3.json('https://s3-us-west-2.amazonaws.com/s.cdpn.io/95802/world-110m.json')
  .then(data =>{
    console.log(data, data.objects.countries);
    const countries = topojson.feature(data, data.objects.countries)
    console.log(countries)
    g.selectAll('path').data(countries.features).enter().append('path').attr('class', 'country').attr('d', path)
})

