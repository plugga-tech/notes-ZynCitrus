const express = require('express');
const app = require('../app.js');
const router = express.Router();

//Alla
router.get('/all', (req, res) => {
  const con = req.con;
  console.log(con)
  con.query('SELECT * FROM posts', (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error retrieving posts');
    }
    res.send(result);
  });
});

  //Specifik
  router.get('/:id', (req, res) => {
    const con = req.con;
    const id = req.params.id;
    con.query('SELECT * FROM posts WHERE id = ?', [id], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Error retrieving post');
      }
      if (result.length === 0) {
        return res.status(404).send('Post not found');
      }
      res.send(result[0]);
    });
  });

// Ny
router.post('/add', (req, res) => {
  const con = req.con;
  const { saveTitle, saveAuthor, saveContent } = req.body;

  if (!saveTitle || !saveAuthor || !saveContent) {
    return res.status(400).send('Missing required fields');
  }

  const sql = 'INSERT INTO posts (saveTitle, saveAuthor, saveContent) VALUES (?, ?, ?)';
  const values = [saveTitle, saveAuthor, saveContent];

  con.query(sql, values, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error adding post');
    }
    res.send('Post added successfully');
  });
});


//Ta bort
router.delete('/delete/:id', (req, res) => {
  const con = req.con;
  const postId = req.params.id;
  const sql = 'DELETE FROM posts WHERE id = ?';

  con.query(sql, postId, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error deleting post');
    }
    console.log(`Deleted post with id ${postId}`);
    res.send(`Deleted post with id ${postId}`);
  });
});

// Update a post by ID
router.put('/posts/:id', (req, res) => {
  const id = req.params.id;
  const { saveTitle, saveAuthor, saveContent } = req.body;
  const sql = 'UPDATE posts SET saveTitle = ?, saveAuthor = ?, saveContent = ? WHERE id = ?';
  const values = [saveTitle, saveAuthor, saveContent, id];

  req.con.query(sql, values, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error updating post');
    }

    if (result.affectedRows === 0) {
      return res.status(404).send('Post not found');
    }

    res.send('Post updated successfully');
  });
});


module.exports = router;