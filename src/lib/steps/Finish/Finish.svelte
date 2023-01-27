<script lang="ts">
    import { fade } from 'svelte/transition';
    import { input } from '../../stores';
    import { Save } from '../../ahk';
    import ChangeHotkey from '../../ahk/ChangeHotkey.svelte';

    const filename = `${$input.name}.ahk`;
</script>

<article class="card has-background-info-light" in:fade="{{ duration: 250 }}">
    <header class="card-content">
        <p class="title">Dein Makro „{filename}“</p>
    </header>
    <section class="card-content">
        <p class="content">So nutzt Du dein Makro:</p>
        <ol class="ml-6">
            <li>Speichere das Makro ab.</li>
            <li>
                Doppelklicke auf die heruntergeladene Datei. Sie heißt „{filename}“.
            </li>
            <li>Öffne einen Beitrag im Schnellerfassungsdialog.</li>
            <li>
                Aktiviere das Makro mit der Tastenkombination <kbd>WIN</kbd> +
                <kbd>ALT</kbd> + <kbd>{$input.hotkeyDigit}</kbd>.
            </li>
        </ol>
    </section>
    <footer class="card-content">
        <ChangeHotkey />
        <Save />
    </footer>
</article>
