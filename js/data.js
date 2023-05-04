/* exported data */
let data = {
  nextEntryId: 1,
  entries: [],
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
