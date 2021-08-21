import fs from 'node:fs'
import NestedError from 'nested-error-stacks'

class RmFileError extends NestedError {
  constructor (message, nested) {
    super(message, nested)
    Object.assign(this, nested)
    this.name = 'RmFileError'
  }
}

function createError (error, path) {
  switch (error.code) {
    case 'ENOENT':
      return new RmFileError(`No file could be found at "${path}"`, error)
    case 'ENOTDIR':
      return new RmFileError(`A component used as a directory in "${path}" is not, in fact, a directory`, error)
    default:
      return new RmFileError(`Failed to remove file "${path}"`, error)
  }
}

export async function rmFile (path) {
  try {
    await fs.promises.unlink(path)
  } catch (error) {
    throw createError(error, path)
  }
}

export function rmFileSync (path) {
  try {
    fs.unlinkSync(path)
  } catch (error) {
    throw createError(error, path)
  }
}
