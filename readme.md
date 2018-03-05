# rm-file

Remove a file

- Promise interface.
- User-friendly errors.

## Installation

```sh
npm install --save rm-file
```

## Usage

```js
const rmFile = require('rm-file')

rmFile('useless-file.txt').then(() => {
  console.log('File removed')
})
```

## API

### rmFile(path)

Returns a `Promise`.

### rmFile.sync(path)

#### path

Type: `string`

File you want to remove.

## Related

- [cp-file](https://github.com/sindresorhus/cp-file) - Copy a single file
- [make-dir](https://github.com/sindresorhus/make-dir) - Make a directory and its parents if needed
