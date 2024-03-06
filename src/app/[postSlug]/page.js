import { MDXRemote } from 'next-mdx-remote/rsc'
import React from 'react'

import BlogHero from '@/components/BlogHero'
import { loadBlogPost } from '@/helpers/file-helpers'
import styles from './postSlug.module.css'
import CodeSnippet from '@/components/CodeSnippet'

import DivisionGroupsDemo from '@/components/DivisionGroupsDemo'
import CircularColorsDemo from '@/components/CircularColorsDemo'

export async function generateMetadata({ params }) {
  const { postSlug } = params

  const {
    frontmatter: { title, abstract },
  } = await loadBlogPost(postSlug)

  return {
    title,
    description: abstract,
  }
}

const components = {
  pre: CodeSnippet,
  DivisionGroupsDemo,
  CircularColorsDemo,
}

async function BlogPost({ params }) {
  const { postSlug } = params

  const {
    frontmatter: { title, publishedOn },
    content,
  } = await loadBlogPost(postSlug)

  return (
    <article className={styles.wrapper}>
      <BlogHero title={title} publishedOn={publishedOn} />
      <div className={styles.page}>
        <MDXRemote source={content} components={components} />
      </div>
    </article>
  )
}

export default BlogPost
