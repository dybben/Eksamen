
  /* =========================================================
   <!-- JavaScript til at hente navbar -->
   
    ARENA X NAVBAR
   navbar-hamburger.js
========================================================= */


/* =========================================================
   LOAD NAVBAR
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const navbarContainer = document.getElementById("navbar");

    if (!navbarContainer) {
        console.warn("Arena X navbar container #navbar blev ikke fundet.");
        return;
    }


    fetch("/arena_x_navbar/arena_x_navbar.html")

        .then(response => {

            if (!response.ok) {
                throw new Error(
                    `Kunne ikke hente navbar.html (${response.status})`
                );
            }

            return response.text();

        })

        .then(html => {

            navbarContainer.innerHTML = html;

            /* -------------------------------------------------
               Når navbaren er indlæst
            ------------------------------------------------- */

            initNavbar();

        })

        .catch(error => {

            console.error(
                "Fejl ved indlæsning af Arena X navbar:",
                error
            );

        });

});


/* =========================================================
   INITIALIZE NAVBAR
========================================================= */

function initNavbar() {

    const header =
        document.querySelector(".site-header");

    const menuOpen =
        document.getElementById("menu-open");

    const menuClose =
        document.getElementById("menu-close");

    const mobileMenu =
        document.getElementById("mobile-menu");


    /* =====================================================
       ACTIVE LINK
    ===================================================== */

    setActiveNavigation();


    /* =====================================================
       DESKTOP DROPDOWNS
    ===================================================== */

    initDesktopDropdowns();


    /* =====================================================
       MOBILE MENU
    ===================================================== */

    if (
        menuOpen &&
        menuClose &&
        mobileMenu
    ) {

        openMobileMenu =
            () => {

                mobileMenu.hidden = false;

                document.body.classList.add(
                    "menu-is-open"
                );

                menuOpen.setAttribute(
                    "aria-expanded",
                    "true"
                );

                /* Flyt fokus til luk-knappen */

                menuClose.focus();

            };


        closeMobileMenu =
            () => {

                mobileMenu.hidden = true;

                document.body.classList.remove(
                    "menu-is-open"
                );

                menuOpen.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuOpen.focus();

            };


        /* Åbn */

        menuOpen.addEventListener(
            "click",
            openMobileMenu
        );


        /* Luk */

        menuClose.addEventListener(
            "click",
            closeMobileMenu
        );


        /* ESC lukker menu */

        document.addEventListener(
            "keydown",
            event => {

                if (
                    event.key === "Escape" &&
                    !mobileMenu.hidden
                ) {

                    closeMobileMenu();

                }

            }
        );


        /* Klik på links lukker menu */

        mobileMenu
            .querySelectorAll("a")
            .forEach(link => {

                link.addEventListener(
                    "click",
                    () => {

                        closeMobileMenu();

                    }
                );

            });

    }


    /* =====================================================
       MOBILE DROPDOWNS
    ===================================================== */

    initMobileDropdowns();


    /* =====================================================
       HEADER SCROLL
    ===================================================== */

    initHeaderScroll(header);


}


/* =========================================================
   ACTIVE NAVIGATION
========================================================= */

function setActiveNavigation() {

    const currentPath =
        window.location.pathname;

    const currentFile =
        currentPath
            .split("/")
            .pop()
            .toLowerCase();


    document
        .querySelectorAll(
            ".site-header a"
        )
        .forEach(link => {

            const href =
                link.getAttribute("href");


            if (!href) {
                return;
            }


            /*
             * Ignorer interne anchors
             *
             * Eksempel:
             * #top
             * #footer
             */

            if (href.startsWith("#")) {
                return;
            }


            /*
             * Fjern querystring / hash
             */

            const cleanHref =
                href
                    .split("?")[0]
                    .split("#")[0];


            /*
             * Hent filnavn
             */

            const linkFile =
                cleanHref
                    .split("/")
                    .pop()
                    .toLowerCase();


            /*
             * Aktiv side
             */

            if (
                linkFile &&
                linkFile === currentFile
            ) {

                link.classList.add(
                    "active"
                );


                /*
                 * Hvis linket ligger
                 * i en dropdown,
                 * markér også parent.
                 */

                const navItem =
                    link.closest(
                        ".nav-item"
                    );


                if (navItem) {

                    navItem.classList.add(
                        "is-active"
                    );

                }

            }

        });

}


/* =========================================================
   DESKTOP DROPDOWNS
========================================================= */

