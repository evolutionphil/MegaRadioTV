var country_modal = {
    current_index: 0,
    selected_country: 'Austria',
    countries: [
        {name: 'Austria', flag: 'images/station_austria_1_1691_11039.png'},
        {name: 'Turkey', flag: 'images/station_powerturk_tv_logosu_1_1691_10798.png'},
        {name: 'Germany', flag: 'images/station_0b75jzrr_400x400_1_1691_10820.png'},
        {name: 'USA', flag: 'images/station_android_default_logo_1_1691_10844.png'},
        {name: 'France', flag: 'images/station_meta_image_1_1_1691_10934.png'},
        {name: 'Spain', flag: 'images/station_alem_fm_1_1691_10876.png'},
        {name: 'Italy', flag: 'images/station_austria_1_1691_11039.png'}
    ],
    
    init: function() {
        this.selected_country = loadFromStorage('selected_country') || 'Austria';
        this.loadCountries();
        this.updateFocus();
    },
    
    loadCountries: function() {
        var listContainer = document.getElementById('country-modal-list');
        if (!listContainer) return;
        
        listContainer.innerHTML = '';
        
        for (var i = 0; i < this.countries.length; i++) {
            var country = this.countries[i];
            var item = document.createElement('div');
            item.className = 'country-modal-item';
            if (country.name === this.selected_country) {
                item.classList.add('selected');
            }
            item.setAttribute('data-index', i);
            
            var flag = document.createElement('div');
            flag.className = 'country-modal-item-flag';
            var flagImg = document.createElement('img');
            flagImg.src = country.flag;
            flagImg.alt = country.name;
            flag.appendChild(flagImg);
            
            var name = document.createElement('div');
            name.className = 'country-modal-item-name';
            name.textContent = country.name;
            
            var radio = document.createElement('div');
            radio.className = 'country-modal-item-radio';
            
            item.appendChild(flag);
            item.appendChild(name);
            item.appendChild(radio);
            
            listContainer.appendChild(item);
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
    
    selectCountry: function() {
        var country = this.countries[this.current_index];
        this.selected_country = country.name;
        saveToStorage('selected_country', country.name);
        
        var allSelectors = document.querySelectorAll('.location-text');
        for (var i = 0; i < allSelectors.length; i++) {
            allSelectors[i].textContent = country.name;
        }
        
        closeCountryModal();
    },
    
    handleKey: function(keyCode) {
        switch(keyCode) {
            case KEY_UP:
                if (this.current_index > 0) {
                    this.current_index--;
                    this.updateFocus();
                }
                break;
                
            case KEY_DOWN:
                if (this.current_index < this.countries.length - 1) {
                    this.current_index++;
                    this.updateFocus();
                }
                break;
                
            case KEY_ENTER:
                this.selectCountry();
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
