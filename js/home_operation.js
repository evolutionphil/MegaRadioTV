var home_page = (function() {
    var popular_radios = [];
    var country_stations = [];
    
    function init() {
        console.log('Home page initialized - loading real API data');
        var selectedCountry = API.getSelectedCountry();
        
        // Update country selector text
        var selectors = document.querySelectorAll('.location-text');
        for (var i = 0; i < selectors.length; i++) {
            selectors[i].textContent = selectedCountry;
        }
        
        loadStations(selectedCountry);
    }
    
    function loadStations(country) {
        var popularContainer = document.getElementById('home-page').querySelector('.radios-container');
        var countryContainer = document.getElementById('home-page').querySelectorAll('.radios-container')[1];
        
        if (popularContainer) {
            popularContainer.innerHTML = '<div style="color: white; padding: 40px; text-align: center;">Loading Popular Radios...</div>';
        }
        if (countryContainer) {
            countryContainer.innerHTML = '<div style="color: white; padding: 40px; text-align: center;">Loading ' + country + ' Stations...</div>';
        }
        
        // Load popular stations (globally popular, limit 14)
        API.getPopularStations(14)
            .then(function(stations) {
                popular_radios = stations;
                renderPopularRadios();
            })
            .catch(function(error) {
                console.error('Failed to load popular stations:', error);
                if (popularContainer) {
                    popularContainer.innerHTML = '<div style="color: white; padding: 40px; text-align: center;">Failed to load stations</div>';
                }
            });
        
        // Load stations by selected country (limit 14)
        API.getStationsByCountry(country, 14)
            .then(function(stations) {
                country_stations = stations;
                renderCountryStations();
            })
            .catch(function(error) {
                console.error('Failed to load country stations:', error);
                if (countryContainer) {
                    countryContainer.innerHTML = '<div style="color: white; padding: 40px; text-align: center;">Failed to load stations</div>';
                }
            });
    }
    
    function renderPopularRadios() {
        var container = document.getElementById('home-page').querySelector('.radios-container');
        if (!container) return;
        
        container.innerHTML = '';
        
        // Row 1: 7 cards
        for (var i = 0; i < Math.min(7, popular_radios.length); i++) {
            var card = createStationCard(popular_radios[i], i, i);
            container.appendChild(card);
        }
        
        // Row 2: 7 cards
        for (var j = 7; j < Math.min(14, popular_radios.length); j++) {
            var card = createStationCard(popular_radios[j], j, j);
            container.appendChild(card);
        }
    }
    
    function renderCountryStations() {
        var containers = document.getElementById('home-page').querySelectorAll('.radios-container');
        var container = containers[1];
        if (!container) return;
        
        container.innerHTML = '';
        
        // 14 cards total (2 rows of 7)
        for (var i = 0; i < Math.min(14, country_stations.length); i++) {
            var card = createStationCard(country_stations[i], i, i);
            container.appendChild(card);
        }
    }
    
    function createStationCard(station, index, position) {
        var positions = [
            {left: 236, top: 539},
            {left: 466, top: 539},
            {left: 696, top: 539},
            {left: 926, top: 539},
            {left: 1156, top: 539},
            {left: 1386, top: 539},
            {left: 1616, top: 539},
            {left: 236, top: 833},
            {left: 466, top: 833},
            {left: 696, top: 833},
            {left: 926, top: 833},
            {left: 1156, top: 833},
            {left: 1386, top: 833},
            {left: 1616, top: 833}
        ];
        
        var pos = positions[position] || {left: 236, top: 539};
        
        var card = document.createElement('div');
        card.className = 'radio-card';
        card.style.left = pos.left + 'px';
        card.style.top = pos.top + 'px';
        card.style.cursor = 'pointer';
        
        var tags = station.tags || [];
        var genre = tags.length > 0 ? tags[0] : (station.genre || 'Music');
        
        card.innerHTML = 
            '<div class="radio-logo">' +
                '<img src="' + station.favicon + '" alt="' + station.name + '">' +
            '</div>' +
            '<div class="radio-name">' + station.name + '</div>' +
            '<div class="radio-genre">' + genre + '</div>';
        
        card.onclick = function() {
            showPage('player', {
                name: station.name,
                song: 'Now Playing',
                logo: station.favicon,
                genre: genre,
                tags: [station.bitrate + 'kb', station.codec, station.country, genre],
                url: station.url_resolved,
                stationId: station._id
            });
        };
        
        return card;
    }
    
    return {
        init: init
    };
})();

document.addEventListener('DOMContentLoaded', function() {
    function setupMenuHandlers() {
        var menuItems = document.querySelectorAll('#home-page .nav-item');
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
        
        if (menu === 'settings') {
            showPage('settings');
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
            if (menu === 'settings') {
                showPage('settings');
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
        if (station) {
            current_station = station;
            saveToStorage('current_station', station);
            showPage('player', station);
        }
    }
    
    return {
        init: init,
        keyDown: keyDown
    };
})();

// Add click handlers to static radio cards on page load
document.addEventListener('DOMContentLoaded', function() {
    var radioCards = document.querySelectorAll('#home-page .radio-card:not(.radio-card-seemore)');
    radioCards.forEach(function(card) {
        card.addEventListener('click', function() {
            var station = {
                name: card.querySelector('.radio-name')?.textContent || 'Unknown Station',
                song: 'Now Playing',
                logo: card.querySelector('.radio-logo img')?.src || 'images/def_image.jpg',
                genre: card.querySelector('.radio-genre')?.textContent || 'Music',
                tags: ['128kb', 'MP3', 'AT', 'Pop']
            };
            showPage('player', station);
        });
    });
    
    // Add click handlers to genre buttons
    var genreButtons = document.querySelectorAll('#home-page .genre-btn');
    genreButtons.forEach(function(btn, index) {
        btn.addEventListener('click', function() {
            var genreName = btn.querySelector('p')?.textContent || 'Pop';
            showPage('genre-detail', genreName);
        });
    });
});
