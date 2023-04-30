
// API request

const apiUrl = 'https://api.openai.com/v1/images/generations';
const chatgptKey = '';

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
    const res = xhr.response;

    const newData = {
      id: data.nextEntryId++,
      url: res.data[0].url,
      description: newPrompt
    };
    data.entries.unshift(newData);

    renderImage(newData);

    $iframe.setAttribute('class', 'hidden');
    $form.reset();
  });
}

const $form = document.querySelector('form');
const $createBtn = document.querySelector('.create-btn');
const $ul = document.querySelector('ul');
const $iframe = document.querySelector('.giphy-embed');
// const $listItem = document.querySelectorAll('.list-item');
// Event listener for create btn

$createBtn.addEventListener('click', function (event) {
  $iframe.setAttribute('class', 'giphy-embed');
  const newPrompt = $form.elements['image-description'].value;

  generateImg(newPrompt);

});

function renderImage(newImg) {

  const listItem = document.createElement('li');
  $ul.appendChild(listItem);

  const newPrompt = newImg.description;
  const imgUrl = newImg.url;

  const divImgWrapper = document.createElement('div');
  divImgWrapper.setAttribute('class', 'img-wrapper');
  listItem.appendChild(divImgWrapper);

  const image = document.createElement('img');
  image.setAttribute('src', imgUrl);
  divImgWrapper.appendChild(image);

  const divPiconWrapper = document.createElement('div');
  divPiconWrapper.setAttribute('class', 'p-icon-wrapper');
  listItem.appendChild(divPiconWrapper);

  const paragraph = document.createElement('p');
  paragraph.setAttribute('class', 'paragraph');
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
  return listItem;

}
// renderImage();

document.addEventListener('DOMContentLoaded', function (e) {
  for (let i = 0; i < data.entries.length; i++) {
    renderImage(data.entries[i]);
    // $ul.appendChild(newListItem);
  }
  // viewSwap(data.view);
  // toggleNoEntries();

});
