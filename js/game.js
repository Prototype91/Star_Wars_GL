star_wars_gl.game = {
    buildings: [],
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

        //Cylindre
        //let cylinder = new THREE.Mesh(new THREE.CylinderGeometry(1, 2.5, 50, 50), material);
        //cylinder.position.set(0, -10, -30);
        //star_wars_gl.gfx_engine.scene.add(cylinder);

        //Tirage d'un nombre aléatoire :
        function entierAleatoire(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
        let material = new THREE.MeshBasicMaterial({ color: 0x808000 });

        //Boucle de génération des arbres :
        /*for (let i = 0; i < 500; i++) {
            let cylinder = new THREE.Mesh(new THREE.CylinderGeometry(1, 6, 50, 50), material);
            cylinder.position.set(entierAleatoire(-250, 250), -10, entierAleatoire(-15, -2500));
            this.buildings.push(cylinder);
            star_wars_gl.gfx_engine.scene.add(cylinder);
            console.log('arbres générés');
        };*/

        //On affiche le résultat à l'aide du renderer
        star_wars_gl.gfx_engine.renderer.setClearColor('#2266ff');
        star_wars_gl.gfx_engine.renderer.render(star_wars_gl.gfx_engine.scene, star_wars_gl.gfx_engine.camera);

    },

    update: function () {
        const gfx = star_wars_gl.gfx_engine;
        gfx.camera.translateZ(-2);

        for (let j = 0; j < this.buildings.length; j++) {
            if (this.buildings[j].position.z > star_wars_gl.gfx_engine.camera.position.z) {
                this.buildings[j].translateZ(-2500 - 50);
                this.buildings[j].position.x = Math.floor(Math.random() * (250 - -250 + 1)) + -250
            }
        }

    }
};