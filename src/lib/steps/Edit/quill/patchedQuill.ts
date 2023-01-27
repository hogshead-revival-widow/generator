import Quill from 'quill';

const Embed = Quill.import('blots/embed');
class FieldEmbed extends Embed {
    static create(value: ICommentField['field']) {
        const node = super.create(value);
        const cls = ['tag', 'is-info', 'is-normal', 'mr-1', 'ml-1'];
        node.classList.add(...cls);
        node.setAttribute('data-proc', value.value);
        node.innerHTML = value.text;
        return node;
    }
    static value(node: HTMLElement) {
        return { value: node.innerText.trim(), text: node.innerText.trim() };
    }
}

FieldEmbed.blotName = 'field';
FieldEmbed.className = 'field';
FieldEmbed.tagName = 'span';

Quill.register({
    'formats/field': FieldEmbed,
});

const fieldHandler = (quill: Quill, getCurrentName: () => string) => {
    const range = quill.getSelection()?.index;
    if (range === undefined) throw new Error('Undefined range');

    const currentName = getCurrentName();
    quill.insertEmbed(range, 'field', {
        text: currentName,
        value: currentName,
    });
    // @ts-expect-error
    quill.setSelection(range + 2);
};

export { Quill, fieldHandler };
