var genres_page = {
    genres: [],
    current_row: 0,
    current_col: 0,
    grid_cols: 4,
    
    init: function() {
        console.log('Genres page initialized - loading real genres from API');
        this.loadGenres();
    },
    
    loadGenres: function() {
        var self = this;
        var container = document.getElementById('genres-page').querySelector('.genres-container');
        if (container) {
            container.innerHTML = '<div style="color: white; padding: 40px; text-align: center;">Loading genres...</div>';
        }
        
        API.getGenres()
            .then(function(genres) {
                self.genres = genres.slice(0, 20);
                self.renderGenres();
            })
            .catch(function(error) {
                console.error('Failed to load genres:', error);
                if (container) {
                    container.innerHTML = '<div style="color: white; padding: 40px; text-align: center;">Failed to load genres</div>';
                }
            });
    },
    
    renderGenres: function() {
        var container = document.getElementById('genres-page').querySelector('.genres-container');
        if (!container) return;
        
        container.innerHTML = '';
        
        var positions = [
            {left: 157, top: 283}, {left: 485, top: 283}, {left: 813, top: 283}, {left: 1141, top: 283},
            {left: 157, top: 579}, {left: 485, top: 579}, {left: 813, top: 579}, {left: 1141, top: 579},
            {left: 157, top: 875}, {left: 485, top: 875}, {left: 813, top: 875}, {left: 1141, top: 875},
            {left: 157, top: 1171}, {left: 485, top: 1171}, {left: 813, top: 1171}, {left: 1141, top: 1171},
            {left: 157, top: 1467}, {left: 485, top: 1467}, {left: 813, top: 1467}, {left: 1141, top: 1467}
        ];
        
        for (var i = 0; i < Math.min(this.genres.length, 20); i++) {
            var genre = this.genres[i];
            var pos = positions[i] || {left: 157, top: 283};
            
            var card = document.createElement('div');
            card.className = 'genre-card';
            card.style.left = pos.left + 'px';
            card.style.top = pos.top + 'px';
            card.style.cursor = 'pointer';
            
            var genreName = genre.name || genre.slug || 'Music';
            var posterUrl = genre.poster || 'images/fallback-favicon.png';
            
            card.innerHTML = 
                '<div class="genre-img" style="background-image: url(' + posterUrl + ')"></div>' +
                '<div class="genre-overlay"></div>' +
                '<div class="genre-name">' + genreName + '</div>';
            
            (function(slug, name) {
                card.onclick = function() {
                    showPage('genre-detail', slug || name);
                };
            })(genre.slug, genreName);
            
            container.appendChild(card);
        }
    },
    
    handleKey: function(keyCode) {
        var totalGenres = this.genres.length;
        var grid_rows = Math.ceil(totalGenres / this.grid_cols);
        
        switch(keyCode) {
            case KEY_LEFT:
                if (this.current_col > 0) {
                    this.current_col--;
                }
                break;
                
            case KEY_RIGHT:
                if (this.current_col < this.grid_cols - 1) {
                    var currentIndex = this.current_row * this.grid_cols + this.current_col;
                    if (currentIndex + 1 < totalGenres) {
                        this.current_col++;
                    }
                }
                break;
                
            case KEY_UP:
                if (this.current_row > 0) {
                    this.current_row--;
                }
                break;
                
            case KEY_DOWN:
                if (this.current_row < grid_rows - 1) {
                    var nextIndex = (this.current_row + 1) * this.grid_cols + this.current_col;
                    if (nextIndex < totalGenres) {
                        this.current_row++;
                    }
                }
                break;
                
            case KEY_ENTER:
                var index = this.current_row * this.grid_cols + this.current_col;
                if (this.genres[index]) {
                    showPage('genre-detail', this.genres[index].slug || this.genres[index].name);
                }
                break;
                
            case KEY_BACK:
                showPage('home');
                break;
        }
    }
};
