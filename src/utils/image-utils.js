export default function getImageURL(imageSrc) {
  return new URL(`../assets/ewaste-devices/${imageSrc}.png`, import.meta.url)
    .href; // membuat URL dari path relative
}
