import React from 'react'

import BlogSummaryCard from '@/components/BlogSummaryCard'

import styles from './homepage.module.css'
import { getBlogPostList } from '@/helpers/file-helpers'

async function Home() {
  const posts = await getBlogPostList()

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.mainHeading}>Latest Content:</h1>
      {posts.map(post => (
        <BlogSummaryCard {...post} key={post.slug} />
      ))}
    </div>
  )
}

export default Home
