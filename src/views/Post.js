import Comments from './Comments.js';
import Utils from '../utils/utils.js';

class Post {
  constructor() {
    this.isEditing = false;
    this.post = null;
    this.commentsList = null;
  }

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

  async handleClick(e) {
    const id = e.target.getAttribute('data-id');
    this.isEditing = !this.isEditing;
  }

  async renderCommentsList() {
    const comments = new Comments();
    return await comments.render();
  }

  async render() {
    const request = Utils.parseRequestURL();
    this.post = this.post === null ? await this.getPost(request.id) : this.post;
    const date = new Date();
    const postCard = !this.isEditing
      ? `
          <h5 class="card-title">${this.post.title}</h5>
          <p class="card-date">${date.toLocaleDateString('en-US')}</p>
          <p class="card-text">${this.post.body}</p>
        `
      : `
          <input type="text" class="card-title" value="${this.post.title}"></input>
          <input type="text" value="${date.toLocaleDateString('en-US')}"></input>
          <input type="text" class="card-text" value="${this.post.body}"></input>
        `;
    this.commentsList = this.commentsList === null ? await this.renderCommentsList() : this.commentsList;

    return `
      <section class="post">
        <div class="row">
          <div class="col-11">
          <div class="card">
            <div class="card-body">
              <div class="card-tag">
                News
              </div>
              ${postCard}
            </div>
          </div>
          </div>
          <div class="col-1">
            <a href="#" data-id="${this.post.id}" onClick="return false">
              ${!this.isEditing ? `EDIT` : `SAVE`}
            </a>
          </div>
        </div>
        <hr/>
      </section>
      <section class="comments">
        ${this.commentsList}
      </section>`;
  }

  async after_render() {}
}

export default Post;
