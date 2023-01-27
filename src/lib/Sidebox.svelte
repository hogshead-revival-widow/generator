<script lang="ts">
    import Reset from './Reset.svelte';
    import Save from './ahk/Save.svelte';
    import Explainer from './Explainer.svelte';
    import GoBack from './GoBack.svelte';
    import GoNext from './GoNext.svelte';
    import { step } from './stores';

    const { errors } = $step;
    $: hasError = $errors.length > 0;
</script>

<article class="card has-background-info-light">
    <header class="card-header">
        <p class="card-header-title title">
            {@html $step.title}
        </p>
    </header>
    <div class="card-content">
        <Explainer />

        <nav>
            {#if !hasError && step.hasNext()}
                <GoNext />
            {/if}

            {#if !hasError && step.isLast()}
                <Save size="normal" />
            {/if}

            {#if step.hasPrevious()}
                <GoBack />
            {/if}

            {#if !step.isFirst()}
                <Reset />
            {/if}
        </nav>
    </div>
</article>
