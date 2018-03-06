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

function createError (err, path) {
  switch (err.code) {
    case 'ENOENT':
      return new RmFileError(`No file could be found at "${path}"`, err)
    case 'ENOTDIR':
      return new RmFileError(`A component used as a directory in "${path}" is not, in fact, a directory`, err)
    default:
      return new RmFileError(`Failed to remove file "${path}"`, err)
  }
}

module.exports = function rmFile (path) {
  return new Promise((resolve, reject) => {
    fs.unlink(path, err => {
      if (err) reject(createError(err, path))
      resolve()
    })
  })
}

module.exports.sync = function rmFileSync (path) {
  try {
    fs.unlinkSync(path)
  } catch (err) {
    throw createError(err, path)
  }
}
