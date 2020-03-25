import { writable } from 'svelte/store';

export const page = writable(0);

export const dump = writable({})