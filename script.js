let images = [];

let currentIndex = 0;

const mainSlide =
  document.getElementById("mainSlide");

const thumbnailContainer =
  document.getElementById("thumbnailContainer");

const fullscreenImage =
  document.getElementById("fullscreenImage");

const fullscreenModal =
  document.getElementById("fullscreenModal");

/* =========================
   LOAD SLIDES
========================= */

async function loadSlides(){

  try{

    const response =
      await fetch("warta/slides.json");

    const data = await response.json();

    images = data.map(
      img => `warta/${img}`
    );

    renderThumbnails();

    updateSlide();

  }catch(error){

    console.error(
      "Gagal load slides",
      error
    );

  }

}

/* =========================
   THUMBNAILS
========================= */

function renderThumbnails(){

  thumbnailContainer.innerHTML = "";

  images.forEach((img, index)=>{

    const item =
      document.createElement("div");

    item.className =
      "thumbnail-item";

    /* IMAGE */

    const thumb =
      document.createElement("img");

    thumb.src = img;

    if(index === currentIndex){

      thumb.classList.add(
        "active-thumb"
      );

    }

    thumb.onclick = ()=>{

      currentIndex = index;

      updateSlide();

    };

    /* DOWNLOAD BUTTON */

    const downloadBtn =
      document.createElement("a");

    downloadBtn.href = img;

    downloadBtn.download = "";

    downloadBtn.className =
      "thumb-download";

    downloadBtn.innerHTML =
      "⬇ Unduh";

    item.appendChild(thumb);

    item.appendChild(downloadBtn);

    thumbnailContainer.appendChild(item);

  });

}

/* =========================
   UPDATE SLIDE
========================= */

function updateSlide(){

  if(images.length === 0) return;

  mainSlide.src =
    images[currentIndex];

  fullscreenImage.src =
    images[currentIndex];

  updateActiveThumbnail();

}

/* =========================
   ACTIVE THUMB
========================= */

function updateActiveThumbnail(){

  const thumbs =
    thumbnailContainer.querySelectorAll("img");

  thumbs.forEach((thumb, index)=>{

    thumb.classList.toggle(
      "active-thumb",
      index === currentIndex
    );

  });

  const activeThumb =
    thumbnailContainer.querySelector(
      ".active-thumb"
    );

  if(activeThumb){

    activeThumb.scrollIntoView({

      behavior:"smooth",
      inline:"center",
      block:"nearest"

    });

  }

}

/* =========================
   CHANGE SLIDE
========================= */

function changeSlide(direction){

  currentIndex += direction;

  if(currentIndex >= images.length){

    currentIndex = 0;

  }

  if(currentIndex < 0){

    currentIndex =
      images.length - 1;

  }

  updateSlide();

}

/* =========================
   FULLSCREEN
========================= */

function openFullscreen(){

  fullscreenImage.src =
    images[currentIndex];

  fullscreenModal.style.display =
    "flex";

}

function closeFullscreen(){

  fullscreenModal.style.display =
    "none";

}

fullscreenModal.addEventListener(
  "click",
  function(e){

    if(e.target === this){

      closeFullscreen();

    }

  }
);

/* =========================
   KEYBOARD
========================= */

document.addEventListener(
  "keydown",
  (e)=>{

    if(e.key === "ArrowRight"){

      changeSlide(1);

    }

    if(e.key === "ArrowLeft"){

      changeSlide(-1);

    }

    if(e.key === "Escape"){

      closeFullscreen();

    }

  }
);

/* =========================
   INIT
========================= */

loadSlides();