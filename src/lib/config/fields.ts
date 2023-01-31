export const isComboBox = (field: IField) =>
    field.digasUIName !== undefined && field.digasUIName.startsWith('ComboBox');
export const fields: IField[] = [
    {
        name: 'Titel',
        placeholder: 'z.B. SWR3 Topthema',
        digasUIName: 'Edit13',
    },
    {
        name: 'Autor',
        placeholder: 'z.B. Sturm, Klaus',
        digasUIName: 'Edit14',
    },
    {
        name: 'Ressort',
        digasUIName: 'ComboBox10',
    },
    {
        name: 'Programm',
        digasUIName: 'ComboBox14',
    },
    {
        name: 'Bearbeiter',
        placeholder: 'z.B. Seipel, Jan',
        digasUIName: 'Edit15',
    },
    {
        name: 'Subressort',
        digasUIName: 'ComboBox11',
    },
    {
        name: 'Sendung',
        digasUIName: 'ComboBox15',
    },
    {
        name: 'Freigabe',
        digasUIName: 'ComboBox9',
    },
    {
        name: 'Thema',
        digasUIName: 'ComboBox12',
    },
    {
        name: 'Sendedatum',
        digasUIName: 'Edit18',
    },
];

export const commentField: IField = {
    name: 'Kommentar',
    digasUIName: 'Edit19',
};
