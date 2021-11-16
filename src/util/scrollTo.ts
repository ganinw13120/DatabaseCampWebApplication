const scrollto = (key : string) => {
  if (typeof window !== 'undefined') {
      const element = document.querySelector(`#${key}`);
      console.log(element)
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
