'use strict'

const fs = require('fs')

const NestedError = require('nested-error-stacks')

class RmFileError extends NestedError {
  constructor (message, nested) {
    super(message, nested)
    Object.assign(this, nested)
    this.name = 'RmFileError'
  }
}

module.exports = function rmFile (path) {
  return new Promise((resolve, reject) => {
    fs.unlink(path, (err) => {
      if (!err) return resolve()

      switch (err.code) {
        case 'ENOENT':
          return reject(new RmFileError(`No file could be found at "${path}"`, err))
        case 'ENOTDIR':
          return reject(new RmFileError(`A component used as a directory in "${path}" is not, in fact, a directory`, err))
        default:
          return reject(new RmFileError(`Failed to remove file "${path}"`, err))
      }
    })
  })
}
