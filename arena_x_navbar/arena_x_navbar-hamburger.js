/* =========================================================
   ARENA X NAVBAR
   navbar-hamburger.js
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =======================================================
     ELEMENTER
  ======================================================= */

  const menuOpen = document.getElementById("menu-open");
  const menuClose = document.getElementById("menu-close");
  const mobileMenu = document.getElementById("mobile-menu");

  const mobileDropdownToggles = document.querySelectorAll(
    ".mobile-dropdown-toggle"
  );


  /* =======================================================
     SIKKERHEDSTJEK
  ======================================================= */

  if (!menuOpen || !menuClose || !mobileMenu) {
    return;
  }


  /* =======================================================
     ÅBN MOBILMENU
  ======================================================= */

  function openMenu() {

    mobileMenu.hidden = false;

    menuOpen.setAttribute(
      "aria-expanded",
      "true"
    );

    document.body.classList.add(
      "menu-is-open"
    );

    // Lille delay så CSS-transitioner kan starte korrekt
    requestAnimationFrame(() => {

      mobileMenu.classList.add(
        "is-open"
      );

    });

  }


  /* =======================================================
     LUK MOBILMENU
  ======================================================= */

  function closeMenu() {

    mobileMenu.classList.remove(
      "is-open"
    );

    menuOpen.setAttribute(
      "aria-expanded",
      "false"
    );

    document.body.classList.remove(
      "menu-is-open"
    );

    // Vent på animation før hidden
    setTimeout(() => {

      mobileMenu.hidden = true;

    }, 200);

  }


  /* =======================================================
     HAMBURGER
  ======================================================= */

  menuOpen.addEventListener(
    "click",
    () => {

      const isOpen =
        menuOpen.getAttribute(
          "aria-expanded"
        ) === "true";


      if (isOpen) {

        closeMenu();

      } else {

        openMenu();

      }

    }
  );


  /* =======================================================
     LUK-KNAP
  ======================================================= */

  menuClose.addEventListener(
    "click",
    () => {

      closeMenu();

    }
  );


  /* =======================================================
     MOBILE DROPDOWNS
  ======================================================= */

  mobileDropdownToggles.forEach(
    (toggle) => {

      toggle.addEventListener(
        "click",
        () => {

          const parent =
            toggle.closest(
              ".mobile-nav-item"
            );


          if (!parent) {
            return;
          }


          const isOpen =
            parent.classList.contains(
              "is-open"
            );


          /* Luk alle andre dropdowns */

          document
            .querySelectorAll(
              ".mobile-nav-item.is-open"
            )
            .forEach(
              (item) => {

                if (item !== parent) {

                  item.classList.remove(
                    "is-open"
                  );

                  const button =
                    item.querySelector(
                      ".mobile-dropdown-toggle"
                    );

                  if (button) {

                    button.setAttribute(
                      "aria-expanded",
                      "false"
                    );

                  }

                }

              }
            );


          /* Åbn / luk valgt dropdown */

          parent.classList.toggle(
            "is-open",
            !isOpen
          );


          toggle.setAttribute(
            "aria-expanded",
            String(!isOpen)
          );

        }
      );

    }
  );


  /* =======================================================
     LUK MENU NÅR LINK KLIKKES
  ======================================================= */

  mobileMenu
    .querySelectorAll(
      "a"
    )
    .forEach(
      (link) => {

        link.addEventListener(
          "click",
          () => {

            closeMenu();

          }
        );

      }
    );


  /* =======================================================
     ESCAPE-TAST
  ======================================================= */

  document.addEventListener(
    "keydown",
    (event) => {

      if (event.key === "Escape") {

        const isOpen =
          menuOpen.getAttribute(
            "aria-expanded"
          ) === "true";


        if (isOpen) {

          closeMenu();

          menuOpen.focus();

        }

      }

    }
  );


  /* =======================================================
     KLIK UDENFOR
  ======================================================= */

  document.addEventListener(
    "click",
    (event) => {

      const isOpen =
        menuOpen.getAttribute(
          "aria-expanded"
        ) === "true";


      if (!isOpen) {
        return;
      }


      const clickedInsideMenu =
        mobileMenu.contains(
          event.target
        );


      const clickedOpenButton =
        menuOpen.contains(
          event.target
        );


      if (
        !clickedInsideMenu &&
        !clickedOpenButton
      ) {

        closeMenu();

      }

    }
  );


  /* =======================================================
     RESIZE
     Luk mobilmenu når desktop-visning aktiveres
  ======================================================= */

  let resizeTimer;


  window.addEventListener(
    "resize",
    () => {

      clearTimeout(
        resizeTimer
      );


      resizeTimer = setTimeout(
        () => {

          if (
            window.innerWidth > 1024
          ) {

            closeMenu();


            /* Luk mobile dropdowns */

            document
              .querySelectorAll(
                ".mobile-nav-item.is-open"
              )
              .forEach(
                (item) => {

                  item.classList.remove(
                    "is-open"
                  );


                  const button =
                    item.querySelector(
                      ".mobile-dropdown-toggle"
                    );


                  if (button) {

                    button.setAttribute(
                      "aria-expanded",
                      "false"
                    );

                  }

                }
              );

          }

        },
        100
      );

    }
  );


  /* =======================================================
     INIT
  ======================================================= */

  mobileMenu.hidden = true;

  menuOpen.setAttribute(
    "aria-expanded",
    "false"
  );


  mobileDropdownToggles.forEach(
    (toggle) => {

      toggle.setAttribute(
        "aria-expanded",
        "false"
      );

    }
  );

});