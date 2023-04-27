
// API request

const apiUrl = 'https://api.openai.com/v1/images/generations';
const chatgptKey = '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';

function generateImg(newPrompt) {
  const xhr = new XMLHttpRequest();
  xhr.open('POST', apiUrl, true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.setRequestHeader('Authorization', `Bearer ${chatgptKey}`);
  xhr.onload = function () {

  };
  const payload = JSON.stringify({
    model: 'image-alpha-001',
    prompt: newPrompt,
    size: '512x512',
    response_format: 'url'
  });
  xhr.send(payload);
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    const $response = xhr.response;

    data.response.push($response);

    renderImage();
    $iframe.setAttribute('class', 'hidden');

  });
}

const $form = document.querySelector('form');
const $createBtn = document.querySelector('.create-btn');
const $ul = document.querySelector('ul');
const $iframe = document.querySelector('.giphy-embed');

// Event listener for create btn

$createBtn.addEventListener('click', function (event) {
  $iframe.setAttribute('class', 'giphy-embed');
  const newPrompt = $form.elements['image-description'].value;
  generateImg(newPrompt);

});

function renderImage() {
  const newPrompt = $form.elements['image-description'].value;
  const imgUrl = data.response[0].data[0].url;

  const list = document.createElement('li');
  $ul.appendChild(list);

  const divImgWrapper = document.createElement('div');
  divImgWrapper.setAttribute('class', 'img-wrapper');
  list.appendChild(divImgWrapper);

  const image = document.createElement('img');
  image.setAttribute('src', imgUrl);
  divImgWrapper.appendChild(image);

  const divPiconWrapper = document.createElement('div');
  divPiconWrapper.setAttribute('class', 'p-icon-wrapper');
  list.appendChild(divPiconWrapper);

  const paragraph = document.createElement('p');
  paragraph.textContent = newPrompt;
  divPiconWrapper.appendChild(paragraph);

  const iconWrapper = document.createElement('div');
  iconWrapper.setAttribute('class', 'icon-wrapper');
  divPiconWrapper.appendChild(iconWrapper);

  const iconPen = document.createElement('i');
  iconPen.setAttribute('class', 'fa-regular fa-pen-to-square fa-lg');
  iconWrapper.appendChild(iconPen);

  const iconTrash = document.createElement('i');
  iconTrash.setAttribute('class', 'fa-regular fa-trash-can fa-lg');
  iconWrapper.appendChild(iconTrash);

  const iconHeart = document.createElement('i');
  iconHeart.setAttribute('class', 'fa-regular fa-heart fa-lg');
  iconWrapper.appendChild(iconHeart);

  return list;

}

/* <li>
  <div class="img-wrapper">
    <img src="https://images.unsplash.com/photo-1681532639984-edb0790487d0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1826&q=80">
  </div>
  <div class="p-icon-wrapper">
    <p>some text</p>
    <div class="icon-wrapper">
      <i class="fa-regular fa-pen-to-square fa-lg"></i>
      <i class="fa-regular fa-trash-can fa-lg"></i>
      <i class="fa-regular fa-heart fa-lg"></i>
    </div>
  </div>
</li> */
