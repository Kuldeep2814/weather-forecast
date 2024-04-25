CityTable Project

-Welcome to the CityTable project! This project aims to provide a user-friendly interface for browsing weather information about cities around the world. It utilizes the OpenWeatherMap API to fetch weather data and displays it in a table format.

Features

1. Display a list of cities with their respective weather information.
2. Allow users to search for cities by name.
3. Enable users to mark cities as favorites for quick access.
4. Provide the option to get weather information for the current location.
5. Implement infinite scrolling to load more cities as the user scrolls down.

Technologies Used

1. React.js: Frontend library for building user interfaces.
2. Styled-components: CSS-in-JS library for styling React components.
3. React Router: Library for routing in React applications.
4. OpenWeatherMap API: External API for fetching weather data.
5. Vercel: Platform for deploying web applications.

Setup Instructions

1. Clone the repository to your local machine:
   git clone <https://github.com/Kuldeep2814/weather-forecast>
2. Navigate to the project directory:
   cd weather-forecast
3. Install dependencies using npm:
   npm install
4. Set up environment variables:
   Create a .env file in the project root.
   Add your OpenWeatherMap API key to the .env file:
   REACT_APP_OPENWEATHERMAP_API_KEY=<your-api-key>
5. Start the development server:
   npm start
6. Open your browser and navigate to http://localhost:3000 to view the application.
7. Deployment
   The project is deployed using Vercel. To deploy the project to your own Vercel account:

8. Sign up for a Vercel account if you don't have one already.
   Install the Vercel CLI:
   npm install -g vercel
   Follow the vercel website to deployment of project.

License

This project is licensed under the MIT License.
