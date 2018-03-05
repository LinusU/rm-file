/* eslint-env mocha */

'use strict'

const fs = require('fs')
const path = require('path')
const assert = require('assert')

const assertRejects = require('assert-rejects')

const rmFile = require('./')

describe('rm-file', () => {
  it('removes a file', () => {
    const target = path.join(__dirname, '460BF8B4-E631-4091-9B7C-7F42031145F1')

    fs.writeFileSync(target, '')

    return rmFile(target).then(() => {
      assert.strictEqual(fs.existsSync(target), false, `The file "${target}" should have been removed`)
    })
  })

  it('gives good ENOENT error', () => {
    const target = '/B7F5FA65-2D78-4AC2-82CF-BAF484A34A30'

    return assertRejects(
      rmFile(target),
      err => (
        err.code === 'ENOENT' &&
        err.path === target &&
        err.message === `No file could be found at "${target}"`
      )
    )
  })

  it('gives good ENOTDIR error', () => {
    const target = path.join(__filename, 'my-file')

    return assertRejects(
      rmFile(target),
      err => (
        err.code === 'ENOTDIR' &&
        err.path === target &&
        err.message === `A component used as a directory in "${target}" is not, in fact, a directory`
      )
    )
  })
})

describe('rm-file.sync', () => {
  it('removes a file', () => {
    const target = path.join(__dirname, '460BF8B4-E631-4091-9B7C-7F42031145F1')

    fs.writeFileSync(target, '')

    rmFile.sync(target)
    assert.strictEqual(fs.existsSync(target), false, `The file "${target}" should have been removed`)
  })

  it('gives good ENOENT error', () => {
    const target = '/B7F5FA65-2D78-4AC2-82CF-BAF484A34A31'

    assert.throws(
      () => rmFile.sync(target),
      err => (
        err.code === 'ENOENT' &&
        err.path === target &&
        err.message === `No file could be found at "${target}"`
      )
    )
  })

  it('gives good ENOTDIR error', () => {
    const target = path.join(__filename, 'my-file')

    assert.throws(
      () => rmFile.sync(target),
      err => (
        err.code === 'ENOTDIR' &&
        err.path === target &&
        err.message === `A component used as a directory in "${target}" is not, in fact, a directory`
      )
    )
  })
})
