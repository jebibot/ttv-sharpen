document.querySelectorAll("a").forEach((a) => {
  a.onclick = (e) => {
    e.preventDefault();
    chrome.tabs.create({ url: a.href });
  };
});

chrome.storage.local.get({ t: 1 }).then(({ t }) => {
  if (isNaN(t)) {
    t = 1;
    chrome.storage.local.set({ t });
  }

  const sharpness = document.getElementById("sharpness");
  const current = document.getElementById("current");
  sharpness.value = t;
  current.textContent = t;
  sharpness.addEventListener("input", (e) => {
    const t = e.target.value;
    chrome.storage.local.set({ t });
    current.textContent = t;
  });
});
