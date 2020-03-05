import Alerts from './Alerts.js';

class NewPost {
  constructor() {}

  async createPost(newPost) {
    const options = {
      method: 'POST',
      body: JSON.stringify({
        id: newPost.id,
        title: newPost.title,
        body: newPost.body
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    };
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/`,
        options
      );
      const json = await response.json();
      return json;
    } catch (err) {
      console.log('Error saving data', err);
    }
  }

  handleClick(e) {
    const action = e.target.getAttribute('data-action');
    switch (action) {
      case 'submit-post':
        const newPost = {
          title: document.getElementById('post-title').innerHTML,
          body: document.getElementById('post-body').innerHTML
        };
        // As per endpoint design, the CREATE actually doesn't CREATE,
        // but we're getting a 200 anyways!
        // await this.createPost(newPost);

        // Logically editing element
        this.post = newPost;
        if (newPost.title !== '' && newPost.body !== '') {
          Alerts.render('success', 'Post created successfully!');
          window.location = '/';
        } else {
          Alerts.render('danger', 'You must fill required fields...');
        }
        break;
      case 'cancel-post':
        document.getElementById('post-title').innerHTML = '';
        document.getElementById('post-body').innerHTML = '';
        window.location = '/';
        break;
      default:
        return false;
    }
  }

  async render() {
    const date = new Date();
    const postCard = `
      <h5 class="card-title" id="post-title" contenteditable="true" data-placeholder="Post Title (required)"></h5>
      <p class="card-date">
        ${date.toLocaleDateString('en-US')}
      </p>
      <p class="card-text" id="post-body" contenteditable="true" data-placeholder="Post Body (required)"></p>
    `;

    return `
      <section class="post new-post">
        <h5>New Article</h5>
        <div class="row">
          <div class="col-12">
          <div class="card editing">
            <div class="card-body">
              ${postCard}
            </div>
          </div>
          </div>
        </div>
        <button class="btn btn-light btn-save" data-action="submit-post" type="submit">Submit</button>
        <button class="btn btn-dark btn-save" data-action="cancel-post" type="submit">Cancel</button>
      </section>
    `;
  }

  async after_render() {}
}

export default NewPost;
