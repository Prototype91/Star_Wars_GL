star_wars_gl.game = {
    buildings: [],
    ship: 0,
    init: function (config) {
        //Début du jeu :
        console.log("Game is ready !");

        let material_plane = new THREE.MeshBasicMaterial({ color: 0xffffff });

        //Plane
        let plane = new THREE.Mesh(new THREE.PlaneGeometry(500, 2500), material_plane);
        plane.position.set(0, -10, -100);
        plane.rotateX(THREE.Math.degToRad(-90));
        //On ajoute la surface à la caméra :
        star_wars_gl.gfx_engine.camera.add(plane);

        // model
        const loader = new THREE.FBXLoader();
        loader.load('./fbx/source/ship_ok.fbx', function (object) {
            star_wars_gl.game.ship = object;
            star_wars_gl.game.ship.position.set(1, 1, -60);
            star_wars_gl.game.ship.rotateY(THREE.Math.degToRad(180))
            star_wars_gl.game.ship.scale.set(0.02, 0.02, 0.02);
            star_wars_gl.gfx_engine.scene.add(star_wars_gl.game.ship);
            star_wars_gl.gfx_engine.camera.add(star_wars_gl.game.ship);
            console.log("fbx star_wars_gl.game.ship added !");

            star_wars_gl.game.ship.traverse(function (child) {

                if (child.isMesh) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                }

            });

        });

        // model
        loader.load('./fbx/source/Fur_troe_mesh.fbx', function (object) {

            function entierAleatoire(min, max) {
                return Math.floor(Math.random() * (max - min + 1)) + min;
            }

            //Boucle de génération des arbres aléatoires :
            for (let i = 0; i < 3; i++) {

                let cloned_tree = object.clone();
                cloned_tree.position.set(entierAleatoire(-250, 250), -10, entierAleatoire(-15, -2500));
                star_wars_gl.game.buildings.push(cloned_tree);
                //cloned_tree.position.set(0, -0.2, -2);
                cloned_tree.scale.set(0.04, 0.05, 0.05);
                star_wars_gl.gfx_engine.scene.add(cloned_tree);
                console.log("fbx objects added !");
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
                case 87: // w
                    star_wars_gl.game.ship.translateY(1);
                    console.log('up');
                    break;
                case 37: // left
                case 65: // a
                    star_wars_gl.game.ship.translateX(1);
                    console.log('left');
                    break;
                case 40: // down
                case 83: // s
                    star_wars_gl.game.ship.translateY(-1);
                    console.log('down');
                    break;
                case 39: // right
                case 68: // d
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
        //gfx.camera.translateZ(-2);

        for (let j = 0; j < this.buildings.length; j++) {
            if (this.buildings[j].position.z > star_wars_gl.gfx_engine.camera.position.z) {
                this.buildings[j].translateZ(-2500 - 50);
                this.buildings[j].position.x = Math.floor(Math.random() * (250 - -250 + 1)) + -250
            }
        }

    }
};