
// API request

const apiUrl = 'https://api.openai.com/v1/images/generations';
const apiKey = '';

function generateImg(newPrompt) {
  const xhr = new XMLHttpRequest();
  xhr.open('POST', apiUrl, true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.setRequestHeader('Authorization', `Bearer ${apiKey}`);
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
      id: !data.editing ? data.nextEntryId++ : data.editing,
      url: res.data[0].url,
      description: newPrompt
    };
    data.entries.unshift(newData);

    const renderNewImage = renderImage(newData);
    $ul.prepend(renderNewImage);

    $loadingAnimation.setAttribute('class', 'hidden');
    $form.reset();
  });
}

const $form = document.querySelector('form');
const $createBtn = document.querySelector('.create-btn');
const $ul = document.querySelector('ul');
const $loadingAnimation = document.querySelector('.animation');
const $imgDescription = document.querySelector('#image-description');
const $divModal = document.querySelector('#modal');
const $cancelBtn = document.querySelector('.cancel-btn');
const $confirmBtn = document.querySelector('.confirm-btn');
const $myCreations = document.querySelector('.my-creations');

$createBtn.addEventListener('click', function (event) {

  if (data.editing !== null) {
    for (let i = 0; i < data.entries.length; i++) {
      if (data.editing === data.entries[i].id) {
        data.entries.splice(i, 1);
        const $listItem = document.querySelectorAll('[data-entry-id]');
        $listItem[i].remove();
        data.editing = null;

      }
    }
  }
  $loadingAnimation.setAttribute('class', 'animation');
  const newPrompt = $form.elements['image-description'].value;

  generateImg(newPrompt);

});

function renderImage(newImg) {

  const $listItem = document.createElement('li');
  $listItem.setAttribute('class', 'image-item');
  $listItem.setAttribute('data-entry-id', newImg.id);

  const newPrompt = newImg.description;
  const imgUrl = newImg.url;

  const $divImgWrapper = document.createElement('div');
  $divImgWrapper.setAttribute('class', 'img-wrapper');
  $listItem.appendChild($divImgWrapper);

  const $image = document.createElement('img');
  $image.setAttribute('src', imgUrl);
  $divImgWrapper.appendChild($image);

  const $divPiconWrapper = document.createElement('div');
  $divPiconWrapper.setAttribute('class', 'p-icon-wrapper');
  $listItem.appendChild($divPiconWrapper);

  const $paragraph = document.createElement('p');
  $paragraph.setAttribute('class', 'paragraph');
  $paragraph.textContent = newPrompt;
  $divPiconWrapper.appendChild($paragraph);

  const $iconWrapper = document.createElement('div');
  $iconWrapper.setAttribute('class', 'icon-wrapper');
  $divPiconWrapper.appendChild($iconWrapper);

  const $iconPen = document.createElement('i');
  $iconPen.setAttribute('class', 'fa-regular fa-pen-to-square fa-lg');
  $iconWrapper.appendChild($iconPen);

  const $iconTrash = document.createElement('i');
  $iconTrash.setAttribute('class', 'fa-regular fa-trash-can fa-lg');
  $iconWrapper.appendChild($iconTrash);

  const $iconHeart = document.createElement('i');
  $iconHeart.setAttribute('class', 'fa-regular fa-heart fa-lg');
  $iconWrapper.appendChild($iconHeart);

  // edit pen icon event
  $iconPen.addEventListener('click', function (event) {
    $imgDescription.value = newPrompt;
    data.editing = newImg.id;
  });

  // delete trash icon event
  $iconTrash.addEventListener('click', function (event) {
    $divModal.setAttribute('class', 'modal');
    data.editing = newImg.id;
  });

  return $listItem;

}

// event for cancel delete btn
$cancelBtn.addEventListener('click', function (event) {
  $divModal.setAttribute('class', 'hidden');
  data.editing = null;
});

// event for confirm delete btn
$confirmBtn.addEventListener('click', function (event) {
  if (data.editing !== null) {
    for (let i = 0; i < data.entries.length; i++) {
      if (data.editing === data.entries[i].id) {
        data.entries.splice(i, 1);
        const $listItem = document.querySelectorAll('[data-entry-id]');
        $listItem[i].remove();
        data.editing = null;
        $divModal.setAttribute('class', 'hidden');

      }
    }
  }

});

document.addEventListener('DOMContentLoaded', function (e) {
  for (let i = 0; i < data.entries.length; i++) {
    const renderNewImage = renderImage(data.entries[i]);
    $ul.appendChild(renderNewImage);
  }
});

// event for  My creations

$myCreations.addEventListener('click', function (event) {

});
