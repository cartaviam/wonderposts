'use strict';

import Loader from './src/views/Loader.js';
import Navbar from './src/views/Navbar.js';
import Home from './src/views/Home.js';
import Post from './src/views/Post.js';
import Utils from './src/utils/utils.js';

const routes = {
  '/': Home,
  '/post/:id': Post
};

const router = async () => {
  const header = null || document.getElementById('header');
  const content = null || document.getElementById('page');

  let request = Utils.parseRequestURL();

  let parsedURL =
    (request.resource ? '/' + request.resource : '/') +
    (request.id ? '/:id' : '') +
    (request.verb ? '/' + request.verb : '');

  let page = routes[parsedURL] ? routes[parsedURL] : Error404;
  header.innerHTML = Navbar.render(page.name);
  await Navbar.after_render();

  // Insert loader element on every route change
  content.innerHTML = await Loader.render();

  content.innerHTML = await page.render();
  await page.after_render();
};

// Listen on hash change:
window.addEventListener('hashchange', router);

// Listen on page load:
window.addEventListener('load', router);
