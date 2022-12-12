import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'
import { render, screen } from '@testing-library/react'

import NewBlogForm from './NewBlogForm'

describe('<NewBlogForm/>', () => {
  test('the form should  calls the event handler it received as props with the right details when a new blog is created', async () => {
    const createBlogMock = jest.fn()

    const container = render(
      <NewBlogForm createBlog={createBlogMock}></NewBlogForm>
    ).container

    const user = userEvent.setup()

    let input = screen.getByPlaceholderText('blog title')
    await user.type(input, 'Test Blog Title')

    input = screen.getByPlaceholderText('blog author')
    await user.type(input, 'Test Blog Author')

    input = screen.getByPlaceholderText('blog url')
    await user.type(input, 'Test Blog Url')

    const createBlogButton = container.querySelector('.createBlogButton')
    await user.click(createBlogButton)

    expect(createBlogMock.mock.calls).toHaveLength(1)
    expect(createBlogMock.mock.calls[0]).toEqual([
      {
        title: 'Test Blog Title',
        url: 'Test Blog Url',
        author: 'Test Blog Author',
        likes: 0
      }
    ])
  })
})
