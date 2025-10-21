// Home Page Controller - Enhanced for TV Navigation
var home_page = (function() {
    var current_category_index = 0;
    var current_station_index = 0;
    var categories = ['All', 'Music', 'News', 'Sports', 'Talk', 'Culture'];
    var filtered_stations = [];
    var focus_area = 'category';
    var grid_cols = 4;
    
    function init() {
        console.log('Home page initialized');
        loadStations();
        renderCategories();
        updateFocus();
    }
    
    function loadStations() {
        stations = loadFromStorage('stations') || [];
        
        if (stations.length === 0) {
            stations = [
                {name: 'Classic Rock FM', category: 'Music', logo: 'images/def_image.jpg', url: 'http://example.com/stream1'},
                {name: 'Jazz Lounge', category: 'Music', logo: 'images/def_image.jpg', url: 'http://example.com/stream2'},
                {name: 'Electronic Beats', category: 'Music', logo: 'images/def_image.jpg', url: 'http://example.com/stream3'},
                {name: 'Country Gold', category: 'Music', logo: 'images/def_image.jpg', url: 'http://example.com/stream4'},
                {name: 'Pop Hits', category: 'Music', logo: 'images/def_image.jpg', url: 'http://example.com/stream5'},
                {name: 'Indie Vibes', category: 'Music', logo: 'images/def_image.jpg', url: 'http://example.com/stream6'},
                {name: 'News 24/7', category: 'News', logo: 'images/def_image.jpg', url: 'http://example.com/stream7'},
                {name: 'World News Radio', category: 'News', logo: 'images/def_image.jpg', url: 'http://example.com/stream8'},
                {name: 'Business Today', category: 'News', logo: 'images/def_image.jpg', url: 'http://example.com/stream9'},
                {name: 'Sports Talk Live', category: 'Sports', logo: 'images/def_image.jpg', url: 'http://example.com/stream10'},
                {name: 'Football Central', category: 'Sports', logo: 'images/def_image.jpg', url: 'http://example.com/stream11'},
                {name: 'Sports Update', category: 'Sports', logo: 'images/def_image.jpg', url: 'http://example.com/stream12'},
                {name: 'Morning Show', category: 'Talk', logo: 'images/def_image.jpg', url: 'http://example.com/stream13'},
                {name: 'Night Talk', category: 'Talk', logo: 'images/def_image.jpg', url: 'http://example.com/stream14'},
                {name: 'Comedy Hour', category: 'Talk', logo: 'images/def_image.jpg', url: 'http://example.com/stream15'},
                {name: 'Cultural Insights', category: 'Culture', logo: 'images/def_image.jpg', url: 'http://example.com/stream16'},
                {name: 'Arts & Ideas', category: 'Culture', logo: 'images/def_image.jpg', url: 'http://example.com/stream17'},
                {name: 'Book Club Radio', category: 'Culture', logo: 'images/def_image.jpg', url: 'http://example.com/stream18'}
            ];
            saveToStorage('stations', stations);
        }
        
        filterStations('All');
    }
    
    function filterStations(category) {
        if (category === 'All') {
            filtered_stations = stations;
        } else {
            filtered_stations = stations.filter(function(s) {
                return s.category === category;
            });
        }
        renderStations();
    }
    
    function renderCategories() {
        var list = document.getElementById('category-list');
        if (!list) return;
        
        list.innerHTML = '';
        for (var i = 0; i < categories.length; i++) {
            var li = document.createElement('li');
            li.className = 'category-item';
            li.textContent = categories[i];
            li.setAttribute('data-index', i);
            list.appendChild(li);
        }
    }
    
    function renderStations() {
        var grid = document.getElementById('station-grid');
        if (!grid) return;
        
        grid.innerHTML = '';
        for (var i = 0; i < filtered_stations.length; i++) {
            var station = filtered_stations[i];
            var card = document.createElement('div');
            card.className = 'station-card';
            card.setAttribute('data-index', i);
            card.innerHTML = 
                '<img src="' + (station.logo || 'images/def_image.jpg') + '" class="station-logo" alt="' + station.name + '">' +
                '<div class="station-name">' + station.name + '</div>' +
                '<div class="station-info">' + station.category + '</div>';
            grid.appendChild(card);
        }
        
        current_station_index = 0;
        updateFocus();
    }
    
    function updateFocus() {
        var categoryItems = document.querySelectorAll('.category-item');
        var stationCards = document.querySelectorAll('.station-card');
        
        for (var i = 0; i < categoryItems.length; i++) {
            categoryItems[i].classList.remove('active');
        }
        for (var j = 0; j < stationCards.length; j++) {
            stationCards[j].classList.remove('active');
        }
        
        if (focus_area === 'category' && categoryItems[current_category_index]) {
            categoryItems[current_category_index].classList.add('active');
            scrollIntoViewIfNeeded(categoryItems[current_category_index]);
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
        if (focus_area === 'category') {
            handleCategoryKeys(e);
        } else if (focus_area === 'station') {
            handleStationKeys(e);
        }
    }
    
    function handleCategoryKeys(e) {
        var moved = false;
        
        if (e.keyCode === keys.UP) {
            current_category_index--;
            if (current_category_index < 0) {
                current_category_index = categories.length - 1;
            }
            moved = true;
        } else if (e.keyCode === keys.DOWN) {
            current_category_index++;
            if (current_category_index >= categories.length) {
                current_category_index = 0;
            }
            moved = true;
        } else if (e.keyCode === keys.RIGHT) {
            if (filtered_stations.length > 0) {
                focus_area = 'station';
                current_station_index = 0;
                moved = true;
            }
        } else if (e.keyCode === keys.ENTER) {
            filterStations(categories[current_category_index]);
            if (filtered_stations.length > 0) {
                focus_area = 'station';
                current_station_index = 0;
            }
            moved = true;
        }
        
        if (moved) {
            updateFocus();
        }
    }
    
    function handleStationKeys(e) {
        var moved = false;
        var oldIndex = current_station_index;
        
        if (e.keyCode === keys.LEFT) {
            if (current_station_index % grid_cols === 0) {
                focus_area = 'category';
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
            if (current_station_index >= filtered_stations.length) {
                current_station_index = filtered_stations.length - 1;
            }
            moved = true;
        } else if (e.keyCode === keys.UP) {
            current_station_index -= grid_cols;
            if (current_station_index < 0) {
                var currentCol = oldIndex % grid_cols;
                var totalRows = Math.ceil(filtered_stations.length / grid_cols);
                var lastRowStart = (totalRows - 1) * grid_cols;
                current_station_index = lastRowStart + currentCol;
                if (current_station_index >= filtered_stations.length) {
                    current_station_index = filtered_stations.length - 1;
                }
            }
            moved = true;
        } else if (e.keyCode === keys.DOWN) {
            current_station_index += grid_cols;
            if (current_station_index >= filtered_stations.length) {
                current_station_index = oldIndex % grid_cols;
                if (current_station_index >= filtered_stations.length) {
                    current_station_index = 0;
                }
            }
            moved = true;
        } else if (e.keyCode === keys.ENTER) {
            playStation(filtered_stations[current_station_index]);
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

if (typeof window !== 'undefined') {
    window.addEventListener('DOMContentLoaded', function() {
        setTimeout(function() {
            if (current_route === 'home') {
                home_page.init();
            }
        }, 100);
    });
}
