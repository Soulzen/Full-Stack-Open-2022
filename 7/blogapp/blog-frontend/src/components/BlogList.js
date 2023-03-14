import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { List, ListItem, ListItemText, ListItemButton } from '@mui/material'

const BlogList = () => {
  const sortedBlogs = useSelector(({ blogs }) => {
    return [...blogs].sort((a, b) => {
      return b.likes - a.likes
    })
  })

  return (
    <div>
      <List>
        {sortedBlogs.map(blog => (
          <ListItem key={blog.id}>
            <ListItemButton component={Link} to={`/blogs/${blog.id}`}>
              <ListItemText primary={blog.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  )
}

export default BlogList
