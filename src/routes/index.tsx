import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { BraciniaMap } from '~/components/braciniamap/braciniamap';

export default component$(() => {
  return <BraciniaMap />;
});

export const head: DocumentHead = {
  title: 'Welcome to Bracinia',
  meta: [
    {
      name: 'description',
      content: 'Breweries from around the world',
    },
  ],
};
