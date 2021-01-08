const crypto = require("crypto");
//const { performance } = require('perf_hooks');

module.exports = class Encrypt {
  // Sha 256-encryption with
  // the build in Node.js module crypto
  static encrypt(password) {
    return crypto
      .createHmac("sha256", require("./salt.json"))
      .update(password)
      .digest("hex");
  }

  static multiEncrypt(password, encryptTimes = 9999) {
    while (encryptTimes--) {
      password = this.encrypt(password);
    }
    return password;
  }
};
