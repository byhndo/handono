export default function preloadImages(container) {
  const images = container.querySelectorAll("img");
  const promises = [];

  images.forEach((img) => {
    if (img.complete && img.naturalWidth !== 0) return;

    promises.push(
      new Promise((resolve) => {
        img.onload = () => resolve();
        img.onerror = () => {
          console.warn(`Image failed to load: ${img.src}`);
          resolve(); 
        };
      })
    );
  });

  return Promise.all(promises);
}
