import Loader from './src/views/Loader.js';
import Navbar from './src/views/Navbar.js';
import Home from './src/views/Home.js';
import Post from './src/views/Post.js';
import NewPost from './src/views/NewPost.js';
import Utils from './src/utils/utils.js';

const routes = {
  '/': Home,
  '/post/:id': Post,
  '/new': NewPost
};

let page = '';
const header = null || document.getElementById('header');
const content = null || document.getElementById('page');

const router = async () => {
  let request = Utils.parseRequestURL();

  let parsedURL =
    (request.resource ? '/' + request.resource : '/') +
    (request.id ? '/:id' : '') +
    (request.verb ? '/' + request.verb : '');

  page = routes[parsedURL] ? new routes[parsedURL]() : Error404;
  header.innerHTML = Navbar.render(page.name);

  // Insert loader element on every route change
  content.innerHTML = await Loader.render();

  content.innerHTML = await page.render();
  await page.after_render();
};

const handleClick = async e => {
  const shouldRender = page.handleClick(e);
  if (shouldRender === undefined) content.innerHTML = await page.render();
};

// Listen on hash change:
window.addEventListener('hashchange', router);

// Listen on page load:
window.addEventListener('load', router);

// Listen on click events:
window.addEventListener('click', handleClick);