function initDesktopDropdowns() {

    const dropdownItems =
        document.querySelectorAll(
            ".nav-item.has-dropdown"
        );


    dropdownItems.forEach(item => {

        const toggle =
            item.querySelector(
                ":scope > .dropdown-toggle"
            );


        const menu =
            item.querySelector(
                ":scope > .dropdown-menu"
            );


        if (!toggle || !menu) {
            return;
        }


        toggle.addEventListener(
            "click",
            event => {

                event.preventDefault();

                const isOpen =
                    item.classList.contains(
                        "is-open"
                    );


                /*
                 * Luk alle andre dropdowns
                 */

                dropdownItems.forEach(
                    otherItem => {

                        if (
                            otherItem !== item
                        ) {

                            otherItem.classList.remove(
                                "is-open"
                            );

                            const otherToggle =
                                otherItem.querySelector(
                                    ":scope > .dropdown-toggle"
                                );

                            if (otherToggle) {

                                otherToggle.setAttribute(
                                    "aria-expanded",
                                    "false"
                                );

                            }

                        }

                    }
                );


                /*
                 * Åbn/luk valgt dropdown
                 */

                if (isOpen) {

                    item.classList.remove(
                        "is-open"
                    );

                    toggle.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                } else {

                    item.classList.add(
                        "is-open"
                    );

                    toggle.setAttribute(
                        "aria-expanded",
                        "true"
                    );

                }

            }
        );

    });


    /*
     * Klik udenfor dropdown
     */

    document.addEventListener(
        "click",
        event => {

            if (
                !event.target.closest(
                    ".nav-item.has-dropdown"
                )
            ) {

                dropdownItems.forEach(
                    item => {

                        item.classList.remove(
                            "is-open"
                        );


                        const toggle =
                            item.querySelector(
                                ":scope > .dropdown-toggle"
                            );


                        if (toggle) {

                            toggle.setAttribute(
                                "aria-expanded",
                                "false"
                            );

                        }

                    }
                );

            }

        }
    );

}


/* =========================================================
   MOBILE DROPDOWNS
========================================================= */

function initMobileDropdowns() {

    const dropdownItems =
        document.querySelectorAll(
            ".mobile-nav-item"
        );


    dropdownItems.forEach(item => {

        const toggle =
            item.querySelector(
                ".mobile-dropdown-toggle"
            );


        if (!toggle) {
            return;
        }


        toggle.addEventListener(
            "click",
            () => {

                const isOpen =
                    item.classList.contains(
                        "is-open"
                    );


                /*
                 * Luk andre mobile dropdowns
                 */

                dropdownItems.forEach(
                    otherItem => {

                        if (
                            otherItem !== item
                        ) {

                            otherItem.classList.remove(
                                "is-open"
                            );


                            const otherToggle =
                                otherItem.querySelector(
                                    ".mobile-dropdown-toggle"
                                );


                            if (
                                otherToggle
                            ) {

                                otherToggle.setAttribute(
                                    "aria-expanded",
                                    "false"
                                );

                            }

                        }

                    }
                );


                /*
                 * Åbn / luk dropdown
                 */

                if (isOpen) {

                    item.classList.remove(
                        "is-open"
                    );

                    toggle.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                } else {

                    item.classList.add(
                        "is-open"
                    );

                    toggle.setAttribute(
                        "aria-expanded",
                        "true"
                    );

                }

            }
        );

    });

}


/* =========================================================
   HEADER SCROLL
========================================================= */

function initHeaderScroll(header) {

    if (!header) {
        return;
    }


    const updateHeader =
        () => {

            if (window.scrollY > 40) {

                header.classList.add(
                    "scrolled"
                );

            } else {

                header.classList.remove(
                    "scrolled"
                );

            }

        };


    updateHeader();


    window.addEventListener(
        "scroll",
        updateHeader,
        {
            passive: true
        }
    );

}


/* =========================================================
   GLOBAL MOBILE MENU FUNCTIONS
========================================================= */

let openMobileMenu = null;
let closeMobileMenu = null;


/* =========================================================
   RESIZE
========================================================= */

window.addEventListener(
    "resize",
    () => {

        /*
         * Hvis man går fra mobil
         * til desktop, lukkes mobilmenuen.
         */

        if (
            window.innerWidth > 1024 &&
            typeof closeMobileMenu === "function"
        ) {

            closeMobileMenu();

        }

    }
);

