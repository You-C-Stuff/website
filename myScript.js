  
/*-------------------------------FORM--------------------------------*/

function postToGoogle() {
    var field1 = $("#first-name").val();
    var field2 = $("#last-name").val();
    var field3 = $("#e-mail").val();
    var field4 = $("#subject").val();
    var field5 = $("#message").val();

    $.ajax({
        url: "https://docs.google.com/forms/d/e/1FAIpQLSccsVz7_GqMpyJohqS_knGiJVbczEjfYebjxC03Gm2Ss1VMFQ/formResponse",
        data: {
            "entry.260652021": field1,
            "entry.796514769": field2,
            "entry.956666418": field3,
            "entry.1084731251": field4,
            "entry.957718632": field5
        },
        type: "POST",
        dataType: "xml",
        error: function () {
            $('.success-message').show();
            $('#contact').trigger('reset');
            setTimeout(function () {
                $('.success-message').hide();
            }, 5000); // Hide after 5 seconds
        }
    });
    return false; // Ensure that the form submission is prevented
}

function updateFormVisibility() {
    var commissionType = document.getElementById("commissionType").value;
    var levelOfDetail = document.getElementById("levelOfDetail").value;
    var animationIllustrationFields = document.getElementById("animationIllustrationFields");
    var toontuberFields = document.getElementById("toontuberFields");
    var toontuberAddOns = document.getElementById("toontuberAddOns");
    var additionalCharactersField = document.getElementById("additionalCharactersField");
    var packageplanfields = document.getElementById("packageplanfields");
    var packagetypefields = document.getElementById("packagetypefields");
    var designTypeFields = document.getElementById("Designtype");
    var addOns = document.getElementById("addOns");
    var emoteFields = document.getElementById("emoteFields");
    var referenceSection = document.getElementById("referenceSection");
    var common = document.getElementById("common");
    var common1 = document.getElementById("common1");
    var common2 = document.getElementById("common2");
    var common3 = document.getElementById("common3");
    var uncommon = document.getElementById("uncommon");
    var uncommon1 = document.getElementById("uncommon1");
    var rare = document.getElementById("rare");
    var rare1 = document.getElementById("rare1");

    // Clear all service highlights
    document.querySelectorAll(".svc-item").forEach(function(el) {
        el.classList.remove("svc-active");
    });

    // Highlight the matching service
    var svcMap = {
        "Animation":        "svc-animation",
        "Illustration":     "svc-illustration",
        "Toontuber":        "svc-toontuber",
        "Character Design": "svc-conceptdesign",
        "Animated Assets":  "svc-animatedassets",
        "Graphic Assets":   "svc-graphicassets"
    };
    if (svcMap[commissionType]) {
        document.getElementById(svcMap[commissionType]).classList.add("svc-active");
    }

    // Hide all sections initially
    animationIllustrationFields.classList.add("hidden");
    toontuberFields.classList.add("hidden");
    toontuberAddOns.classList.add("hidden");
    additionalCharactersField.classList.add("hidden");
    packageplanfields.classList.add("hidden");
    packagetypefields.classList.add("hidden");
    designTypeFields.classList.add("hidden");
    addOns.classList.add("hidden");
    emoteFields.classList.add("hidden");
    referenceSection.classList.add("hidden");

    // Show relevant fields based on the selected commission type
    if (commissionType === "Animated Assets") {
        animationIllustrationFields.classList.remove("hidden");

        common.classList.add("hidden");
        common1.classList.add("hidden");
        common2.classList.add("hidden");
        common3.classList.add("hidden");
        uncommon.classList.remove("hidden");
        uncommon1.classList.remove("hidden");
        rare1.classList.add("hidden");
        rare.classList.add("hidden");

        // Manage visibility based on level of detail
        if (levelOfDetail === "Emote" ) {
            emoteFields.classList.remove("hidden");
        }

    } else if (commissionType === "Graphic Assets") {
        animationIllustrationFields.classList.remove("hidden");

        common.classList.add("hidden");
        common1.classList.add("hidden");
        common2.classList.add("hidden");
        common3.classList.add("hidden");
        uncommon.classList.remove("hidden");
        uncommon1.classList.remove("hidden");
        rare1.classList.remove("hidden");
        rare.classList.remove("hidden");

        // Manage visibility based on level of detail
        if (levelOfDetail === "Emote" ) {
            emoteFields.classList.remove("hidden");
        }

    } else if (commissionType === "Toontuber") {
        toontuberFields.classList.remove("hidden");
        toontuberAddOns.classList.remove("hidden");
        packageplanfields.classList.remove("hidden");

    } else if (commissionType === "Character Design") {
        designTypeFields.classList.remove("hidden");

    } else if (commissionType === "Animation" || commissionType === "Illustration") {
        animationIllustrationFields.classList.remove("hidden");

        addOns.classList.remove("hidden");
        common.classList.remove("hidden");
        common1.classList.remove("hidden");
        common2.classList.remove("hidden");
        common3.classList.remove("hidden");
        uncommon.classList.add("hidden");
        uncommon1.classList.add("hidden");
        rare1.classList.add("hidden");
        rare.classList.add("hidden");

    } else if (commissionType === "Package") {
        packagetypefields.classList.remove("hidden");
    }

    // Show reference/details section for any valid selection
    if (commissionType !== "") {
        referenceSection.classList.remove("hidden");
    }

    // Add event listener for the additional characters checkbox
    var additionalCharactersCheckbox = document.querySelector('input[name="entry.80710002"][value="Additional Characters"]');
    if (additionalCharactersCheckbox) {
        additionalCharactersCheckbox.addEventListener('change', function() {
            if (this.checked) {
                additionalCharactersField.classList.remove("hidden");
            } else {
                additionalCharactersField.classList.add("hidden");
            }
        });
    }
}

    function postToGoogleform() {
        // Collect form data
        var formData = new FormData(document.getElementById("form"));

        // Asynchronous request to submit form data
        fetch("https://docs.google.com/forms/d/e/1FAIpQLScyR6bmSrZ94RadqIRs9IL5N66xVfGBVKLhKgxgSL3uYHZgHw/formResponse", {
            method: "POST",
            body: formData
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok.");
            }
            
            // Reset form elements except for specific fields
            $('#commissionType').val(''); // Reset commission type to default
            $('#animationIllustrationFields').addClass('hidden');
            $('#toontuberFields').addClass('hidden');
            $('#referenceLink').addClass('hidden');
            $('#additionalCharactersField').addClass('hidden');
            $('#packageplanfields').addClass('hidden');
            $('#toontuberAddOns').addClass('hidden');
            $('#Designtype').addClass('hidden');
            $('#emoteFields').addClass('hidden');
            $('#AddOns').addClass('hidden');
            $('#referenceSection').addClass('hidden');
            $('.svc-item').removeClass('svc-active');

            // Display success message for 5 seconds
            $('.success-message').show();
            $('#form')[0].reset(); // Reset form using plain JavaScript for non-input elements
            setTimeout(function () {
                $('.success-message').hide();
            }, 5000); // Hide after 5 seconds
        })
        .catch(error => {
            console.error("Error submitting the form:", error);
            // Handle error if needed

            // Reset form elements except for specific fields on error as well
            $('#commissionType').val(''); // Reset commission type to default
            $('#animationIllustrationFields').addClass('hidden');
            $('#toontuberFields').addClass('hidden');
            $('#referenceLink').addClass('hidden');
            $('#additionalCharactersField').addClass('hidden');
            $('#packageplanfields').addClass('hidden');
            $('#toontuberAddOns').addClass('hidden');
            $('#Designtype').addClass('hidden');
            $('#emoteFields').addClass('hidden');
            $('#AddOns').addClass('hidden');
            $('#referenceSection').addClass('hidden');
            $('.svc-item').removeClass('svc-active');

            // Display success message for 5 seconds
            $('.success-message').show();
            $('#form')[0].reset(); // Reset form using plain JavaScript for non-input elements
            setTimeout(function () {
                $('.success-message').hide();
            }, 5000); // Hide after 5 seconds
        });

        // Prevent the default form submission
        return false;
    }


    document.addEventListener('DOMContentLoaded', () => {
        const navLinks = document.querySelectorAll('.dot-nav a');
  
        // Smooth scroll on click
        navLinks.forEach(link => {
          link.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
              target.scrollIntoView({ behavior: 'smooth' });
            }
          });
        });
  
        // ScrollSpy
        window.addEventListener('scroll', () => {
          const scrollPos = window.scrollY + window.innerHeight / 2;
  
          navLinks.forEach(link => {
            const targetId = link.getAttribute('href');
            const target = document.querySelector(targetId);
  
            if (target) {
              const sectionTop = target.offsetTop;
              const sectionHeight = target.offsetHeight;
  
              if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                link.classList.add('active');
              } else {
                link.classList.remove('active');
              }
            }
          });
 });
 });

