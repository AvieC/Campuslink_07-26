// Task 1
const imageContainer = document.getElementById("imageContainer");
const backBtn = document.getElementById("backBtn");
const nextBtn = document.getElementById("nextBtn");

// Task 2
function renderImage() {
    imageContainer.innerHTML = `<img src="${images[index]}" alt="Image Slideshow">`;
}

renderImage();