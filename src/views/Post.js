'use strict';

import Comments from './Comments.js';
import Utils from '../utils/utils.js';

class Post {
  constructor() {
    this.isEditing = false;
    this.post = null;
    this.comments = new Comments();
    this.commentsList = null;
  }

  async getPost(id) {
    // Retrieve endpoint information only on first render
    if (this.post !== null) return this.post;

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

  async savePost(post) {
    const options = {
      method: 'PUT',
      body: JSON.stringify({
        id: post.id,
        title: post.title,
        body: post.body
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    };
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/` + post.id,
        options
      );
      const json = await response.json();
      alert('Information Saved Correctly');
      return json;
    } catch (err) {
      console.log('Error getting data', err);
    }
  }

  async renderCommentsList() {
    return await this.comments.render();
  }

  toggleEdit() {
    this.isEditing = !this.isEditing;
  }

  handleClick(e) {
    const action = e.target.getAttribute('data-action');
    switch (action) {
      case 'edit-post':
        this.toggleEdit();
        break;
      case 'save-post':
        const newPost = {
          id: this.post.id,
          title: document.getElementById('post-title').innerHTML,
          body: document.getElementById('post-body').innerHTML
        };
        // As per endpoint design, the SAVE actually doesn't SAVE,
        // but we're getting a 200 anyways!
        // await this.savePost(newPost);

        // Logically editing element
        this.post = newPost;
        this.toggleEdit();
        alert('Post saved successfully!');
        break;
      case 'edit-comment':
        // this.comments.toggleEdit();
        alert('Sorry, this functionality is missing :(');
        break;
      case 'add-comment':
        this.comments.toggleAddComment();
        break;
      case 'submit-comment':
        const newComment = {
          id: this.comments.comments.length + 1,
          name: document.getElementById('comment-name').innerHTML,
          body: document.getElementById('comment-body').innerHTML
        };
        this.comments.comments.push(newComment);
        this.comments.toggleAddComment();
        alert('Comment added successfully!');
        break;
      case 'cancel-comment':
        document.getElementById('comment-name').innerHTML = '';
        document.getElementById('comment-body').innerHTML = '';
        this.comments.toggleAddComment();
        break;
      case 'comment-remove':
        // As per endpoint design, the DELETE actually doesn't DELETE,
        // but we're getting a 200 anyways!
        // await this.deleteComment(id);

        // Logically removing elements
        const id = e.target.getAttribute('data-id');
        this.comments.comments = this.comments.comments.filter(
          comment => comment.id.toString() !== id
        );
        alert('Comment removed successfully!');
        break;
      default:
        return false;
    }
  }

  async render() {
    const request = Utils.parseRequestURL();
    this.post = await this.getPost(request.id);
    this.commentsList = await this.renderCommentsList();

    const date = new Date();
    const postCard = `
      <h5 class="card-title" id="post-title" contenteditable="${
        this.isEditing
      }">
        ${this.post.title}
      </h5>
      <p class="card-date">
        ${date.toLocaleDateString('en-US')}
      </p>
      <p class="card-text" id="post-body" contenteditable="${this.isEditing}">
        ${this.post.body}
      </p>
    `;

    return `
      <section class="post">
        <div class="row">
          <div class="col-11">
          <div class="card ${this.isEditing ? 'editing' : ''}">
            <div class="card-body">
              <div class="card-tag">
                News
              </div>
              ${postCard}
            </div>
          </div>
          </div>
          <div class="col-1">
            <a href="#" data-action="edit-post" data-id="${
              this.post.id
            }" onClick="return false">
              ${this.isEditing ? `CANCEL` : `EDIT`}
            </a>
          </div>
        </div>
        ${
          this.isEditing
            ? `<button class="btn btn-light btn-save" data-action="save-post" type="submit">Save Changes</button>`
            : ``
        }
        <div class="col-11">
          <hr/>
        </div>
      </section>
      <section class="comments">
        ${this.commentsList}
      </section>`;
  }

  async after_render() {}
}

export default Post;
