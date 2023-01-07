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
        // console.log(dataset);
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