const star_wars_gl = {
    configuration: null,
    start: function (config) {
        //debug mode pour afficher ou pas les console.log :
        if (config.debug_mode == false) {
            console.log = function () { }
        }
        this.configuration = config;

        function gameIsStarted() {
            star_wars_gl.gfx_engine.init(config.gfx_engine);

            star_wars_gl.game.init(config.game);

            star_wars_gl.update();

            console.log('star_wars_gl is started !');
        }
        const blocker = document.getElementById('blocker');
        const instructions = document.getElementById('instructions');

        const onKeyDown = function (event) {
            switch (event.keyCode) {
                case 13: // enter
                    instructions.style.display = 'none';
                    blocker.style.display = 'none';
                    star_wars_gl.game.pause = false;
                    gameIsStarted()
                    console.log('enter');
                    break;
                case 27 : //achap
                instructions.style.display = '';
                blocker.style.display = '';
                star_wars_gl.game.pause = true;
                break;
            }
        };
        document.addEventListener('keydown', onKeyDown, false);

    },

    update: function () {
        requestAnimFrame(star_wars_gl.update)
        star_wars_gl.game.update();
        star_wars_gl.gfx_engine.update();

    }
};