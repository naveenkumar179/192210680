const express = require('express');
const usersRouter = require('./routes/users');
const postsRouter = require('./routes/posts');

const app = express();
const PORT = 3000;

app.use('/users', usersRouter);
app.use('/posts', postsRouter);

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
