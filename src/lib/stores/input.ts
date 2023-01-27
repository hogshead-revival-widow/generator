import { writable, type Writable } from 'svelte/store';
import { defaultInput } from '../config/input';

const inputState: Writable<IInput> = writable(defaultInput);

const setName = (name: string) => {
    inputState.update((current) => {
        return { ...current, name };
    });
};

const setComment = (comment: IComment[]) => {
    inputState.update((current) => {
        return { ...current, comment };
    });
};

export const input = {
    subscribe: inputState.subscribe,
    setName,
    setComment,
    setHotkeyDigit: (hotkeyDigit: number) => {
        inputState.update((current) => {
            return { ...current, hotkeyDigit };
        });
    },
    setFieldValue: (name: string, value: string | undefined) => {
        inputState.update((current) => {
            const fieldToChangeIdx = current.fields.findIndex(
                (field) => field.name === name
            );
            if (fieldToChangeIdx === -1) throw new Error(`Unknown field ${name}`);
            current.fields[fieldToChangeIdx].value = value;
            return { ...current };
        });
    },
    reset: () => inputState.set(defaultInput),
};
