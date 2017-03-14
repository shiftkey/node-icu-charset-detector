const expect = require('chai').expect
const fs = require('fs')
const path = require('path')

const charsetDetector = require("../node-icu-charset-detector")

function getTestBuffer(fileName) {
  const fullPath = path.join(__dirname, 'fixtures', fileName)
  const buffer = fs.readFileSync(fullPath)
  return buffer
}

describe('detectCharset', function() {
  it('detects UTF-8 encoding in buffer', function() {
    const buffer = getTestBuffer("UTF-8.md")

    const charset = charsetDetector.detectCharset(buffer)
    expect(charset.toString()).to.equal('UTF-8')
    expect(charset.confidence).to.be.gte(90)
  });

  it('detects Shift-JIS encoding in long file', function() {
    const buffer = getTestBuffer("Shift-JIS.md")

    const charset = charsetDetector.detectCharset(buffer)
    expect(charset.toString()).to.equal('Shift_JIS')
    expect(charset.confidence).to.be.gte(90)
  });

  it('detects EUC-JP encoding in short file', function() {
    const buffer = getTestBuffer("euc-jp.md")

    const charset = charsetDetector.detectCharset(buffer)
    expect(charset.toString()).to.equal('EUC-JP')
    expect(charset.confidence).to.be.gte(90)
  });

  it('detects ISO-2022-JP encoding in long file', function() {
    const buffer = getTestBuffer("ISO-2022-JP.md")

    const charset = charsetDetector.detectCharset(buffer)
    expect(charset.toString()).to.equal('ISO-2022-JP')
    expect(charset.confidence).to.be.gte(90)
  });
});
