declare function rmFile(path: string): Promise<void>

declare namespace rmFile {
  export function sync(path: string): void
}

export = rmFile
