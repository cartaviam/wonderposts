import Loader from './Loader.js';
import Comments from './Comments.js';
import Utils from '../utils/utils.js';

class Post {
  async getPost(id) {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    };
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/` + id,
        options
      );
      const json = await response.json();
      return json;
    } catch (err) {
      console.log('Error getting data', err);
    }
  }

  async render() {
    const request = Utils.parseRequestURL();
    const post = await this.getPost(request.id);
    const date = new Date();
    const loader = await Loader.render();

    return `
      <section class="post">
        <div class="row">
          <div class="card">
            <div class="card-body">
              <div class="card-tag">
                News
              </div>
              <h5 class="card-title">${post.title}</h5>
              <p class="card-date">${date.toLocaleDateString('en-US')}</p>
              <p class="card-text">${post.body}</p>
            </div>
          </div>
        </div>
        <hr/>
      </section>
      <section class="comments">
        ${loader}
      </section>`;
  }

  async after_render() {
    const comments = null || document.getElementsByClassName('comments')[0];

    comments.innerHTML = await Comments.render();
    await Comments.after_render();
  }
}

export default Post;
