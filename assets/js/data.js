const width = 600;
const height = width;
const inset = 20;
const points = [];
const vx = 0.001, vy = -0.001;
const sphere = ({type: "Sphere"})
const graticule = d3.geoGraticule10()


const canvas = d3.select('.container-data-1').append('canvas').attr('width', width).attr('height', height);

const projection = d3.geoOrthographic()
.fitExtent([[-1, -1], [width + 1, height + 1]], sphere)
.clipExtent([[-1, -1], [width + 1, height + 1]])
.rotate([0, -30]);
const context = canvas.node().getContext('2d')
const path = d3.geoPath(projection, context)
      .pointRadius(2.5);
function tester(projection) {
  let visible;
  const stream = projection.stream({point() { visible = true; }});
  return ([x, y]) => (visible = false, stream.point(x, y), visible);
}

function drag(projection) {
  let v0, q0, r0, a0, l;

  function pointer(event, that) {
    const t = d3.pointers(event, that);

    if (t.length !== l) {
      l = t.length;
      if (l > 1) a0 = Math.atan2(t[1][1] - t[0][1], t[1][0] - t[0][0]);
      dragstarted.apply(that, [event, that]);
    }

    // For multitouch, average positions and compute rotation.
    if (l > 1) {
      const x = d3.mean(t, p => p[0]);
      const y = d3.mean(t, p => p[1]);
      const a = Math.atan2(t[1][1] - t[0][1], t[1][0] - t[0][0]);
      return [x, y, a];
    }

    return t[0];
  }

  function dragstarted(event) {
    v0 = versor.cartesian(projection.invert(pointer(event, this)));
    q0 = versor(r0 = projection.rotate());
  }

  function dragged(event) {
    const p = pointer(event, this);
    const v1 = versor.cartesian(projection.rotate(r0).invert(p));
    const delta = versor.delta(v0, v1);
    let q1 = versor.multiply(q0, delta);

    // For multitouch, compose with a rotation around the axis.
    if (p[2]) {
      const d = (p[2] - a0) / 2;
      const s = -Math.sin(d);
      const c = Math.sign(Math.cos(d));
      q1 = versor.multiply([Math.sqrt(1 - s * s), 0, 0, c * s], q1);
    }

    projection.rotate(versor.rotation(q1));

    // In vicinity of the antipode (unstable) of q0, restart.
    if (delta[0] < 0.7) dragstarted.apply(this, [event, this]);
  }

  return d3.drag()
      .on("start", dragstarted)
      .on("drag", dragged);
}

