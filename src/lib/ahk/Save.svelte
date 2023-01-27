<script lang="ts">
    import { input } from '../stores';
    import { generate } from './generate';
    import { toDataURI } from './toDataURI';

    $: resultDataURI = toDataURI(generate($input));
    const filename = `${$input.name}.ahk`;
    export let size: 'large' | 'normal' = 'large';
</script>

<a
    class="card-footer-item m-2 is-primary button is-{size}"
    href="{resultDataURI}"
    download="{filename}">Makro speichern</a
>
