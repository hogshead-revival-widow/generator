<script>
    import { step } from './lib/stores';
    import { fade } from 'svelte/transition';
    import Sidebox from './lib/Sidebox.svelte';
</script>

<svelte:head>
    <title>
        Generator: {$step.windowTitle}
    </title>
</svelte:head>

{#key $step}
    <section
        class="column is-one-third is-one-quarter-fullhd"
        in:fade="{{ duration: 250 }}"
    >
        <Sidebox />
    </section>

    {#if $step.component !== undefined}
        <main class="column">
            <svelte:component this="{$step.component}" />
        </main>
    {/if}
{/key}
