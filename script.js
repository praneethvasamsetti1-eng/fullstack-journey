const input = document.getElementById("catUrlInput");
const button = document.getElementById("submitBtn");
const image = document.getElementById("catImage");
const message = document.getElementById("message");

let lastUrl = "";

button.addEventListener("click", handleImageUpdate);

function handleImageUpdate() {
  const url = input.value.trim();

  if (url === "") {
    message.textContent = "Please enter an image URL";
    return;
  }

  if (!url.startsWith("http")) {
    message.textContent = "Please enter a valid URL";
    return;
  }

  if (url === lastUrl) {
    message.textContent = "Same image already loaded";
    return;
  }

  button.disabled = true;
  message.textContent = "Loading...";

  lastUrl = url;
  image.src = url;
}

image.onload = function () {
  button.disabled = false;
  message.textContent = "Image updated!";
};

image.onerror = function () {
  button.disabled = false;
  message.textContent = "Image could not be loaded. Try another URL.";
};

input.addEventListener("input", function () {
  message.textContent = "";
});
