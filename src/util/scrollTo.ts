// scrollTo.ts
/**
 * This file used to store utility function(s), related to scrolling in landing page.
*/

/**
 * Scroll to part of lading page.
 *
 * @remarks
 * This method is part of utility functions.
 *
 * @param key id part of website
 */
const scrollto = (key : string) => {
  if (typeof window !== 'undefined') {
      const element = document.querySelector(`#${key}`);
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
          inline: 'nearest',
        });
      }
  }
};

export default scrollto
