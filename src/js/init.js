// Initialize Firebase
window.initializeFirebase = () => {
  firebase.initializeApp({
    apiKey: 'AIzaSyDTnRlgj3YITuH0fTWO7Qv_Cg8aCXBWH80',
    authDomain: 'food-map-2.firebaseapp.com',
    databaseURL: 'https://food-map-2.firebaseio.com',
    projectId: 'food-map-2',
    storageBucket: '',
    messagingSenderId: '330495915253'
  });
};

// Initialize Map with LeafLet

window.loadMap = (id) => {
  let cdmx = [19.390519, -99.4238064];
  let map = L.map(id);
  let tileUrl = 'http://{s}.tile.osm.org/{z}/{x}/{y}.png';
  let layer = L.tileLayer(tileUrl, {
    attribution: 'OSM'
  });
  map.addLayer(layer);
  map.setView(cdmx, 19);

  map.locate({ setView: true, 
    watch: true })
    .on('locationfound', (el) => {
      let marker = L.marker([el.latitude, el.longitude]).bindPopup('¡Estas Aquí!');
      let circle = L.circle([el.latitude, el.longitude], el.accuracy / 2, {
        weight: 1,
        color: 'blue',
        fillColor: '#cacaca',
        fillOpacity: 0.2
      });
      map.addLayer(marker);
      map.addLayer(circle);
    })
    .on('locationerror', (el) => {
      console.log(el);
      alert('Location access denied.');
    });
};

// Paint icon for rate value.
window.getRankingPosition = (position) => {
  let ranked = '';
  if (position === 'Aceptable') {
    ranked += '<i class="fas fa-cookie-bite"></i>';
  }
  if (position === 'Bueno') {
    ranked += '<i class="fas fa-cookie-bite"></i><i class="fas fa-cookie-bite"></i>';
  }
  if (position === 'Excelente') {
    ranked += '<i class="fas fa-cookie-bite"></i><i class="fas fa-cookie-bite"></i><i class="fas fa-cookie-bite"></i>';
  }
  return ranked;
};