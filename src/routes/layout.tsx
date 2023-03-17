import { component$, Slot } from '@builder.io/qwik';
import { routeLoader$ } from '@builder.io/qwik-city';


export const useServerTimeLoader = routeLoader$(() => {
  return {
    date: new Date().toISOString(),
  };
});

export default component$(() => {
  // const serverTime = useServerTimeLoader();
  return (
    <>
      <div class="container mx-auto">
        <main>
          {/* <Header /> */}
          <section>
            <Slot />
          </section>
        </main>
        <footer>
          {/* <a href="https://www.builder.io/" target="_blank">
          Made with ♡ by Builder.io
          <div>{serverTime.value.date}</div>
        </a> */}
        </footer>
      </div>
    </>
  );
});
