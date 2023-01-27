<script>
    import { fade } from 'svelte/transition';
    import { step } from './stores';
</script>

<button
    class="button is-light button-small is-small is-fullwidth bottom-gap-smaller"
    in:fade="{{ duration: 250 }}"
    on:click="{() => step.goPrevious()}">← Zurück zum vorherigen Schritt</button
>
