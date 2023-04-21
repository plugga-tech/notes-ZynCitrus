export default function initEditor() {
  const tinyInput = document.querySelector('.tinyInput');

  tinyInput.innerHTML = `
    <form id="post-form" action="/" method="POST">
      <label for="title">Titel:</label>
      <input type="text" id="title" name="title" required>

      <label for="author">Författare:</label>
      <input type="text" id="author" name="author" required>

      <label for="content">Innehåll:</label>
      <textarea id="content" name="content" required></textarea>

      <button type="submit">Lägg till post</button>
    </form>

    <div class="data-container">
    </div>
  `;

  const postForm = document.querySelector('#post-form');
  postForm.addEventListener('submit', submitForm);

  function submitForm(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);

    fetch('/', {
      method: 'POST',
      body: formData
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.text();
      })
      .then(html => {
        const dataContainer = document.querySelector('.data-container');
        dataContainer.innerHTML = html;
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
  }

  tinymce.init({
    selector: 'textarea',
    height: '500',
    plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage tinycomments tableofcontents footnotes mergetags autocorrect typography inlinecss',
    toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
    tinycomments_mode: 'embedded',
    tinycomments_author: 'Author name',
    mergetags_list: [
      { value: 'First.Name', title: 'First Name' },
      { value: 'Email', title: 'Email' },
    ]
  });
};
