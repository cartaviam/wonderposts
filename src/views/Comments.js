import Utils from "../utils/utils.js";

const getComments = async id => {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
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
    console.log("Error getting data", err);
  }
};

const Comments = {
  render: async () => {
    const request = Utils.parseRequestURL();
    const comments = await getComments(request.id);

    const commentsList =
      comments && comments.length > 0
        ? comments
            .map(
              comment => `<div class="col-12">
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
              </div>`
            )
            .join("\n ")
        : `<p>No Comments!</p>`;
    const view = `
            <div>
              <h5>Comments</h5>
              <div class="comments-container">
                ${commentsList}
              </div>
              <button class="btn btn-light" type="submit">Add Comment</button>
            </div>
        `;
    return view;
  },
  after_render: async () => {}
};

export default Comments;
