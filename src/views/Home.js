const getPostsList = async () => {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
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
    console.log("Error getting data", err);
  }
};

const Home = {
  render: async () => {
    const posts = await getPostsList();
    const date = new Date();
    const postsList =
      posts && posts.length > 0
        ? posts
            .map(
              post => `<div class="col-md-6 col-lg-4">
              <a href="#/post/${post.id}">
                <div class="card">
                  <div class="card-body">
                    <div class="card-tag">
                      News
                    </div>
                    <h5 class="card-title">${post.title}</h5>
                    <p class="card-text">${post.body}</p>
                    <p class="card-date">${date.toLocaleDateString("en-US")}</p>
                  </div>
                </div>
              </a>
            </div>`
            )
            .join("\n ")
        : `<p>Dude, not a single Post!</p>`;
    const view = `
            <section class="section home">
              <div class="row">
                ${postsList}
              </div>
            </section>
        `;
    return view;
  },
  after_render: async () => {},
  name: 'Home'
};

export default Home;
