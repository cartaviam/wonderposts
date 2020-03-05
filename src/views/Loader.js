'use strict';

const Loader = {
  render: async () => {
    return `<div class="spinner-wrapper text-center">
      <div class="spinner-grow text-light" role="status">
        <span class="sr-only"></span>
      </div>
    </div>`;
  },
  after_render: async () => {}
};

export default Loader;
