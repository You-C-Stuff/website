
/*-------------------------------SCROLL TO TOP--------------------------------*/

// Get the button
let mybutton = document.getElementById("myBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  window.scrollTo({top: 0, behavior: 'smooth'});
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
    const a= document.querySelector('.prevbtn');
    const b = document.querySelector('.nextbtn');
    
    hamburger.addEventListener('click', () => {
        overlay.classList.toggle('active');
        hamburger.classList.toggle('active');
        body.classList.toggle('no-scroll');
    
        // Toggle visibility of prevBtn and nextBtn
        if (a && b) {
            a.classList.toggle('hidden');
            b.classList.toggle('hidden');
        }
    });
    
    // Close overlay when a link is clicked
    const overlayLinks = document.querySelectorAll('.overlay-menu a');
    overlayLinks.forEach(link => {
        link.addEventListener('click', () => {
            overlay.classList.remove('active');
            hamburger.classList.remove('active');
            body.classList.remove('no-scroll');
    
            // Ensure prevBtn and nextBtn are shown when overlay closes
            if (a && b) {
                a.classList.remove('hidden');
                b.classList.remove('hidden');
            }
        });
    });
    
    // Remove overlay and hamburger active class on window resize if larger than 768px
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            overlay.classList.remove('active');
            hamburger.classList.remove('active');
            body.classList.remove('no-scroll');
    
            // Ensure prevBtn and nextBtn are shown when window is resized
            if (a && b) {
                a.classList.remove('hidden');
                b.classList.remove('hidden');
            }
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

  // Update active link on hash change (e.g., for single-page applications)
  window.addEventListener('hashchange', setActiveLink);
  const modal = document.getElementById("modal");
  const modalImg = document.getElementById("modal-img");
  const closeBtn = document.getElementsByClassName("close")[0];
  const nextBtn = document.getElementsByClassName("next")[0];
  const prevBtn = document.getElementsByClassName("prev")[0];
  const scrollTopButton = document.getElementById("myBtn");
  
  let currentIndex = 0;
  let items = [];
  
  // Function to open modal
  const openModal = (index) => {
      currentIndex = index;
      modal.style.display = "flex"; // Display modal as flex to center content
  
      const currentItem = items[index];
      if (currentItem.tagName === 'IMG') {
          modalImg.src = currentItem.getAttribute('data-full');
          document.getElementById('caption').textContent = currentItem.nextElementSibling.textContent;
      }
  
      header.style.display = "none"; // Hide header when modal is open
      scrollTopButton.style.display = "none"; // Hide scroll-to-top button
      document.body.style.overflow = 'hidden'; // Prevent scrolling of background content
  };
  
  // Get all gallery items
  const galleryItems = document.querySelectorAll(".image-wrapper img");
  
  // Assign gallery items to the items array
  items = Array.from(galleryItems);
  
  // Add click event to each gallery item
  items.forEach((item, index) => {
      item.addEventListener("click", () => openModal(index));
  });
  
  // Close the modal
  closeBtn.onclick = () => closeModal();
  
  // Close modal if clicked outside of the image
  modal.onclick = (event) => {
      if (event.target == modal) {
          closeModal();
      }
  };
  
  // Navigate to the next image
  const showNext = () => {
      currentIndex = (currentIndex + 1) % items.length;
      openModal(currentIndex);
  };
  
  // Navigate to the previous image
  const showPrev = () => {
      currentIndex = (currentIndex - 1 + items.length) % items.length;
      openModal(currentIndex);
  };
  
  // Bind navigation functions to next and previous buttons
  nextBtn.onclick = showNext;
  prevBtn.onclick = showPrev;
  
  // Handle keyboard navigation
  document.addEventListener('keydown', (event) => {
      if (modal.style.display === "flex") {
          if (event.key === 'ArrowRight') {
              showNext();
          } else if (event.key === 'ArrowLeft') {
              showPrev();
          } else if (event.key === 'Escape') {
              closeModal();
          }
      }
  });
  
  // Function to close the modal
  function closeModal() {
      modal.style.display = "none";
      header.style.display = ""; // Show header when modal is closed
      scrollTopButton.style.display = "block"; // Show scroll-to-top button
      document.body.style.overflow = ''; // Restore scrolling to background content
  }
});



let autoScrollInterval;
let activeGalleryIndex = 0;

