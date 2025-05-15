async function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  const apiKey = '5f3776dcfed24b12be762409251405'; // Your WeatherAPI key

  if (!city) {
    document.getElementById("weatherResult").innerText = "Please enter a city name.";
    return;
  }

  const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(city)}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.error) {
      document.getElementById("weatherResult").innerText = data.error.message;
      return;
    }

    const temp = data.current.temp_c;
    const condition = data.current.condition.text;
    const icon = data.current.condition.icon;
    const location = data.location.name;

    document.getElementById("weatherResult").innerHTML = `
      <p><strong>City:</strong> ${location}</p>
      <p><strong>Temperature:</strong> ${temp} °C</p>
      <p><strong>Condition:</strong> ${condition}</p>
      <img src="https:${icon}" alt="${condition}">
    `;

    // Dynamic background color based on weather
    const body = document.body;
    const cond = condition.toLowerCase();

    if (cond.includes("cloud")) {
      body.style.background = "linear-gradient(to right, #757f9a, #d7dde8)";
    } else if (cond.includes("rain")) {
      body.style.background = "linear-gradient(to right, #2c3e50, #4ca1af)";
    } else if (cond.includes("sun") || cond.includes("clear")) {
      body.style.background = "linear-gradient(to right, #f7971e, #ffd200)";
    } else if (cond.includes("snow")) {
      body.style.background = "linear-gradient(to right, #83a4d4, #b6fbff)";
    } else {
      body.style.background = "linear-gradient(to right, #6a11cb, #2575fc)";
    }

  } catch (error) {
    console.error(error);
    document.getElementById("weatherResult").innerText = "Error fetching data.";
  }
}