d3.json('./assets/json/land-50m.json')
  .then(data1 =>{
    const land50 = topojson.feature(data1, data1.objects.land)
    d3.json('./assets/json/land-110m.json')
      .then(data2 =>{
        const land110 = topojson.feature(data2, data2.objects.land)
        d3.json('https://data.nasa.gov/resource/gh4g-9sfh.json')
          .then(data3 =>{
            for (let i = 0; i < 1000; i++) {
              if (data3[i]["geolocation"] !== undefined) {
                points.push(Object.values(data3[i]["geolocation"]));
              } 
              
            }
            function render(land) {
              context.clearRect(0, 0, width, height);
              context.beginPath(), path(sphere), context.fillStyle = "#bbc5d7", context.fill();
              context.beginPath(), path(land), context.fillStyle = "#2b1a5b", context.fill();
              context.beginPath(), path(sphere), context.stroke();
              context.beginPath(), path({type: "MultiPoint", coordinates: points}), context.fillStyle = "#bf5c66", context.fill();
            }
            
            return d3.select(context.canvas)
              .call(drag(projection)
                  .on("drag.render", () => render(land110))
                  .on("end.render", () => render(land50)))
              .call(() => render(land50))
              .node();
        })
    })
})
let urlData4 ="";
// tar -xvzf C:\Users\giver\Downloads\testing-projection-visibility.tgz -C C:\Users\giver\Desktop\testd3
const input = document.querySelectorAll('.cd-input-data-2 input')
      input.forEach((e) => {
        e.addEventListener('input', () => {
          const years = document.getElementById('years').value
          const month = document.getElementById('month').value
          const day = document.getElementById('day').value
          
          if (years.length === 4 && month.length === 2 && day.length === 2) {
            urlData4 = "date=" + years + "-" + month + "-" + day
          }
          fetch('https://api.nasa.gov/planetary/apod?api_key=W4wugpb15VvlodnckXfQx2RwCwhoSPDoSEiMuZNi&'+urlData4,{
            headers: {
                Accept: 'application/json'
            }
        })
            .then(r => {
                if (r.ok) {
                    return r.json()
                } else {
                    throw new Error('Erreur serveur', {cause: r})
                }
            })
            .then(data4 => {
                document.querySelector('#data-2 article h3').innerHTML = data4["title"];
                document.querySelector('#data-2 article p').innerHTML = data4["explanation"];
                document.querySelector('#data-2 aside img').src = data4["url"];
                document.querySelector('#data-2 aside img').alt = data4["explanation"];
                document.querySelector('#data-2 aside img').title = data4["title"];
            })
            .catch(data4 => {
              console.log("La requ^te ne arche pas, dommage");
            })
        
        })
      })
      let nea = new Array();
      let amo = new Array();
      let apo = new Array();
      let ate = new Array();
      let ieo = new Array();
      let notDanger = new Array();
      let magnitudeAte = new Array();
      let magnitudeAteMin;
      let magnitudeAteMax;
      let magnitudeAmo = new Array();
      let magnitudeAmoMin;
      let magnitudeAmoMax;
      let magnitudeApo = new Array();
      let magnitudeApoMin;
      let magnitudeApoMax;
      let magnitudeIeo = new Array();
      let magnitudeIeoMin;
      let magnitudeIeoMax;
      let classification = new Array();
      let dataSetChart;
      const ctx = document.getElementById('myChart');
      $.ajax({
        url : 'serv.php', // your php file
        type : 'GET', 
        param: '{}',
        contentType: "application/json; charset=utf-8",
        success : function(data){
          const dataset = JSON.parse(data);
          console.log(dataset);
            dataset.forEach(element => {
              if (element.danger === 'NEA*') {
                nea.push(element)
              }
              if (element.danger === 'AMO*') {
                amo.push(element)
              }
              if (element.danger === 'APO*') {
                apo.push(element)
                
              }
              if (element.danger === 'ATE*') {
                ate.push(element)
                
              }
              if (element.danger === 'IEO*') {
                ieo.push(element)
              }
            })
            classification.push(nea.length);
              classification.push(amo.length);
              classification.push(apo.length);
              classification.push(ate.length);
              classification.push(ieo.length);

          
          
          // for (let i = 0; i < ate.length; i++) {
          //   magnitudeAmo.push(parseInt(amo[i]["magnitude"]))
          // }
          // magnitudeAmoMin = Math.min(...magnitudeAmo);
          // magnitudeAmoMax = Math.max(...magnitudeAmo);
          // magnitudeAmo = math.quantileSeq(magnitudeAmo, [1/3, 1/2,2/3])
          // magnitudeAmo.unshift(magnitudeAmoMin)
          // magnitudeAmo.push(magnitudeAmoMax)
          // for (let i = 0; i < ate.length; i++) {
          //   magnitudeApo.push(parseInt(apo[i]["magnitude"]))
          // }
          // magnitudeApoMin = Math.min(...magnitudeApo);
          // magnitudeApoMax = Math.max(...magnitudeApo);
          // magnitudeApo = math.quantileSeq(magnitudeApo, [1/3, 1/2,2/3])
          // magnitudeApo.unshift(magnitudeApoMin)
          // magnitudeApo.push(magnitudeApoMax)
          // for (let i = 0; i < ate.length; i++) {
          //   magnitudeIeo.push(parseInt(ieo[i]["magnitude"]))
          // }
          // magnitudeIeoMin = Math.min(...magnitudeIeo);
          // magnitudeIeoMax = Math.max(...magnitudeIeo);
          // magnitudeIeo = math.quantileSeq(magnitudeIeo, [1/3, 1/2,2/3])
          // magnitudeIeo.unshift(magnitudeIeoMin)
          // magnitudeIeo.push(magnitudeIeoMax)

            const dataChart = {
              labels: ['NEA', 'AMO', 'APO', 'ATE', 'IEO'],
                    datasets: [{
                        data: classification,
                        backgroundColor: [
                            '#e5d9f280',
                            '#f7aef880',
                            '#cdc1ff80',
                            '#c2ffee80',
                            '#6fffe980'
                        ],
                        borderColor: [
                          '#e5d9f2',
                            '#f7aef8',
                            '#cdc1ff',
                            '#c2ffee',
                            '#6fffe9'
                        ],
                        borderWidth: 1
                    }]
            };
            const config = {
              type: 'doughnut',
              data: dataChart,
              options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                },
                animations: {
                  radius: {
                    duration: 400,
                    easing: 'linear',
                    loop: (context) => context.active
                  }
                }
                
              }
            };
            const myChart = new Chart(ctx, config);
            $('#pick-data-3').on('change', function() {
              if($('#pick-data-3').val() === "neo_class"){
                dataChart["datasets"][0]["data"] = classification
              }
              if($('#pick-data-3').val() === "ate_mag"){
                console.log('wesh');
                for (let i = 0; i < ate.length; i++) {
                  magnitudeAte.push(parseInt(ate[i]["magnitude"]))
                }
                magnitudeAteMin = Math.min(...magnitudeAte);
                magnitudeAteMax = Math.max(...magnitudeAte);
                magnitudeAte = math.quantileSeq(magnitudeAte, [1/3, 1/2,2/3])
                magnitudeAte.unshift(magnitudeAteMin)
                magnitudeAte.push(magnitudeAteMax)
                dataChart["datasets"][0]["data"] = magnitudeAte
              }
              myChart.update()
            })
            }  
     });

