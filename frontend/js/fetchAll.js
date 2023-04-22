const container = document.querySelector('.postsContainer');

export default function fetchAll() {
  fetch('http://localhost:3000/posts/all')
    .then(response => response.json())
    .then(data => {
      console.log(data);
      data.forEach((row, index) => {
        const rowElement = document.createElement('div');
        const rowId = `row-${index}`; // Generate a unique ID for each row
        rowElement.innerHTML = `
          <h2 contenteditable="true" data-field="title">${row.saveTitle}</h2>
          <p>Author: <span contenteditable="true" data-field="author">${row.saveAuthor}</span></p>
          <div class="editor" id="${rowId}">${row.saveContent}</div>
          <button class="saveButton" data-id="${row.id}">Save Changes</button>
        `;
        container.appendChild(rowElement);
      
        tinymce.init({
          selector: `#${rowId}`, // Use the generated ID as the selector
          height: 300,
          menubar: false,
          plugins: ['advlist autolink lists link image charmap print preview anchor', 'searchreplace visualblocks code fullscreen', 'insertdatetime media table paste code help wordcount'],
          toolbar: 'undo redo | formatselect | bold italic backcolor | \
            alignleft aligncenter alignright alignjustify | \
            bullist numlist outdent indent | removeformat | help'
        });
      });

      // Add event listener for save button clicks
      const saveButtons = document.querySelectorAll('.saveButton');
      saveButtons.forEach(button => {
        button.addEventListener('click', () => {
          const postId = button.getAttribute('data-id');
          const row = document.querySelector(`[data-id="${postId}"]`);
          console.log(row);
          const title = row.querySelector('[data-field="title"]').textContent;
          console.log(title);          
          const author = row.querySelector('[data-field="author"]').textContent;
          const content = tinymce.get(row.querySelector('.editor').getAttribute('id')).getContent();
          console.log("klick")
          // Send the updated post data to the server
          fetch(`http://localhost:3000/posts/${postId}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ saveTitle: title, saveAuthor: author, saveContent: content })
          })
          .then(response => response.json())
          .then(data => console.log(data))
          .catch(error => console.error(error));
        });
      });
    })
    .catch(error => {
      console.error(error);
      container.textContent = 'Error retrieving data';
    });
}
