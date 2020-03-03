import Utils from '../utils/utils.js';

class Comments {
  constructor() {
    this.comments = null;
  }

  async getComments(id) {
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

  async render() {
    const request = Utils.parseRequestURL();
    this.comments = this.comments === null ? await this.getComments(request.id) : this.comments;

    const commentsList =
      this.comments && this.comments.length > 0
        ? this.comments
            .map(
              comment => `<div class="col-11">
                <div class="row no-gutters">
                  <div class="col-md-1">
                    <div class="avatar"></div>
                  </div>
                  <div class="col-md-11">
                    <div class="card-body">
                      <h5 class="card-title">${comment.name}</h5>
                      <p class="card-text">${comment.body}</p>
                      <p class="card-text"><small class="text-muted">${comment.name}</small></p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-1">
              <a href="#" btn-edit" data-id="${comment.id}">
                EDIT
              </a>
              </div>`
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
      <button class="btn btn-light" type="submit">Add Comment</button>`;
    return view;
  }

  async after_render() {}
}

export default Comments;
