const container = document.querySelector('.postsContainer');

export default function fetchAll() {
  fetch('http://localhost:3001/posts/all')
    .then(response => response.json())
    .then(data => {
      console.log(data);
      if (Array.isArray(data)) {
        data.forEach((row, index) => {
          const rowElement = document.createElement('div');
          const rowId = `row-${row.id}`; // Use the ID of the single object as the row ID
          rowElement.innerHTML = `
            <h2 contenteditable="true" data-field="title">${row.saveTitle}</h2>
            <p>Author: <span contenteditable="true" data-field="author">${row.saveAuthor}</span></p>
            <div class="editor" id="${rowId}">${row.saveContent}</div>
            <button class="saveButton" data-id="${row.id}">Save Changes</button>
            <button class="deleteButton" data-id="${row.id}">Delete Post</button>
          `;
          container.appendChild(rowElement);

          tinymce.init({
            selector: `#${rowId}`, // Use the generated ID as the selector
            height: 300,
            menubar: false,
            plugins: [
              'advlist autolink lists link image charmap print preview anchor',
              'searchreplace visualblocks code fullscreen',
              'insertdatetime media table paste code help wordcount'
            ],
            toolbar: 'undo redo | formatselect | bold italic backcolor | \
              alignleft aligncenter alignright alignjustify | \
              bullist numlist outdent indent | removeformat | help'
          });

          // Add event listener for save button clicks
          const saveButton = rowElement.querySelector('.saveButton');
          saveButton.addEventListener('click', () => {
            const postId = saveButton.getAttribute('data-id');
            const row = document.querySelector(`[data-id="${postId}"]`);
            console.log(row); // add this line to check the value of row
            const title = row.querySelector('[data-field="title"]').textContent;
            const author = row.querySelector('[data-field="author"]').textContent;
            const content = tinymce.get(row.querySelector('.editor').getAttribute('id')).getContent();
          
            fetch(`/posts/${postId}`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                saveTitle: title,
                saveAuthor: author,
                saveContent: content
              })
            })
            .then(response => {
              if (response.ok) {
                alert('Post updated successfully!');
                location.reload();
              } else {
                throw new Error('Error updating post!');
              }
            })
            .catch(error => {
              console.error(error);
              alert('Error updating post!');
            });
          });

          // Add event listener for delete button clicks
          const deleteButton = rowElement.querySelector('.deleteButton');
          deleteButton.addEventListener('click', () => {
            const postId = deleteButton.getAttribute('data-id');
            fetch(`http://localhost:3000/posts/delete/${postId}`, {
              method: 'DELETE'
            })
              .then(response => response.json())
              .then(data => {
                console.log(data);
                container.removeChild(rowElement);
              })
              .catch(error => console.error(error));
          });

          // Make the post clickable and editable
          rowElement.addEventListener('click', () => {
            rowElement.setAttribute('contenteditable', 'true');
            rowElement.focus();
          });
        });
      } else {
        console.error('Data is not an array');
      }
    })
    .catch(error => {
      console.error(error);
      container.textContent = 'Error retrieving data';
    });
}