/*-------------------------------GALLERY--------------------------------*/
const galleryCarousels = [];

function makeCarousel(container) {
    const slides = Array.from(container.querySelectorAll('.artist'));
    const thumbContainer = container.querySelector('.thumbnails');
    const origThumbs = thumbContainer ? Array.from(thumbContainer.querySelectorAll('.thumbnail')) : [];
    const prevBtn = container.querySelector('.prevbtn');
    const nextBtn = container.querySelector('.nextbtn');
    const counter = container.querySelector('.car-counter');
    let idx = 0, autoTimer = null, resumeTimer = null;

    // Only clone for infinite loop when there are enough thumbnails to warrant it
    const shouldLoop = origThumbs.length >= 8;
    const thumbWrapper = container.querySelector('.thumbnail-wrapper');
    if (!shouldLoop && thumbWrapper) thumbWrapper.classList.add('no-loop');
    if (thumbContainer && origThumbs.length > 0 && shouldLoop) {
        origThumbs.forEach(t => thumbContainer.appendChild(t.cloneNode(true)));
    }

    const thumbPx = origThumbs.length > 0 ? (origThumbs[0].offsetWidth || 80) + 8 : 88;

    function updateThumbs() {
        if (!thumbContainer) return;
        Array.from(thumbContainer.querySelectorAll('.thumbnail'))
            .forEach((t, i) => t.classList.toggle('active', i % origThumbs.length === idx));
        if (origThumbs[idx]) {
            const t = origThumbs[idx];
            const cw = thumbContainer.clientWidth;
            const sl = thumbContainer.scrollLeft;
            if (t.offsetLeft < sl) thumbContainer.scrollTo({ left: t.offsetLeft - 8, behavior: 'smooth' });
            else if (t.offsetLeft + t.offsetWidth > sl + cw) thumbContainer.scrollTo({ left: t.offsetLeft + t.offsetWidth - cw + 8, behavior: 'smooth' });
        }
    }

    function show(n) {
        slides[idx].classList.remove('active');
        idx = ((n % slides.length) + slides.length) % slides.length;
        slides[idx].classList.add('active');
        if (counter) counter.textContent = (idx + 1) + ' / ' + slides.length;
        updateThumbs();
    }

    function startAuto() { clearInterval(autoTimer); autoTimer = setInterval(() => show(idx + 1), 4000); }
    function stopAuto() { clearInterval(autoTimer); autoTimer = null; clearTimeout(resumeTimer); resumeTimer = null; }
    function pauseAuto() { clearInterval(autoTimer); autoTimer = null; clearTimeout(resumeTimer); resumeTimer = setTimeout(startAuto, 8000); }

    if (prevBtn) prevBtn.addEventListener('click', () => { show(idx - 1); pauseAuto(); });
    if (nextBtn) nextBtn.addEventListener('click', () => { show(idx + 1); pauseAuto(); });

    // Thumbnail click — event delegation covers originals + clones
    if (thumbContainer) {
        thumbContainer.addEventListener('click', e => {
            const thumb = e.target.closest('.thumbnail');
            if (!thumb) return;
            const i = Array.from(thumbContainer.querySelectorAll('.thumbnail')).indexOf(thumb) % origThumbs.length;
            if (i >= 0) { show(i); pauseAuto(); }
        });
    }

    // Swipe on carousel image
    const inner = container.querySelector('.carousel-inner');
    if (inner) {
        let tx = 0;
        inner.addEventListener('touchstart', e => { tx = e.touches[0].clientX; }, { passive: true });
        inner.addEventListener('touchend', e => {
            const d = tx - e.changedTouches[0].clientX;
            if (Math.abs(d) > 50) { show(idx + (d > 0 ? 1 : -1)); pauseAuto(); }
        });
    }

    // Thumbnail strip scroll, drag, infinite loop
    if (thumbContainer) {
        const wrapper = container.querySelector('.thumbnail-wrapper');
        const scrollLeftBtn = container.querySelector('.thumb-scroll.left');
        const scrollRightBtn = container.querySelector('.thumb-scroll.right');
        const origCount = origThumbs.length;

        if (scrollLeftBtn) scrollLeftBtn.addEventListener('click', () => thumbContainer.scrollBy({ left: -150, behavior: 'smooth' }));
        if (scrollRightBtn) scrollRightBtn.addEventListener('click', () => thumbContainer.scrollBy({ left: 150, behavior: 'smooth' }));

        if (shouldLoop) {
            thumbContainer.addEventListener('scroll', () => {
                const sl = thumbContainer.scrollLeft;
                const maxScroll = thumbContainer.scrollWidth - thumbContainer.clientWidth;
                if (sl <= 0) thumbContainer.scrollLeft = thumbPx * origCount;
                else if (sl >= maxScroll) thumbContainer.scrollLeft = thumbPx * origCount - (wrapper ? wrapper.offsetWidth / 2 : 150);
            });
        }

        let isDragging = false, dragStartX, dragStartSL;
        thumbContainer.addEventListener('mousedown', e => { isDragging = true; thumbContainer.classList.add('dragging'); dragStartX = e.pageX - thumbContainer.offsetLeft; dragStartSL = thumbContainer.scrollLeft; });
        thumbContainer.addEventListener('mouseleave', () => { isDragging = false; thumbContainer.classList.remove('dragging'); });
        thumbContainer.addEventListener('mouseup', () => { isDragging = false; thumbContainer.classList.remove('dragging'); });
        thumbContainer.addEventListener('mousemove', e => { if (!isDragging) return; e.preventDefault(); thumbContainer.scrollLeft = dragStartSL - (e.pageX - thumbContainer.offsetLeft - dragStartX) * 1.5; });
        thumbContainer.addEventListener('touchstart', e => { dragStartX = e.touches[0].pageX; dragStartSL = thumbContainer.scrollLeft; }, { passive: true });
        thumbContainer.addEventListener('touchmove', e => { thumbContainer.scrollLeft = dragStartSL - (e.touches[0].pageX - dragStartX) * 1.2; });
    }

    show(0);
    return { startAuto, stopAuto };
}

