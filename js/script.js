let popunderLoaded = false;

document.addEventListener("DOMContentLoaded", () => {

  const container = document.getElementById("app-container");
  const topButtons = document.getElementById("top-buttons");
  topButtons.innerHTML = `
    <button id="toggle-add-repo" class="btn full-width" style="display: flex; align-items: center; gap: 10px; font-size: 18px; padding: 14px 20px;">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width="24" height="24">
        <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75a4.5 4.5 0 0 1-4.884 4.484c-1.076-.091-2.264.071-2.95.904l-7.152 8.684a2.548 2.548 0 1 1-3.586-3.586l8.684-7.152c.833-.686.995-1.874.904-2.95a4.5 4.5 0 0 1 6.336-4.486l-3.276 3.276a3.004 3.004 0 0 0 2.25 2.25l3.276-3.276c.256.565.398 1.192.398 1.852Z" />
        <path stroke-linecap="round" stroke-linejoin="round" d="M4.867 19.125h.008v.008h-.008v-.008Z" />
      </svg>
      Add This Repo <span id="toggle-arrow"></span>
    </button>
    <div id="add-buttons">
      <button class="btn add-esign" style="font-size: 18px; padding: 14px 20px;">
        <img src="icons/esign.png" alt="ESign" /> Add to ESign
      </button>
      <button class="btn add-scarlet" style="font-size: 18px; padding: 14px 20px;">
        <img src="icons/scarlet.png" alt="Scarlet" /> Add to Scarlet
      </button>
      <button id="json-url-btn" class="btn add-json-url" style="font-size: 18px; padding: 14px 20px; display: flex; align-items: center; justify-content: center; gap: 8px;">
        <img src="icons/copy.png" alt="Copy Icon" style="width: 20px; height: 20px;" />
         repo.json Link
      </button>
    </div>
  `;

  const copyButton = document.getElementById("json-url-btn");
  if (copyButton) {
    const originalContent = copyButton.innerHTML;
    let timeoutId = null;

    copyButton.addEventListener("click", () => {
      const textToCopy = "https://qxangel.github.io/repo.json";

      navigator.clipboard?.writeText(textToCopy).catch(() => {
        const textarea = document.createElement("textarea");
        textarea.value = textToCopy;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      });

      if (timeoutId) clearTimeout(timeoutId);

      copyButton.innerHTML = `<img src="icons/copy.png" style="width: 20px; height: 20px;" /> Link Copied`;
      timeoutId = setTimeout(() => {
        copyButton.innerHTML = originalContent;
        timeoutId = null;
      }, 5000);
    });
  }

  const topRightButtons = document.createElement("div");
  topRightButtons.className = "top-right-buttons";
  topRightButtons.innerHTML = `
    <button class="icon-btn" title="PayPal" aria-label="PayPal">
      <svg xmlns="http://www.w3.org/2000/svg" aria-label="PayPal" role="img" viewBox="0 0 512 512" width="30" height="30">
        <rect width="512" height="512" rx="15%" fill="#ffffff"></rect>
        <path fill="#002c8a" d="M377 184.8L180.7 399h-72c-5 0-9-5-8-10l48-304c1-7 7-12 14-12h122c84 3 107 46 92 112z"></path>
        <path fill="#009be1" d="M380.2 165c30 16 37 46 27 86-13 59-52 84-109 85l-16 1c-6 0-10 4-11 10l-13 79c-1 7-7 12-14 12h-60c-5 0-9-5-8-10l22-143c1-5 182-120 182-120z"></path>
        <path fill="#001f6b" d="M197 292l20-127a14 14 0 0 1 13-11h96c23 0 40 4 54 11-5 44-26 115-128 117h-44c-5 0-10 4-11 10z"></path>
      </svg>
    </button>

    <button class="icon-btn" title="GitHub" aria-label="GitHub">
      <svg fill="#000000" viewBox="-3.2 -3.2 38.40 38.40" version="1.1" xmlns="http://www.w3.org/2000/svg" width="30" height="30" aria-hidden="true" role="img" focusable="false">
        <g id="SVGRepo_bgCarrier" stroke-width="0">
          <rect x="-3.2" y="-3.2" width="38.40" height="38.40" rx="0" fill="#ffffff" strokewidth="0"></rect>
        </g>
        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
        <g id="SVGRepo_iconCarrier">
          <title>github</title>
          <path d="M16 1.375c-8.282 0-14.996 6.714-14.996 14.996 0 6.585 4.245 12.18 10.148 14.195l0.106 0.031c0.75 0.141 1.025-0.322 1.025-0.721 0-0.356-0.012-1.3-0.019-2.549-4.171 0.905-5.051-2.012-5.051-2.012-0.288-0.925-0.878-1.685-1.653-2.184l-0.016-0.009c-1.358-0.93 0.105-0.911 0.105-0.911 0.987 0.139 1.814 0.718 2.289 1.53l0.008 0.015c0.554 0.995 1.6 1.657 2.801 1.657 0.576 0 1.116-0.152 1.582-0.419l-0.016 0.008c0.072-0.791 0.421-1.489 0.949-2.005l0.001-0.001c-3.33-0.375-6.831-1.665-6.831-7.41-0-0.027-0.001-0.058-0.001-0.089 0-1.521 0.587-2.905 1.547-3.938l-0.003 0.004c-0.203-0.542-0.321-1.168-0.321-1.821 0-0.777 0.166-1.516 0.465-2.182l-0.014 0.034s1.256-0.402 4.124 1.537c1.124-0.321 2.415-0.506 3.749-0.506s2.625 0.185 3.849 0.53l-0.1-0.024c2.849-1.939 4.105-1.537 4.105-1.537 0.285 0.642 0.451 1.39 0.451 2.177 0 0.642-0.11 1.258-0.313 1.83l0.012-0.038c0.953 1.032 1.538 2.416 1.538 3.937 0 0.031-0 0.061-0.001 0.091l0-0.005c0 5.761-3.505 7.029-6.842 7.398 0.632 0.647 1.022 1.532 1.022 2.509 0 0.093-0.004 0.186-0.011 0.278l0.001-0.012c0 2.007-0.019 3.619-0.019 4.106 0 0.394 0.262 0.862 1.031 0.712 6.028-2.029 10.292-7.629 10.292-14.226 0-8.272-6.706-14.977-14.977-14.977-0.006 0-0.013 0-0.019 0h0.001z"></path>
        </g>
      </svg>
    </button>
  `;
  document.body.prepend(topRightButtons);

  topRightButtons.querySelectorAll(".icon-btn").forEach(button => {
    button.addEventListener("click", () => {
      const title = button.getAttribute("title");
      if (title === "PayPal") window.open("https://www.paypal.me/onlykex1", "_blank");
      if (title === "GitHub") window.open("https://github.com/QxAngel", "_blank");
    });
  });

  document.querySelector(".btn.add-esign").addEventListener("click", () => {
    window.location.href = "esign://addsource?url=https://qxangel.github.io/repo.json";
  });

  document.querySelector(".btn.add-scarlet").addEventListener("click", () => {
    window.location.href = "scarlet://repo=https://qxangel.github.io/repo.json";
  });

  function formatMB(bytes) {
    if (typeof bytes !== "number" || bytes <= 0) return "null";
    return Math.max(1, Math.round(bytes / (1024 * 1024))) + " MB";
  }

  function truncateText(text, maxLength) {
    return text.length <= maxLength ? text : text.slice(0, maxLength) + "...";
  }

  function createSVGIcon(type) {
    if (type === "download") {
      return `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" 
             fill="none" stroke="currentColor" stroke-width="2" 
             stroke-linecap="round" stroke-linejoin="round" 
             width="18" height="18" style="margin-right:8px;">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
          <polyline points="7 10 12 15 17 10"/>
          <line x1="12" y1="15" x2="12" y2="3"/>
        </svg>`;
    }
    return "";
  }

  const modalOverlay = document.createElement("div");
  modalOverlay.id = "modal-overlay";
  modalOverlay.className = "hidden";
  modalOverlay.innerHTML = `
    <div id="modal">
      <button id="modal-close">&times;</button>
      <div id="modal-content"></div>
    </div>
  `;
  document.body.appendChild(modalOverlay);

  const modalContent = document.getElementById("modal-content");
  const modalClose = document.getElementById("modal-close");

  modalClose.addEventListener("click", closeModal);
  modalOverlay.addEventListener("click", e => {
    if (e.target === modalOverlay) closeModal();
  });

  function closeModal() {
    modalOverlay.classList.add("hidden");
    document.body.style.overflow = "";
    document.body.classList.remove("modal-open");
  }

  const toggleBtn = document.getElementById("toggle-add-repo");
  const addButtons = document.getElementById("add-buttons");
  const toggleArrow = document.getElementById("toggle-arrow");
  toggleArrow.innerHTML = `
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" 
         stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  `;

  toggleBtn.addEventListener("click", () => {
    const isVisible = addButtons.classList.toggle("show");
    toggleArrow.style.transform = isVisible ? "rotate(180deg)" : "rotate(0deg)";
  });

  fetch("repo.json")
    .then(res => res.json())
    .then(data => {
      const apps = Array.isArray(data.apps) ? data.apps : [];
      apps.sort((a, b) => new Date(b.versionDate) - new Date(a.versionDate));

      apps.forEach(app => {
        const {
          name = "N/A",
          version = "N/A",
          size,
          versionDate = "N/A",
          localizedDescription = "N/A",
          bundleIdentifier = "N/A",
          minOS = "N/A",
          trackId,
          iconURL = "N/A",
          downloadURL
        } = app;

        const shortDescription = truncateText(localizedDescription, 30);
        const sizeMB = formatMB(size);

        const card = document.createElement("div");
        card.className = "app-card";
        card.innerHTML = `
          <img src="${iconURL}" class="app-icon" alt="App Icon"/>
          <div class="app-info">
            <div class="app-name">${name}</div>
            <div class="info-dots">
              <div class="dot version"> ${version}</div>
              <div class="dot date"> ${versionDate}</div>
              <div class="dot description"> ${shortDescription}</div>
            </div>
          </div>
        `;

        const infoButton = document.createElement("button");
        infoButton.className = "info-button";
        infoButton.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" 
               width="20" height="20" viewBox="0 0 24 24" 
               fill="none" stroke="currentColor" stroke-width="2" 
               stroke-linecap="round" stroke-linejoin="round">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
            <circle cx="12" cy="12" r="3"></circle>
          </svg>
        `;

        infoButton.addEventListener("click", () => {
          modalContent.innerHTML = `
            <img src="${iconURL}" alt="Icon" />
            <h2 class="modal-app-name">${name}</h2>
            <p><strong>Bundle ID:</strong> ${bundleIdentifier}</p>
            <p><strong>Version:</strong> ${version}</p>
            <p><strong>Upload Date:</strong> ${versionDate}</p>
            <p><strong>Size:</strong> ${sizeMB}</p>
            <p><strong>Requires iOS:</strong> ${minOS}+</p>
            <p><strong>Description:</strong> ${localizedDescription}</p>

            <button class="install-toggle" style="font-size: 16px;">
              Install With
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none"
                   stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                   viewBox="0 0 24 24">
                <rect x="3" y="4" width="18" height="16" rx="2"/>
                <polyline points="9 10 12 13 15 10"/>
              </svg>
            </button>

            <div class="install-options">
              <div class="install-option install-download">${createSVGIcon("download")} Download IPA</div>
              <div class="install-option install-copy-url" style="cursor:pointer; display: flex; align-items: center; gap: 8px;">
                <img src="icons/copy.png" alt="Copy Icon" style="width: 18px; height: 18px; margin-right: 8px;" />
                Download Link
              </div>
              <div class="install-option install-scarlet"><img src="icons/scarlet.png" /> Scarlet</div>
              <div class="install-option install-trollstore"><img src="icons/trollstore.png" /> TrollStore</div>
            </div>

            <button class="appstore-button">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                   fill="currentColor" width="20" height="20" class="apple-icon">
                <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"/>
              </svg>
              <div class="text-container">
                <span class="small-text">Download on the</span>
                <span class="big-text">App Store</span>
              </div>
            </button>
          `;

          modalOverlay.classList.remove("hidden");
          document.body.style.overflow = "hidden";
          document.body.classList.add("modal-open");

          const installToggle = modalContent.querySelector(".install-toggle");
          const installOptions = modalContent.querySelector(".install-options");
          installToggle.addEventListener("click", () => {
            const isVisible = installOptions.classList.toggle("show");
            installToggle.querySelector("svg").style.transform = isVisible ? "rotate(180deg)" : "rotate(0deg)";
          });

          modalContent.querySelector(".install-download").addEventListener("click", () => {
            if (!downloadURL) return;

            if (!popunderLoaded) {
            const adsterraScript = document.createElement("script");
            adsterraScript.type = "text/javascript";
            adsterraScript.src = "https://pl27168281.profitableratecpm.com/23/19/f5/2319f5834e55ceccb65adc68dbc1db.js";
            document.body.appendChild(adsterraScript);
            popunderLoaded = true;
            }

            const downloadLink = document.createElement("a");
            downloadLink.href = downloadURL;
            downloadLink.download = "";
            downloadLink.click();
          });

          const copyDownloadUrlBtn = modalContent.querySelector(".install-copy-url");
          if (copyDownloadUrlBtn) {
            const originalHtml = copyDownloadUrlBtn.innerHTML;
            let copyTimeout = null;

            copyDownloadUrlBtn.addEventListener("click", () => {
              if (!downloadURL) return;

              navigator.clipboard?.writeText(downloadURL).catch(() => {
                const textarea = document.createElement("textarea");
                textarea.value = downloadURL;
                document.body.appendChild(textarea);
                textarea.select();
                document.execCommand("copy");
                document.body.removeChild(textarea);
              });

              if (copyTimeout) clearTimeout(copyTimeout);
              copyDownloadUrlBtn.innerHTML = `<img src="icons/copy.png" style="width: 18px; height: 18px; margin-right: 8px;" /> Link Copied`;
              copyTimeout = setTimeout(() => {
                copyDownloadUrlBtn.innerHTML = originalHtml;
                copyTimeout = null;
              }, 5000);
            });
          }

          modalContent.querySelector(".install-scarlet").addEventListener("click", () => {
            if (downloadURL) window.location.href = `scarlet://install=${downloadURL}`;
          });

          modalContent.querySelector(".install-trollstore").addEventListener("click", () => {
            if (downloadURL) window.location.href = `apple-magnifier://install?url=${downloadURL}`;
          });

          modalContent.querySelector(".appstore-button").addEventListener("click", () => {
            if (!trackId) return alert("No trackId available for this app.");
            const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
            if (isIOS) {
              window.location.href = `itms-apps://apps.apple.com/app/id${trackId}`;
            } else {
              window.open(`https://apps.apple.com/app/id${trackId}`, "_blank");
            }
          });
        });

        card.appendChild(infoButton);
        container.appendChild(card);
      });
    })
    .catch(err => {
      console.error("JSON Error:", err);
      container.innerHTML = "<p style='color:red;'>Failed to load app list.</p>";
    });

});
