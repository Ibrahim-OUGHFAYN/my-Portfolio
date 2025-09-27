(function ($) {

  "use strict";

    // COLOR MODE
    $('.color-mode').click(function(){
        $('.color-mode-icon').toggleClass('active')
        $('body').toggleClass('dark-mode')
    })

    // HEADER
    $(".navbar").headroom();

    // PROJECT CAROUSEL
    $('.owl-carousel').owlCarousel({
    	items: 1,
	    loop:true,
	    margin:10,
	    nav:true
	});

    // SMOOTHSCROLL
    $(function() {
      $('.nav-link, .custom-btn-link').on('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top - 49
        }, 1000);
        event.preventDefault();
      });
    });  

    // TOOLTIP
    $('.social-links a').tooltip();

    // LANGUAGE SELECTOR
    const languageToggle = document.getElementById('languageToggle');
    const languageDropdown = document.getElementById('languageDropdown');
    const currentLang = document.querySelector('.current-lang');
    const languageOptions = document.querySelectorAll('.language-option');

    // Toggle dropdown
    languageToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        languageDropdown.classList.toggle('active');
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', function() {
        languageDropdown.classList.remove('active');
    });

    // Handle language selection
    languageOptions.forEach(option => {
        option.addEventListener('click', function() {
            const selectedLang = this.getAttribute('data-lang');
            const langText = selectedLang === 'en' ? 'EN' : 'FR';
            
            // Update current language display
            currentLang.textContent = langText;
            
            // Update active state
            languageOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            // Close dropdown
            languageDropdown.classList.remove('active');
            
            // Store selected language
            localStorage.setItem('selectedLanguage', selectedLang);
            
            // Here you can add language switching logic
            switchLanguage(selectedLang);
        });
    });

    // Load saved language on page load
    const savedLang = localStorage.getItem('selectedLanguage') || 'en';
    const savedLangText = savedLang === 'en' ? 'EN' : 'FR';
    currentLang.textContent = savedLangText;
    
    // Set active option
    languageOptions.forEach(option => {
        if (option.getAttribute('data-lang') === savedLang) {
            option.classList.add('active');
        }
    });

    // Load translations
    let translations = {};
    
    fetch('js/translations.json')
        .then(response => response.json())
        .then(data => {
            translations = data;
            const savedLang = localStorage.getItem('selectedLanguage') || 'en';
            applyTranslations(savedLang);
        });
    
    // Apply translations without reload
    function applyTranslations(lang) {
        if (!translations[lang]) return;
        
        document.querySelectorAll('[data-translate]').forEach(element => {
            const key = element.getAttribute('data-translate');
            const translation = getNestedTranslation(translations[lang], key);
            if (translation) {
                element.textContent = translation;
                if (element.hasAttribute('data-hover')) {
                    element.setAttribute('data-hover', translation);
                }
            }
        });
        
        // Handle placeholders
        document.querySelectorAll('[data-translate-placeholder]').forEach(element => {
            const key = element.getAttribute('data-translate-placeholder');
            const translation = getNestedTranslation(translations[lang], key);
            if (translation) {
                element.placeholder = translation;
            }
        });
        
        // Handle input values
        document.querySelectorAll('[data-translate-value]').forEach(element => {
            const key = element.getAttribute('data-translate-value');
            const translation = getNestedTranslation(translations[lang], key);
            if (translation) {
                element.value = translation;
            }
        });
        
        document.documentElement.lang = lang;
    }
    
    // Language switching function with JSON translations
    function switchLanguage(lang) {
        if (!translations[lang]) return;
        
        // Store language and reload page
        localStorage.setItem('selectedLanguage', lang);
        window.location.reload();
    }
    
    function getNestedTranslation(obj, path) {
        return path.split('.').reduce((current, key) => current && current[key], obj);
    }

})(jQuery);
