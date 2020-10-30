import '../styles/index.scss';

const API_KEY = 'vJ0K5VXq9agtgaT4kZYyztCUleZ37q0gtheewDCg';
const baseURL = 'https://api.nasa.gov';

const renderTile = ({ title, url } = data, targetDOMElement) => {
  const markup = `
    <div class="tile">
      <img
        class="tile__img
        alt="${ title }"
        src="${ url }"
      />
      <h3 class="tile__name">
        ${ title }
      </h3>
    </div>
  `;

  targetDOMElement.innerHTML = markup;
};

const renderError = (error, targetDOMElement) => {
  const markup = `
    <div class="error">
      <h3 class="error__name">
        ${ error.status }
      </h3>
      <p class="error__text">
        ${ error.text }
      </p>
    </div>
  `;

  targetDOMElement.innerHTML = markup;
};

const disablePreloeader = () => {
  const preloaderBody = document.querySelector('#preloader');
  const body = document.querySelector('body');

  preloaderBody.classList.add('preloader--loaded');
  preloaderBody.addEventListener('transitionend', () => {
    body.removeChild(preloaderBody);
  })
};

const fetchData = async () => {
  const grid = document.querySelector('.grid');

  try {
    const response = await fetch(`${baseURL}/planetary/apod3?api_key=${API_KEY}`);
    
    if (!response.ok) {
      throw {
        status: response.status,
        text: 'Sorry - API issue'
      };
    }

    const data = await response.json();
    renderTile(data, grid);
  } catch(err) {
    renderError(err, grid);
  } finally {
    disablePreloeader();
  }
};

document.addEventListener('DOMContentLoaded', () => {
  fetchData()
});