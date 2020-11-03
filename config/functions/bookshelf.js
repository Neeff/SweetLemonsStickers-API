'use strict';
const bookshelfCascade = require('bookshelf-cascade-delete');

module.exports = (bookshelf, connection) => {
  bookshelf.plugin(bookshelfCascade);
}
