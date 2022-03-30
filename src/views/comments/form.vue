<template>
  <TransitionRoot as="template" :show="open">
    <Dialog as="div" class="fixed z-10 inset-0 overflow-y-auto" @close="closeModal()">
      <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
          <DialogOverlay class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </TransitionChild>

        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leave-from="opacity-100 translate-y-0 sm:scale-100" leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
          <div class="relative inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
            <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">

                <label for="street-address" class="block text-sm font-medium text-gray-700 sm:mt-px">
                    Title
                </label>

                <div class="mt-1 sm:mt-0 sm:col-span-2">

                <input
                    v-model="form.title"
                    type="text"
                    class="w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
                />

                </div>
            </div>

            <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                
                <label for="street-address" class="block text-sm font-medium text-gray-700 sm:mt-px">
                    Description
                </label>
                
                <div class="mt-1 sm:mt-0 sm:col-span-2">
                
                <input
                    v-model="form.description"
                    type="text"
                    class="w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
                />
                
                </div>

            </div>
            <div class="mt-5 sm:mt-6">
              <button
                :disabled="!canSubmit"
                type="button"
                :class="canSubmit ? 'bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500' : 'bg-gray-600 hover:bg-gray-700 focus:ring-gray-500'"
                class="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 sm:text-sm"
                @click="addComment()">
                    Post
                </button>
            </div>
          </div>

        </TransitionChild>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script>

import { ref, computed, inject } from 'vue';
import { Dialog, DialogOverlay, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue';
import { CheckIcon } from '@heroicons/vue/outline';

import http from '../../services/http.js';

export default {

    name: 'CommentForm',

    components: {
        Dialog,
        DialogOverlay,
        DialogTitle,
        TransitionChild,
        TransitionRoot,
        CheckIcon,
    },

    props: {
        open: {
            type: Boolean,
            default: false,
        },
        
        item: {
            type: Object,
            default: null,
        },
    },

    emits: ['close'],

    setup(props, { emit }) {

        const form = ref({
            title: null,
            description: null,
        });

        const isLoading = ref(false);

        const emitter = inject('emitter');

        const canSubmit = computed(() => {
            const invalidValues = ['', null];

            return !invalidValues.includes(form.value.title) && !invalidValues.includes(form.value.description);
        });

        const addComment = async () => {
            isLoading.value = true;

            const response = await http.post('comment', {
                post_id: 1,
                comment_id: props?.item?.id,
                title: form.value.title,
                description: form.value.description,
            });

            if (response.status === 200) {
                emitter.emit('addComment', {
                    data: response.data,
                    parent: props?.item,
                });
            } else {
                console.error('Unable to post a comment');
            }

            isLoading.value = false;

            resetValues();
            closeModal();
        };

        const resetValues = () => {
            form.value.title = null;
            form.value.description = null;
        };
        
        const closeModal = () => {
            emit('close');
        };

        return {
            closeModal,
            addComment,
            form,
            canSubmit,
        }
    },
}
</script>
