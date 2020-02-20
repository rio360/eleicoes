////////////////////////////////////////////////////////////////////////////////////////////////////
// start ///////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////

mapboxgl.accessToken = "pk.eyJ1IjoiZW1pdHJlbW11cyIsImEiOiJjazZrNGdsN2kwMGhsM2tvOTQzdW42ZDZhIn0.ewlKfWnd9GNfKKrMtK-vlQ"

const sidebarWidth = document.querySelector(".map-container .sidebar").clientWidth

const map = new mapboxgl.Map({
	"container": "map",
	"style": "mapbox://styles/emitremmus/ck5jqevuw0pby1iqqhabzv7dz",
	"maxPitch": 0,
	// "hash": true,
	"bounds": [ [-43.650, -23.026], [-43.212, -22.823] ], // W S E N
})

// fetch("esgoto.json").then(response => {
// 	return response.json()
// }).then(geojson => {
// 	console.log(geojson)
// 	map.on("load", () => {
// 		map.addSource("esgoto", {
// 			"type": "geojson",
// 			"data": geojson,
// 		});

// 		map.addLayer({
// 			"id": "estacoes",
// 			"type": "circle",
// 			"source": "esgoto",
// 			"paint": {
// 				"circle-radius": 6,
// 				"circle-color": "#f0a"
// 			},
// 			"filter": ["==", "$type", "Point"],
// 		})
// 	})
// })
