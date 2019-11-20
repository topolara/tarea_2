function updateOpacityc() {
	document.getElementById("span-opacityc").innerHTML = document.getElementById("sld-opacityc").value;
	calor_docen.setOpacity(document.getElementById("sld-opacityc").value);
}

function updateOpacityi() {
	document.getElementById("span-opacityi").innerHTML = document.getElementById("sld-opacityi").value;
	calor_inves.setOpacity(document.getElementById("sld-opacityi").value);
}

function updateOpacitya() {
	document.getElementById("span-opacitya").innerHTML = document.getElementById("sld-opacitya").value;
	calor_social.setOpacity(document.getElementById("sld-opacitya").value);
}


// Creación de un mapa de Leaflet
var map = L.map("mapid");

// Centro del mapa y nivel de acercamiento
var ucr = L.latLng([9.93541338, -84.05142080]);
var zoomLevel = 7;

// Definición de la vista del mapa
map.setView(ucr, zoomLevel);

// Adición de capa
esriLayer = L.tileLayer.provider("Esri.WorldImagery").addTo(map);
osmLayer = L.tileLayer.provider("OpenStreetMap.Mapnik").addTo(map);



var calor_docen = L.imageOverlay("datos/calor_docen.png", 
	[[10.7847561049999996, -85.7979904940000040], 
	[8.4090141050000007, -82.4975584940000033]], 
	{opacity:1}
).addTo(map);


var calor_inves = L.imageOverlay("datos/calor_inves.png", 
	[[11.1721899290000000, -85.8982477779999982], 
	[8.4360559290000001, -82.5503957779999951]], 
	{opacity:1}
).addTo(map);


var calor_social = L.imageOverlay("datos/calor_social.png", 
	[[10.4586551930000002, -84.5045552219999934], 
	[8.2441411930000008, -82.9349532220000043]], 
	{opacity:1}
).addTo(map);



var baseMaps = {
	"ESRI World Imagery": esriLayer,
	"OpenStreetMap": osmLayer
	
};
var overlayMaps = {
	"Calor Docencia" :calor_docen,
	"Calor Investigación" :calor_inves,
	"Calor Acción Social" :calor_social
};
control_layers = L.control.layers(baseMaps, overlayMaps, {position:'topleft', collapsed:false} ).addTo(map);

L.control.zoom({position:'topright'} ).addTo(map);
L.control.scale({position:'topright', imperial:false} ).addTo(map);



$.getJSON("datos/1gira_docen.geojson", function(geodata) {
	var gira_docen = L.geoJson(geodata, {
		style: function(feature) {
			return {'color': "#FF0000", 'weight': 2, 'fillOpacity': 0.0}
		},
		onEachFeature: function(feature, layer) {
			var popupText = "ID: " + feature.properties.Id_Objeto + "<br>" + "Destino: " + feature.properties.Destino + "<br>" + "Docente: " + feature.properties.Docente;
			layer.bindPopup(popupText);
		}			
	}).addTo(map);
	control_layers.addOverlay(gira_docen, 'Gira Docencia');
});

$.getJSON("datos/1gira_inves.geojson", function(geodata) {
	var gira_inves = L.geoJson(geodata, {
		style: function(feature) {
			return {'color': "#00FF00", 'weight': 2, 'fillOpacity': 0.0}
		},
		onEachFeature: function(feature, layer) {
			var popupText = "ID: " + feature.properties.Id_Objeto + "<br>" + "Destino: " + feature.properties.Destino + "<br>"  + "Docente: " + feature.properties.Docente;
			layer.bindPopup(popupText);
		}			
	}).addTo(map);
	control_layers.addOverlay(gira_inves, 'Gira Investigación');
});

$.getJSON("datos/1gira_social.geojson", function(geodata) {
	var gira_social = L.geoJson(geodata, {
		style: function(feature) {
			return {'color': "#0000FF", 'weight': 2, 'fillOpacity': 0.0}
		},
		onEachFeature: function(feature, layer) {
			var popupText = "ID: " + feature.properties.Id_Objeto + "<br>" + "Destino: " + feature.properties.Destino + "<br>"  + "Docente: " + feature.properties.Docente;
			layer.bindPopup(popupText);
		}			
	}).addTo(map);
	control_layers.addOverlay(gira_social, 'Gira Acción Social');
});
