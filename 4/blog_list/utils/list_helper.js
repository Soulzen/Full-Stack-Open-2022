const dummy = () => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.length ? blogs.reduce((prev, next) => prev + next.likes, 0) : 0
}

const favoriteBlog = (blogs) => {
  if (blogs.length) {
    const { title, author, likes } = blogs.sort((a, b) => b.likes - a.likes)[0]
    return { title, author, likes }
  } else {
    return {}
  }
}

const mostBlogs = (blogs) => {
  const groups = blogs.reduce((groups, item) => {
    const group = groups[item.author] || []
    group.push(item)
    groups[item.author] = group
    return groups
  }, {})

  const authorBlogs = Object.values(groups).map((authorlist) => {
    return { author: authorlist[0].author, blogs: authorlist.length }
  })

  const mostBlogs = authorBlogs.sort((a, b) => {
    return b.blogs - a.blogs
  })

  return mostBlogs[0] || {}
}

const mostLikes = (blogs) => {
  const groups = blogs.reduce((groups, item) => {
    const group = groups[item.author] || []
    group.push(item)
    groups[item.author] = group
    return groups
  }, {})

  const authorLikes = Object.values(groups).map((authorlist) => {
    return {
      author: authorlist[0].author,
      likes: authorlist.reduce((acc, next) => acc + next.likes, 0)
    }
  })

  const mostLikes = authorLikes.sort((a, b) => {
    return b.likes - a.likes
  })

  return mostLikes[0] || {}
}

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes }
