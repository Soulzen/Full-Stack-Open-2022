import Login from './Login'
import Togglable from './Toggable'
import NewBlogForm from './NewBlogForm'
import BlogList from './BlogList'

const Home = () => {
  return (
    <div>
      <Login />
      <Togglable buttonLabel="New Blog">
        <NewBlogForm />
      </Togglable>
      <BlogList />
    </div>
  )
}

export default Home
