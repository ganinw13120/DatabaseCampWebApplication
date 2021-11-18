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
