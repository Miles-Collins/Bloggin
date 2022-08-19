<template>

<div class="blog-card container-fluid text-center align-items-center text-white text-shadow">
  <router-link :to="{name: 'Blog', params: {blogId: blog.id}}">
  <div>
      <h3 class="">{{blog.title}}</h3>
      <p>By: {{blog.creator.name}}</p>
  </div>
  <div class="">
    <p>{{blog.createdAt}}</p>
  </div>
  </router-link>
</div>

<!-- <div class="blog-creator" v-if="blog.creator">
  <router-link :to="{ name: 'Blog', params: { blogId: blogId} }></router-link>
</div> -->

</template>

<script>
import { computed } from "@vue/reactivity";
import { Blog } from "../models/Blog";


export default {
props: {
  blog: {type: Blog, required: true}
},



setup(props) {

  return {
    cover: computed(() => `url(${props.blog.img})`),
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
  bottom: 1rem;
  right: 1rem
}

</style>