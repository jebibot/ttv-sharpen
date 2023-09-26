chrome.storage.local.get({ t: 1 }).then(({ t }) => {
  if (isNaN(t)) {
    t = 1;
    chrome.storage.local.set({ t });
  }

  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.style.display = "none";

  const filter = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "filter",
  );
  filter.id = "filterSharpen";

  const conv = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "feConvolveMatrix",
  );
  conv.preserveAlpha.baseVal = true;
  const setKernel = (s) =>
    conv.setAttribute(
      "kernelMatrix",
      `0 ${-s / 5} 0 ${-s / 5} ${1 + (s * 4) / 5} ${-s / 5} 0 ${-s / 5} 0`,
    );
  setKernel(t);

  chrome.storage.local.onChanged.addListener((changes) => {
    if ("t" in changes) {
      setKernel(changes.t.newValue);
    }
  });

  filter.appendChild(conv);
  svg.appendChild(filter);
  document.body.appendChild(svg);
});
