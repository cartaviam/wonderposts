"use strict";

import Navbar from "./src/views/Navbar.js";
import Home from "./src/views/Home.js";
import Post from "./src/views/Post.js";
import Utils from "./src/utils/utils.js";

const routes = {
  "/": Home,
  "/post/:id": Post
};

const router = async () => {
  const content = null || document.getElementById("page");
  const header = null || document.getElementById("header");

  let request = Utils.parseRequestURL();

  let parsedURL =
    (request.resource ? "/" + request.resource : "/") +
    (request.id ? "/:id" : "") +
    (request.verb ? "/" + request.verb : "");

  let page = routes[parsedURL] ? routes[parsedURL] : Error404;
  content.innerHTML = await page.render();
  await page.after_render();

  header.innerHTML = await Navbar.render(page.name);
  await Navbar.after_render();
};

// Listen on hash change:
window.addEventListener("hashchange", router);

// Listen on page load:
window.addEventListener("load", router);
