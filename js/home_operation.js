var home_page = (function() {
    var current_menu_index = 0;
    var current_station_index = 0;
    var menu_items = ['discover', 'genres', 'search', 'favorites', 'records', 'settings'];
    var active_view = 'discover';
    var filtered_stations = [];
    var focus_area = 'menu';
    var grid_cols = 6;
    
    function init() {
        console.log('Home page initialized');
        loadStations();
        setupMenuHandlers();
        renderStations();
        updateFocus();
    }
    
    var popular_radios = [];
    var austria_stations = [];
    
    function loadStations() {
        try {
            stations = loadFromStorage('stations') || [];
            if (!Array.isArray(stations)) {
                stations = [];
            }
        } catch (e) {
            console.log('Storage error, using default stations:', e);
            stations = [];
            localStorage.clear();
        }
        
        if (stations.length === 0) {
            popular_radios = [
                {name: 'Power Türk FM', category: 'Türkçe Pop', logo: 'images/station_powertürk_tv_logosu_1_1691_10798.png', url: 'http://example.com/stream1'},
                {name: 'Alem FM', category: 'World Music', logo: 'images/station_alem_fm_1_1691_10876.png', url: 'http://example.com/stream2'},
                {name: 'Radio Mega', category: 'Top Hits', logo: 'images/station_0b75jzrr_400x400_1_1691_10820.png', url: 'http://example.com/stream3'},
                {name: 'Smooth Jazz', category: 'Jazz', logo: 'images/station_android_default_logo_1_1691_10844.png', url: 'http://example.com/stream4'},
                {name: 'Classic Hits', category: 'Oldies', logo: 'images/station_meta_image_1_1_1691_10934.png', url: 'http://example.com/stream5'},
                {name: 'Rock Nation', category: 'Rock', logo: 'images/station_austria_1_1691_11039.png', url: 'http://example.com/stream6'},
                {name: 'Electronic Beats', category: 'Electronic', logo: 'images/station_powertürk_tv_logosu_1_1691_10798.png', url: 'http://example.com/stream7'},
                {name: 'Jazz Lounge', category: 'Jazz', logo: 'images/station_alem_fm_1_1691_10876.png', url: 'http://example.com/stream8'},
                {name: 'Hip Hop Central', category: 'Hip Hop', logo: 'images/station_0b75jzrr_400x400_1_1691_10820.png', url: 'http://example.com/stream9'},
                {name: 'Country Roads', category: 'Country', logo: 'images/station_android_default_logo_1_1691_10844.png', url: 'http://example.com/stream10'},
                {name: 'Pop Hits 24/7', category: 'Pop', logo: 'images/station_meta_image_1_1_1691_10934.png', url: 'http://example.com/stream11'},
                {name: 'Indie Vibes', category: 'Indie', logo: 'images/station_austria_1_1691_11039.png', url: 'http://example.com/stream12'}
            ];
            
            austria_stations = [
                {name: 'Austria FM', category: 'Austrian Pop', logo: 'images/station_austria_1_1691_11039.png', url: 'http://example.com/stream13'},
                {name: 'Vienna Classics', category: 'Classical', logo: 'images/station_powertürk_tv_logosu_1_1691_10798.png', url: 'http://example.com/stream14'},
                {name: 'Alpine Radio', category: 'Folk', logo: 'images/station_alem_fm_1_1691_10876.png', url: 'http://example.com/stream15'},
                {name: 'Salzburg Sounds', category: 'Variety', logo: 'images/station_0b75jzrr_400x400_1_1691_10820.png', url: 'http://example.com/stream16'},
                {name: 'Innsbruck Mix', category: 'Top 40', logo: 'images/station_android_default_logo_1_1691_10844.png', url: 'http://example.com/stream17'},
                {name: 'Graz Grooves', category: 'Dance', logo: 'images/station_meta_image_1_1_1691_10934.png', url: 'http://example.com/stream18'},
                {name: 'Austrian News', category: 'News', logo: 'images/station_austria_1_1691_11039.png', url: 'http://example.com/stream19'},
                {name: 'Linz Live', category: 'Live Music', logo: 'images/station_powertürk_tv_logosu_1_1691_10798.png', url: 'http://example.com/stream20'},
                {name: 'Danube Radio', category: 'Easy Listening', logo: 'images/station_alem_fm_1_1691_10876.png', url: 'http://example.com/stream21'},
                {name: 'Tyrol Tunes', category: 'Regional', logo: 'images/station_0b75jzrr_400x400_1_1691_10820.png', url: 'http://example.com/stream22'},
                {name: 'Vienna Voice', category: 'Talk', logo: 'images/station_android_default_logo_1_1691_10844.png', url: 'http://example.com/stream23'},
                {name: 'Austrian Gold', category: 'Oldies', logo: 'images/station_meta_image_1_1_1691_10934.png', url: 'http://example.com/stream24'}
            ];
            
            stations = popular_radios.concat(austria_stations);
            saveToStorage('stations', stations);
        } else {
            var mid = Math.floor(stations.length / 2);
            popular_radios = stations.slice(0, mid);
            austria_stations = stations.slice(mid);
        }
        
        filtered_stations = stations;
    }
    
    function setupMenuHandlers() {
        var menuItems = document.querySelectorAll('.nav-item');
        for (var i = 0; i < menuItems.length; i++) {
            (function(index, item) {
                item.addEventListener('click', function() {
                    handleMenuClick(index);
                });
            })(i, menuItems[i]);
        }
        
        var genreButtons = document.querySelectorAll('.genre-btn');
        for (var j = 0; j < genreButtons.length; j++) {
            (function(btn) {
                btn.addEventListener('click', function() {
                    var allBtns = document.querySelectorAll('.genre-btn');
                    for (var k = 0; k < allBtns.length; k++) {
                        allBtns[k].classList.remove('active');
                    }
                    btn.classList.add('active');
                });
            })(genreButtons[j]);
        }
    }
    
    function handleMenuClick(index) {
        current_menu_index = index;
        var menu = menu_items[index];
        active_view = menu;
        
        if (menu === 'genres') {
            showPage('genres');
            return;
        }
        
        if (menu === 'search') {
            showPage('search');
            return;
        }
        
        if (menu === 'favorites') {
            showPage('favorites');
            return;
        }
        
        updateFocus();
    }
    
    function renderStations() {
        var popularGrid = document.getElementById('popular-radios-grid');
        var austriaGrid = document.getElementById('austria-stations-grid');
        
        if (popularGrid) {
            popularGrid.innerHTML = '';
            for (var i = 0; i < popular_radios.length; i++) {
                var station = popular_radios[i];
                var card = createStationCard(station, i);
                popularGrid.appendChild(card);
            }
        }
        
        if (austriaGrid) {
            austriaGrid.innerHTML = '';
            for (var j = 0; j < austria_stations.length; j++) {
                var station = austria_stations[j];
                var card = createStationCard(station, j + popular_radios.length);
                austriaGrid.appendChild(card);
            }
        }
    }
    
    function createStationCard(station, index) {
        var card = document.createElement('div');
        card.className = 'station-card';
        card.setAttribute('data-index', index);
        card.innerHTML = 
            '<img src="' + (station.logo || 'images/def_image.jpg') + '" class="station-logo" alt="' + station.name + '">' +
            '<div class="station-name">' + station.name + '</div>' +
            '<div class="station-category">' + station.category + '</div>';
        
        card.addEventListener('click', function() {
            playStation(station);
        });
        
        return card;
    }
    
    function updateFocus() {
        var menuItems = document.querySelectorAll('.nav-item');
        var stationCards = document.querySelectorAll('.station-card');
        
        for (var i = 0; i < menuItems.length; i++) {
            menuItems[i].classList.remove('active');
        }
        for (var j = 0; j < stationCards.length; j++) {
            stationCards[j].classList.remove('active');
        }
        
        if (focus_area === 'menu' && menuItems[current_menu_index]) {
            menuItems[current_menu_index].classList.add('active');
        } else if (focus_area === 'station' && stationCards[current_station_index]) {
            stationCards[current_station_index].classList.add('active');
            scrollIntoViewIfNeeded(stationCards[current_station_index]);
        }
    }
    
    function scrollIntoViewIfNeeded(element) {
        if (!element) return;
        var parent = element.parentElement;
        if (!parent) return;
        
        var elementRect = element.getBoundingClientRect();
        var parentRect = parent.getBoundingClientRect();
        
        if (elementRect.bottom > parentRect.bottom) {
            element.scrollIntoView({behavior: 'smooth', block: 'end'});
        } else if (elementRect.top < parentRect.top) {
            element.scrollIntoView({behavior: 'smooth', block: 'start'});
        }
    }
    
    function keyDown(e) {
        if (focus_area === 'menu') {
            handleMenuKeys(e);
        } else if (focus_area === 'station') {
            handleStationKeys(e);
        }
    }
    
    function handleMenuKeys(e) {
        var moved = false;
        
        if (e.keyCode === keys.UP) {
            current_menu_index--;
            if (current_menu_index < 0) {
                current_menu_index = menu_items.length - 1;
            }
            moved = true;
        } else if (e.keyCode === keys.DOWN) {
            current_menu_index++;
            if (current_menu_index >= menu_items.length) {
                current_menu_index = 0;
            }
            moved = true;
        } else if (e.keyCode === keys.RIGHT) {
            focus_area = 'station';
            current_station_index = 0;
            moved = true;
        } else if (e.keyCode === keys.ENTER) {
            var menu = menu_items[current_menu_index];
            if (menu === 'genres') {
                showPage('genres');
                return;
            }
            if (menu === 'search') {
                showPage('search');
                return;
            }
            if (menu === 'favorites') {
                showPage('favorites');
                return;
            }
            handleMenuClick(current_menu_index);
            focus_area = 'station';
            current_station_index = 0;
            moved = true;
        }
        
        if (moved) {
            updateFocus();
        }
    }
    
    function handleStationKeys(e) {
        var moved = false;
        var oldIndex = current_station_index;
        var stationCards = document.querySelectorAll('.station-card');
        var totalStations = stationCards.length;
        
        if (e.keyCode === keys.LEFT) {
            if (current_station_index % grid_cols === 0) {
                focus_area = 'menu';
                updateFocus();
                return;
            }
            current_station_index--;
            if (current_station_index < 0) {
                current_station_index = 0;
            }
            moved = true;
        } else if (e.keyCode === keys.RIGHT) {
            current_station_index++;
            if (current_station_index >= totalStations) {
                current_station_index = totalStations - 1;
            }
            moved = true;
        } else if (e.keyCode === keys.UP) {
            current_station_index -= grid_cols;
            if (current_station_index < 0) {
                var currentCol = oldIndex % grid_cols;
                var totalRows = Math.ceil(totalStations / grid_cols);
                var lastRowStart = (totalRows - 1) * grid_cols;
                current_station_index = lastRowStart + currentCol;
                if (current_station_index >= totalStations) {
                    current_station_index = totalStations - 1;
                }
            }
            moved = true;
        } else if (e.keyCode === keys.DOWN) {
            current_station_index += grid_cols;
            if (current_station_index >= totalStations) {
                current_station_index = oldIndex % grid_cols;
                if (current_station_index >= totalStations) {
                    current_station_index = 0;
                }
            }
            moved = true;
        } else if (e.keyCode === keys.ENTER) {
            var card = stationCards[current_station_index];
            if (card) {
                var idx = parseInt(card.getAttribute('data-index'));
                if (idx < stations.length) {
                    playStation(stations[idx]);
                }
            }
            return;
        }
        
        if (moved) {
            updateFocus();
        }
    }
    
    function playStation(station) {
        if (station && station.url) {
            current_station = station;
            saveToStorage('current_station', station);
            showMessage('Playing: ' + station.name, 'info');
        } else {
            showMessage('No stream URL available', 'error');
        }
    }
    
    return {
        init: init,
        keyDown: keyDown
    };
})();
