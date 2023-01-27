<script>
    import { step } from './stores';
</script>

{#if $step.explainer !== undefined}
    <aside class="content">
        {@html $step.explainer}
    </aside>
{/if}
