import { get } from 'svelte/store';

import { input } from '../../../stores';
import { Quill, fieldHandler } from './patchedQuill';

export let quill: Quill;

const restoreContent = (quill: Quill) => {
    const delta = quill.getContents();
    delta.ops = get(input).comment;
    quill.setContents(delta);
};

const saveContent = (quill: Quill, save: IMakeQuill['save']) => {
    quill.on('text-change', () => save(quill));
};

export const makeQuill = (
    getCurrentName: IMakeQuill['getCurrentName'],
    save: IMakeQuill['save'],
    editorID = '#editor',
    toolbarID = '#toolbar'
) => {
    // Configuration
    const theme = 'snow';
    const container = toolbarID;
    const handlers = { field: () => fieldHandler(quill, getCurrentName) };
    const toolbar = { container, handlers };
    const modules = { toolbar };
    const config = { modules, theme };

    quill = new Quill(editorID, config);
    restoreContent(quill);
    saveContent(quill, save);
};
