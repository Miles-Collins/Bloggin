<template>

  <router-link :to="{name: 'Blog', params: {blogId: blog.id}}">
<div @click="setActiveBlog()" class="blog-card container-fluid align-items-center text-white text-shadow selectable">
  <div>
      <h3 class="">{{blog.title}}</h3>
      <p class="blog-creator">By: {{blog.creator.name}}</p>
  </div>
</div>
  </router-link>

<!-- <div class="blog-creator" v-if="blog.creator">
  <router-link :to="{ name: 'Blog', params: { blogId: blogId} }></router-link>
</div> -->

</template>

<script>
import { computed } from "@vue/reactivity";
import { Blog } from "../models/Blog";
import { blogsService } from "../services/BlogsService";


export default {
props: {
  blog: {type: Blog, required: true}
},



setup(props) {

  return {
    cover: computed(() => `url(${props.blog.img})`),
    setActiveBlog() {
      blogsService.setActiveBlog()
    }
  };

  }
}
</script>

<style> 

.img {
  height: 50px
}

.blog-card{
  min-height: 250px;
  background-image: v-bind(cover);
  background-size: cover;
  background-position: center;

}

.text-shadow {
  text-shadow: 2px 2px #000000;
}

.blog-creator {
  position: absolute;
  bottom: 0rem;
  right: 1rem
}

</style>