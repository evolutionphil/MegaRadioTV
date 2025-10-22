var favorites_page = {
    current_station_index: 0,
    grid_cols: 6,
    grid_rows: 3,
    favorites: [],
    
    init: function() {
        console.log('Favorites page initialized');
        this.current_station_index = 0;
        this.loadFavorites();
        this.updateFocus();
    },
    
    loadFavorites: function() {
        var gridContainer = document.getElementById('favorites-grid');
        if (!gridContainer) return;
        
        gridContainer.innerHTML = '';
        
        this.favorites = loadFromStorage('favorites') || [];
        
        if (this.favorites.length === 0) {
            this.showEmptyState();
            return;
        }
        
        var positions = [
            {x: 236, y: 316}, {x: 466, y: 316}, {x: 696, y: 316}, {x: 926, y: 316}, {x: 1156, y: 316}, {x: 1386, y: 316},
            {x: 236, y: 610}, {x: 466, y: 610}, {x: 696, y: 610}, {x: 926, y: 610}, {x: 1156, y: 610}, {x: 1386, y: 610},
            {x: 236, y: 904}, {x: 466, y: 904}, {x: 696, y: 904}, {x: 926, y: 904}, {x: 1156, y: 904}, {x: 1386, y: 904}
        ];
        
        for (var i = 0; i < Math.min(this.favorites.length, 18); i++) {
            var station = this.favorites[i];
            var card = document.createElement('div');
            card.className = 'radio-card';
            card.style.left = positions[i].x + 'px';
            card.style.top = positions[i].y + 'px';
            card.setAttribute('data-index', i);
            
            var logo = document.createElement('div');
            logo.className = 'radio-logo';
            var img = document.createElement('img');
            img.src = station.logo || 'images/def_image.jpg';
            img.alt = station.name;
            logo.appendChild(img);
            
            var name = document.createElement('p');
            name.className = 'radio-name';
            name.textContent = station.name;
            
            var genre = document.createElement('p');
            genre.className = 'radio-genre';
            genre.textContent = station.category;
            
            card.appendChild(logo);
            card.appendChild(name);
            card.appendChild(genre);
            
            gridContainer.appendChild(card);
        }
    },
    
    showEmptyState: function() {
        var gridContainer = document.getElementById('favorites-grid');
        
        var emptyState = document.createElement('div');
        emptyState.className = 'favorites-empty-state';
        
        var icon = document.createElement('div');
        icon.className = 'favorites-empty-icon';
        var heartImg = document.createElement('img');
        heartImg.src = 'images/icon_heart.png';
        heartImg.alt = 'Heart';
        icon.appendChild(heartImg);
        
        var title = document.createElement('div');
        title.className = 'favorites-empty-title';
        title.textContent = "You don't have any\nfavorites yet";
        title.innerHTML = "You don't have any<br>favorites yet";
        
        var subtitle = document.createElement('div');
        subtitle.className = 'favorites-empty-subtitle';
        subtitle.textContent = 'Discover stations near to you!';
        
        var arrow = document.createElement('div');
        arrow.className = 'favorites-empty-arrow';
        arrow.textContent = '→';
        
        emptyState.appendChild(icon);
        emptyState.appendChild(title);
        emptyState.appendChild(subtitle);
        emptyState.appendChild(arrow);
        
        gridContainer.appendChild(emptyState);
    },
    
    updateFocus: function() {
        var cards = document.querySelectorAll('.favorites-grid .radio-card');
        for (var i = 0; i < cards.length; i++) {
            cards[i].classList.remove('active');
        }
        
        if (cards[this.current_station_index]) {
            cards[this.current_station_index].classList.add('active');
        }
    },
    
    handleKey: function(keyCode) {
        if (this.favorites.length === 0) {
            if (keyCode === KEY_BACK) {
                showPage('home');
            } else if (keyCode === KEY_ENTER) {
                showPage('genres');
            }
            return;
        }
        
        var totalStations = Math.min(this.favorites.length, 18);
        
        switch(keyCode) {
            case KEY_LEFT:
                if (this.current_station_index % this.grid_cols > 0) {
                    this.current_station_index--;
                    this.updateFocus();
                }
                break;
                
            case KEY_RIGHT:
                if (this.current_station_index % this.grid_cols < this.grid_cols - 1 && 
                    this.current_station_index < totalStations - 1) {
                    this.current_station_index++;
                    this.updateFocus();
                }
                break;
                
            case KEY_UP:
                if (this.current_station_index >= this.grid_cols) {
                    this.current_station_index -= this.grid_cols;
                    this.updateFocus();
                }
                break;
                
            case KEY_DOWN:
                if (this.current_station_index + this.grid_cols < totalStations) {
                    this.current_station_index += this.grid_cols;
                    this.updateFocus();
                }
                break;
                
            case KEY_ENTER:
                console.log('Favorite station selected');
                break;
                
            case KEY_BACK:
                showPage('home');
                break;
        }
    }
};
