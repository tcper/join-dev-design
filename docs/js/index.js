var gui = new dat.GUI();
      var scene = new THREE.Scene();
      var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 50 );
      camera.position.z = 30;

      var renderer = new THREE.WebGLRenderer( { antialias: true } );
      renderer.setPixelRatio( window.devicePixelRatio );
      renderer.setSize( window.innerWidth, window.innerHeight );
      renderer.setClearColor( 0x000000, 1 );
      document.body.appendChild( renderer.domElement );

      // var orbit = new THREE.OrbitControls( camera, renderer.domElement );
      // orbit.enableZoom = false;

      var lights = [];
      lights[ 0 ] = new THREE.PointLight( 0xffffff, 1, 0 );
      lights[ 1 ] = new THREE.PointLight( 0xffffff, 1, 0 );
      lights[ 2 ] = new THREE.PointLight( 0xffffff, 1, 0 );

      lights[ 0 ].position.set( 0, 200, 0 );
      lights[ 1 ].position.set( 100, 200, 100 );
      lights[ 2 ].position.set( - 100, - 200, - 100 );

      scene.add( lights[ 0 ] );
      scene.add( lights[ 1 ] );
      scene.add( lights[ 2 ] );

      var group = new THREE.Group();

      var geometry = new THREE.BufferGeometry();
      geometry.addAttribute( 'position', new THREE.Float32BufferAttribute( [], 3 ) );

      var lineMaterial = new THREE.LineBasicMaterial( { color: 0xffffff, transparent: true, opacity: 0.5 } );
      var meshMaterial = new THREE.MeshPhongMaterial( { color: 0x156289, emissive: 0x072534, side: THREE.DoubleSide, flatShading: true } );

      group.add( new THREE.LineSegments( geometry, lineMaterial ) );
      group.add( new THREE.Mesh( geometry, meshMaterial ) );

      var options = chooseFromHash( group );

      scene.add( group );

      var prevFog = false;

      var render = function () {

        requestAnimationFrame( render );

        if ( ! options.fixed ) {

          group.rotation.x += 0.005;
          group.rotation.y += 0.005;

        }

        renderer.render( scene, camera );

      };

      window.addEventListener( 'resize', function () {

        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        renderer.setSize( window.innerWidth, window.innerHeight );

      }, false );

      render();
