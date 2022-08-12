import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AddBlog from './AddBlog'

describe('<AddBlog />', () => {
  let createBlog
  let container

  const user = userEvent.setup()

  beforeEach(() => {
    createBlog = jest.fn()
    container = render(<AddBlog createBlog={createBlog} />).container
  })

  test('check createBlog form data', async () => {
    const titleInput = container.querySelector('input[name="title"]')
    const urlInput = container.querySelector('input[name="url"]')
    const authorInput = container.querySelector('input[name="author"]')

    const button = container.querySelector('button[type="submit"]')

    await user.type(titleInput, 'title awesome')
    await user.type(urlInput, 'url awesome')
    await user.type(authorInput, 'author awesome')

    await user.click(button)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0]).toEqual({
      title: 'title awesome',
      url: 'url awesome',
      author: 'author awesome',
    })
  })
})
