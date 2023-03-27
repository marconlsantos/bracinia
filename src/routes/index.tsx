import { component$, useContextProvider, useStore } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { Map } from '~/components/map/map';
import { BRCN } from './context';

export default component$(() => {
  const braciniaData = useStore({
    currentBrewery: undefined,
    isVisible: false
  });

  useContextProvider(BRCN, braciniaData);

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
