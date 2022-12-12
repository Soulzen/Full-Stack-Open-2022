import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { initializeBlogs } from '../reducers/blogsReducer'

import Blog from './Blog'

const BlogList = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  const user = useSelector(({ loggedUser }) => loggedUser)
  const sortedBlogs = useSelector(({ blogs }) => {
    return [...blogs].sort((a, b) => {
      return b.likes - a.likes
    })
  })
  return (
    <div>
      {sortedBlogs.map(blog => (
        <Blog key={blog.id} blog={blog} user={user} />
      ))}
    </div>
  )
}

export default BlogList
