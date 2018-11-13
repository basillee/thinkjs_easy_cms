const Base = require('./base.js');
const utils = require('./util/utils');
module.exports = class extends Base {
  indexAction() {
    utils.interfaceCallCount(utils.const_qrcode_querySingleQrcodeUrl);
    return this.display();
  }
};
