var settings_page = {
    current_section: 0,
    current_item: 0,
    sections: ['play-at-login', 'country', 'language', 'logout'],
    play_at_login_value: 'none',
    
    init: function() {
        console.log('Settings page initialized');
        this.current_section = 0;
        this.current_item = 3;
        this.play_at_login_value = loadFromStorage('play_at_login') || 'none';
        this.loadSettings();
        this.updateFocus();
    },
    
    loadSettings: function() {
        var radioItems = document.querySelectorAll('.settings-radio-item');
        for (var i = 0; i < radioItems.length; i++) {
            var item = radioItems[i];
            var value = item.getAttribute('data-value');
            var radioBtn = item.querySelector('.radio-btn');
            
            if (value === this.play_at_login_value) {
                item.classList.add('active');
                radioBtn.classList.add('selected');
            } else {
                item.classList.remove('active');
                radioBtn.classList.remove('selected');
            }
        }
    },
    
    updateFocus: function() {
        var radioItems = document.querySelectorAll('.settings-radio-item');
        for (var i = 0; i < radioItems.length; i++) {
            radioItems[i].classList.remove('active');
        }
        
        var selectors = document.querySelectorAll('.settings-selector');
        for (var i = 0; i < selectors.length; i++) {
            selectors[i].classList.remove('active');
        }
        
        var logoutBtn = document.querySelector('.logout-btn');
        if (logoutBtn) {
            logoutBtn.classList.remove('active');
        }
        
        if (this.current_section === 0) {
            if (radioItems[this.current_item]) {
                radioItems[this.current_item].classList.add('active');
            }
        } else if (this.current_section === 1) {
            if (selectors[0]) {
                selectors[0].classList.add('active');
            }
        } else if (this.current_section === 2) {
            if (selectors[1]) {
                selectors[1].classList.add('active');
            }
        } else if (this.current_section === 3) {
            if (logoutBtn) {
                logoutBtn.classList.add('active');
            }
        }
    },
    
    selectPlayAtLogin: function() {
        var radioItems = document.querySelectorAll('.settings-radio-item');
        if (radioItems[this.current_item]) {
            var value = radioItems[this.current_item].getAttribute('data-value');
            this.play_at_login_value = value;
            saveToStorage('play_at_login', value);
            this.loadSettings();
        }
    },
    
    handleKey: function(keyCode) {
        switch(keyCode) {
            case KEY_UP:
                if (this.current_section === 0) {
                    if (this.current_item > 0) {
                        this.current_item--;
                        this.updateFocus();
                    }
                } else if (this.current_section > 0) {
                    this.current_section--;
                    if (this.current_section === 0) {
                        this.current_item = 3;
                    }
                    this.updateFocus();
                }
                break;
                
            case KEY_DOWN:
                if (this.current_section === 0) {
                    if (this.current_item < 3) {
                        this.current_item++;
                        this.updateFocus();
                    } else {
                        this.current_section = 1;
                        this.updateFocus();
                    }
                } else if (this.current_section < 3) {
                    this.current_section++;
                    this.updateFocus();
                }
                break;
                
            case KEY_ENTER:
                if (this.current_section === 0) {
                    this.selectPlayAtLogin();
                } else if (this.current_section === 1) {
                    openCountryModal();
                } else if (this.current_section === 2) {
                    console.log('Language selector clicked');
                } else if (this.current_section === 3) {
                    console.log('Logout clicked');
                }
                break;
                
            case KEY_BACK:
                showPage('home');
                break;
        }
    }
};
