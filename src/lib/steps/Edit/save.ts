import type Quill from 'quill';
import { input } from '../../stores';

const isEditorEmpty = (delta: IComment[]) => {
    if (delta.length === 0) return true;
    const containsOnlyWhitespace = delta.every((op) =>
        typeof op.insert === 'string' ? op.insert.replace(/\s/g, '') === '' : false
    );
    if (containsOnlyWhitespace) return true;
    return false;
};

export const saveComment = (quill: Quill) => {
    const state = quill.getContents().ops as IComment[];
    if (isEditorEmpty(state)) return input.setComment([]);
    return input.setComment(state);
};

export const saveFieldValue = (name: string, value: string | undefined) => {
    input.setFieldValue(name, value);
};
