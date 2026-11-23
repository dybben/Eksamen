"use strict";

document.addEventListener("DOMContentLoaded",()=>{

  /* =====================================================
     HEADER SCROLL
  ===================================================== */

  const header=document.querySelector("#site-header");

  if(header){

    const updateHeader=()=>{
      header.classList.toggle(
        "is-scrolled",
        window.scrollY>24
      );
    };

    updateHeader();

    window.addEventListener(
      "scroll",
      updateHeader,
      {passive:true}
    );

  }


  /* =====================================================
     HERO VIDEO
  ===================================================== */

  const video=document.querySelector("#hero-video");
  const videoControl=document.querySelector("#video-control");

  if(video&&videoControl){

    const syncVideoButton=()=>{

      const paused=video.paused;

      videoControl.classList.toggle(
        "is-paused",
        paused
      );

      videoControl.setAttribute(
        "aria-label",
        paused
          ?"Afspil video"
          :"Sæt video på pause"
      );

      videoControl.setAttribute(
        "title",
        paused
          ?"Afspil video"
          :"Pause video"
      );

    };


    videoControl.addEventListener(
      "click",
      async()=>{

        try{

          if(video.paused){
            await video.play();
          }else{
            video.pause();
          }

        }catch(error){

          console.warn(
            "Video kunne ikke afspilles:",
            error
          );

        }

        syncVideoButton();

      }
    );


    video.addEventListener(
      "play",
      syncVideoButton
    );

    video.addEventListener(
      "pause",
      syncVideoButton
    );

    syncVideoButton();

  }

});