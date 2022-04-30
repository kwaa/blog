/**
 * Urara.JS
 * Version: Crazy Universe
 */

import { promises as fs } from 'fs'
import * as path from 'path'
import chokidar from 'chokidar'
import chalk from 'chalk'
import sharp from 'sharp'

const config = {
  extensions: ['svelte', 'md', 'js', 'ts'],
  rename: ['404'],
  catch: ['ENOENT', 'EEXIST']
}

const check = ext => (config.extensions.includes(ext) ? 'src/routes' : 'static')

const log = (color, msg, dest) =>
  console.log(
    chalk.dim(new Date().toLocaleTimeString() + ' ') +
      chalk.magentaBright.bold('[urara] ') +
      chalk[color](msg + ' ') +
      chalk.dim(dest ?? '')
  )

const error = err => {
  if (config.catch.includes(err.code)) {
    console.log(
      chalk.dim(new Date().toLocaleTimeString() + ' ') +
        chalk.redBright.bold('[urara] ') +
        chalk.red('error ') +
        chalk.dim(err.message)
    )
  } else {
    throw err
  }
}

const cpFile = (src, { stat = 'copy', dest = path.join(check(path.parse(src).ext.slice(1)), src.slice(6)) } = {}) =>
  fs
    .copyFile(src, dest)
    .then(log('green', `${stat} file`, dest))
    .catch(error)

const rmFile = (src, { dest = path.join(check(path.parse(src).ext.slice(1)), src.slice(6)) } = {}) =>
  fs.rm(dest).then(log('yellow', 'remove file', dest)).catch(error)

// const cpDir = src =>
//   fs.readdir(src, { withFileTypes: true }).then(files =>
//     files.forEach(file => {
//       const dest = path.join(src, file.name)
//       if (file.isDirectory()) {
//         mkDir(dest)
//         cpDir(dest)
//       } else if (file.name.startsWith('.')) {
//         log('cyan', 'ignore file', dest)
//       } else {
//         cpFile(dest)
//       }
//     })
//   )

const mkDir = (src, { dest = [path.join('src/routes', src.slice(6)), path.join('static', src.slice(6))] } = {}) => {
  dest.forEach(path => fs.mkdir(path).then(log('green', 'make dir', path)).catch(error))
}

const rmDir = (src, { dest = [path.join('src/routes', src.slice(6)), path.join('static', src.slice(6))] } = {}) => {
  dest.forEach(path => fs.rm(path, { force: true, recursive: true }).then(log('yellow', 'remove dir', path)).catch(error))
}

// const cleanDir = src =>
//   fs.readdir(src, { withFileTypes: true }).then(files => {
//     files.forEach(file => {
//       const dest = path.join(src, file.name)
//       file.isDirectory() ? rmDir(dest) : file.name.startsWith('.') ? log('cyan', 'ignore file', dest) : rmFile(dest)
//     })
//   })

const build = async () => {
  makeDir({ dest: ['static'] })
  // cpDir('urara')
  copyDir((await scanDir('urara')).flat())
}

const clean = async () => {
  cleanDir(cleanDirExtra((await scanDir('urara')).flat()))
  removeDir({ dest: ['static'] })
}

// TODO: LATEST VERSION

const copyFile = ({ src, stat = 'copy', dest = path.join(check(path.parse(src).ext.slice(1)), src.slice(6)) } = {}) =>
  fs
    .copyFile(src, dest)
    .then(log('green', `${stat} file`, dest))
    .catch(error)

const removeDir = async ({ src, dest = [path.join('src/routes', src.slice(6)), path.join('static', src.slice(6))] } = {}) =>
  // {
  //   for await (const files of dest.map(async path => await fs.readdir(path))) {
  //     if (!files.length || files.length < 1) {
  //       fs.rm(path, { recursive: true }).then(log('yellow', 'remove dir', path)).catch(error)
  //     } else {
  //       log('cyan', 'ignore non-empty dir', dest)
  //       files.forEach(file => console.log(file))
  //     }
  //   }
  // }
  await Promise.all(
    dest.map(
      async path =>
        await fs
          .readdir(path)
          .then(files => {
            if (!files.length || files.length < 1) {
              fs.rm(path, { recursive: true }).then(log('yellow', 'remove dir', path)).catch(error)
            } else {
              log('cyan', 'ignore non-empty dir', dest)
              files.forEach(file => console.log(file))
            }
          })
          .catch(error)
    )
  )

// for await (const files of dest.map(async path => fs.readdir(path))) {
//   if (!files.length || files.length < 1) {
//     fs.rm(path, { recursive: true }).then(log('yellow', 'remove dir', path)).catch(error)
//   } else {
//     log('cyan', 'ignore non-empty dir', dest)
//     files.forEach(file => console.log(file))
//   }
// }

