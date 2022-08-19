import { AppState } from "../AppState"
import { Blog } from "../models/Blog"
import { bcwSandbox } from "./AxiosService"

class BlogsService {

async getBlogs() {
  let res = await bcwSandbox.get('/api/blogs')
  // console.log('Blog data', res.data)
  AppState.blogs = res.data.map(b => new Blog(b))
}

setActiveBlog(blog) {
  AppState.activeBlog = blog
}

async getBlogById(blogId) {
  const res = await bcwSandbox.get(`api/blogs/${blogId}`)
  AppState.activeBlog = new Blog(res.data)
}

async createBlog(blogFormData) {
  const res = await bcwSandbox.post('api/blogs', blogFormData)
  let blog = new Blog(res.data)
  AppState.blogs = [...AppState.blogs, blog]
}

async deleteBlog(blogId) {
  let url = `api/blogs/${blogId}`
  await bcwSandbox.delete(url)
  AppState.blogs = AppState.blogs.filter(b => b.id != blogId)
}

async editBlog(blogData) {
  const res = await bcwSandbox.put(`/api/blogs/${blogData.id}`, blogData)
  let blog = new Blog(res.data)
  let blogIndex = AppState.blogs.findIndex(b => b.id == blogData.id)
  AppState.blogs.splice(blogIndex, 1, blog)
}

}

export const blogsService = new BlogsService()