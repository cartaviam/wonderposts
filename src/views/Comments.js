'use strict';

import Utils from '../utils/utils.js';

class Comments {
  constructor() {
    this.isEditing = false;
    this.addComment = false;
    this.comments = null;
  }

  async getComments(id) {
    // Retrieve endpoint information only on first render
    if (this.comments !== null) return this.comments;

    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    };
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/` + id + '/comments',
        options
      );
      const json = await response.json();
      return json;
    } catch (err) {
      console.log('Error getting data', err);
    }
  }

  toggleEdit() {
    this.isEditing = !this.isEditing;
  }
  
  toggleAddComment() {
    this.addComment = !this.addComment;
  }
  async render() {
    const request = Utils.parseRequestURL();
    this.comments = await this.getComments(request.id);

    const commentsList =
      this.comments && this.comments.length > 0
        ? this.comments
            .map(
              comment => `<div class="col-11">
                <div class="row no-gutters">
                  <div class="col-md-1">
                    <div class="avatar">
                      <i class="icon-close" 
                        data-action="comment-remove" data-id="${comment.id}">x</i>
                    </div>
                  </div>
                  <div class="col-md-11">
                    <div class="card-body ${this.isEditing ? 'editing' : ''}">
                      <h5 class="card-title" contenteditable="${this.isEditing}">${comment.name}</h5>
                      <p class="card-text" contenteditable="${this.isEditing}">${comment.body}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-1">
              <a href="#" data-action="edit-comment" data-id="${comment.id}" onClick="return false">
                ${this.isEditing ? `CANCEL` : `EDIT`}
              </a>
              </div>
              ${
                this.isEditing
                  ? `<button class="btn btn-light btn-save" data-action="save-comment" type="submit">Save Changes</button>`
                  : ``
              }`
            )
            .join('\n ')
        : `<div class="col-12">
            <p>Not even 1 single comment!</p>
          </div>`;
    const view = `
      <h5>Comments</h5>
      <div class="row">
        ${commentsList}
      </div>
      <button ${!this.addComment ? '':'hidden'} class="btn btn-light btn-add-comment" data-action="add-comment" type="submit">Add Comment</button>
      <div class="col-11">
        <hr/>
      </div>
      <section class="addComment" ${this.addComment ? '':'hidden'}>
        <div class="col-md-11">
          <div class="card-body editing">
            <h5 id="comment-name" class="card-title" contenteditable="true" data-placeholder="Username (required)"></h5>
            <p id="comment-body" class="card-text" contenteditable="true" data-placeholder="Comment (required)"></p>
          </div>
          <button class="btn btn-light btn-save" data-action="submit-comment" type="submit">Submit</button>
          <button class="btn btn-dark btn-save" data-action="cancel-comment" type="submit">Cancel</button>
        </div>
      </section>
    `;
    return view;
  }

  async after_render() {}
}

export default Comments;
