import './assets/css/vendor/bulma.css';
import './assets/css/vendor/quill.snow.css';
import './assets/css/global.css';

import App from './App.svelte';

const app = new App({
    target: document.getElementById('app') as HTMLElement,
});

export default app;
