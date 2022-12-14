import Togglable from './Toggable'
import NewBlogForm from './NewBlogForm'
import BlogList from './BlogList'

const Home = () => {
  return (
    <div>
      <Togglable buttonLabel="New Blog">
        <NewBlogForm />
      </Togglable>
      <BlogList />
    </div>
  )
}

export default Home
