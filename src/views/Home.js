class Home {
  constructor() {
    this.name = 'Home';
    this.posts = null;
  }

  async getPostsList() {
    // Retrieve endpoint information only on first render
    if (this.posts !== null) return this.posts;

    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    };
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users/1/posts`,
        options
      );
      const json = await response.json();
      return json;
    } catch (err) {
      console.log('Error getting data', err);
    }
  }

  async deletePost(id) {
    const options = {
      method: 'DELETE',
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
      console.log('Error deleting data', err);
    }
  }

  renderPostsList(postsList) {
    const date = new Date();
    return postsList && postsList.length > 0
      ? postsList
          .map(
            post => `<div class="col-md-6 col-lg-4">
            <div class="card">
              <i class="icon-close" 
                data-action="remove" data-id="${post.id}">x</i>
              <div class="card-body">
                <div class="card-tag">
                  News
                </div>
                <a href="#/post/${post.id}">
                  <h5 class="card-title">${post.title}</h5>
                </a>
                <p class="card-text">${post.body.substring(0, 90)}</p>
                <p class="card-date">${date.toLocaleDateString('en-US')}</p>
              </div>
            </div>
        </div>`
          )
          .join('\n ')
      : `<div class="col-md-6 col-lg-4">
        <p>Dude, not a single Post!</p>
      </div>`;
  }

  handleClick(e) {
    const action = e.target.getAttribute('data-action');
    switch (action) {
      case 'remove':
        // As per endpoint design, the DELETE actually doesn't DELETE,
        // but we're getting a 200 anyways!
        // await this.deletePost(id);

        // Logically removing elements
        const id = e.target.getAttribute('data-id');
        this.posts = this.posts.filter(post => post.id.toString() !== id);
        alert('Post removed successfully!');
        break;
    }
  }

  async render() {
    this.posts = await this.getPostsList();

    const postsList = this.renderPostsList(this.posts);

    return `<section class="home">
        <div class="row">
          ${postsList}
        </div>
      </section>`;
  }

  async after_render() {}
}

export default Home;
