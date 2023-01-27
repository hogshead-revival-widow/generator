<script>
    import { fade } from 'svelte/transition';
    import { clear } from './stores';
</script>

<button
    class="button is-light is-danger button-small is-fullwidth is-small top-gap-smaller"
    in:fade="{{ duration: 250 }}"
    on:click="{() => clear()}">🗑 Alles löschen & neu anfangen</button
>
