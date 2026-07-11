// Task 1
const imageContainer = document.getElementById("imageContainer");
const backBtn = document.getElementById("backBtn");
const nextBtn = document.getElementById("nextBtn");

// Task 2
function renderImage() {
    imageContainer.innerHTML = `<img src="${images[index]}" alt="Image Slideshow">`;
}

renderImage();

// Task 3

backBtn.addEventListener("click", function () {
    index--;

    if (index < 0) {
        index = 0;
    }

    renderImage();
});


nextBtn.addEventListener("click", function () {
    index++;

    if (index >= images.length) {
        index = images.length - 1;
    }

    renderImage();
});