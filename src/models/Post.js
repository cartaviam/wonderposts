class PostModel {
  constructor() {
    id = null;
    title = null;
    body = null;
  }

  async savePost(){
    const options = {
      method: 'PUT',
      body: JSON.stringify({
        id: this.id,
        title: this.title,
        body: this.body
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    };
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts` + this.id,
        options
      );
      const json = await response.json();
      return json;
    } catch (err) {
      console.log('Error getting data', err);
    }
  }
}

export default PostModel;