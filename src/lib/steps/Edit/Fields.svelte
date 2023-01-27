<script lang="ts">
    import { input } from '../../stores';
    import Field from './Field.svelte';
    export let currentName: string;
</script>

<div class="columns is-multiline">
    {#each $input.fields as item, idx}
        <div
            class="column"
            class:is-one-third="{idx !== 0}"
            class:is-full="{idx === 0}"
        >
            <Field field="{item}" bind:currentName="{currentName}" />
        </div>
    {/each}
</div>