window.switchGallery = function(index) {
    document.querySelectorAll('.gallery-container').forEach((g, i) => g.classList.toggle('active', i === index));
    document.querySelectorAll('.gallery-btn').forEach((b, i) => b.classList.toggle('active', i === index));
    galleryCarousels.forEach((c, i) => i === index ? c.startAuto() : c.stopAuto());
};

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.gallery-container').forEach(g => galleryCarousels.push(makeCarousel(g)));
    switchGallery(0);
});
/*-------------------------------SCROLL TO TOP--------------------------------*/

let mybutton = document.getElementById("myBtn");

window.onscroll = function() {
  scrollFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.classList.add("show");
  } else {
    mybutton.classList.remove("show");
  }
}

function topFunction() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
/*-------------------------------HEADER--------------------------------*/

// Add click event listener to navigation links to retain text decoration
const navLinks = document.querySelectorAll('.nav-links a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        // Add active class to the clicked link and remove from others
        navLinks.forEach(navLink => {
            if (navLink === link) {
                navLink.classList.add('active');
            } else {
                navLink.classList.remove('active');
            }
        });
    });
});

/*-------------------------------EVERYTHING ELSE--------------------------------*/
document.addEventListener("DOMContentLoaded", () => {
    const hamburger = document.getElementById('hamburger');
    const overlay = document.getElementById('overlay');
    const body = document.body;
    const header = document.querySelector('.header');

    hamburger.addEventListener('click', () => {
        overlay.classList.toggle('active');
        hamburger.classList.toggle('active');
        body.classList.toggle('no-scroll');
    });

    // Close overlay when a link is clicked
    const overlayLinks = document.querySelectorAll('.overlay-menu a');
    overlayLinks.forEach(link => {
        link.addEventListener('click', () => {
            overlay.classList.remove('active');
            hamburger.classList.remove('active');
            body.classList.remove('no-scroll');
        });
    });

    // Remove overlay and hamburger active class on window resize if larger than 768px
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            overlay.classList.remove('active');
            hamburger.classList.remove('active');
            body.classList.remove('no-scroll');
        }
    });
    
    // Header Scroll Behavior
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

  // Highlight the active link based on the current page
  const setActiveLink = () => {
      const path = window.location.pathname.split('/').pop();
      const navLinks = document.querySelectorAll('.nav-links a');
      const overlayLinks = document.querySelectorAll('.overlay-menu a');

      navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === path) {
              link.classList.add('active');
          }
      });

      overlayLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === path) {
              link.classList.add('active');
          }
      });
  };

  setActiveLink();

  /*---------------------------------------------------------------*/

  const modal = document.getElementById("modal");
