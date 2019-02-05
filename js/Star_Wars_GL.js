const star_wars_gl = {
    configuration: null,
    start: function (config) {
        //debug mode pour afficher ou pas les console.log :
        if (config.debug_mode == false) {
            console.log = function () {}
        }
        this.configuration = config;
        this.gfx_engine.init(config.gfx_engine);
        
        this.game.init(config.game);

        this.update();

        console.log('star_wars_gl is started !');
    },

    update: function(){
        requestAnimFrame(star_wars_gl.update)
        star_wars_gl.game.update();
        star_wars_gl.gfx_engine.update();
        
    }
};