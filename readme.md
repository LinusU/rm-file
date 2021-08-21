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
import { rmFile } from 'rm-file'

await rmFile('useless-file.txt')
```

### Sync

```js
import { rmFileSync } from 'rm-file'

rmFileSync('useless-file.txt')
```

## API

### `rmFile(path)`

- `path` (`string | Buffer | URL`, required)
- returns `Promise<void>`

### `rmFileSync(path)`

- `path` (`string | Buffer | URL`, required)

## Related

- [cp-file](https://github.com/sindresorhus/cp-file) - Copy a single file
- [make-dir](https://github.com/sindresorhus/make-dir) - Make a directory and its parents if needed
