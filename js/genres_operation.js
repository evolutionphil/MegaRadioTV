var genres_page = {
    current_row: 0,
    current_col: 0,
    grid_rows: 5,
    grid_cols: 4,
    
    init: function() {
        console.log('Genres page initialized');
        this.current_row = 0;
        this.current_col = 0;
        this.setActiveCard();
    },
    
    setActiveCard: function() {
        $('.genre-card').removeClass('active');
        
        var index = this.current_row * this.grid_cols + this.current_col;
        $('.genre-card').eq(index).addClass('active');
    },
    
    handleKey: function(keyCode) {
        console.log('Genres page handling key:', keyCode);
        
        switch(keyCode) {
            case KEY_LEFT:
                if (this.current_col > 0) {
                    this.current_col--;
                    this.setActiveCard();
                }
                break;
                
            case KEY_RIGHT:
                if (this.current_col < this.grid_cols - 1) {
                    this.current_col++;
                    this.setActiveCard();
                }
                break;
                
            case KEY_UP:
                if (this.current_row > 0) {
                    this.current_row--;
                    this.setActiveCard();
                }
                break;
                
            case KEY_DOWN:
                if (this.current_row < this.grid_rows - 1) {
                    this.current_row++;
                    this.setActiveCard();
                }
                break;
                
            case KEY_ENTER:
                var genreNames = ['Pop', 'Rock', 'Hip Hop', 'Jazz', 'Classical', 'Electronic', 'Country', 'R&B',
                                  'Folk', 'Blues', 'Reggae', 'Metal', 'Latin', 'Soul', 'Dance', 'Indie',
                                  'Alternative', 'Punk', 'World', 'News'];
                var genreName = genreNames[this.current_row * this.grid_cols + this.current_col] || 'Pop';
                console.log('Genre selected:', genreName);
                showPage('genre-detail', genreName);
                break;
                
            case KEY_BACK:
                showPage('home');
                break;
        }
    }
};
