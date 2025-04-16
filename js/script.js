function copyToClipboard(text) {
    var dummyInput = document.createElement("input");
    dummyInput.value = text;
    document.body.appendChild(dummyInput);
    dummyInput.select();
    document.execCommand("copy");
    document.body.removeChild(dummyInput);

    var copyButton = document.querySelector(".btn-primary");
    copyButton.textContent = "Copied!";

    setTimeout(function () {
        copyButton.textContent = "Copy URL";
    }, 10000);
}

function redirectToApp(link) {
    window.location.href = link;
}

function createCard(imageSrc, version, downloadURL, localizedDescription, appName, versionDate) {
    var card = document.createElement("div");
    card.className = "card mb-3";

    var cardHeader = document.createElement("div");
    cardHeader.className = "card-header";
    cardHeader.textContent = "AppName :  " + appName;
    card.appendChild(cardHeader);

    var cardBody = document.createElement("div");
    cardBody.className = "card-body";

    var img = document.createElement("img");
    img.src = imageSrc;
    img.alt = "Vista previa";
    img.style.maxWidth = "50%";
    img.style.borderRadius = "30px";
    cardBody.appendChild(img);

    var p = document.createElement("p");
    p.textContent = "Version :  " + version;
    cardBody.appendChild(p);

    var descriptionLabel = document.createElement("p");
    descriptionLabel.textContent = "Description :  " + localizedDescription;
    cardBody.appendChild(descriptionLabel);

    var dateLabel = document.createElement("p");
    dateLabel.textContent = "Upload date :  " + versionDate;
    cardBody.appendChild(dateLabel);

    var downloadButton = document.createElement("a");
    downloadButton.className = "btn btn-sm btn-primary mb-2";
    downloadButton.href = downloadURL;
    downloadButton.textContent = "Download iPA";
    downloadButton.addEventListener("click", function () {
        redirectToApp(downloadURL);
    });
    cardBody.appendChild(downloadButton);

    var scarletButton = document.createElement("button");
    scarletButton.className = "btn btn-sm btn-secondary mb-2";
    scarletButton.textContent = "Scarlet Direct";
    scarletButton.addEventListener("click", function () {
        redirectToApp("scarlet://install=" + downloadURL);
    });
    cardBody.appendChild(scarletButton);

    var trollStoreButton = document.createElement("button");
    trollStoreButton.className = "btn btn-sm btn-secondary mb-2";
    trollStoreButton.textContent = "TrollStore Direct";
    trollStoreButton.addEventListener("click", function () {
        redirectToApp("apple-magnifier://install?url=" + downloadURL);
    });
    cardBody.appendChild(trollStoreButton);

    card.appendChild(cardBody);

    return card;
}

window.onload = function () {
    var jsonFilePath = 'repo.json';

    fetch(jsonFilePath)
        .then(response => response.json())
        .then(data => {
            processJsonData(data);
        })
        .catch(error => {
            console.error('Error al cargar el archivo JSON:', error);
        });
};

function processJsonData(data) {
    var apps = data.apps;
    var cardsContainer = document.querySelector(".cards-container");

    apps.sort((a, b) => new Date(b.versionDate) - new Date(a.versionDate));

    apps.forEach(function (app) {
        var card = createCard(
            app.iconURL,
            app.version,
            app.downloadURL,
            app.localizedDescription,
            app.name,
            app.versionDate
        );

        cardsContainer.appendChild(card);
    });
}
