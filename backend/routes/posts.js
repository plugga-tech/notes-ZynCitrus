const express = require('express');
const app = require('../app.js');
const router = express.Router();

router.get('/', (request, response) => {
    router.get('/all', (req, res) => {
        con.connect(function(err) {
          if (err) {
            console.log(err);
            return;
          }
      
          const sql = 'SELECT * FROM posts';
      
          con.query(sql, function(err, result) {
            if (err) {
              console.log(err);
              return;
            }
            console.log('result', result);
            res.send(result);
          });
        });
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
      });
    });
  });

  router.put('/:id', (req, res) => {
    const postId = req.params.id;
    const updateTitle = req.body.title;
    const updateAuthor = req.body.author;
    const updateContent = req.body.content;
  
    con.connect(function(err) {
      if (err) {
        console.log(err);
        return;
      }
  
      const sql = 'UPDATE posts SET title = ?, author = ?, content = ? WHERE id = ?';
  
      con.query(sql, [updateTitle, updateAuthor, updateContent, postId], function(err, result) {
        if (err) {
          console.log(err);
          return;
        }
        console.log('result', result);
        res.send(result);
      });
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
  


module.exports = router;