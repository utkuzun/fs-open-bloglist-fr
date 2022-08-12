import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Blog from './Blog'

describe('<Blog />', () => {
  let container
  let updateBlog
  let removeBlog
  const user = userEvent.setup()

  beforeEach(() => {
    updateBlog = jest.fn()
    removeBlog = jest.fn()

    const blog = {
      title: 'utku',
      likes: 15,
      url: 'utku.com',
      author: 'utkuuzn',
    }

    container = render(
      <Blog updateBlog={updateBlog} removeBlog={removeBlog} blog={blog} />
    )
  })

  test('initial render test', () => {
    const author = container.queryByText('utkuuzn')
    const title = container.queryByText('utku')
    const likes = container.queryByText(15)
    const url = container.queryByText('utku.com')

    expect(author).toBeNull()
    expect(title).not.toBeNull()
    expect(likes).toBeNull()
    expect(url).toBeNull()
  })

  test('show details of a blog', async () => {
    const button = screen.queryByText('show')

    await user.click(button)

    let likes = container.queryByText('15', { exact: false })
    let url = container.queryByText('utku.com')

    expect(likes).not.toBeNull()
    expect(url).not.toBeNull()

    await user.click(button)

    likes = container.queryByText('15', { exact: false })
    url = container.queryByText('utku.com')

    expect(likes).toBeNull()
    expect(url).toBeNull()
  })

  test('check if like button works', async () => {
    const button = screen.queryByText('show')

    await user.click(button)

    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(updateBlog.mock.calls).toHaveLength(2)
  })
})
