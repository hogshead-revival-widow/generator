<script lang="ts">
    import { onMount } from 'svelte';
    import { fade } from 'svelte/transition';

    import { input, step } from '../../stores';
    import Fields from './Fields.svelte';
    import { makeQuill } from './quill/make';
    import { saveComment } from './save';

    let currentName: string;
    const getCurrentName = () => currentName;
    const { errors } = $step;

    onMount(() => makeQuill(getCurrentName, saveComment));

    const hasNoContent = 'no content';
    $: if (
        $input.comment.length === 0 &&
        $input.fields.every((field) => field?.value === undefined)
    ) {
        errors.add(hasNoContent);
    } else {
        errors.delete(hasNoContent);
    }
</script>

<div
    class="card-content has-background-grey-lighter digas"
    in:fade="{{ duration: 250 }}"
>
    <div id="toolbar">
        <Fields bind:currentName="{currentName}" />

        <h1>Kommentar</h1>
    </div>

    <div class="has-background-white" style="min-height: 3.5em;">
        <div id="editor"></div>
    </div>
</div>
