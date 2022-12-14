import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import { initializeBlogs } from '../reducers/blogsReducer'

const BlogList = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  const sortedBlogs = useSelector(({ blogs }) => {
    return [...blogs].sort((a, b) => {
      return b.likes - a.likes
    })
  })

  const style = {
    padding: 10,
    paddingLeft: 4,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div>
      <ul>
        {sortedBlogs.map(blog => (
          <li style={style} key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default BlogList
