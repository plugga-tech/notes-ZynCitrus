import fetchAll from "./posts.js";

export default function newPost() {
  const container = document.querySelector('.postsContainer');

  let form = document.createElement('form');
  form.setAttribute('method', 'post');
  
  const titleInput = document.createElement('input');
  titleInput.setAttribute('type', 'text');
  titleInput.setAttribute('name', 'saveTitle');
  titleInput.setAttribute('placeholder', 'Title');
  form.appendChild(titleInput);
  
  const authorInput = document.createElement('input');
  authorInput.setAttribute('type', 'text');
  authorInput.setAttribute('name', 'saveAuthor');
  authorInput.setAttribute('placeholder', 'Author');
  form.appendChild(authorInput);
  

  
  const editorId = `editor-${Date.now()}`;
  const editorDiv = document.createElement('div');
  editorDiv.setAttribute('id', editorId);
  form.appendChild(editorDiv);

  
  const submitBtn = document.createElement('button');
  submitBtn.setAttribute('type', 'submit');
  submitBtn.textContent = 'PUBLICERA';
  form.appendChild(submitBtn);
  
  const fetchAllBtn = document.createElement('button');
  fetchAllBtn.classList.add('fetchAllbtnNew');
  fetchAllBtn.textContent = 'Hämta inlägg';
  fetchAllBtn.addEventListener('click', () => {
    container.innerHTML = ''; // clear the container
    fetchAll();
  });
  
  container.appendChild(fetchAllBtn);

  container.appendChild(form);
  
  tinymce.init({
    selector: `#${editorId}`,
    height: 300,
    menubar: false,
    toolbar: 'undo redo | formatselect | ' +
             'bold italic backcolor | alignleft aligncenter ' +
             'alignright alignjustify | bullist numlist outdent indent | ' +
             'removeformat | help',
    content_css: '//www.tiny.cloud/css/codepen.min.css',
  });
  
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    
    const formData = new FormData(form);
    
    fetch('http://localhost:3000/posts/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        saveTitle: formData.get('saveTitle'),
        saveAuthor: formData.get('saveAuthor'),
        saveContent: tinymce.get(editorId).getContent()
      })
    })
    .then(response => response.text())
    .then(result => {
      console.log(result);
      container.innerHTML = ''; // clear the container
      fetchAll();
    })
    .catch(error => {
      console.error(error);
    });
  });
}