const Alerts = {
  render: (type, text) => {
    const alerts = null || document.getElementById('alerts');

    alerts.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
      ${text}
    </div>`;
    setTimeout(() => {
      alerts.innerHTML = '';
    }, 2000);
  },
  after_render: () => {}
};

export default Alerts;
