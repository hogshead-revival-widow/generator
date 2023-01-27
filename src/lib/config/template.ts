const comment = `

; === {{comment}} ===`;

const header = `;#### Eingabehilfe {{name}} ####
${comment.replace('{{comment}}', `Starten mit Win+Alt+{{digit}}`)}
#!{{digit}}::
${comment.replace('{{comment}}', `Aktives Fenster als anzusteuernd speichern`)}
WinGetActiveTitle, WindowTitle
${comment.replace('{{comment}}', `Verzögerung, um Fehler zu minimieren`)}
SetKeyDelay, 50
`;
const readFromField = `
ControlGetText, {{fieldName}}, {{digasUIName}}, %WindowTitle%
`;
const writeToField = `
ControlSetText, {{digasUIName}}, ,%WindowTitle%
ControlSend, {{digasUIName}}, {Click}{{escapedValue}},  %WindowTitle%
`;
const footer = `
return
`;

export const template = {
    writeToField,
    header,
    footer,
    readFromField,
    comment,
} as const;

export const meta = {
    variable: {
        prefix: '{{',
        suffix: '}}',
    },
};

const escapeLiterals = ['`', ',', '%', ';', '::'];
const transformBacklashs = {
    '\n': '`n',
    '\t': '`t',
    '\r': '`r',
    '\b': '`b',
    '\v': '`v',
};
export const escape = (value: string) => {
    escapeLiterals.forEach((escapeLiteral) => {
        value = value.replaceAll(escapeLiteral, `\`${escapeLiteral}`);
    });
    Object.entries(transformBacklashs).forEach(([escapeThis, escapeTo]) => {
        value = value.replaceAll(escapeThis, escapeTo);
    });

    return value;
};
