var genre_detail_page = {
    current_station_index: 0,
    grid_cols: 6,
    grid_rows: 3,
    current_genre: 'Pop',
    
    init: function(genreName) {
        console.log('Genre detail page initialized for:', genreName);
        this.current_genre = genreName || 'Pop';
        this.current_station_index = 0;
        this.loadGenreStations();
        this.updateFocus();
    },
    
    loadGenreStations: function() {
        var gridContainer = document.getElementById('genre-detail-grid');
        if (!gridContainer) return;
        
        gridContainer.innerHTML = '';
        
        var positions = [
            {x: 236, y: 316}, {x: 466, y: 316}, {x: 696, y: 316}, {x: 926, y: 316}, {x: 1156, y: 316}, {x: 1386, y: 316},
            {x: 236, y: 610}, {x: 466, y: 610}, {x: 696, y: 610}, {x: 926, y: 610}, {x: 1156, y: 610}, {x: 1386, y: 610},
            {x: 236, y: 904}, {x: 466, y: 904}, {x: 696, y: 904}, {x: 926, y: 904}, {x: 1156, y: 904}, {x: 1386, y: 904}
        ];
        
        var station_images = [
            'images/station_powerturk_tv_logosu_1_1691_10798.png',
            'images/station_alem_fm_1_1691_10876.png',
            'images/station_0b75jzrr_400x400_1_1691_10820.png',
            'images/station_android_default_logo_1_1691_10844.png',
            'images/station_meta_image_1_1_1691_10934.png',
            'images/station_austria_1_1691_11039.png'
        ];
        
        for (var i = 0; i < 18; i++) {
            var card = document.createElement('div');
            card.className = 'radio-card';
            card.style.left = positions[i].x + 'px';
            card.style.top = positions[i].y + 'px';
            card.setAttribute('data-index', i);
            
            var logo = document.createElement('div');
            logo.className = 'radio-logo';
            var img = document.createElement('img');
            img.src = station_images[i % station_images.length];
            img.alt = 'Station ' + (i + 1);
            logo.appendChild(img);
            
            var name = document.createElement('p');
            name.className = 'radio-name';
            name.textContent = this.current_genre + ' Station ' + (i + 1);
            
            var genre = document.createElement('p');
            genre.className = 'radio-genre';
            genre.textContent = this.current_genre;
            
            card.appendChild(logo);
            card.appendChild(name);
            card.appendChild(genre);
            
            gridContainer.appendChild(card);
        }
    },
    
    updateFocus: function() {
        var cards = document.querySelectorAll('.genre-detail-grid .radio-card');
        for (var i = 0; i < cards.length; i++) {
            cards[i].classList.remove('active');
        }
        
        if (cards[this.current_station_index]) {
            cards[this.current_station_index].classList.add('active');
        }
    },
    
    handleKey: function(keyCode) {
        var totalStations = 18;
        
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
                console.log('Station selected');
                break;
                
            case KEY_BACK:
                showPage('genres');
                break;
        }
    }
};
