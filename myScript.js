/*-------------------------------IMAGE PROTECTION--------------------------------*/
document.addEventListener('contextmenu', function (e) {
    if (e.target.tagName === 'IMG') e.preventDefault();
});
/*-------------------------------END IMAGE PROTECTION--------------------------------*/

/*-------------------------------COMMISSION PRICE CONFIG--------------------------------*/
// Edit these values to change pricing. Keys MUST match the dropdown option values exactly.
const COMMISSION_PRICES = {
    Toontuber: {
        types:  { 'Simple': 30, 'Half Body': 80, 'Full Body': 100 },
        addOns: { 'Set': 20, 'Mute/Deafen': 20 },
    },
    Animation: {
        types:  { 'Sketch': 60, 'Flat Colours': 100, 'Shaded': 200 },
        addOns: { 'Background': 20 },
        // Additional Characters: multiplier applied to base type price (1.0 = +100%)
        additionalChars: { '1': 1.0, '2': 2.0, '3': 3.0, '4 or more': 4.0 },
    },
    Illustration: {
        types:  { 'Sketch': 20, 'Flat Colours': 40, 'Shaded': 80 },
        addOns: { 'Background': 20 },
        // Additional Characters: multiplier applied to base type price (0.8 = +80%)
        additionalChars: { '1': 0.8, '2': 1.6, '3': 2.4, '4 or more': 3.2 },
    },
    'Character Design': {
        types:  { 'Reference Sheet': 60, 'Turnaround': 80 },
    },
    'Animated Assets': {
        types:  { 'Profile Pic': 30, 'Stream Assets': 20 },
        // Emote bundle pricing — edit these values for each quantity
        emotes: { '1': 30, '2': 60, '3': 90, '4 or more': 100 },
    },
    'Graphic Assets': {
        types:  { 'Character Design': 60, 'Reference Sheet': 80, 'Profile Pic': 20, 'Banner': 30, 'Stream Assets': 20 },
        // Emote bundle pricing — edit these values for each quantity
        emotes: { '1': 20, '2': 40, '3': 60, '4 or more': 70 },
    },
    Package: {
        types:  { 'Minimum': 350, 'Lite': 500, 'Pro': 1000, 'Full': 2000 },
    },
};
/*-------------------------------END COMMISSION PRICE CONFIG--------------------------------*/

/*-------------------------------COMMISSION FORM LOGIC--------------------------------*/
var SVC_MAP = {
    'Toontuber':       'svc-toontuber',
    'Animation':       'svc-animation',
    'Illustration':    'svc-illustration',
    'Animated Assets': 'svc-animatedassets',
    'Graphic Assets':  'svc-graphicassets',
    'Package':         'svc-package'
};

function syncServiceFromDropdown() {
    var commissionType = document.getElementById('commissionType').value;
    var svcId = SVC_MAP[commissionType];

    if (svcId) {
        var card = document.getElementById(svcId);
        var clone = card.cloneNode(true);
        clone.removeAttribute('onclick');
        clone.classList.add('svc-active');

        var container = document.getElementById('svcSelectedCard');
        container.innerHTML = '';
        container.appendChild(clone);

        document.getElementById('svcGrid').classList.add('hidden');
        document.getElementById('svcSelected').classList.remove('hidden');
        document.getElementById('serviceHeader').classList.add('hidden');
        document.getElementById('serviceBackBtn').classList.remove('hidden');
    } else {
        document.getElementById('svcGrid').classList.remove('hidden');
        document.getElementById('svcSelected').classList.add('hidden');
        document.getElementById('serviceHeader').classList.remove('hidden');
        document.getElementById('serviceBackBtn').classList.add('hidden');
        document.getElementById('priceValue').textContent = '—';
    }

    updateFormVisibility();
}

function selectService(svcId, commissionValue) {
    document.getElementById('commissionType').value = commissionValue;
    syncServiceFromDropdown();
}

function resetServiceSelection() {
    document.getElementById('commissionType').value = '';
    syncServiceFromDropdown();
}

