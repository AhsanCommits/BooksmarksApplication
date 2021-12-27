const form = document.querySelector('form');
const siteName = document.querySelector('#siteName');
const siteUrl = document.querySelector('#siteUrl');
const bookmarkResult = document.querySelector('#bookmarksResults');
let edit = false;
let editID;
function showData() {
  let comingResult = localStorage.getItem('bookmarks');
  if (comingResult) {
    bookmarksResults.innerHTML = '';
    let parseData = JSON.parse(comingResult);

    for (const child of parseData) {
      const { id, name, url } = child;
      bookmarksResults.innerHTML +=
        `<div class="card mb-lg-4 m-2">
        <div class="card-body">
          <h3 class="card-title mb-3 mt-3 text-dark text-uppercase text-center">
            ${name}
            <hr>
            <a class="btn btn-dark" target="_blank"  href="` +
        `${url}` +
        `">Visit</a>
            <a class="btn btn-primary" href="#" onclick="editBookmark(` +
        `'${id}'` +
        `),showHome()">Edit</a>
            <a class="btn btn-danger" href="#" onclick="removeBookmark(` +
        `'${id}'` +
        `)">Delete</a>
          </h3>
        </div>
        </div>

      `;
    }
  }
}

function removeBookmark(id) {
  let comingResult = localStorage.getItem('bookmarks');
  let bookmarkList = JSON.parse(comingResult);

  bookmarkList = bookmarkList.filter((mark) => mark.id !== id);
  //   console.log(bookmarkList);

  const stringData = JSON.stringify(bookmarkList);
  localStorage.setItem('bookmarks', stringData);
  showData();
}
function editBookmark(id) {
  edit = true;
  editID = id;
  let result = localStorage.getItem('bookmarks');
  let resultParse = JSON.parse(result);
  resultParse = resultParse.find((r) => r.id === id);
  siteName.value = resultParse.name;
  siteUrl.value = resultParse.url;
}

form.addEventListener('submit', function (e) {
  e.preventDefault();
  const bookmarkObj = {
    id: uuidv4(),
    name: siteName.value,
    url: siteUrl.value,
  };

  let records = localStorage.getItem('bookmarks');

  if (edit) {
    let records = localStorage.getItem('bookmarks');
    const bookmarkList = JSON.parse(records);
    bookmarkList.forEach((bookmark) => {
      if (bookmark.id === editID) {
        bookmark.name = siteName.value;
        bookmark.url = siteUrl.value;
      }
    });
    const stringData = JSON.stringify(bookmarkList);
    localStorage.setItem('bookmarks', stringData);
    edit = false;
  } else {
    if (records) {
      const bookmarkList = JSON.parse(records);
      bookmarkList.push(bookmarkObj);
      const stringData = JSON.stringify(bookmarkList);
      localStorage.setItem('bookmarks', stringData);
    } else {
      const bookmarkList = [];
      bookmarkList.push(bookmarkObj);
      const stringData = JSON.stringify(bookmarkList);
      localStorage.setItem('bookmarks', stringData);
    }
  }
  showData();
  this.reset();
});
showData();

const home = document.querySelector('#home');
const bookmarks = document.querySelector('#bookmarks');
const footer = document.querySelector('footer');
const list = () => {
  home.classList.add('hidden');
  home.classList.remove('visible');
  bookmarks.classList.add('visible');
  bookmarks.classList.remove('hidden');
  footer.classList.add('footer');
  footer.classList.remove('fixed-bottom');
};
function myFunction() {
  list();
}

const Home = () => {
  home.classList.add('visible');
  home.classList.remove('hidden');
  bookmarks.classList.add('hidden');
  bookmarks.classList.remove('visible');
  footer.classList.add('fixed-bottom');
  footer.classList.remove('footer');
};
function showHome() {
  Home();
}
