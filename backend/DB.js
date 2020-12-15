const sqlite3 = require("better-sqlite3");

// wrapper for async/await
module.exports = class DB {
  constructor(path) {
    this.db = new sqlite3.Database(path);
  }

  runner(method, query, params) {
    return new Promise((res) => {
      this.db[method](query, params, (err, result) => {
        if (err) {
          throw new Error(err);
        }
        res(result);
      });
    });
  }

  async get(...args) {
    return await this.runner("get", ...args);
  }

  async run(query, params) {
    return new Promise((res) => {
      this.db.run(query, params, function (err) {
        if (err) {
          throw new Error(err);
        }
        res(this);
      });
    });
  }

  async all(...args) {
    return await this.runner("all", ...args);
  }

  async each(...args) {
    return await this.runner("each", ...args);
  }
};
