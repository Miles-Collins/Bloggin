<template>

<div class="blog-page" v-if="blog">
  <div class="cover-img text-white text-shadow">
    <h1>{{blog.title}}</h1>
    <h3>Created By: {{blog.creator.name}}</h3>
    <h5>{{blog.body}}</h5>
    <button class="btn btn-danger" @click="deleteBlog(blog)">delete me</button>
  </div>
  
</div>
<div v-else>
  loading...
</div>

</template>

<script>
import { computed } from "@vue/reactivity";
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import { AppState } from "../AppState";
import { blogsService } from "../services/BlogsService";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";


export default {

setup() {

const route = useRoute()

async function getBlogById() {
  try {
    await blogsService.getBlogById(route.params.blogId)
  } catch (error) {
    logger.error('[Getting Blog by Id]', error)
    Pop.toast(error.message, 'error')
  }
}

onMounted(() => {
  getBlogById()
})

  return {
    blog: computed(() => AppState.activeBlog),
    cover: computed(() => `url(${AppState.activeBlog?.img || 'https://cdn.pixabay.com/photo/2017/07/16/17/33/background-2509983_1280.jpg'})`),

    async deleteBlog(blog) {
      try {
       const yes = await Pop.confirm('Delete this blog?')
       if (!yes) {return}
       await blogsService.deleteBlog(blog.id) 
      } catch (error) {
        logger.error(error)
        Pop.toast(error.message, 'error')
      }
    }
  };

  }
}
</script>

<style> 

.cover-img{
  min-height: 100vh;
  background-image: v-bind(cover);
  background-size: cover;
  background-position: center;
}

.text-shadow {
  text-shadow: 2px 2px #000000;
}

</style>