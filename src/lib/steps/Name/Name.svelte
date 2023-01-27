<script lang="ts">
    import { onMount } from 'svelte';
    import { fade } from 'svelte/transition';
    import { input, step } from '../../stores';

    const { errors } = $step;
    const invalidInputError = 'Invalid input';
    const noNameError = 'No name set';

    let name: string | undefined = undefined;

    const save = (name: string | undefined) => {
        if (name === undefined) return;
        input.setName(name);
        step.goNext();
    };

    onMount(() => {
        const nameEle = document.getElementById('name');
        if (nameEle) {
            nameEle.focus();
        }
    });

    $: isFirstNaming = $input.name === '';
    $: noNameSet = $input.name === '';
    $: isValidInput =
        name === undefined || /^[0-9\p{Letter}\p{Mark}\s-]+$/gu.test(name);

    $: if (!isValidInput) {
        errors.add(invalidInputError);
    } else {
        errors.delete(invalidInputError);
    }

    $: if (noNameSet) {
        errors.add(noNameError);
    } else {
        errors.delete(noNameError);
    }
</script>

<article class="card has-background-info-light" in:fade="{{ duration: 250 }}">
    <section class="card-content">
        <header>
            <p class="title">
                {#if isFirstNaming}
                    Vergib einen Namen
                {:else}
                    Ändere den Namen
                {/if}
            </p>

            {#if !isFirstNaming}
                <p class="subtitle">
                    Aktueller Name: &bdquo;{$input.name}&ldquo;
                </p>
            {/if}
        </header>

        <div class="field top-gap">
            <div class="control">
                <input
                    class="input"
                    class:is-danger="{!isValidInput}"
                    id="name"
                    type="text"
                    bind:value="{name}"
                    placeholder="Name"
                />
            </div>
            {#if !isValidInput}
                <p class="help is-danger">Dieser Name könnte zu Problemen führen.</p>
                <p class="help is-danger">Bitte wähle einen ohne Sonderzeichen.</p>
            {/if}
        </div>

        {#if isValidInput && name !== undefined}
            <button
                in:fade="{{ duration: 250 }}"
                class="button top-gap is-fullwidth is-primary"
                on:click="{() => save(name)}"
            >
                {#if isFirstNaming}
                    Speichern
                {:else}
                    Umbenennen
                {/if}
            </button>
        {/if}
    </section>
</article>
