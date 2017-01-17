const expect = require('chai').expect
const fs = require('fs')
const path = require('path')

const charsetDetector = require("../node-icu-charset-detector")

function getTestFixture(relativePath) {
  const fullPath = path.join(__dirname, 'fixtures', relativePath)
  const buffer = fs.readFileSync(fullPath)
  return buffer
}

describe('detectCharset', function() {
  describe('detect UTF-8 files', function() {
    it('detects encoding in buffer', function() {
      const buffer = getTestFixture("UTF-8.md")

      const charset = charsetDetector.detectCharset(buffer)
      expect(charset.toString()).to.equal('UTF-8')
      expect(charset.confidence).to.be.gte(10)
    });
  });
});