const modalImg = document.getElementById("modal-img");
const closeBtn = document.getElementsByClassName("close")[0];
const nextBtn = document.getElementsByClassName("next")[0];
const prevBtn = document.getElementsByClassName("prev")[0];
const scrollTopButton = document.getElementById("myBtn");
// header is already defined elsewhere
const dotNav = document.querySelector('.dot-nav'); // select the dot navigation

let currentIndex = 0;

// Get all gallery items
const items = Array.from(document.querySelectorAll(".image-wrapper img"));

// Function to open modal
const openModal = (index) => {
    currentIndex = index;
    modal.style.display = "flex"; // show modal
    const currentItem = items[index];
    modalImg.src = currentItem.getAttribute('data-full');
    document.getElementById('caption').textContent = currentItem.nextElementSibling.textContent;

    // Hide header, scroll-to-top button, and dot navigation
    if (header) header.style.display = "none";
    if (scrollTopButton) scrollTopButton.style.display = "none";
    if (dotNav) dotNav.style.display = "none";

    // Prevent background scrolling
    document.body.style.overflow = 'hidden';
};

// Function to close modal
const closeModal = () => {
    modal.style.display = "none";

    // Show header, scroll-to-top button, and dot navigation
    if (header) header.style.display = "";
    if (scrollTopButton) scrollTopButton.style.display = "block";
    if (dotNav) dotNav.style.display = "block";

    document.body.style.overflow = ''; // restore scrolling
};

// Add click events to gallery images
items.forEach((item, index) => {
    item.addEventListener("click", () => openModal(index));
});

// Close modal with close button
if (closeBtn) closeBtn.onclick = closeModal;

// Close modal if clicked outside image
if (modal) modal.onclick = (event) => {
    if (event.target === modal) closeModal();
};

// Navigate images
const showNext = () => openModal((currentIndex + 1) % items.length);
const showPrev = () => openModal((currentIndex - 1 + items.length) % items.length);

// Bind navigation buttons
if (nextBtn) nextBtn.onclick = showNext;
if (prevBtn) prevBtn.onclick = showPrev;

// Keyboard navigation
document.addEventListener('keydown', (event) => {
    if (modal.style.display === "flex") {
        if (event.key === 'ArrowRight') showNext();
        else if (event.key === 'ArrowLeft') showPrev();
        else if (event.key === 'Escape') closeModal();
    }
});
 });

/*-------------------------------DROPDOWN OVERLAY--------------------------------*/
document.querySelectorAll('.overlay-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
        const parent = btn.closest('.overlay-dropdown');
        parent.classList.toggle('open');
        btn.setAttribute('aria-expanded', parent.classList.contains('open'));
    });
});
 
