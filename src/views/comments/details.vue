<template>
    <fragment>
        <div
            class="grid grid-cols-1 gap-4 sm:grid-cols-1"
            :style="{'padding-left': (indention != null ? indention + 10 : '0') + 'px'}">
            
            <div
                class="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">

                <div class="flex">

                    <div class="w-64">
                        <a class="focus:outline-none">
                            <p class="text-sm font-medium text-gray-900">
                                {{ item.title }}
                            </p>

                            <p class="text-sm text-gray-500 truncate">
                                {{ item.description }}
                            </p>
                        </a>
                    </div>

                    <div class="w-32">
                        <button
                            type="button"
                            @click="modalFormOpen = true"
                            class="inline-flex inset-y-0 items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                Reply
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <CommentForm
            :open="modalFormOpen"
            @close="handleCloseModal()"
            :item="item"/>

        <Details
            v-for="(child, index) in item.children"
            :key="index"
            :item="child"
            :indention="(indention ? indention + 50 : 50)"/>
    </fragment>
</template>

<script>

import { ref } from 'vue';

import Fragment from '../../components/Fragment.vue';
import CommentForm from './Form.vue';

export default {
    name: 'Details',

    components: {
        Fragment,
        CommentForm,
    },

    props: {
        item: {
            type: Object,
        },

        indention: {
            type: Number,
        },
    },

    setup() {

        const modalFormOpen = ref(false);

        const handleCloseModal = () => {
            modalFormOpen.value = !modalFormOpen.value;
        };

        return {
            modalFormOpen,
            handleCloseModal,
        };
    },
}
</script>