//  {
//   for (const path of dest) {
//     await fs
//       .readdir(path)
//       .then(files => {
//         if (!files.length || files.length < 1) {
//           fs.rm(path, { recursive: true }).then(log('yellow', 'remove dir', path)).catch(error)
//         } else {
//           log('cyan', 'ignore non-empty dir', dest)
//           files.forEach(file => console.log(file))
//         }
//       })
//       .catch(error)
//   }
// }
// dest.forEach(path =>
//   fs
//     .readdir(path)
//     .then(files => {
//       if (!files.length || files.length < 1) {
//         fs.rm(path, { recursive: true }).then(log('yellow', 'remove dir', path)).catch(error)
//       } else {
//         log('cyan', 'ignore non-empty dir', dest)
//         files.forEach(file => console.log(file))
//       }
//     })
//     .catch(error)
// )

const removeFile = async ({ src, dest = path.join(check(path.parse(src).ext.slice(1)), src.slice(6)) } = {}) => {
  await fs.rm(dest).then(log('yellow', 'remove file', dest)).catch(error)
  await removeDir({ dest: [path.parse(dest).dir] })
}

const makeDir = ({ src, dest = [path.join('src/routes', src.slice(6)), path.join('static', src.slice(6))] } = {}) =>
  dest.forEach(path => fs.mkdir(path).then(log('green', 'make dir', path)).catch(error))

const scanDir = async src =>
  await fs.readdir(src, { withFileTypes: true }).then(
    async files =>
      await Promise.all(
        files.map(async file =>
          file.isDirectory()
            ? [
                {
                  src: path.join(src, file.name),
                  dest: path.join('src/routes', src.slice(5), file.name),
                  type: 'dir',
                  depth: path.join(src.slice(6), file.name).split('/').length - 1
                },
                {
                  src: path.join(src, file.name),
                  dest: path.join('static', src.slice(5), file.name),
                  type: 'dir',
                  depth: path.join(src.slice(6), file.name).split('/').length - 1
                },
                ...(await scanDir(path.join(src, file.name))).flat()
              ]
            : [
                {
                  src: path.join(src, file.name),
                  dest: path.join(check(path.parse(file.name).ext.slice(1)), src.slice(6), file.name),
                  type: 'file',
                  ext: path.parse(file.name).ext,
                  depth: path.join(src.slice(6), file.name).split('/').length - 1
                }
              ]
        )
      )
  )

const copyDir = async files =>
  files
    .sort((a, b) => a.depth - b.depth)
    .forEach(file => (file.type === 'dir' ? makeDir({ dest: [file.dest] }) : handleFile(file)))

const cleanDir = files =>
  files
    .sort((a, b) => b.type.localeCompare(a.type) || b.depth - a.depth)
    .forEach(async file =>
      file.type === 'dir' ? await removeDir({ dest: [file.dest] }) : await removeFile({ dest: file.dest })
    )
// .forEach(file => (file.type === 'dir' ? console.log(file.dest) : removeFile({ dest: file.dest })))
// console.log(files.sort((a, b) => b.type.localeCompare(a.type) || b.depth - a.depth))

const handleFile = async ({ src, dest, ext }) => {
  if (ext === '.avif') {
    copyFile({ src, dest })
    // sharp(file.src)
    //   .resize(384)
    //   .toFile(file.dest.slice(0, -5) + '_384.avif')
    sharp(src)
      .resize(768)
      .toFile(dest.slice(0, -5) + '_768.avif', (err, info) => console.log(err ? err : info))
    // log('green', 'generate file', dest.slice(0, -5) + '_768.avif')
  } else {
    copyFile({ src, dest })
  }
}

const cleanDirExtra = files =>
  files.flatMap(file => (file.ext === '.avif' ? [file, { ...file, dest: file.dest.slice(0, -5) + '_768.avif' }] : [file]))

switch (process.argv[2]) {
  case 'watch':
    {
      let watcher = chokidar.watch('urara', {
        ignored: file => path.basename(file).startsWith('.')
      })
      watcher
        .on('add', file => cpFile(file))
        .on('change', file => cpFile(file, { stat: 'update' }))
        .on('unlink', file => rmFile(file))
        .on('addDir', dir => mkDir(dir))
        .on('unlinkDir', dir => rmDir(dir))
        .on('error', error => log('red', 'error', error))
        .on('ready', () => log('cyan', 'copy complete. ready for changes'))
      process
        .on('SIGINT', () => {
          log('red', 'sigint')
          clean()
          watcher?.close()
        })
        .on('SIGTERM', () => {
          log('red', 'sigterm')
          watcher?.close()
        })
        .on('exit', () => {
          log('red', 'exit')
        })
    }
    break
  case 'build':
    build()
    break
  case 'clean':
    clean()
    break
  // case 'rename':
  //   rename()
  //   break
  case 'scan':
    console.log((await scanDir('urara')).flat())
    break
  default:
    log('red', 'error', 'invalid arguments')
    break
}
