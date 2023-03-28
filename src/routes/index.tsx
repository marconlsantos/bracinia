import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { Map } from '~/components/map/map';

export default component$(() => {
  return <Map />;
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
