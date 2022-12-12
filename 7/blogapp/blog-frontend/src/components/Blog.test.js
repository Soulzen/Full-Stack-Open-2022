import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'
import { render } from '@testing-library/react'

import Blog from './Blog'

describe('<Blog/>', () => {
  let container
  let mockCallbackLike
  let mockCallbackDelete

  beforeEach(() => {
    const blog = {
      title: 'Test Blog',
      author: 'Alberto N',
      url: 'www.fakeurl.com',
      likes: 0,
      user: {
        username: 'Alberto',
        name: 'Alberto'
      }
    }

    mockCallbackLike = jest.fn()
    mockCallbackDelete = jest.fn()

    const user = {
      username: 'Alberto',
      name: 'Alberto'
    }

    container = render(
      <Blog
        blog={blog}
        addLike={mockCallbackLike}
        user={user}
        deleteBlog={mockCallbackDelete}
      />
    ).container
  })

  test('should render title but no author, url or likes', () => {
    const blogDiv = container.querySelector('.blog')
    expect(blogDiv).toHaveTextContent('Test Blog')
    expect(blogDiv).not.toHaveTextContent('Alberto N')
    expect(blogDiv).not.toHaveTextContent('www.fakeurl.com')
    expect(blogDiv).not.toHaveTextContent('Likes: 0')
  })

  test('should show author, url and likes after pressing show', async () => {
    const user = userEvent.setup()
    const showButton = container.querySelector('.showButton')
    await user.click(showButton)
    const blogDiv = container.querySelector('.blog')
    expect(blogDiv).toHaveTextContent('Alberto N')
    expect(blogDiv).toHaveTextContent('www.fakeurl.com')
    expect(blogDiv).toHaveTextContent('Likes: 0')
  })

  test(' if the like button is clicked twice, the event handler the component received as props is called twice', async () => {
    const user = userEvent.setup()
    const showButton = container.querySelector('.showButton')
    await user.click(showButton)
    const likeButton = container.querySelector('.likeButton')
    await user.click(likeButton)
    await user.click(likeButton)
    expect(mockCallbackLike.mock.calls).toHaveLength(2)
  })
})
