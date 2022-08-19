<template>

<div class="container">
  <div class="row justify-content-center">
    <div class="col-3 m-auto my-3 card mx-3 elevation-2 " v-for="b in blogs" :key="b.id">
        <BlogCard :blog="b" />
    </div>
</div>
</div>

</template>

<script>
import { blogsService } from '../services/BlogsService.js';
import { logger } from '../utils/Logger.js';
import { onMounted } from 'vue'
import { computed } from "@vue/reactivity";
import { AppState } from "../AppState";
import BlogCard from "../components/BlogCard.vue";


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
    components: { BlogCard }
}
</script>

<style>
</style>