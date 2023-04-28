import { TinyMCE } from "tinymce";

export function fetchPost(postId, container) {
  fetch(`http://localhost:3000/posts/${postId}`)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      const post = data[0];
      container.innerHTML = `
        <input type="text" value="${post.saveTitle}" data-field="title">
        <p>Author:</p>
        <input type="text" value="${post.saveAuthor}" data-field="author">
        <div class="editor">${post.saveContent}</div>
        <button class="saveButton" data-id="${post.id}">Save Changes</button>
        <button class="deleteButton" data-id="${post.id}">Delete Post</button>
      `;

      tinymce.init({
        selector: '.editor',
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
      const saveButton = container.querySelector('.saveButton');
      saveButton.addEventListener('click', () => {
        const title = container.querySelector('[data-field="title"]').value;
        const author = container.querySelector('[data-field="author"]').value;
        const content = tinymce.get(container.querySelector('.editor')).getContent();

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

      // Add event listener for delete button clicks
      const deleteButton = container.querySelector('.deleteButton');
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
    })
    .catch(error => console.error(error));
}
