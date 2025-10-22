var country_modal = {
    countries: [],
    current_index: 0,
    
    init: function() {
        this.loadCountries();
    },
    
    loadCountries: function() {
        var self = this;
        var listEl = document.getElementById('country-modal-list');
        if (!listEl) return;
        
        listEl.innerHTML = '<div style="color: white; text-align: center; padding: 40px;">Loading countries...</div>';
        
        API.getCountries()
            .then(function(countries) {
                self.countries = countries;
                self.renderCountries();
            })
            .catch(function(error) {
                console.error('Failed to load countries:', error);
                listEl.innerHTML = '<div style="color: white; text-align: center; padding: 40px;">Failed to load countries</div>';
            });
    },
    
    renderCountries: function() {
        var listEl = document.getElementById('country-modal-list');
        if (!listEl) return;
        
        listEl.innerHTML = '';
        var selectedCountry = API.getSelectedCountry();
        
        for (var i = 0; i < Math.min(this.countries.length, 50); i++) {
            var country = this.countries[i];
            var item = document.createElement('div');
            item.className = 'country-modal-item';
            if (country === selectedCountry) {
                item.classList.add('selected');
            }
            item.setAttribute('data-index', i);
            
            var name = document.createElement('div');
            name.className = 'country-modal-item-text';
            name.textContent = country;
            
            item.appendChild(name);
            listEl.appendChild(item);
            
            (function(countryName) {
                item.addEventListener('click', function() {
                    country_modal.selectCountry(countryName);
                });
            })(country);
        }
        
        this.updateFocus();
    },
    
    selectCountry: function(country) {
        console.log('Country selected:', country);
        API.setSelectedCountry(country);
        
        var allSelectors = document.querySelectorAll('.location-text');
        for (var i = 0; i < allSelectors.length; i++) {
            allSelectors[i].textContent = country;
        }
        
        closeCountryModal();
        
        if (current_route === 'home' && typeof home_page !== 'undefined') {
            home_page.init();
        } else if (current_route === 'genres' && typeof genres_page !== 'undefined') {
            genres_page.init();
        } else if (current_route === 'genre-detail' && typeof genre_detail_page !== 'undefined') {
            var genreName = genre_detail_page.current_genre || 'Pop';
            genre_detail_page.init(genreName);
        }
    },
    
    updateFocus: function() {
        var items = document.querySelectorAll('.country-modal-item');
        for (var i = 0; i < items.length; i++) {
            items[i].classList.remove('active');
        }
        
        if (items[this.current_index]) {
            items[this.current_index].classList.add('active');
        }
    },
    
    handleKey: function(keyCode) {
        var items = document.querySelectorAll('.country-modal-item');
        
        switch(keyCode) {
            case KEY_UP:
                if (this.current_index > 0) {
                    this.current_index--;
                    this.updateFocus();
                }
                break;
                
            case KEY_DOWN:
                if (this.current_index < items.length - 1) {
                    this.current_index++;
                    this.updateFocus();
                }
                break;
                
            case KEY_ENTER:
                if (this.countries[this.current_index]) {
                    this.selectCountry(this.countries[this.current_index]);
                }
                break;
                
            case KEY_BACK:
                closeCountryModal();
                break;
        }
    }
};

function openCountryModal() {
    var modal = document.getElementById('country-modal');
    if (modal) {
        modal.classList.add('active');
        country_modal.init();
    }
}

function closeCountryModal() {
    var modal = document.getElementById('country-modal');
    if (modal) {
        modal.classList.remove('active');
    }
}
