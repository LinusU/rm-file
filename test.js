/* eslint-env mocha */

import assert from 'assert'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

import { rmFile, rmFileSync } from './index.js'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

describe('rmFile', () => {
  it('removes a file', () => {
    const target = path.join(dirname, '460BF8B4-E631-4091-9B7C-7F42031145F1')

    fs.writeFileSync(target, '')

    return rmFile(target).then(() => {
      assert.strictEqual(fs.existsSync(target), false, `The file "${target}" should have been removed`)
    })
  })

  it('gives good ENOENT error', () => {
    const target = '/B7F5FA65-2D78-4AC2-82CF-BAF484A34A30'

    return assert.rejects(
      rmFile(target),
      err => (
        err.code === 'ENOENT' &&
        err.path === target &&
        err.message === `No file could be found at "${target}"`
      )
    )
  })

  it('gives good ENOTDIR error', () => {
    const target = path.join(filename, 'my-file')

    return assert.rejects(
      rmFile(target),
      err => (
        err.code === 'ENOTDIR' &&
        err.path === target &&
        err.message === `A component used as a directory in "${target}" is not, in fact, a directory`
      )
    )
  })
})

describe('rmFileSync', () => {
  it('removes a file', () => {
    const target = path.join(dirname, '460BF8B4-E631-4091-9B7C-7F42031145F1')

    fs.writeFileSync(target, '')

    rmFileSync(target)
    assert.strictEqual(fs.existsSync(target), false, `The file "${target}" should have been removed`)
  })

  it('gives good ENOENT error', () => {
    const target = '/B7F5FA65-2D78-4AC2-82CF-BAF484A34A31'

    assert.throws(
      () => rmFileSync(target),
      err => (
        err.code === 'ENOENT' &&
        err.path === target &&
        err.message === `No file could be found at "${target}"`
      )
    )
  })

  it('gives good ENOTDIR error', () => {
    const target = path.join(filename, 'my-file')

    assert.throws(
      () => rmFileSync(target),
      err => (
        err.code === 'ENOTDIR' &&
        err.path === target &&
        err.message === `A component used as a directory in "${target}" is not, in fact, a directory`
      )
    )
  })
})
