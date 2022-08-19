<template>
  <form @submit.prevent="handleSubmit()" class="blog-form">
    <h3 class="text-primary">Create Blog</h3>
    <div class="row">

      <div class="col-8">
        <label class="form-label" for="title">Title</label>
        <input class="form-control" type="text" minlength="1" id="title" name="title" v-model="editable.title">
      </div>

        <div class="col-8">
          <label class="form-label" for="imgUrl">Image</label>
          <input class="form-control" type="text" id="imgUrl" name="imgUrl" v-model="editable.imgUrl">
        </div>

      <div class="col-10">
        <label class="form-label" for="body">Body</label>
        <textarea class="w-100 form-control" name="body" id="body" rows="5"
        v-model="editable.body"></textarea>
      </div>


      <button type="submit" class="btn btn-primary w-100 p-2 mt-3 text-light" data-bs-dismiss="modal">Submit</button>
    </div>
  </form>
</template>

<script>
import { ref, watchEffect } from "vue";
import { AppState } from "../AppState";
import { blogsService } from "../services/BlogsService";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";


export default {



setup() {

const editable = ref({})

watchEffect(() => {
  if(!AppState.activeBlog) {return}
  editable.value = {...AppState.activeBlog}
})

  return {
    editable,
    async handleSubmit() {
      try {
        if (editable.value.id) {
          blogsService.editBlog(editable.value)
        } else {
          blogsService.createBlog(editable.value)
        }
        editable.value = {}
      } catch (error) {
        logger.error('[Creating, or Editing Blog]', error)
        Pop.toast(error.message, 'error')
      }
    }
  };

  }
}
</script>

<style> 

</style>