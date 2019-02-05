star_wars_gl.gfx_engine = {
    init: function (config) {
        // --- scene
        this.scene = new THREE.Scene();

        //Fog :
        this.scene.background = new THREE.Color(0xefd1b5);
        this.scene.fog = new THREE.FogExp2(0xefd1b5, 0.0025);

        config = config || {}; //pour le fov
        const fov = config.camera_fov || 75; //si config.camera_fov est undefined !

        // --- camera
        const aspect = window.innerWidth / window.innerHeight;
        this.camera = new THREE.PerspectiveCamera(fov, aspect, 1, 5000);

        this.scene.add(this.camera);

        const perf = star_wars_gl.configuration.high_performance || true;

        //light pour le sapin :
        const light = new THREE.DirectionalLight(0xffffff);
        light.position.set(0, 0, 10);
        this.scene.add(light);

        // model
        const loader = new THREE.FBXLoader();
        loader.load('./fbx/source/ship_ok.fbx', function (object) {
            object.position.set(1, 1, -60);
            object.rotateY(THREE.Math.degToRad(180))
            object.scale.set(0.05, 0.05, 0.05);
            star_wars_gl.gfx_engine.scene.add(object);
            star_wars_gl.gfx_engine.camera.add(object);
            console.log("fbx objects added !");

            object.traverse(function (child) {

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
            for (let i = 0; i < 300; i++) {

                let cloned_tree = object.clone();
                cloned_tree.position.set(entierAleatoire(-250, 250), -10, entierAleatoire(-15, -2500));
                star_wars_gl.game.buildings.push(cloned_tree);
                //cloned_tree.position.set(0, -0.2, -2);
                cloned_tree.scale.set(0.05, 0.05, 0.05);
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


        // --- renderer :
        this.renderer = new THREE.WebGLRenderer({ antialias: perf }); //option qui prend des ressources
        this.renderer.setPixelRatio(window.devicePixelRatio); //standard du pixel (carré etc ...)
        this.renderer.setSize(window.innerWidth, window.innerHeight); //full-screen
        document.body.appendChild(this.renderer.domElement);

        if (perf) {
            this.renderer.antialias = true;
            this.renderer.shadowMap.enabled = true;
            this.renderer.shadowMap.type = THREE.BasicShadowMap;
            console.log("high_performance = true");
        } else {
            this.renderer.antialias = false;
            this.renderer.shadowMap.enabled = false;
            console.log("high_performance = false");
        }

        if (star_wars_gl.configuration.debug_mode) {
            //fonction IIFE pour voir les stats :
            (function () { var script = document.createElement('script'); script.onload = function () { var stats = new Stats(); document.body.appendChild(stats.dom); requestAnimationFrame(function loop() { stats.update(); requestAnimationFrame(loop) }); }; script.src = '//mrdoob.github.io/stats.js/build/stats.min.js'; document.head.appendChild(script); })();
            console.log("debug_mode = true");
        } else {
            console.log("debug_mode = false");
        }

        window.requestAnimFrame = (function () {
            return window.requestAnimationFrame ||
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame ||
                function (callback) {
                    window.setTimeout(callback, 1000 / 60);
                };
        })();



        console.log("gfx_engine ready !");
    },

    update() {
        this.renderer.render(this.scene, this.camera)
    }



};