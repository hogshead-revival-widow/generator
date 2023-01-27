<script lang="ts">
    import { fade } from 'svelte/transition';
    import { step } from './stores';
</script>

<button
    class="button is-primary  is-fullwidth bottom-gap"
    on:click="{() => step.goNext()}"
    in:fade="{{ duration: 250 }}">→ {step.getNextName()}</button
>
