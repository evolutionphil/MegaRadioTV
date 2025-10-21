// Home Page Controller
var home_page = (function() {
    var current_category_index = 0;
    var current_station_index = 0;
    var categories = ['All', 'Music', 'News', 'Sports', 'Talk'];
    var filtered_stations = [];
    var focus_area = 'category'; // 'category' or 'station'
    
    function init() {
        console.log('Home page initialized');
        loadStations();
        renderCategories();
        updateFocus();
    }
    
    function loadStations() {
        // Load stations from storage or use default
        stations = loadFromStorage('stations') || [];
        
        if (stations.length === 0) {
            // Sample data
            stations = [
                {name: 'Classic Rock Radio', category: 'Music', logo: 'images/def_image.jpg', url: ''},
                {name: 'Jazz FM', category: 'Music', logo: 'images/def_image.jpg', url: ''},
                {name: 'News 24/7', category: 'News', logo: 'images/def_image.jpg', url: ''},
                {name: 'Sports Talk', category: 'Sports', logo: 'images/def_image.jpg', url: ''},
                {name: 'Morning Show', category: 'Talk', logo: 'images/def_image.jpg', url: ''}
            ];
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
        // Clear all active states
        var categoryItems = document.querySelectorAll('.category-item');
        var stationCards = document.querySelectorAll('.station-card');
        
        for (var i = 0; i < categoryItems.length; i++) {
            categoryItems[i].classList.remove('active');
        }
        for (var j = 0; j < stationCards.length; j++) {
            stationCards[j].classList.remove('active');
        }
        
        // Set active state
        if (focus_area === 'category' && categoryItems[current_category_index]) {
            categoryItems[current_category_index].classList.add('active');
        } else if (focus_area === 'station' && stationCards[current_station_index]) {
            stationCards[current_station_index].classList.add('active');
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
        if (e.keyCode === keys.UP) {
            current_category_index--;
            if (current_category_index < 0) {
                current_category_index = categories.length - 1;
            }
            updateFocus();
        } else if (e.keyCode === keys.DOWN) {
            current_category_index++;
            if (current_category_index >= categories.length) {
                current_category_index = 0;
            }
            updateFocus();
        } else if (e.keyCode === keys.RIGHT) {
            focus_area = 'station';
            current_station_index = 0;
            updateFocus();
        } else if (e.keyCode === keys.ENTER) {
            filterStations(categories[current_category_index]);
            focus_area = 'station';
            updateFocus();
        }
    }
    
    function handleStationKeys(e) {
        var cols = 4;
        
        if (e.keyCode === keys.LEFT) {
            if (current_station_index % cols === 0) {
                focus_area = 'category';
                updateFocus();
                return;
            }
            current_station_index--;
            if (current_station_index < 0) {
                current_station_index = filtered_stations.length - 1;
            }
            updateFocus();
        } else if (e.keyCode === keys.RIGHT) {
            current_station_index++;
            if (current_station_index >= filtered_stations.length) {
                current_station_index = 0;
            }
            updateFocus();
        } else if (e.keyCode === keys.UP) {
            current_station_index -= cols;
            if (current_station_index < 0) {
                current_station_index += filtered_stations.length;
                current_station_index = Math.floor(current_station_index / cols) * cols;
            }
            updateFocus();
        } else if (e.keyCode === keys.DOWN) {
            current_station_index += cols;
            if (current_station_index >= filtered_stations.length) {
                current_station_index = current_station_index % cols;
            }
            updateFocus();
        } else if (e.keyCode === keys.ENTER) {
            playStation(filtered_stations[current_station_index]);
        }
    }
    
    function playStation(station) {
        if (station && station.url) {
            current_station = station;
            showPage('player');
        } else {
            showMessage('No stream URL available', 'error');
        }
    }
    
    return {
        init: init,
        keyDown: keyDown
    };
})();

// Initialize on page show
if (typeof window !== 'undefined') {
    window.addEventListener('DOMContentLoaded', function() {
        setTimeout(function() {
            if (current_route === 'home') {
                home_page.init();
            }
        }, 100);
    });
}