function updatePriceEstimate() {
    var priceEl = document.getElementById('priceValue');
    if (!priceEl) return;

    var commissionType = document.getElementById('commissionType').value;
    if (!commissionType) { priceEl.textContent = '—'; return; }

    var config = COMMISSION_PRICES[commissionType];
    if (!config || !config.types) { priceEl.textContent = '—'; return; }

    var typeEl;
    if (commissionType === 'Toontuber') typeEl = document.getElementById('Type');
    else if (commissionType === 'Package') typeEl = document.getElementById('packageType');
    else typeEl = document.getElementById('levelOfDetail');

    var typeVal = typeEl ? typeEl.value : '';
    if (!typeVal) { priceEl.textContent = '—'; return; }

    var basePrice, total, isPlusPrice = false;

    // Emote bundle pricing (overrides types lookup when emotes config exists)
    if (typeVal === 'Emote' && config.emotes) {
        var emoteEl = document.getElementById('Emotes');
        var emoteQty = emoteEl ? emoteEl.value : '';
        if (!emoteQty || config.emotes[emoteQty] === undefined) { priceEl.textContent = '—'; return; }
        basePrice = config.emotes[emoteQty];
        if (emoteQty === '4 or more') isPlusPrice = true;
    } else {
        if (config.types[typeVal] === undefined) { priceEl.textContent = '—'; return; }
        basePrice = config.types[typeVal];
    }
    total = basePrice;

    // Add-ons
    if (config.addOns) {
        var addOnName = commissionType === 'Toontuber' ? 'entry.1015173148' : 'entry.80710002';
        var incomplete = false;
        document.querySelectorAll('input[name="' + addOnName + '"]:checked').forEach(function(cb) {
            if (cb.value === 'Additional Characters') {
                var qtyEl = document.getElementById('additionalCharacters');
                var qty = qtyEl ? qtyEl.value : '';
                if (!qty) { incomplete = true; return; }
                if (config.additionalChars && config.additionalChars[qty] !== undefined) {
                    total += basePrice * config.additionalChars[qty];
                    if (qty === '4 or more') isPlusPrice = true;
                }
            } else {
                total += config.addOns[cb.value] || 0;
            }
        });
        if (incomplete) { priceEl.textContent = '—'; return; }
    }

    // Type of use multiplier
    var typeOfUse = document.querySelector('input[name="entry.2121224666"]:checked');
    if (typeOfUse) {
        if (typeOfUse.value === 'Commercial') total *= 2;
        else if (typeOfUse.value === 'Monetised') total *= 1.3;
    }

    // Discount code
    var discountInput = document.getElementById('discount');
    if (discountInput && discountInput.value.trim().toUpperCase() === 'YAPPY20') {
        total *= 0.8;
    }

    priceEl.textContent = '$' + Math.round(total) + (isPlusPrice ? '+' : '');
}

document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('form');
    if (form) form.addEventListener('change', updatePriceEstimate);

    document.addEventListener('change', function(e) {
        if (e.target.id === 'addOnsAdditionalCharacters') {
            var field = document.getElementById('additionalCharactersField');
            if (field) field.classList.toggle('hidden', !e.target.checked);
        }
    });

    var discountInput = document.getElementById('discount');
    if (discountInput) discountInput.addEventListener('input', updatePriceEstimate);
});
/*-------------------------------END COMMISSION FORM LOGIC--------------------------------*/

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

var LEVEL_OPTIONS = {
    'Animation':       ['Sketch', 'Flat Colours', 'Shaded'],
    'Illustration':    ['Sketch', 'Flat Colours', 'Shaded'],
    'Graphic Assets':  ['Character Design', 'Reference Sheet', 'Profile Pic', 'Banner', 'Emote', 'Stream Assets'],
    'Animated Assets': ['Profile Pic', 'Emote', 'Stream Assets']
};

function setLevelOfDetailOptions(commissionType) {
    var select = document.getElementById('levelOfDetail');
    var prevVal = select.value;
    var opts = LEVEL_OPTIONS[commissionType] || [];
    select.innerHTML = '<option value="">Select</option>';
    opts.forEach(function(val) {
        var opt = document.createElement('option');
        opt.value = val;
        opt.textContent = val;
        select.appendChild(opt);
    });
    if (opts.indexOf(prevVal) !== -1) select.value = prevVal;
}

