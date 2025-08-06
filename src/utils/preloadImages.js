export default function preloadImages(container) {
  const images = container.querySelectorAll("img");
  const promises = [];
  images.forEach((img) => {
    if (img.complete) return;
    promises.push(new Promise((resolve) => {
      img.onload = img.onerror = resolve;
    }));
  });
  return Promise.all(promises);
}
