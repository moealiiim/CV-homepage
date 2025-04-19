// Kör när sidan har laddats
document.addEventListener("DOMContentLoaded", () => {
    fetch("cv-data.json")
        .then(response => response.json())
        .then(data => renderCV(data))
        .catch(error => console.error("Fel vid inläsning av CV-data:", error));
});

function renderCV(data) {
    const cvSection = document.querySelector(".cv");

    // Namn och kontakt
    cvSection.innerHTML += `
        <h1>${data.namn}</h1>
        <p>E-post: <a href="mailto:${data.kontakt.email}">${data.kontakt.email}</a></p>
        <p>Mobil: ${data.kontakt.telefon}</p>
        <p>Adress: ${data.kontakt.adress}</p>
    `;

    // Sammanfattning
    cvSection.innerHTML += `
        <h2>Sammanfattning</h2>
        <p>${data.sammanfattning}</p>
    `;

    // Utbildning
    let utbildningHTML = `<h2>Utbildning</h2><ul>`;
    data.utbildning.forEach(u => {
        utbildningHTML += `
            <li><strong>${u.titel}</strong> - ${u.skola}${u.år ? `, ${u.år}` : ""}<br>${u.beskrivning}</li>
        `;
    });
    utbildningHTML += `</ul>`;
    cvSection.innerHTML += utbildningHTML;

    // Erfarenhet
    let erfarenhetHTML = `<h2>Erfarenhet</h2><ul>`;
    data.erfarenhet.forEach(e => {
        erfarenhetHTML += `
            <li><strong>${e.företag}</strong> - ${e.roll}<br>${e.beskrivning}</li>
        `;
    });
    erfarenhetHTML += `</ul>`;
    cvSection.innerHTML += erfarenhetHTML;

    // Språk
    let språkHTML = `<h2>Språk</h2><ul>`;
    data.språk.forEach(s => {
        språkHTML += `<li>${s}</li>`;
    });
    språkHTML += `</ul>`;
    cvSection.innerHTML += språkHTML;
}
