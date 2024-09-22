let autocomplete;
let selectedPlace;

function initAutocomplete() {
  const input = document.getElementById('address');

  autocomplete = new google.maps.places.Autocomplete(input);
  autocomplete.setFields(['geometry', 'formatted_address']);

  autocomplete.addListener('place_changed', function () {
    const place = autocomplete.getPlace();
    if (!place.geometry) {
      console.error("No details available for input: '" + place.name + "'");
      return;
    }
    selectedPlace = place;
    displayMap(place.geometry.location);
  });
}

function displayMap(location) {
  const mapOptions = {
    center: location,
    zoom: 15,
    mapTypeId: 'satellite', // Set default view to satellite
    styles: [
      {
        featureType: 'all',
        elementType: 'labels',
        stylers: [{ visibility: 'off' }] // Turn off all labels
      }
    ]
  };

  const map = new google.maps.Map(document.getElementById('map'), mapOptions);

  const marker = new google.maps.Marker({
    position: location,
    map: map
  });
}

document.getElementById('continueBtn').addEventListener('click', function () {
  if (selectedPlace) {
    const { formatted_address, geometry } = selectedPlace;
    const lat = geometry.location.lat();
    const lng = geometry.location.lng();

    // Store data in localStorage to pass to the next page
    localStorage.setItem('address', formatted_address);
    localStorage.setItem('lat', lat);
    localStorage.setItem('lng', lng);

    // Redirect to next page (e.g., 'result.html')
    window.location.href = 'result.html';
  } else {
    alert('Please select a valid address.');
  }
});

// Initialize the autocomplete functionality on page load
window.onload = initAutocomplete;
