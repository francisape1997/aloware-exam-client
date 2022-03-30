<template>
    <div v-frag>
        <slot />
    </div>
</template>

<script>
import frag from 'vue-frag';

export default {
    name: 'Fragment',

    directives: {
        frag,
    }
};
</script>