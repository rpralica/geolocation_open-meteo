// Selektujemo HTML elemente
const searchInput = document.getElementById('search');
const dropdownMenu = document.getElementById('dropdown-menu');
const selectedCity = document.getElementById('selected-city');

// Promenljive za čuvanje izabranih koordinata
let selectedLatitude = null;
let selectedLongitude = null;

// Kada korisnik unese tekst u input polje
searchInput.addEventListener('input', async () => {
  const query = searchInput.value.trim();

  // Ako je unos kraći od 2 slova, sakrij meni
  if (query.length < 2) {
    dropdownMenu.classList.remove('visible');
    return;
  }

  try {
    // Poziv API-ja
    const response = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${query}`
    );
    const data = await response.json();

    // Očistimo meni pre nego što dodamo nove rezultate
    dropdownMenu.innerHTML = '';

    if (data.results && data.results.length > 0) {
      // Popunjavanje padajućeg menija
      data.results.forEach(location => {
        const item = document.createElement('div');
        item.classList.add('dropdown-item');
        item.textContent = `${location.name}, ${location.country}`;

        // Kada kliknemo na grad, upisujemo podatke
        item.addEventListener('click', () => {
          searchInput.value = `${location.name}, ${location.country}`;
          selectedLatitude = location.latitude;
          selectedLongitude = location.longitude;
       console.log(`${location.name}, ${location.country} (Lat: ${selectedLatitude}, Lon: ${selectedLongitude})`)
          dropdownMenu.classList.remove('visible'); // Sakrij padajući meni
        });

        // Dodajemo grad u meni
        dropdownMenu.appendChild(item);
      });

      // Prikazujemo padajući meni
      dropdownMenu.classList.add('visible');
    } else {
      dropdownMenu.classList.remove('visible');
    }
  } catch (error) {
    console.error('Greška prilikom poziva API-ja:', error);
  }
});

// Zatvaramo padajući meni kada kliknemo izvan njega
document.addEventListener('click', e => {
  if (!e.target.closest('.search-container')) {
    dropdownMenu.classList.remove('visible');
  }
});
