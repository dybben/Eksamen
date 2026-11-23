"use strict";

document.addEventListener("DOMContentLoaded",()=>{

  /* =====================================================
     ELEMENTER
  ===================================================== */

  const mobileMenu=document.querySelector("#mobile-menu");
  const menuOpen=document.querySelector("#menu-open");
  const menuClose=document.querySelector("#menu-close");

  const desktopItems=document.querySelectorAll(
    ".desktop-nav .has-dropdown"
  );

  const mobileItems=document.querySelectorAll(
    ".mobile-nav-item"
  );


  /* =====================================================
     DESKTOP DROPDOWNS
  ===================================================== */

  const closeDesktop=()=>{
    desktopItems.forEach(item=>{
      item.classList.remove("is-open");

      const button=item.querySelector(".dropdown-toggle");

      if(button){
        button.setAttribute("aria-expanded","false");
      }
    });
  };

  desktopItems.forEach(item=>{

    const button=item.querySelector(".dropdown-toggle");

    if(!button)return;

    button.addEventListener("click",event=>{
      event.preventDefault();
      event.stopPropagation();

      const open=item.classList.contains("is-open");

      closeDesktop();

      if(!open){
        item.classList.add("is-open");
        button.setAttribute("aria-expanded","true");
      }
    });

  });


  /* Klik udenfor desktop-menu */
  document.addEventListener("click",event=>{
    if(!event.target.closest(".desktop-nav")){
      closeDesktop();
    }
  });


  /* =====================================================
     MOBILE DROPDOWNS
  ===================================================== */

  const closeMobileDropdowns=()=>{
    mobileItems.forEach(item=>{
      item.classList.remove("is-open");

      const button=item.querySelector(
        ".mobile-dropdown-toggle"
      );

      if(button){
        button.setAttribute("aria-expanded","false");
      }
    });
  };

  mobileItems.forEach(item=>{

    const button=item.querySelector(
      ".mobile-dropdown-toggle"
    );

    if(!button)return;

    button.addEventListener("click",event=>{
      event.preventDefault();
      event.stopPropagation();

      const open=item.classList.contains("is-open");

      closeMobileDropdowns();

      if(!open){
        item.classList.add("is-open");
        button.setAttribute("aria-expanded","true");
      }
    });

  });


  /* =====================================================
     ÅBN MOBILMENU
  ===================================================== */

  const openMobileMenu=()=>{

    if(!mobileMenu||!menuOpen)return;

    mobileMenu.hidden=false;

    document.body.classList.add("menu-is-open");

    menuOpen.setAttribute("aria-expanded","true");
    menuOpen.setAttribute("aria-label","Luk menu");

    if(menuClose){
      setTimeout(()=>menuClose.focus(),0);
    }
  };


  /* =====================================================
     LUK MOBILMENU
  ===================================================== */

  const closeMobileMenu=()=>{

    if(!mobileMenu||!menuOpen)return;

    mobileMenu.hidden=true;

    document.body.classList.remove("menu-is-open");

    menuOpen.setAttribute("aria-expanded","false");
    menuOpen.setAttribute("aria-label","Åbn menu");

    closeMobileDropdowns();
  };


  /* =====================================================
     HAMBURGER
  ===================================================== */

  if(menuOpen){

    menuOpen.addEventListener("click",event=>{

      event.preventDefault();
      event.stopPropagation();

      if(mobileMenu.hidden){
        openMobileMenu();
      }else{
        closeMobileMenu();
      }

    });

  }


  /* =====================================================
     LUK-KNAP
  ===================================================== */

  if(menuClose){

    menuClose.addEventListener("click",event=>{

      event.preventDefault();
      event.stopPropagation();

      closeMobileMenu();
      menuOpen?.focus();

    });

  }


  /* =====================================================
     MOBILE LINKS
  ===================================================== */

  if(mobileMenu){

    mobileMenu.querySelectorAll("a").forEach(link=>{

      link.addEventListener("click",()=>{
        closeMobileMenu();
      });

    });

  }


  /* =====================================================
     ESCAPE
  ===================================================== */

  document.addEventListener("keydown",event=>{

    if(event.key!=="Escape")return;

    if(mobileMenu&&!mobileMenu.hidden){

      closeMobileMenu();
      menuOpen?.focus();

    }else{

      closeDesktop();

    }

  });


  /* =====================================================
     RESIZE
  ===================================================== */

  window.addEventListener("resize",()=>{

    if(window.innerWidth>1024){

      if(mobileMenu){
        mobileMenu.hidden=true;
      }

      document.body.classList.remove("menu-is-open");

      if(menuOpen){
        menuOpen.setAttribute("aria-expanded","false");
        menuOpen.setAttribute("aria-label","Åbn menu");
      }

      closeMobileDropdowns();

    }

  });


  /* =====================================================
     GLOBAL NAVIGATION
  ===================================================== */

  window.navigationDropdowns={
    closeDesktopMenus:closeDesktop,
    closeMobileDropdowns,
    openMobileMenu,
    closeMobileMenu
  };

});