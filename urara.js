/**
 * Urara.JS
 * Version: Crazy Universe
 */

import { promises as fs } from 'fs'
import * as path from 'path'
import chokidar from 'chokidar'
import chalk from 'chalk'

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

const rmFile = (src, dest = path.join(check(path.parse(src).ext.slice(1)), src.slice(6))) =>
  fs.rm(dest).then(log('yellow', 'remove file', dest)).catch(error)

const cpDir = src =>
  fs.readdir(src, { withFileTypes: true }).then(files =>
    files.forEach(file => {
      const dest = path.join(src, file.name)
      file.isDirectory()
        ? mkDir(dest).then(cpDir(dest))
        : file.name.startsWith('.')
          ? log('cyan', 'ignore file', dest)
          : cpFile(dest)
    })
  )

const mkDir = src =>
  fs
    .mkdir(path.join('src/routes', src.slice(6)), { recursive: true })
    .then(
      fs
        .mkdir(path.join('static', src.slice(6)), { recursive: true })
        .then(log('green', 'make dir', path.join('static', src.slice(6))))
        .catch(error)
    )
    .then(log('green', 'make dir', path.join('src/routes', src.slice(6))))
    .catch(error)

const rmDir = src =>
  fs
    .rm(path.join('src/routes', src.slice(6)), { force: true, recursive: true })
    .then(
      fs
        .rm(path.join('static', src.slice(6)), { force: true, recursive: true })
        .then(log('yellow', 'remove dir', path.join('static', src.slice(6))))
        .catch(error)
    )
    .then(log('yellow', 'remove dir', path.join('src/routes', src.slice(6))))
    .catch(error)

const cleanFile = src =>
    fs.readdir(src, { withFileTypes: true }).then(files => {
      files.forEach(file => {
        const dest = path.join(src, file.name)
        file.isDirectory()
          ? cleanFile(dest)
          : file.name.startsWith('.')
            ? log('cyan', 'ignore file', dest)
            : rmFile(dest)
      })
  })

const cleanDir = src =>
  fs.readdir(src, { withFileTypes: true }).then(files =>
    files.length === 0
      ? rmDir(src)
      : files.forEach(file => {
        if (file.isDirectory()) cleanDir(path.join(src, file.name))
      }))

const build = async () => {
  fs.mkdir('static').then(log('green', 'make dir', 'static')).catch(error)
  cpDir('urara')
}

const clean = async () => {
  // cleanFile('urara')
  // cleanDir('src/routes')
  // cleanDir('static')
  await cleanFile('urara')
    .then(cleanDir('src/routes'))
    .then(cleanDir('static'))
}
// for await (const f of cleanFile('urara'))

const rename = async () => {
  fs.readdir('build', { withFileTypes: true }).then(files =>
    files.forEach(file => {
      if (file.isDirectory() && config.rename.includes(file.name)) {
        log('cyan', 'find', file.name)
        const src = path.join('build', file.name, 'index.html')
        const dest = path.join('build', file.name + '.html')
        fs.copyFile(src, dest)
          .then(log('green', 'copy file', dest))
          .then(fs.rm(src).then(log('yellow', 'remove file', src)).catch(error))
          .catch(error)
      }
    })
  )
}

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
    build().then(log('cyan', 'copy complete.'))
    break
  case 'clean':
    clean().then(log('cyan', 'clean complete.'))
    break
  case 'rename':
    rename().then(log('cyan', 'rename complete.'))
    break
  default:
    log('red', 'error', 'invalid arguments')
    break
}
