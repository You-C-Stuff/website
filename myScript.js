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
        $.ajax({
            url: "https://docs.google.com/forms/d/e/1FAIpQLScyR6bmSrZ94RadqIRs9IL5N66xVfGBVKLhKgxgSL3uYHZgHw/formResponse",
            data: $('#form').serialize(),
            type: "POST",
            dataType: "xml",
            error: function () {
                document.getElementById('formSuccessMsg').style.display = 'block';
                document.getElementById('form').reset();
                resetServiceSelection();
                setTimeout(function () { document.getElementById('formSuccessMsg').style.display = 'none'; }, 5000);
            }
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
          const midViewport = window.innerHeight / 2;

          navLinks.forEach(link => {
            const targetId = link.getAttribute('href');
            const target = document.querySelector(targetId);

            if (target) {
              const rect = target.getBoundingClientRect();
              if (rect.top <= midViewport && rect.bottom > midViewport) {
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

const PLATFORM_ICONS = {
    twitter:   'fa-brands fa-twitter',
    instagram: 'fa-brands fa-instagram',
    twitch:    'fa-brands fa-twitch',
    bluesky:   'fa-brands fa-bluesky',
    youtube:   'fa-brands fa-youtube',
    carrd:     'fa-solid fa-address-card',
};

function buildGalleryContainer(slides, isFirst) {
    const container = document.createElement('div');
    container.className = 'gallery-container' + (isFirst ? ' active' : '');

    const carouselContainer = document.createElement('div');
    carouselContainer.className = 'carousel-container';

    const carousel = document.createElement('div');
    carousel.className = 'carousel';

    const prevBtn = document.createElement('button');
    prevBtn.className = 'carousel-button prevbtn';
    prevBtn.innerHTML = '&#10094;';

    const inner = document.createElement('div');
    inner.className = 'carousel-inner';

    slides.forEach(function (s, i) {
        const slide = document.createElement('div');
        slide.className = 'artist' + (i === 0 ? ' active' : '');

        const info = document.createElement('div');
        info.className = 'artist-info';
        const h3 = document.createElement('h3');
        h3.textContent = s.name;
        info.appendChild(h3);

        if (s.links) {
            s.links.forEach(function (link) {
                if (!link.url) return;
                const a = document.createElement('a');
                a.href = link.url;
                a.target = '_blank';
                a.rel = 'noopener';
                const icon = document.createElement('i');
                icon.className = PLATFORM_ICONS[link.type] || 'fa-solid fa-link';
                a.appendChild(icon);
                info.appendChild(a);
            });
        }

        const img = document.createElement('img');
        img.loading = 'lazy';
        img.src = s.img;
        img.alt = s.name;

        slide.appendChild(info);
        slide.appendChild(img);
        inner.appendChild(slide);
    });

    const nextBtn = document.createElement('button');
    nextBtn.className = 'carousel-button nextbtn';
    nextBtn.innerHTML = '&#10095;';

    carousel.appendChild(prevBtn);
    carousel.appendChild(inner);
    carousel.appendChild(nextBtn);

    const carInfo = document.createElement('div');
    carInfo.className = 'car-info';
    const counter = document.createElement('span');
    counter.className = 'car-counter';
    carInfo.appendChild(counter);

    carouselContainer.appendChild(carousel);
    carouselContainer.appendChild(carInfo);

    const thumbWrapper = document.createElement('div');
    thumbWrapper.className = 'thumbnail-wrapper';

    const thumbLeft = document.createElement('button');
    thumbLeft.className = 'thumb-scroll left';
    thumbLeft.innerHTML = '&#10094;';

    const thumbnails = document.createElement('div');
    thumbnails.className = 'thumbnails';

    slides.forEach(function (s, i) {
        const thumb = document.createElement('div');
        thumb.className = 'thumbnail' + (i === 0 ? ' active' : '');
        const tImg = document.createElement('img');
        tImg.loading = 'lazy';
        tImg.src = s.thumb;
        tImg.alt = s.name;
        thumb.appendChild(tImg);
        thumbnails.appendChild(thumb);
    });

    const thumbRight = document.createElement('button');
    thumbRight.className = 'thumb-scroll right';
    thumbRight.innerHTML = '&#10095;';

    thumbWrapper.appendChild(thumbLeft);
    thumbWrapper.appendChild(thumbnails);
    thumbWrapper.appendChild(thumbRight);

    container.appendChild(carouselContainer);
    container.appendChild(thumbWrapper);
    return container;
}

function buildFanartGalleries() {
    const switcher = document.getElementById('fanartSwitcher');
    const wall = document.getElementById('fanartWall');
    if (!switcher || !wall || typeof FANART_GALLERIES === 'undefined') return;

    FANART_GALLERIES.forEach(function (gallery, gi) {
        const btn = document.createElement('button');
        btn.className = 'gallery-btn' + (gi === 0 ? ' active' : '');
        btn.textContent = gallery.label;
        btn.addEventListener('click', function () { switchGallery(gi); });
        switcher.appendChild(btn);

        const slides = gallery.artists.map(function (a) {
            return { name: a.name, img: a.img, thumb: a.thumb, links: a.links };
        });
        wall.appendChild(buildGalleryContainer(slides, gi === 0));
    });
}

function buildYappersGalleries() {
    const switcher = document.getElementById('yappersSwitcher');
    const wall = document.getElementById('yappersWall');
    if (!switcher || !wall || typeof YAPPERS_GENS === 'undefined') return;

    YAPPERS_GENS.forEach(function (gen, gi) {
        const btn = document.createElement('button');
        btn.className = 'gallery-btn' + (gi === 0 ? ' active' : '');
        btn.textContent = gen.label;
        btn.addEventListener('click', function () { switchGallery(gi); });
        switcher.appendChild(btn);

        const slides = gen.yappers.map(function (y) {
            return { name: y.name, img: y.talk, thumb: y.mute };
        });
        wall.appendChild(buildGalleryContainer(slides, gi === 0));
    });
}

function makeCarousel(container) {
    const slides = Array.from(container.querySelectorAll('.artist'));
    const thumbContainer = container.querySelector('.thumbnails');
    const origThumbs = thumbContainer ? Array.from(thumbContainer.querySelectorAll('.thumbnail')) : [];
    const prevBtn = container.querySelector('.prevbtn');
    const nextBtn = container.querySelector('.nextbtn');
    const counter = container.querySelector('.car-counter');
    let idx = 0, autoTimer = null, resumeTimer = null;

    // Clone only when thumbnails actually overflow — checked dynamically on resize
    const thumbWrapper = container.querySelector('.thumbnail-wrapper');
    const canLoop = origThumbs.length >= 8;
    let clonesAdded = false;
    const thumbPx = origThumbs.length > 0 ? (origThumbs[0].offsetWidth || 80) + 8 : 88;

    function syncLoopState() {
        if (!thumbContainer) return;
        const naturalWidth = origThumbs.length * thumbPx;
        const overflows = naturalWidth > thumbContainer.clientWidth + 1;
        if (overflows && canLoop) {
            if (!clonesAdded) {
                origThumbs.forEach(t => thumbContainer.appendChild(t.cloneNode(true)));
                clonesAdded = true;
            }
            if (thumbWrapper) thumbWrapper.classList.remove('no-loop');
        } else {
            if (clonesAdded) {
                Array.from(thumbContainer.querySelectorAll('.thumbnail'))
                    .slice(origThumbs.length).forEach(c => c.remove());
                clonesAdded = false;
            }
            if (thumbWrapper) thumbWrapper.classList.add('no-loop');
        }
    }
    syncLoopState();
    new ResizeObserver(syncLoopState).observe(container);
    window.addEventListener('load', syncLoopState);

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

        if (canLoop) {
            thumbContainer.addEventListener('scroll', () => {
                if (!clonesAdded) return;
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

function applyGalleryRowBreaks() {
    const rowSize = window.innerWidth <= 920 ? 5 : 10;
    document.querySelectorAll('.gallery-switcher').forEach(switcher => {
        switcher.querySelectorAll('.gallery-row-break').forEach(b => b.remove());
        const btns = switcher.querySelectorAll('.gallery-btn');
        btns.forEach((btn, i) => {
            if ((i + 1) % rowSize === 0 && i < btns.length - 1) {
                const br = document.createElement('div');
                br.className = 'gallery-row-break';
                btn.after(br);
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    buildFanartGalleries();
    buildYappersGalleries();
    document.querySelectorAll('.gallery-container').forEach(g => galleryCarousels.push(makeCarousel(g)));
    switchGallery(0);
    applyGalleryRowBreaks();
});
window.addEventListener('resize', applyGalleryRowBreaks);
/*-------------------------------ILLUSTRATION CAROUSEL--------------------------------*/
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

/*-------------------------------COMIC CAROUSEL--------------------------------*/
(function () {
    if (!document.getElementById('comicImg')) return;

    var activeSeries = 0, activeComic = 0;

    function getComics() { return COMIC_SERIES[activeSeries].comics; }

    function updateComic() {
        var comics = getComics();
        var img = document.getElementById('comicImg');
        var empty = document.getElementById('comicEmpty');
        var dropdown = document.getElementById('comicDropdown');
        if (!comics.length) {
            img.classList.add('hidden');
            empty.style.display = 'block';
            dropdown.disabled = true;
            return;
        }
        img.classList.remove('hidden');
        empty.style.display = 'none';
        dropdown.disabled = false;
        img.src = comics[activeComic].src;
        img.alt = comics[activeComic].title;
        dropdown.value = String(activeComic);
    }

    function buildDropdown() {
        var comics = getComics();
        var dropdown = document.getElementById('comicDropdown');
        dropdown.innerHTML = '';
        if (!comics.length) {
            var opt = document.createElement('option');
            opt.textContent = 'No comics yet';
            dropdown.appendChild(opt);
            return;
        }
        comics.forEach(function (c, i) {
            var opt = document.createElement('option');
            opt.value = String(i);
            opt.textContent = c.title;
            dropdown.appendChild(opt);
        });
    }

    function switchSeries(idx) {
        activeSeries = idx;
        var comics = getComics();
        activeComic = comics.length ? comics.length - 1 : 0;
        document.querySelectorAll('.comic-tab').forEach(function (t, i) {
            t.classList.toggle('active', i === idx);
        });
        buildDropdown();
        updateComic();
    }

    document.querySelectorAll('.comic-tab').forEach(function (tab, i) {
        tab.addEventListener('click', function () { switchSeries(i); });
    });

    document.getElementById('comicPrev').addEventListener('click', function () {
        var comics = getComics();
        if (!comics.length) return;
        activeComic = (activeComic - 1 + comics.length) % comics.length;
        updateComic();
    });

    document.getElementById('comicNext').addEventListener('click', function () {
        var comics = getComics();
        if (!comics.length) return;
        activeComic = (activeComic + 1) % comics.length;
        updateComic();
    });

    document.getElementById('comicDropdown').addEventListener('change', function () {
        activeComic = parseInt(this.value);
        updateComic();
    });

    document.getElementById('comicRandom').addEventListener('click', function () {
        var comics = getComics();
        if (!comics.length) return;
        activeComic = Math.floor(Math.random() * comics.length);
        updateComic();
    });

    var urlSeries = parseInt(new URLSearchParams(window.location.search).get('series'));
    switchSeries(isNaN(urlSeries) ? 0 : Math.min(urlSeries, COMIC_SERIES.length - 1));
})();


// ════════════════════════════════════════════════
// CHARACTERS PAGE
// ════════════════════════════════════════════════
(function () {
    if (!document.getElementById('seriesList')) return;

    // ── STATE ───────────────────────────────────
    var activeSeries   = 0;
    var activeChar     = 0;
    var carouselOffset = 0;
    var CAROUSEL_VISIBLE = 5;
    var transitioning  = false;

    // ── DOM REFS ────────────────────────────────
    var elCharPage      = document.querySelector('.char-page');
    var elSeriesList    = document.getElementById('seriesList');
    var elCharName      = document.getElementById('charName');
    var elCharAge       = document.getElementById('charAge');
    var elCharDesc      = document.getElementById('charDesc');
    var elCharLikes     = document.getElementById('charLikes');
    var elCharDislikes  = document.getElementById('charDislikes');
    var elCharQuote     = document.getElementById('charQuote');
    var elCharArt       = document.getElementById('charArt');
    var elCharArtPH     = document.getElementById('charArtPlaceholder');
    var elCharInfo      = document.getElementById('charInfo');
    var elCharArtCol    = document.getElementById('charArtCol');
    var elCharBgImg     = document.getElementById('charBgImg');
    var elCarouselTrack = document.getElementById('carouselTrack');
    var elWatermarkName = document.getElementById('seriesWatermarkName');

    // ── SERIES NAV ──────────────────────────────
    function buildSeriesNav() {
        elSeriesList.innerHTML = '';
        SERIES.forEach(function (s, i) {
            var li = document.createElement('li');
            li.textContent = s.name;
            li.dataset.series = i;
            if (i === activeSeries) li.classList.add('active');
            li.addEventListener('click', function () { selectSeries(i); });
            elSeriesList.appendChild(li);
        });
    }

    function selectSeries(idx) {
        if (idx === activeSeries || transitioning) return;
        activeSeries = idx;
        activeChar = 0;
        carouselOffset = 0;
        document.querySelectorAll('#seriesList li').forEach(function (li, i) {
            li.classList.toggle('active', i === idx);
        });
        transitionTo(activeChar);
    }

    // ── CAROUSEL ────────────────────────────────
    function buildCarousel() {
        elCarouselTrack.innerHTML = '';
        var chars = SERIES[activeSeries].characters;
        var total = chars.length;
        var needsScroll = total > CAROUSEL_VISIBLE;
        elCarouselTrack.classList.toggle('scrollable', needsScroll);
        updateCarouselBtns();
        var start = needsScroll ? carouselOffset : 0;
        var end = needsScroll ? Math.min(carouselOffset + CAROUSEL_VISIBLE, total) : total;
        for (var i = start; i < end; i++) {
            (function (idx) {
                var c = chars[idx];
                var thumb = document.createElement('div');
                thumb.className = 'carousel-thumb' + (idx === activeChar ? ' active' : '');
                thumb.dataset.charIdx = idx;
                if (c.thumb) {
                    var img = document.createElement('img');
                    img.src = c.thumb;
                    img.alt = c.name;
                    img.onerror = function () { img.style.display = 'none'; showThumbPH(thumb); };
                    thumb.appendChild(img);
                } else {
                    showThumbPH(thumb);
                }
                var label = document.createElement('div');
                label.className = 'thumb-name';
                label.textContent = c.name.toUpperCase();
                thumb.appendChild(label);
                thumb.addEventListener('click', function () {
                    if (+thumb.dataset.charIdx === activeChar || transitioning) return;
                    transitionTo(+thumb.dataset.charIdx);
                });
                elCarouselTrack.appendChild(thumb);
            }(i));
        }
    }

    function showThumbPH(parent) {
        var ph = document.createElement('div');
        ph.className = 'thumb-placeholder';
        ph.innerHTML = '<i class="fa-regular fa-user"></i>';
        parent.insertBefore(ph, parent.firstChild);
    }

    var elCarouselPrev = document.getElementById('carouselPrev');
    var elCarouselNext = document.getElementById('carouselNext');

    function updateCarouselBtns() {
        elCarouselPrev.disabled = false;
        elCarouselNext.disabled = false;
    }

    elCarouselPrev.addEventListener('click', function () {
        if (transitioning) return;
        var chars = SERIES[activeSeries].characters;
        transitionTo(activeChar > 0 ? activeChar - 1 : chars.length - 1);
    });
    elCarouselNext.addEventListener('click', function () {
        if (transitioning) return;
        var chars = SERIES[activeSeries].characters;
        transitionTo(activeChar < chars.length - 1 ? activeChar + 1 : 0);
    });

    // ── POPULATE ────────────────────────────────
    function populateChar(idx) {
        var c = SERIES[activeSeries].characters[idx];
        elCharName.textContent     = c.name.toUpperCase();
        elCharAge.textContent      = c.age      || '—';
        elCharDesc.textContent     = c.desc     || '—';
        elCharLikes.textContent    = c.likes    || '—';
        elCharDislikes.textContent = c.dislikes || '—';
        elCharQuote.textContent    = c.quote    || '—';
        elWatermarkName.textContent = SERIES[activeSeries].name.toUpperCase();
        elCharPage.style.setProperty('--color-accent', c.accent || '#FFC603');

        var elCharTags = document.getElementById('charTags');
        elCharTags.innerHTML = '';
        if (c.tags && c.tags.length) {
            c.tags.forEach(function (t) {
                var span = document.createElement('span');
                span.className = 'char-tag';
                span.textContent = t.toUpperCase();
                elCharTags.appendChild(span);
            });
        }

        var elCharComicLink = document.getElementById('charComicLink');
        if (c.comic) {
            elCharComicLink.href = c.comic;
            elCharComicLink.style.display = '';
        } else {
            elCharComicLink.style.display = 'none';
        }

        if (c.art) {
            elCharArt.src = c.art;
            elCharArt.alt = c.name;
            elCharArt.style.display = 'block';
            elCharArtPH.style.display = 'none';
            elCharArt.onerror = function () {
                elCharArt.style.display = 'none';
                elCharArtPH.style.display = 'flex';
            };
        } else {
            elCharArt.style.display = 'none';
            elCharArtPH.style.display = 'flex';
        }

        if (c.bg) {
            var tmp = new Image();
            tmp.onload  = function () { elCharBgImg.src = c.bg; };
            tmp.onerror = function () { elCharBgImg.src = ''; };
            tmp.src = c.bg;
        } else {
            elCharBgImg.src = '';
        }
    }

    // ── TRANSITION ──────────────────────────────
    // Info text fades in place; art slides right out then left in
    function transitionTo(newIdx) {
        if (transitioning) return;
        transitioning = true;

        elCharInfo.classList.add('info-anim-exit');
        elCharArtCol.classList.add('art-anim-exit');

        setTimeout(function () {
            elCharInfo.classList.remove('info-anim-exit');
            elCharArtCol.classList.remove('art-anim-exit');
            elCharInfo.style.opacity = '0';
            elCharArtCol.style.opacity = '0';

            activeChar = newIdx;
            // keep activeChar visible in the scroll window
            if (activeChar < carouselOffset) carouselOffset = activeChar;
            else if (activeChar >= carouselOffset + CAROUSEL_VISIBLE) carouselOffset = activeChar - CAROUSEL_VISIBLE + 1;
            populateChar(activeChar);
            buildCarousel();

            void elCharInfo.offsetWidth;
            elCharInfo.style.opacity = '';
            elCharArtCol.style.opacity = '';
            elCharInfo.classList.add('info-anim-enter');
            elCharArtCol.classList.add('art-anim-enter');

            setTimeout(function () {
                elCharInfo.classList.remove('info-anim-enter');
                elCharArtCol.classList.remove('art-anim-enter');
                transitioning = false;
            }, 480);
        }, 310);
    }

    // ── KEYBOARD NAV ────────────────────────────
    document.addEventListener('keydown', function (e) {
        var chars = SERIES[activeSeries].characters;
        if (e.key === 'ArrowRight' && activeChar < chars.length - 1) transitionTo(activeChar + 1);
        if (e.key === 'ArrowLeft'  && activeChar > 0)                transitionTo(activeChar - 1);
    });

    // ── INIT ────────────────────────────────────
    buildSeriesNav();
    populateChar(activeChar);
    buildCarousel();
}());
