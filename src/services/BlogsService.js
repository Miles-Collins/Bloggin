import { AppState } from "../AppState"
import { Blog } from "../models/Blog"
import { bcwSandbox } from "./AxiosService"

class BlogsService {

async getBlogs() {
  let res = await bcwSandbox.get('/api/blogs')
  console.log('Blog data', res.data)
  AppState.blogs = res.data.map(b => new Blog(b))
}

}

export const blogsService = new BlogsService()