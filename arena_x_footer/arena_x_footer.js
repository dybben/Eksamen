/* =========================================================
   ARENA X – FOOTER LOADER
   footer.js
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =======================================================
     FIND FOOTER CONTAINER
  ======================================================= */

  const footerContainer =
    document.getElementById("footer");


  if (!footerContainer) {

    console.warn(
      "Arena X footer container #footer blev ikke fundet."
    );

    return;

  }


  /* =======================================================
     LOAD FOOTER CSS
  ======================================================= */

  function loadFooterCSS() {

    const existingCSS =
      document.querySelector(
        'link[href="/arena_x_footer/arena_x_footer.css"]'
      );


    if (existingCSS) {
      return;
    }


    const footerCSS =
      document.createElement("link");


    footerCSS.rel = "stylesheet";

    footerCSS.href =
      "/arena_x_footer/arena_x_footer.css";


    document.head.appendChild(
      footerCSS
    );

  }


  /* =======================================================
     LOAD FONT AWESOME
  ======================================================= */

  function loadFontAwesome() {

    const existingFontAwesome =
      document.querySelector(
        'link[href*="font-awesome"]'
      );


    if (existingFontAwesome) {
      return;
    }


    const fontAwesome =
      document.createElement("link");


    fontAwesome.rel =
      "stylesheet";


    fontAwesome.href =
      "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css";


    document.head.appendChild(
      fontAwesome
    );

  }


  /* =======================================================
     LOAD CSS + FONT AWESOME
  ======================================================= */

  loadFooterCSS();

  loadFontAwesome();


  /* =======================================================
     LOAD FOOTER HTML
  ======================================================= */

  fetch("/arena_x_footer/arena_x_footer.html")

    .then(response => {

      if (!response.ok) {

        throw new Error(
          `Kunne ikke hente footer.html (${response.status})`
        );

      }


      return response.text();

    })


    .then(html => {

      /* -----------------------------------------------
         Indsæt footer
      ------------------------------------------------ */

      footerContainer.innerHTML =
        html;


      /* -----------------------------------------------
         Footer er indlæst
      ------------------------------------------------ */

      footerContainer.classList.add(
        "footer-loaded"
      );


      console.log(
        "Arena X footer blev indlæst."
      );

    })


    .catch(error => {

      console.error(
        "Fejl ved indlæsning af Arena X footer:",
        error
      );


      /* -----------------------------------------------
         Vis fejl på siden
      ------------------------------------------------ */

      footerContainer.innerHTML = `
        <div class="footer-error">
          <p>
            Footer kunne ikke indlæses.
          </p>
        </div>
      `;

    });

});