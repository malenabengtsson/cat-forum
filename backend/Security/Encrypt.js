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

  // Multiencryption makes more cpu-expensive
  // to run a whole wordlist against a stolen database
  // of passwords...
  // But maybe (not implemented) we could be more obscure
  // by using the last encryption as the salt for the new
  // one - or incorporate and id in the DB as part of the salt
  // or a combination of things, BUT REMEMBER
  // Obfuscation can always be reverse-enginereed
  // if someone has your source-code...
  static multiEncrypt(password, encryptTimes = 9999) {
    while (encryptTimes--) {
      password = this.encrypt(password);
    }
    return password;
  }
};