function updateFormVisibility() {
    var commissionType = document.getElementById('commissionType').value;

    ['animationIllustrationFields', 'toontuberFields', 'toontuberAddOns',
     'additionalCharactersField', 'packageplanfields', 'packagetypefields',
     'addOns', 'emoteFields', 'referenceSection', 'submitSection'].forEach(function(id) {
        var el = document.getElementById(id);
        if (el) el.classList.add('hidden');
    });

    if (commissionType === 'Toontuber') {
        document.getElementById('packageplanfields').classList.remove('hidden');
        document.getElementById('toontuberAddOns').classList.remove('hidden');

    } else if (commissionType === 'Animation' || commissionType === 'Illustration') {
        setLevelOfDetailOptions(commissionType);
        document.getElementById('animationIllustrationFields').classList.remove('hidden');
        document.getElementById('addOns').classList.remove('hidden');
        var addCharsBox = document.getElementById('addOnsAdditionalCharacters');
        if (addCharsBox && addCharsBox.checked) {
            document.getElementById('additionalCharactersField').classList.remove('hidden');
        }

    } else if (commissionType === 'Graphic Assets') {
        setLevelOfDetailOptions(commissionType);
        document.getElementById('animationIllustrationFields').classList.remove('hidden');
        if (document.getElementById('levelOfDetail').value === 'Emote') {
            document.getElementById('emoteFields').classList.remove('hidden');
        }

    } else if (commissionType === 'Animated Assets') {
        setLevelOfDetailOptions(commissionType);
        document.getElementById('animationIllustrationFields').classList.remove('hidden');
        if (document.getElementById('levelOfDetail').value === 'Emote') {
            document.getElementById('emoteFields').classList.remove('hidden');
        }

    } else if (commissionType === 'Package') {
        document.getElementById('packagetypefields').classList.remove('hidden');
    }

    if (commissionType !== '') {
        document.getElementById('referenceSection').classList.remove('hidden');
        document.getElementById('submitSection').classList.remove('hidden');
    }

    updatePriceEstimate();
}

    function postToGoogleform() {
        var formData = new FormData(document.getElementById('form'));

        function resetAll() {
            $('#form')[0].reset();
            resetServiceSelection();
            $('.success-message').show();
            setTimeout(function() { $('.success-message').hide(); }, 5000);
        }

        fetch('https://docs.google.com/forms/d/e/1FAIpQLScyR6bmSrZ94RadqIRs9IL5N66xVfGBVKLhKgxgSL3uYHZgHw/formResponse', {
            method: 'POST',
            body: formData
        })
        .then(function() { resetAll(); })
        .catch(function(error) {
            console.error('Error submitting the form:', error);
            resetAll();
        });

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
/*-------------------------------ILLUSTRATION CAROUSEL--------------------------------*/
/* =====================================================================
   ADD YOUR ILLUSTRATION IMAGES HERE.
   Each entry: { src: 'path/to/image.jpg', alt: 'description' }
   Add or remove lines freely — the carousel adjusts automatically.
   ===================================================================== */
const illustrationImages = [
    { src: 'Images/Portfolio/Ruka.png',        alt: 'Ruka Sarashina' },
    { src: 'Images/Portfolio/Pumpkin.png',     alt: 'Pumpkin Pie Cookie' },
    { src: 'Images/Portfolio/Yap.png',         alt: 'Yap' },
];

(function () {
    const TRANSITION_MS = 650;

    document.addEventListener('DOMContentLoaded', function () {
        const track = document.getElementById('illustrationTrack');
        if (!track || illustrationImages.length === 0) return;

        const total = illustrationImages.length;

        illustrationImages.forEach(function (data) {
            const img = document.createElement('img');
            img.src = data.src;
            img.alt = data.alt;
            img.className = 'illus-item';
            track.appendChild(img);
        });

        const items = Array.from(track.querySelectorAll('.illus-item'));
        let current = 0;

        /* Assign prev/active/next — never removes illus-gone (its timeout does that).
           skipIndex: optional item index that should NOT receive illus-next yet
           (used when that element is still mid-exit and will slide in later). */
        function setClasses(skipIndex) {
            const prev = (current - 1 + total) % total;
            const next = (current + 1) % total;
            items.forEach(function (el, i) {
                el.classList.remove('illus-prev', 'illus-active', 'illus-next');
                if (i === current)                        el.classList.add('illus-active');
                else if (i === prev)                      el.classList.add('illus-prev');
                else if (i === next && i !== skipIndex)   el.classList.add('illus-next');
            });
        }

        /* Initial paint: snap into position without animating from off-screen */
        items.forEach(function (el) { el.style.transition = 'none'; });
        setClasses();
        requestAnimationFrame(function () {
            requestAnimationFrame(function () {
                items.forEach(function (el) { el.style.transition = ''; });
            });
        });

        function advance() {
            if (total < 2) return;

            const oldPrev = (current - 1 + total) % total;
            current = (current + 1) % total;
            const newNext = (current + 1) % total;

            if (oldPrev === newNext) {
                /* Teleport case (e.g. exactly 3 images): the same element must
                   both exit left AND enter right simultaneously.
                   Solution: a short-lived clone handles the left-exit animation
                   while the original instantly resets and slides in from the right. */
                const el = items[oldPrev];

                /* Clone takes over the left-exit animation */
                const clone = el.cloneNode(false);
                el.parentNode.appendChild(clone);
                clone.offsetHeight;              /* force reflow so transition fires from illus-prev position */
                clone.classList.add('illus-gone');

                /* Original resets to off-screen right, then slides in as illus-next */
                el.style.transition = 'none';
                el.classList.remove('illus-prev', 'illus-active', 'illus-next', 'illus-gone');
                el.offsetHeight;
                el.style.transition = '';
                setClasses();                    /* assigns illus-next → slides in from off-screen right */

                /* Remove clone once exit animation is done */
                setTimeout(function () {
                    if (clone.parentNode) clone.parentNode.removeChild(clone);
                }, TRANSITION_MS + 100);
            } else {
                /* Normal case: old prev slides out to the left (illus-gone),
                   new next slides in from the right (default staging position). */
                const exitEl = items[oldPrev];
                exitEl.classList.add('illus-gone'); /* triggers transition to off-screen left */
                setClasses();   /* new next gets illus-next → slides in from off-screen right */

                /* After the exit animation completes, reset to off-screen right */
                setTimeout(function () {
                    exitEl.style.transition = 'none';
                    exitEl.classList.remove('illus-gone');
                    exitEl.offsetHeight;
                    exitEl.style.transition = '';
                }, TRANSITION_MS + 100);
            }
        }

        if (total > 1) setInterval(advance, 3500);
    });
})();
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
 
