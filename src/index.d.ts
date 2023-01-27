interface IErrorStore {
    subscribe: (
        this: void,
        run: Subscriber<string[]>,
        invalidate?: Invalidator<string[]> | undefined
    ) => Unsubscriber;
    add: (msg: string) => void;
    delete: (msg: string) => void;
    reset: () => void;
}

interface IStep {
    title: string;
    errors: IErrorStore;
    windowTitle: string;
    explainer: string;
    component: undefined | import('svelte').ComponentType;
    nameAsNext?: string;
}

interface IField {
    name: Readonly<string>;
    digasUIName?: Readonly<string>;
    placeholder?: Readonly<string>;
    value?: string;
}

interface ICommentField {
    field: {
        value: string;
        text: string;
    };
}

interface IMakeQuill {
    getCurrentName: () => string;
    save: (quill: import('quill').Quill) => void;
}

interface IComment {
    insert: string | ICommentField;
}

interface IInput {
    comment: IComment[];
    name: string;
    fields: IField[];
    hotkeyDigit: number;
}