// Initialize carousels for all galleries
function initializeGallery(gallery) {
    const slides = gallery.querySelectorAll(".artist");
    const thumbnails = gallery.querySelectorAll(".thumbnail");
    let slideIndex = 0;

    function showSlide(n) {
        slideIndex = (n + slides.length) % slides.length;

        slides.forEach(slide => slide.classList.remove("active"));
        thumbnails.forEach(thumb => thumb.classList.remove("active"));

        slides[slideIndex].classList.add("active");
        thumbnails[slideIndex].classList.add("active");
    }

    function prevSlide() {
        showSlide(slideIndex - 1);
    }

    function nextSlide() {
        showSlide(slideIndex + 1);
    }

    gallery.querySelector(".prevbtn").onclick = () => {
        prevSlide();
        stopAutoScroll();
    };
    gallery.querySelector(".nextbtn").onclick = () => {
        nextSlide();
        stopAutoScroll();
    };

    thumbnails.forEach((thumb, i) => {
        thumb.onclick = () => {
            showSlide(i);
            stopAutoScroll();
        };
    });

    // Start auto-scrolling for this gallery
    startAutoScroll(() => nextSlide());

    showSlide(slideIndex);
}

// Start auto-scrolling
function startAutoScroll(callback) {
    stopAutoScroll(); // Clear existing intervals
    autoScrollInterval = setInterval(callback, 4000);
}

// Stop auto-scrolling
function stopAutoScroll() {
    clearInterval(autoScrollInterval);
}

// Switch gallery
function switchGallery(index) {
    const galleries = document.querySelectorAll(".gallery-container");
    const buttons = document.querySelectorAll(".gallery-btn");

    // Deactivate all galleries and buttons
    galleries.forEach(gallery => gallery.classList.remove("active"));
    buttons.forEach(button => button.classList.remove("active"));

    // Activate selected gallery and button
    galleries[index].classList.add("active");
    buttons[index].classList.add("active");

    activeGalleryIndex = index;

    // Initialize carousel for the active gallery
    initializeGallery(galleries[index]);
}

// Initialize the first gallery
document.addEventListener("DOMContentLoaded", () => {
    const galleries = document.querySelectorAll(".gallery-container");
    galleries.forEach(gallery => initializeGallery(gallery));
    switchGallery(0); // Start with the first gallery
});
/*-------------------------------END--------------------------------*/


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
    var commonFields = document.getElementById("referenceLink");
    var additionalCharactersField = document.getElementById("additionalCharactersField");
    var packageplanfields = document.getElementById("packageplanfields");
    var designTypeFields = document.getElementById("Designtype");
    var addOns = document.getElementById("addOns");
    var emoteFields = document.getElementById("emoteFields");
    var common = document.getElementById("common");
    var common1 = document.getElementById("common1");
    var common2 = document.getElementById("common2");
    var common3 = document.getElementById("common3");
    var uncommon = document.getElementById("uncommon");
    var uncommon1 = document.getElementById("uncommon1");
    var rare = document.getElementById("rare");
    var rare1 = document.getElementById("rare1");

    // Hide all sections initially
    animationIllustrationFields.classList.add("hidden");
    toontuberFields.classList.add("hidden");
    toontuberAddOns.classList.add("hidden");
    commonFields.classList.add("hidden");
    additionalCharactersField.classList.add("hidden");
    packageplanfields.classList.add("hidden");
    designTypeFields.classList.add("hidden");
    addOns.classList.add("hidden");
    emoteFields.classList.add("hidden");

    // Show relevant fields based on the selected commission type
    if (commissionType === "Animated Assets") {
        animationIllustrationFields.classList.remove("hidden");
        commonFields.classList.remove("hidden");
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
        commonFields.classList.remove("hidden");
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
        commonFields.classList.remove("hidden");
        packageplanfields.classList.remove("hidden");

    } else if (commissionType === "Character Design") {
        designTypeFields.classList.remove("hidden");
        commonFields.classList.remove("hidden");
    } else if (commissionType === "Animation" || commissionType === "Illustration") {
        animationIllustrationFields.classList.remove("hidden");
        commonFields.classList.remove("hidden");
        addOns.classList.remove("hidden");
        common.classList.remove("hidden");
        common1.classList.remove("hidden");
        common2.classList.remove("hidden");
        common3.classList.remove("hidden");
        uncommon.classList.add("hidden");
        uncommon1.classList.add("hidden");
        rare1.classList.add("hidden");
        rare.classList.add("hidden");


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


    


    