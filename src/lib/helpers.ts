export const playSound = (url: string) => {
  const audio = new Audio(url);
  audio.play().catch((error) => {
    console.error('Error playing audio:', error);
  });
};

export const addProxy = (url: string) => {
  return `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`;
};

const openFullscreen = () => {
  const element = document.documentElement; // The document's root element

  if (element.requestFullscreen) {
    element.requestFullscreen();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
  } else if (element.mozRequestFullScreen) {
    // Firefox
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    element.mozRequestFullScreen();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
  } else if (element.webkitRequestFullscreen) {
    // Chrome, Safari, and Opera
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    element.webkitRequestFullscreen();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
  } else if (element.msRequestFullscreen) {
    // IE/Edge
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    element.msRequestFullscreen();
  }
};

const closeFullscreen = () => {
  if (document.exitFullscreen) {
    document.exitFullscreen();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
  } else if (document.mozCancelFullScreen) {
    // Firefox
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    document.mozCancelFullScreen();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
  } else if (document.webkitExitFullscreen) {
    // Chrome, Safari, and Opera
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    document.webkitExitFullscreen();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
  } else if (document.msExitFullscreen) {
    // IE/Edge
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    document.msExitFullscreen();
  }
};

export const toggleFullScreen = () => {
  if (!document.fullscreenElement) {
    return openFullscreen();
  }
  return closeFullscreen();
};
