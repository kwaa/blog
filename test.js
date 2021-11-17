import { promises as fs, rename } from 'fs'
import * as path from 'path'
// import chokidar from 'chokidar'
// import chalk from 'chalk'

const config = {
  extensions: ['svelte', 'svx', 'md', 'js', 'ts'],
  rename: ['404'],
  catch: ['ENOENT', 'EEXIST'],
  parse: {
    enable: true,
    rename: { updated: 'lastmod', thumbnail: 'cover' },
    create: { date: 'auto', lastmod: 'force' }
  }
}

const parseFrontMatter = async (src, head) => {
  Object.entries(config.parse.rename).forEach(([before, after]) => {
    if (!head.includes(`${after}: `)) head = head.replace(new RegExp(`${before}: (.*)`, 'g'), `${after}: $1`)
  })
  await fs.stat(src).then(stat => {
    ;[
      ['date', stat.atime],
      ['lastmod', stat.mtime]
    ].forEach(([key, time]) => {
      time = new Date(time)
      time.setMinutes(time.getMinutes() - time.getTimezoneOffset())
      if (head.includes(`${key}: `)) {
        if (config.parse.create?.[key] === 'force')
          head = head.replace(new RegExp(`${key}: (.*)`, 'g'), `${key}: ${time.toJSON().substring(0, 19).replace('T', ' ')}`)
      } else if (config.parse.create?.[key] !== false) {
        head += `\n${key}: ${time.toJSON().substring(0, 19).replace('T', ' ')}`
      }
    })
  })
  return head
}

const parse = async (src, post, fm = /---\n([\s\S]*?)\n---/g) => {
  let [head, body] = post.startsWith('---') ? [post.match(fm)[0].slice(4, -4), post.replace(fm, '')] : ['', post]
  return `---\n${await parseFrontMatter(src, head)}\n---${body}`
}

const read = async src =>
  await fs
    .readFile(src, 'utf8')
    .then(post => parse(src, post))
    .then(console.log)
    .catch(console.log)

read('urara/example/.index.md')

// ? post.match(/---\n([\s\S]*?)\n---/g)[0].replaceAll('---', '').includes('date: ')
// ? await fs.stat('urara/example/.index.md')
//     .then(stat => {
//         return post + '\ndate: ' + stat.atime
//     })
// : await fs.stat('urara/example/.index.md')
//     .then(stat => {
//         post += '\ndate: ' + stat.atime
//     })
