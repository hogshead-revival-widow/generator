import Name from '../steps/Name';
import Edit from '../steps/Edit';
import Finish from '../steps/Finish';
import { makeErrorStore } from '../stores/errors';

const start: IStep = {
    errors: makeErrorStore(),
    title: 'Anfangen',
    windowTitle: 'Wozu?',
    explainer: /* HTML */ `
        <p>Hier kannst Du ein Makro anlegen.</p>
        <p>
            Es nimmt dir ein paar der Arbeitsschritte in der DIGAS-Schnellerfassung ab,
            die sich wiederholen.
        </p>
        <p>
            Wie es das tut, kannst Du in einer DIGAS nachgebildeten Ansicht gleich
            selbst festlegen. Dazu brauchst Du keine Vorkenntnisse.
        </p>
        <p>
            Probiere es am besten aus. In jedem Schritt gibt es eine kurze Erläuterung.
            Kaputtmachen kannst Du hier nichts.
        </p>
    `,
    component: undefined,
};

const name: IStep = {
    errors: makeErrorStore(),
    title: 'Benennen',
    nameAsNext: "Los geht's!",
    windowTitle: 'Benennen',
    component: Name,
    explainer: /* HTML */ `
        <p>Vergib hier einen kurzen Namen. Er wird dann als Dateiname genutzt.</p>
        <p>Gib ihn dazu in das Eingabefeld rechts ein.</p>
    `,
};

const edit: IStep = {
    errors: makeErrorStore(),
    title: 'Einstellen',
    nameAsNext: 'Einstellen',
    windowTitle: 'Einstellen',
    component: Edit,
    explainer: /* HTML */ `
        <p>
            Du schreibst <strong>jedes Mal</strong> das Gleiche in ein Feld? Schreib'
            den Wert in die passende
            <span class="tag  is-medium is-white has-text-grey-light">Eingabe</span>
            rechts.
        </p>

        <p>
            Oder Du kopierst <strong>immer</strong> einen importieren Feldwert nach
            unten? Klicke auf den
            <span
                class="tag is-digas-label has-background-grey-lighter is-medium has-text-black has-text-weight-bold"
                style="display: inline-block;"
                >Feldnamen</span
            >.<br />
            Das geht auch mehrfach.
        </p>

        <p>
            Übrigens kannst Du auch <strong>beides tun</strong>. Der importierte Wert
            wird dann an die neue Stelle kopiert. An der alten Stelle wird er durch
            deine Eingabe ersetzt.
        </p>
    `,
};

const finish: IStep = {
    errors: makeErrorStore(),
    nameAsNext: 'Abholen',
    title: 'Fertig!',
    windowTitle: 'Fertig',
    component: Finish,
    explainer: /* HTML */ `
        <p>Stimmt alles? Dann klicke auf speichern.</p>
        <p>Etwas fehlt? Kein Problem! Geh' zurück und ändere es.</p>
    `,
};

export const allSteps: IStep[] = [start, name, edit, finish];
