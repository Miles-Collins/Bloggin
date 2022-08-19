<template>

<div class="container">
  <div class="row justify-content-center">
    <div class="col-md-3 m-auto my-3 card elevation-2 p-0" v-for="b in blogs" :key="b.id">
        <BlogCard :blog="b" />
    </div>
</div>
<button class="btn btn-fab btn-primary fixed-bottom" title="Add Blog" data-bs-toggle="modal" data-bs-target="#blog-form"
>+</button>
</div>

<Modal id="blog-form">
    <BlogForm />
</Modal>

</template>

<script>
import { blogsService } from '../services/BlogsService.js';
import { logger } from '../utils/Logger.js';
import { onMounted } from 'vue'
import { computed } from "@vue/reactivity";
import { AppState } from "../AppState";
import BlogCard from "../components/BlogCard.vue";
import BlogForm from "../components/BlogForm.vue";


export default {
    setup() {
        async function getBlogs() {
            try {
                await blogsService.getBlogs();
            }
            catch (error) {
                logger.error("[Getting Blogs]", error);
                Pop.toast(error.message, "error");
            }
        }
        onMounted(() => {
            getBlogs();
        });
        return {
            blogs: computed(() => AppState.blogs)
        };
    },
    components: { BlogCard, BlogForm }
}
</script>

<style>
</style>