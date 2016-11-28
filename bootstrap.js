const decompress = require('decompress')
var fs = require('fs')
var mkdirp = require('mkdirp')
var path = require('path')
var request = require('request')

var proxy = process.env.NPM_CONFIG_HTTPS_PROXY ||
  process.env.npm_config_https_proxy ||
  process.env.NPM_CONFIG_PROXY ||
  process.env.npm_config_proxy

var config = {
  outputPath: path.join(__dirname, 'external', process.platform),
  proxy: proxy
}

function handleError (url, error) {
  if (!error) return

  var message = error.message || error
  console.error('Downloading ' + url + ' failed: ' + message)
  process.exit(1)
}

function unzip (zipped, callback) {
  decompress(zipped, config.outputPath)
    .then(files => callback())
    .catch(error => callback(error))
}

mkdirp(config.outputPath, function (error) {
  var fullUrl = ''

  if (process.platform === 'win32') {
    fullUrl = 'https://ssl.icu-project.org/files/icu4c/58.1/icu4c-58_1-Win64-MSVC2015.zip'
  } else if (process.platform === 'darwin') {
    fullUrl = 'https://ssl.icu-project.org/files/icu4c/58.1/icu4c-58_1-AIX7_1-VA2.tgz'
  } else {
    console.error('Platform \'' + process.platform +'\' not supported')
    process.exit(1)
  }

  if (error) return handleError(fullUrl, error)

  request.get({uri: fullUrl, encoding: null, proxy: config.proxy}, function (error, response, body) {
    if (error) return handleError(fullUrl, error)
    if (response.statusCode !== 200) return handleError(fullUrl, Error('Non-200 response (' + response.statusCode + ')'))
    unzip(body, function (error) {
      if (error) return handleError(fullUrl, error)
    })
  })
})
