"use strict";

////////////////////////////////////////////////////////////////////////////////////////////////////
// start ///////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
mapboxgl.accessToken = "pk.eyJ1IjoiZW1pdHJlbW11cyIsImEiOiJjazZrNGdsN2kwMGhsM2tvOTQzdW42ZDZhIn0.ewlKfWnd9GNfKKrMtK-vlQ";
var sidebarWidth = document.querySelector(".map-container .sidebar").clientWidth;
var map = new mapboxgl.Map({
  "container": "map",
  "style": "mapbox://styles/emitremmus/ck5jqevuw0pby1iqqhabzv7dz",
  "maxPitch": 0,
  // "hash": true,
  "bounds": [[-43.650, -23.026], [-43.212, -22.823]] // W S E N

}); // fetch("esgoto.json").then(response => {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0YXJ0LmpzIl0sIm5hbWVzIjpbIm1hcGJveGdsIiwiYWNjZXNzVG9rZW4iLCJzaWRlYmFyV2lkdGgiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJjbGllbnRXaWR0aCIsIm1hcCIsIk1hcCJdLCJtYXBwaW5ncyI6Ijs7QUFBQTtBQUNBO0FBQ0E7QUFFQUEsUUFBQSxDQUFBQyxXQUFBLEdBQUEsK0ZBQUE7QUFFQSxJQUFBQyxZQUFBLEdBQUFDLFFBQUEsQ0FBQUMsYUFBQSxDQUFBLHlCQUFBLEVBQUFDLFdBQUE7QUFFQSxJQUFBQyxHQUFBLEdBQUEsSUFBQU4sUUFBQSxDQUFBTyxHQUFBLENBQUE7QUFDQSxlQUFBLEtBREE7QUFFQSxXQUFBLHNEQUZBO0FBR0EsY0FBQSxDQUhBO0FBSUE7QUFDQSxZQUFBLENBQUEsQ0FBQSxDQUFBLE1BQUEsRUFBQSxDQUFBLE1BQUEsQ0FBQSxFQUFBLENBQUEsQ0FBQSxNQUFBLEVBQUEsQ0FBQSxNQUFBLENBQUEsQ0FMQSxDQUtBOztBQUxBLENBQUEsQ0FBQSxDLENBUUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImVsZWljb2VzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4vLyBzdGFydCAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuXHJcbm1hcGJveGdsLmFjY2Vzc1Rva2VuID0gXCJway5leUoxSWpvaVpXMXBkSEpsYlcxMWN5SXNJbUVpT2lKamF6WnJOR2RzTjJrd01HaHNNMnR2T1RRemRXNDJaRFpoSW4wLmV3bEtmV25kOUdOZktLck10Sy12bFFcIlxyXG5cclxuY29uc3Qgc2lkZWJhcldpZHRoID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5tYXAtY29udGFpbmVyIC5zaWRlYmFyXCIpLmNsaWVudFdpZHRoXHJcblxyXG5jb25zdCBtYXAgPSBuZXcgbWFwYm94Z2wuTWFwKHtcclxuXHRcImNvbnRhaW5lclwiOiBcIm1hcFwiLFxyXG5cdFwic3R5bGVcIjogXCJtYXBib3g6Ly9zdHlsZXMvZW1pdHJlbW11cy9jazVqcWV2dXcwcGJ5MWlxcWhhYnp2N2R6XCIsXHJcblx0XCJtYXhQaXRjaFwiOiAwLFxyXG5cdC8vIFwiaGFzaFwiOiB0cnVlLFxyXG5cdFwiYm91bmRzXCI6IFsgWy00My42NTAsIC0yMy4wMjZdLCBbLTQzLjIxMiwgLTIyLjgyM10gXSwgLy8gVyBTIEUgTlxyXG59KVxyXG5cclxuLy8gZmV0Y2goXCJlc2dvdG8uanNvblwiKS50aGVuKHJlc3BvbnNlID0+IHtcclxuLy8gXHRyZXR1cm4gcmVzcG9uc2UuanNvbigpXHJcbi8vIH0pLnRoZW4oZ2VvanNvbiA9PiB7XHJcbi8vIFx0Y29uc29sZS5sb2coZ2VvanNvbilcclxuLy8gXHRtYXAub24oXCJsb2FkXCIsICgpID0+IHtcclxuLy8gXHRcdG1hcC5hZGRTb3VyY2UoXCJlc2dvdG9cIiwge1xyXG4vLyBcdFx0XHRcInR5cGVcIjogXCJnZW9qc29uXCIsXHJcbi8vIFx0XHRcdFwiZGF0YVwiOiBnZW9qc29uLFxyXG4vLyBcdFx0fSk7XHJcblxyXG4vLyBcdFx0bWFwLmFkZExheWVyKHtcclxuLy8gXHRcdFx0XCJpZFwiOiBcImVzdGFjb2VzXCIsXHJcbi8vIFx0XHRcdFwidHlwZVwiOiBcImNpcmNsZVwiLFxyXG4vLyBcdFx0XHRcInNvdXJjZVwiOiBcImVzZ290b1wiLFxyXG4vLyBcdFx0XHRcInBhaW50XCI6IHtcclxuLy8gXHRcdFx0XHRcImNpcmNsZS1yYWRpdXNcIjogNixcclxuLy8gXHRcdFx0XHRcImNpcmNsZS1jb2xvclwiOiBcIiNmMGFcIlxyXG4vLyBcdFx0XHR9LFxyXG4vLyBcdFx0XHRcImZpbHRlclwiOiBbXCI9PVwiLCBcIiR0eXBlXCIsIFwiUG9pbnRcIl0sXHJcbi8vIFx0XHR9KVxyXG4vLyBcdH0pXHJcbi8vIH0pXHJcbiJdfQ==