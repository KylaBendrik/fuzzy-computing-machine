import App from './App.svelte';
import './style/main.css';
//import './views/fonts/fonts.scss';

console.log('👋 This message is being logged by "renderer.js", included via webpack');

new App({
	target: document.body,
	props: {}
})