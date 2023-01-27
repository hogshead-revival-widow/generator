<script lang="ts">
    import { fade } from 'svelte/transition';
    import { input } from '../stores';

    let wantsToChange = false;

    let tempDigit: number = $input.hotkeyDigit;
    let previousDigit: undefined | number = undefined;
    $: digitHasChanged = tempDigit !== $input.hotkeyDigit;

    const toggleOfferChanging = () => {
        wantsToChange = !wantsToChange;
    };

    const changeDigit = (digit: number) => {
        wantsToChange = !wantsToChange;
        input.setHotkeyDigit(digit);
    };

    const recordDigit = (event: KeyboardEvent) => {
        const pressedKey = event.key.replace(/[^0-9]/g, '');
        if (pressedKey === '') return;
        previousDigit = $input.hotkeyDigit;
        tempDigit = Number(pressedKey);
    };
</script>

<svelte:window on:keydown="{wantsToChange ? recordDigit : () => {}}" />

{#if !wantsToChange}
    <a
        href="#change"
        class="card-footer-item m-2 is-info button"
        in:fade="{{ duration: 250 }}"
        on:click|preventDefault="{toggleOfferChanging}"
    >
        Aktivierungs-Tastenkombination ändern
    </a>
{/if}

{#if wantsToChange}
    <article
        class="card has-background-info-light mx-auto mb-6"
        in:fade|local="{{ duration: 250 }}"
    >
        <button
            class="delete is-large mr-3 ml-3 mt-3"
            style="position: absolute; left: 90%;"
            on:click="{toggleOfferChanging}"
            >X
        </button>
        <header class="card-content">
            Ändere die Ziffer deiner Aktivierungs-Tastenkombination, indem Du jetzt die
            entsprechende Taste auf deiner Tastatur drückst.
        </header>

        {#if digitHasChanged}
            <div class="ml-6 mb-6" in:fade|local="{{ duration: 250 }}">
                <h1 class="subtitle">Neue Kombination</h1>
                <span class="ml-2 content">
                    <kbd>WIN</kbd> + <kbd>ALT</kbd> +
                    {#key tempDigit}
                        <kbd
                            class="has-background-info has-text-white"
                            in:fade|local="{{ duration: 250 }}">{tempDigit}</kbd
                        >
                    {/key}
                </span>
            </div>
        {/if}

        <footer class="card-footer">
            {#key digitHasChanged}
                <button
                    class="card-footer-item m-2 is-info button"
                    class:is-invisible="{!digitHasChanged}"
                    in:fade="{{ duration: 250 }}"
                    on:click="{() => changeDigit(tempDigit)}"
                >
                    Neue Aktivierungs-Tastenkombination übernehmen
                </button>
            {/key}
        </footer>
    </article>
{/if}
