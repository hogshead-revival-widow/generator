import { template, meta, escape } from '../config/template';
import { commentField, isComboBox } from '../config/fields';

const getVariableName = (name: string, config = meta.variable) =>
    `${config.prefix}${name}${config.suffix}`;

const setVariable = (template: string, name: string, value: string) => {
    const variable = getVariableName(name);
    if (!template.includes(variable))
        throw new Error(`Variable ${variable} not found in: ${template}`);
    return template.replaceAll(variable, value);
};

const addComment = (comment: string, templ = template.comment) =>
    setVariable(templ, 'comment', comment);

const addHeader = (input: IInput, header = template.header) => {
    let out = setVariable(header, 'name', input.name);
    return setVariable(out, 'digit', `${input.hotkeyDigit}`);
};

const addFooter = (footer = template.footer) => {
    let out = addComment('Beenden');
    out += footer;
    return out;
};

const isCommentField = (value: IComment['insert']): value is ICommentField =>
    typeof value !== 'string';

const fieldsToRead = (comment: IInput['comment']) =>
    new Set(
        comment
            .filter((line) => isCommentField(line.insert))
            .map((line) => (line.insert as ICommentField).field.text)
    );

const fieldsToWrite = (fields: IInput['fields']) =>
    fields.filter((field) => field?.value !== undefined) as (IField & {
        value: string;
    })[];

const readFromField = (field: IField, templ = template.readFromField) => {
    let out = addComment(`Kopiere Wert aus Feld: ${field.name}`);
    out += templ;
    out = setVariable(out, 'digasUIName', getDigasUIName(field));
    return setVariable(out, 'fieldName', field.name);
};

const writeToField = (
    field: IField,
    value: string,
    templ = template.writeToField,
    escaper = escape
) => {
    let out = addComment(`Schreibe Wert in Feld: ${field.name}`);
    if (isComboBox(field)) {
        out += template.writeToComboBox;
    } else {
        out += templ;
    }

    out = setVariable(out, 'digasUIName', getDigasUIName(field));
    return setVariable(out, 'escapedValue', escaper(value));
};

const getField = (fieldName: string, fields: IField[]) => {
    let field = fields.find((field) => fieldName === field.name);
    const isCommentField = field === undefined && fieldName === commentField.name;
    if (isCommentField) field = commentField;
    if (field === undefined) throw new Error(`Field ${fieldName} not found`);

    return field;
};

const getDigasUIName = (field: IField) => {
    const { digasUIName } = field;
    if (digasUIName === undefined)
        throw new Error(`DigasUIName not found for: ${field.name}`);
    return digasUIName;
};
const writeCommentField = (
    input: IInput,
    comment: IField = commentField,
    templ = template.writeToField
) => {
    let textToWrite = '';
    input.comment.forEach((value) => {
        if (isCommentField(value.insert)) {
            textToWrite += `%${value.insert.field.text}%`;
        } else {
            textToWrite += escape(value.insert as string);
        }
    });
    return writeToField(comment, textToWrite, templ, (value) => value);
};
export const generate = (input: IInput, templ = template) => {
    let ahk: string = addHeader(input);
    fieldsToRead(input.comment).forEach((fieldName) => {
        ahk += readFromField(getField(fieldName, input.fields));
    });
    fieldsToWrite(input.fields).forEach((field) => {
        ahk += writeToField(field, field.value);
    });
    ahk += writeCommentField(input, commentField);
    ahk += addFooter();

    return ahk.trim();
};
