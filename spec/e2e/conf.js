exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['gamespec.js'],
  capabilites: {
    browserName: 'chrome'
  }
}