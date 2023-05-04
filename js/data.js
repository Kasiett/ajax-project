/* exported data */
const defaultImages = [
  {
    id: 1,
    description: 'Mountain landscape',
    url: 'https://picsum.photos/seed/1/510/510'
  },
  {
    id: 2,
    description: 'Forest trail',
    url: 'https://picsum.photos/seed/2/510/510'
  },
  {
    id: 3,
    description: 'Beach sunset',
    url: 'https://picsum.photos/seed/3/510/510'
  },
  {
    id: 4,
    description: 'Wildflower meadow',
    url: 'https://picsum.photos/seed/4/510/510'
  },
  {
    id: 5,
    description: 'City skyline',
    url: 'https://picsum.photos/seed/5/510/510'
  }
];

let data = {
  nextEntryId: 1,
  entries: defaultImages,
  editing: null
};

const storedImages = localStorage.getItem('storedImages');
if (storedImages !== null) {
  data = JSON.parse(storedImages);
}
window.addEventListener('beforeunload', function (e) {
  const dataJson = JSON.stringify(data);
  localStorage.setItem('storedImages', dataJson);
});
