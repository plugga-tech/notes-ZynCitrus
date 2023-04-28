import { fetchPost } from './edit.js';

const container = document.querySelector('.postsContainer');

fetch('http://localhost:3000/posts/all')
  .then(response => response.json())
  .then(data => {
    console.log(data);
    if (Array.isArray(data)) {
      data.forEach((row, index) => {
        const rowElement = document.createElement('div');
        rowElement.innerHTML = `
          <h2>${row.saveTitle}</h2>
          <p>${row.saveAuthor}</p>
          <p>${row.saveContent}</p>
        `;
        container.appendChild(rowElement);

        // Add event listener for row clicks
        rowElement.addEventListener('click', () => {
          fetchPost(row.id, container); // Pass container as a parameter
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
