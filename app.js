const message = document.querySelector("#message");

async function submitForm(form, endpoint) {
  const data = Object.fromEntries(new FormData(form));

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "same-origin",
      body: JSON.stringify(data)
    });

    const result = await response.json();
    message.textContent = response.ok
      ? result.message
      : (result.error || "Something went wrong.");
  } catch {
    message.textContent = "Could not connect. Please try again.";
  }
}

document.querySelector("#signup").addEventListener("submit", event => {
  event.preventDefault();
  submitForm(event.currentTarget, "/api/signup");
});

document.querySelector("#login").addEventListener("submit", event => {
  event.preventDefault();
  submitForm(event.currentTarget, "/api/login");
});
