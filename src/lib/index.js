import { writable } from 'svelte/store';

export const ROTATE_COLORS = {
  red: 0,
  orange: 40,
  green: 140,
  turquoise: 170,
  skyblue: 180,
  blue: 200,
  purple: 270,
  pink: 310,
};

export const clicking = writable(false);
export const hovering = writable(false);
