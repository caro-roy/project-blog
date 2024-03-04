import { compileMDX } from 'next-mdx-remote/rsc'

import fs from 'fs/promises'
const path = require('path')
import React from 'react'

import BlogHero from '@/components/BlogHero'

import styles from './postSlug.module.css'

async function BlogPost({ params }) {
  const { postSlug } = params

  const postPath = path.resolve('./content/', `${postSlug}.mdx`)
  const rawPost = await fs.readFile(postPath, 'utf8')

  const {
    content,
    frontmatter: { title, publishedOn },
  } = await compileMDX({
    source: rawPost,
    options: { parseFrontmatter: true },
  })

  return (
    <article className={styles.wrapper}>
      <BlogHero title={title} publishedOn={publishedOn} />
      <div className={styles.page}>{content}</div>
    </article>
  )
}

export default BlogPost
