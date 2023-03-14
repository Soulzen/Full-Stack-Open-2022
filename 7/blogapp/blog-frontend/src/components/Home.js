import Togglable from './Toggable'
import NewBlogForm from './NewBlogForm'
import BlogList from './BlogList'
import { Container, Typography } from '@mui/material'

const Home = () => {
  return (
    <Container>
      <Typography
        variant="h1"
        align="center"
        gutterBottom
        sx={{ fontWeight: 'bold', color: 'primary' }}
      >
        BLOGS
      </Typography>
      <Togglable buttonLabel="New Blog">
        <NewBlogForm />
      </Togglable>
      <BlogList />
    </Container>
  )
}

export default Home
