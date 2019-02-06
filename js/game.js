star_wars_gl.game = {
    buildings: [],
    planetes: [],
    ship: 0,
    init: function (config) {

        //Début du jeu :
        console.log("Game is ready !");

        let material_plane = new THREE.MeshBasicMaterial({ color: 0xE5DBD2 });

        //Plane
        let plane = new THREE.Mesh(new THREE.PlaneGeometry(2000, 2500), material_plane);
        plane.position.set(0, -20, -100);
        plane.rotateX(THREE.Math.degToRad(-90));
        //On ajoute la surface à la caméra :
        star_wars_gl.gfx_engine.camera.add(plane);

        const listener = new THREE.AudioListener();
        star_wars_gl.gfx_engine.scene.add(listener);

        //Musique
        const audioLoader = new THREE.AudioLoader();
        let music = new THREE.PositionalAudio(listener);
        audioLoader.load('./audio/ship_sound.ogg', function (buffer) {
            music.setBuffer(buffer);
            music.setRefDistance(20);
            music.play();

        });
        star_wars_gl.gfx_engine.scene.add(music);


        function entierAleatoire(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        //Jupiters :
        for (let i = 0; i < 5; i++) {

            const geometry_jupiter = new THREE.SphereGeometry(100, 32, 32);
            const texture_loader = new THREE.TextureLoader();
            const texture = texture_loader.load("./fbx/source/jupiter.jpg");
            const material_jupiter = new THREE.MeshPhongMaterial({ color: 0xffffff, map: texture });
            const mesh_jupiter = new THREE.Mesh(geometry_jupiter, material_jupiter);


            let cloned_jupiters = mesh_jupiter.clone();
            cloned_jupiters.position.set(entierAleatoire(-1000, 1000), 140, entierAleatoire(-15, -2500));
            star_wars_gl.game.planetes.push(cloned_jupiters);
            cloned_jupiters.scale.set(0.25, 0.25, 0.25);
            star_wars_gl.gfx_engine.scene.add(cloned_jupiters);
            console.log("jupiters added !");
        };



        // Ship :
        const loader = new THREE.FBXLoader();
        loader.load('./fbx/source/ship_ok.fbx', function (object) {
            star_wars_gl.game.ship = object;
            star_wars_gl.game.ship.position.set(1, -10, -60);
            star_wars_gl.game.ship.rotateY(THREE.Math.degToRad(180));
            star_wars_gl.game.ship.scale.set(0.025, 0.025, 0.025);
            star_wars_gl.gfx_engine.scene.add(star_wars_gl.game.ship);
            star_wars_gl.gfx_engine.camera.add(star_wars_gl.game.ship);
            console.log("ship added !");

            star_wars_gl.game.ship.traverse(function (child) {

                if (child.isMesh) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                }
            });

        });

        //Buildings :
        loader.load('./fbx/source/castel maria.fbx', function (object) {

            function entierAleatoire(min, max) {
                return Math.floor(Math.random() * (max - min + 1)) + min;
            }

            //Boucle de génération des buildings aléatoires :
            for (let i = 0; i < 100; i++) {

                let cloned_buildings = object.clone();
                cloned_buildings.position.set(entierAleatoire(-1000, 1000), -30, entierAleatoire(-15, -2500));
                star_wars_gl.game.buildings.push(cloned_buildings);
                cloned_buildings.scale.set(0.2, 0.2, 0.2);
                star_wars_gl.gfx_engine.scene.add(cloned_buildings);
                console.log("cloned buildings added !");
            };

            object.traverse(function (child) {

                if (child.isMesh) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                }

            });

        });

        const onKeyDown = function (event) {
            switch (event.keyCode) {
                case 38: // up
                    star_wars_gl.game.ship.translateY(1);
                    console.log('up');
                    break;
                case 37: // left
                    star_wars_gl.game.ship.translateX(1);
                    console.log('left');
                    console.log("x : " + star_wars_gl.game.ship.position.x)
                    console.log("y : " + star_wars_gl.game.ship.position.y)
                    console.log("z : " + star_wars_gl.game.ship.position.z)
                    break;
                case 40: // down
                    star_wars_gl.game.ship.translateY(-1);
                    console.log('down');
                    break;
                case 39: // right
                    star_wars_gl.game.ship.translateX(-1);
                    console.log('right');
                    break;
            }
        };
        document.addEventListener('keydown', onKeyDown, false);


        //On affiche le résultat à l'aide du renderer
        star_wars_gl.gfx_engine.renderer.setClearColor('#2266ff');
        star_wars_gl.gfx_engine.renderer.render(star_wars_gl.gfx_engine.scene, star_wars_gl.gfx_engine.camera);

    },

    update: function () {
        const gfx = star_wars_gl.gfx_engine;
        gfx.camera.translateZ(-2);

        if (score_div.innerText >= 0) score_div.innerText++;

        for (let j = 0; j < this.buildings.length; j++) {
            if (this.buildings[j].position.z > star_wars_gl.gfx_engine.camera.position.z) {
                this.buildings[j].translateZ(-2500 - 50);
                this.buildings[j].position.x = Math.floor(Math.random() * (250 - -250 + 1)) + -250;
            }
        }
        for (let j = 0; j < this.planetes.length; j++) {
            if (this.planetes[j].position.z > star_wars_gl.gfx_engine.camera.position.z) {
                this.planetes[j].translateZ(-2500 - 50);
                this.planetes[j].position.x = Math.floor(Math.random() * (250 - -250 + 1)) + -250;
            }
        }
        //déplacement hors de l'écran :
        if (star_wars_gl.game.ship.position.x >= 40) star_wars_gl.game.ship.position.x -= 1;
        if (star_wars_gl.game.ship.position.x <= -40) star_wars_gl.game.ship.position.x += 1;

        if (star_wars_gl.game.ship.position.y <= -14) star_wars_gl.game.ship.position.y += 1;
        if (star_wars_gl.game.ship.position.y >= 16) star_wars_gl.game.ship.position.y -= 1;

        for (let k = 0; k < star_wars_gl.game.buildings.length; k++) {
            if (star_wars_gl.game.ship.position.z == star_wars_gl.game.buildings[k].position.z) {
                console.log("colision");
            }
        }

    }
};