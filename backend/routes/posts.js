const express = require('express');
const app = require('../app.js');
const router = express.Router();


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



router.post('/new', (req, res) => {
        const saveTitle = req.body.title;
        const saveAuthor = req.body.author;
        const saveContent = req.body.content;
      
        con.connect(function(err) {
          if (err) {
            console.log(err);
            return;
          }
      
          const sql = 'INSERT INTO posts (title, author, content) VALUES (?, ?, ?)';
      
          con.query(sql, [saveTitle, saveAuthor, saveContent], function(err, result) {
            if (err) {
              console.log(err);
              return;
            }
            console.log('result', result);
            res.send(result);
            con.end(); // close the connection
          });
        });
      });

      router.put('/:id', (req, res) => {
        const con = req.con;
        const id = req.params.id;
        const { saveTitle, saveAuthor, saveContent } = req.body;
      
        con.query('UPDATE posts SET saveTitle = ?, saveAuthor = ?, saveContent = ? WHERE id = ?', [saveTitle, saveAuthor, saveContent, id], (err, result) => {
          if (err) {
            console.error(err);
            return res.status(500).send('Error updating post');
          }
          res.send(result);
        });
      });

  router.delete('/:postId', (req, res) => {
    const postId = req.params.postId;
    
    con.connect(function(err) {
      if (err) {
        console.log(err);
        return;
      }
  
      const sql = 'DELETE FROM posts WHERE id = ?';
  
      con.query(sql, [postId], function(err, result) {
        if (err) {
          console.log(err);
          return;
        }
        console.log('result', result);
        res.send(result);
      });
    });
  });
  
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


module.exports = router;