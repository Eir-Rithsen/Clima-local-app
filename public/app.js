const API_KEY = "TU_API_KEY_DE_OPENWEATHER"; // <-- Reemplaza con tu API Key

function getWeather(lat, lon) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=es`
  )
    .then((res) => res.json())
    .then((data) => {
      document.getElementById("status").textContent =
        `Ubicación: ${data.name}, ${data.sys.country}`;
      document.getElementById("weather").innerHTML =
        `🌡️ ${data.main.temp}°C <br> ${data.weather[0].description}`;
    })
    .catch((err) => {
      document.getElementById("status").textContent =
        "Error obteniendo datos del clima.";
      console.error(err);
    });
}

if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      const { latitude, longitude } = pos.coords;
      getWeather(latitude, longitude);
    },
    () => {
      document.getElementById("status").textContent =
        "No se pudo obtener tu ubicación.";
    }
  );
} else {
  document.getElementById("status").textContent =
    "La geolocalización no está disponible en tu navegador.";
}
