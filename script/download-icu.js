const checksum = require('checksum')
const request = require('request')
const ProgressBar = require('progress')
const tmpdir = require('os-tmpdir')
const mkdirp = require('mkdirp')
const path = require('path')

var config = { }

if (process.platform === 'win32') {
  config.source = `http://download.icu-project.org/files/icu4c/58.2/icu4c-58_2-Win64-MSVC2015.zip`
  config.checksum = '42804ab437c963f906bb0f18817ef7fddda30a0155a4b602e5b359913a109dec'
} else {
  console.log('skipping download as prepackaged binaries are not readily available right now...')
  process.exit(0)
}

const dir = tmpdir()
const temporaryFile = path.join(dir, config.fileName)

const verifyFile = function (file, callback) {
  checksum.file(file, { algorithm: 'sha256' }, (_, hash) => {
    callback(hash === config.checksum)
  })
}

const unpackFile = function (file) {
  extract(file, function (error) {
    if (error) {
      return handleError(fullUrl, error)
    }
  })
}

const downloadCallback = function (error, response, body) {
  if (error) {
    return handleError(fullUrl, error)
  }

  if (response.statusCode !== 200) {
    return handleError(fullUrl, Error(`Non-200 response (${response.statusCode})`))
  }

  fs.createWriteStream(temporaryFile).write(body, function (error) {
    if (error) {
      return handleError(fullUrl, error)
    }

    verifyFile(temporaryFile, valid => {
      if (valid) {
        unpackFile(temporaryFile)
      } else {
        console.log(`checksum verification failed, refusing to unpack...`)
        process.exit(1)
      }
    })
  })
}


const req = request.get(source, { encoding: null }, downloadCallback)

req.on('response', function (res) {
  const len = parseInt(res.headers['content-length'], 10)

  console.log()
  const bar = new ProgressBar('Downloading ICU4C [:bar] :percent :etas', {
    complete: '=',
    incomplete: ' ',
    width: 50,
    total: len
  })

  res.on('data', function (chunk) {
    bar.tick(chunk.length)
  })

  res.on('end', function () {
    console.log('\n')
  })
})
