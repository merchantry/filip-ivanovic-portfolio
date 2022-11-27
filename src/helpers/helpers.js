export function randomInt(min, max) {
  const diff = max - min;
  return Math.ceil(Math.random() * diff) + min;
}

export function randomFloat(min, max) {
  const diff = max - min;
  return Math.random() * diff + min;
}

export function yDistanceToElement(element) {
  const { y, height } = element.getBoundingClientRect();
  return (window.innerHeight / 2 - (y + height / 2)) / window.innerHeight;
}

export const scrollTo = async (element) => {
  element.scrollIntoView({
    behaviour: 'smooth',
    block: 'center',
  });

  return new Promise((resolve) => {
    let timeout;

    const assignTimeout = () => {
      timeout = setTimeout(() => {
        window.removeEventListener('scroll', scrollCallback);
        resolve();
      }, 100);
    };

    const scrollCallback = () => {
      clearTimeout(timeout);
      assignTimeout();
    };

    window.addEventListener('scroll', scrollCallback);
    assignTimeout();
  });
};

export function debounce(callback, wait) {
  let timeout;

  const debouncedCallback = (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      callback(...args);
    }, wait);
  };

  return debouncedCallback;
}
