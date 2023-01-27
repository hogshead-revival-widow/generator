import { writable, type Writable } from 'svelte/store';

/*
    error store factory
*/

export const makeErrorStore: () => IErrorStore = () => {
    const errorState: Writable<string[]> = writable([]);

    return {
        subscribe: errorState.subscribe,
        add: (msg) => {
            errorState.update((errors) => [msg, ...errors]);
        },
        delete: (msg) => {
            errorState.update((errors) => [...errors.filter((error) => error !== msg)]);
        },
        reset: () => errorState.set([]),
    };
};
