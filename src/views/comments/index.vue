<template>
  <div class="bg-white">
    <div class="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
      <div class="text-center">
        <p class="mt-1 text-4xl font-extrabold text-green-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            Default Post 1
        </p>
        <button
            type="button"
            @click="modalFormOpen = true"
            class="inline-flex inset-y-0 mt-5 items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Add Comment
        </button>
      </div>
    </div>

    <!-- Details -->
    <Details
        v-for="(item, index) in comments"
        :key="index"
        :item="item"/>

    <CommentForm
        :open="modalFormOpen"
        @close="handleCloseModal()"/>

  </div>
</template>

<script>

// Vue
import { ref, inject } from 'vue';

// Services
import http from '../../services/http.js';

// Components
import Details from './Details.vue';
import CommentForm from './Form.vue';

export default {
    name: 'Comment',

    components: {
        Details,
        CommentForm,
    },

    setup() {
        const isLoading = ref(false);
        const comments = ref([]);
        const emitter = inject('emitter');
        const modalFormOpen = ref(false);

        emitter.on('addComment', (value) => {
            handleAddComment(value);
        });

        const handleAddComment = (item) => {
            if (item.data.parent_id === null) {
                comments.value.unshift(item.data);
            } else {
                if (item.parent?.children) {
                    item.parent.children.unshift(item.data);
                } else {
                    item.parent.children = [];
                    item.parent.children.unshift(item.data);
                }
            }
        };

        const fetchComments = async () => {
            isLoading.value = true;

            const response = await http.get('comments');

            if (response.status === 200) {
                comments.value.push(...response.data.data);
            } else {
                console.error('Error loading comments');
            }

            isLoading.value = false;
        };

        fetchComments();

        const handleCloseModal = () => {
            modalFormOpen.value = !modalFormOpen.value;
        };

        return {
            isLoading,
            comments,
            modalFormOpen,
            handleCloseModal,
        };
    },
}
</script>
