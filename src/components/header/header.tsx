import { component$, useStylesScoped$ } from '@builder.io/qwik';
import styles from './header.css?inline';

export default component$(() => {
  useStylesScoped$(styles);

  return (
    <nav
      class="relative flex w-full flex-wrap items-center justify-between bg-gray-700 py-4 text-gray-50 shadow-lg hover:text-neutral-700 focus:text-neutral-700 dark:bg-neutral-600">
      <div class="flex w-full flex-wrap items-center justify-between px-6">
        <div>
          <a
            class="mt-2 mr-1 flex items-center text-neutral-100 hover:text-neutral-100 focus:text-neutral-100 lg:mt-0"
            href="#">
            <img
              class="mr-2"
              src="/favicon.png"
              style="height: 20px"
              alt=""
              loading="lazy" />
            <span class="font-medium dark:text-neutral-200">Bracinia</span>
          </a>
        </div>
      </div>
    </nav>

  );
});
