<script lang="ts">
    import { input } from '../../stores';
    import { saveFieldValue } from './save';

    export let field: IField;
    export let currentName: string;

    let value: string | undefined = $input.fields.find(
        (cField) => cField.name == field.name
    )?.value;

    $: if (
        value !== undefined &&
        $input.fields.find((storedField) => storedField.name === field.name)?.value !==
            value
    ) {
        if (value === '') value = undefined;
        saveFieldValue(field.name, value);
    }
    const isUserEditable = field?.digasUIName !== undefined;
</script>

<button
    type="button"
    class:ql-field="{isUserEditable}"
    on:click="{() => {
        if (isUserEditable) {
            currentName = field.name;
        }
    }}"
>
    {#if isUserEditable}
        <label
            id="{field.name}-label"
            class="label is-inline is-pointer"
            role="button"
            for="{field.name}"
        >
            {field.name}
        </label>
    {:else}
        <label
            id="{field.name}-label"
            class="label is-inline"
            role="button"
            for="{field.name}"
        >
            {field.name}
        </label>
    {/if}
</button>

<input
    id="{field.name}-input"
    class="input"
    type="text"
    placeholder="{field.placeholder}"
    disabled="{!isUserEditable}"
    bind:value="{value}"
/>
