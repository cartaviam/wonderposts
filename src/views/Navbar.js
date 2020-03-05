'use strict';

const Navbar = {
  render: parent => {
    const addArticle =
      parent === 'Home'
        ? `<a href="#/new/" class="btn btn-light float-right" type="submit">Add New Article</a>`
        : ``;
    const view = `<div class="form-group">
        <a href="#"><svg width="196" height="30" viewBox="0 0 196 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M5.56364 29V13.963L11.6 29H16V0H10.6182V13.963L4.58182 0H0V29H5.56364ZM37 29V24.6679H30.3579V16.0037H35.3661V11.5642H30.3579V4.3679H36.929V0H24V29H37ZM53.4821 11.4926L51.1571 29H45.5054L42 0H47.437L49.154 16.8988L51.3359 0.0358025H55.5925L57.8818 16.7914L59.6345 0H65L61.5303 29H55.9502L53.4821 11.4926ZM79.3775 30C80.9356 30 82.2839 29.6759 83.4225 29.0276C84.5611 28.3794 85.4419 27.497 86.0652 26.3806C86.6884 25.2641 87 24.0216 87 22.6531C87 20.6363 86.5625 18.9436 85.6876 17.575C84.8127 16.2065 83.7401 14.982 82.4697 13.9016L80.0607 11.7767C79.2217 11.0324 78.5446 10.3181 78.0292 9.63385C77.5139 8.94958 77.2562 8.06723 77.2562 6.98679C77.2562 6.48259 77.394 5.97839 77.6697 5.47419C77.9453 4.96999 78.3828 4.71789 78.982 4.71789C79.5333 4.71789 79.9408 4.89196 80.2045 5.2401C80.4682 5.58824 80.6419 6.08043 80.7258 6.71669C80.8097 7.35294 80.8637 8.10324 80.8876 8.96759L86.4247 8.28331C86.4007 7.41897 86.2989 6.51261 86.1191 5.56423C85.9393 4.61585 85.6037 3.71549 85.1124 2.86315C84.621 2.0108 83.9019 1.32053 82.9551 0.792317C82.0082 0.264106 80.7558 0 79.1978 0C76.6809 0 74.6914 0.654262 73.2292 1.96279C71.767 3.27131 71.036 5.16207 71.036 7.63505C71.036 9.38776 71.4135 10.8583 72.1685 12.0468C72.9236 13.2353 73.8524 14.2977 74.9551 15.2341L77.4719 17.431C78.4547 18.2713 79.2337 19.1056 79.809 19.934C80.3843 20.7623 80.6719 21.7767 80.6719 22.9772C80.6719 23.4814 80.57 23.9616 80.3663 24.4178C80.1625 24.8739 79.7251 25.102 79.0539 25.102C78.5266 25.102 78.0772 24.934 77.7056 24.5978C77.3341 24.2617 77.0464 23.7095 76.8427 22.9412C76.639 22.1729 76.5251 21.1645 76.5011 19.916L71 20.7443C71.0719 22.9052 71.4195 24.6639 72.0427 26.0204C72.6659 27.377 73.5888 28.3794 74.8112 29.0276C76.0337 29.6759 77.5558 30 79.3775 30ZM98.0186 9.55926L97.5915 29H93L93.4983 0H100.332L103.5 16.863L106.917 0H113.502L114 29H109.48L108.946 9.70247L105.6 29H101.578L98.0186 9.55926ZM134 29V24.6679H127.358V16.0037H132.366V11.5642H127.358V4.3679H133.929V0H121V29H134ZM154.204 28.0333C152.814 28.6778 150.872 29 148.377 29H141V0H148.306C150.825 0 152.785 0.316255 154.187 0.948765C155.588 1.58128 156.574 2.57181 157.145 3.92037C157.715 5.26893 158 7.01728 158 9.16543V19.6914C158 21.8634 157.715 23.6356 157.145 25.008C156.574 26.3805 155.594 27.3889 154.204 28.0333ZM147.982 25H147V5H147.947C148.883 5 149.561 5.11884 149.982 5.35651C150.404 5.59418 150.678 5.97445 150.807 6.49733C150.936 7.0202 151 7.70945 151 8.56506V21.1497C151 22.0053 150.947 22.7184 150.842 23.2888C150.737 23.8592 150.474 24.287 150.053 24.5722C149.632 24.8574 148.942 25 147.982 25ZM171 0V29H165V0H171ZM183.988 29L184.98 22.8778H189.197L190.154 29H196L190.65 0H183.421L178 29H183.988ZM186.5 8L185 19H188L186.5 8Z" fill="white"/>
      </svg></a>
      ${addArticle}
    </div>`;
    return view;
  },
  after_render: () => {}
};

export default Navbar;
