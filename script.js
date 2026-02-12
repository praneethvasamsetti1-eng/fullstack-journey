const input = document.getElementById("catUrlInput");
const button = document.getElementById("submitBtn");
const image = document.getElementById("catImage");
const message = document.getElementById("message");

let controller = null;
let isLoading = false;
let lastUrl = "";

// retry helper
async function fetchWithRetry(url, tries = 3, signal) {
  for (let i = 0; i < tries; i++) {
    try {
      const res = await fetch(url, { signal });
      return res;
    } catch (err) {
      if (i === tries - 1) throw err;
    }
  }
}

button.addEventListener("click", handleImageUpdate);

async function handleImageUpdate() {

  const url = input.value.trim();

  if (url === "") {
    message.textContent = "Please enter a cat image URL";
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

  if (isLoading) return;

  // cancel previous request
  if (controller) controller.abort();
  controller = new AbortController();
  const signal = controller.signal;

  isLoading = true;
  button.disabled = true;
  message.textContent = "Loading...";

  try {
    await fetchWithRetry(url, 3, signal);

    image.src = url;
    lastUrl = url;
    message.textContent = "Image updated!";

  } catch (err) {

    if (err.name === "AbortError") {
      console.log("Request cancelled");
    } else {
      message.textContent = "Image could not be loaded.";
    }

  } finally {
    isLoading = false;
    button.disabled = false;
  }
}

input.addEventListener("input", function () {
  message.textContent = "";
});
;

