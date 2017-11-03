var container;
var camera, scene, renderer;
var mouseX = 0, mouseY = 0;
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;
var start = Date.now();
init();
animate();

function init() {
	container = document.createElement( 'div' );
	document.body.appendChild( container );
	camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 10000 );
	camera.position.z = -133.06;
	camera.position.y = 22.82;
	camera.position.x = 328.85

	// scene
	scene = new THREE.Scene();
	
	// ambient
	//  var ambient = new THREE.AmbientLight( 0xffffff, 0.2 );
	//  scene.add( ambient );

	// // directional light
	// var directionalLight1 = new THREE.DirectionalLight( 0xffffff );
	// directionalLight1.position.set( 5, 124.48, -237.90 );
	// scene.add( directionalLight1 );

	// var directionalLight2 = new THREE.DirectionalLight( 0xffff00 );
	// directionalLight2.position.set( 0, 0, 70.5 );
	// scene.add( directionalLight2 );

	// var ambientLight = new THREE.AmbientLight( 0xffffff, 1 ); // soft white light
	// scene.add( ambientLight );

	var ambientLight = new THREE.AmbientLight( 0xcccccc, 0.4 );
				scene.add( ambientLight );
				var directionalLight = new THREE.DirectionalLight( 0xffffff, 0.8 );
				directionalLight.position.set( 1, 1, 0 ).normalize();
				scene.add( directionalLight );

	// controls

	controls = new THREE.OrbitControls( camera );

	earth = new THREE.Object3D();
	scene.add(earth);
	// SPHERE CUSTOM
	var geometry1 = new THREE.SphereGeometry(102, 14, 14);

	material = new THREE.ShaderMaterial( {

	  uniforms: {
	    tExplosion: {
	      type: "t",
	      value: THREE.ImageUtils.loadTexture( 'ocean-texture-color.png' )
	    },
	    time: { // float initialized to 0
	      type: "f",
	      value: 0.0
	    }
	  },
	  vertexShader: document.getElementById( 'vertexShader' ).textContent,
	  fragmentShader: document.getElementById( 'fragmentShader' ).textContent
	} );

	 var material1 = new THREE.MeshStandardMaterial({ color: 0xfe2478 });
	var sphere = new THREE.Mesh(geometry1, material1);
	earth.add(sphere);

	var earthRotate = function (object) {
	object.rotation.y += 0.01
	}

	var onProgress = function ( xhr ) {
		if ( xhr.lengthComputable ) {
			var percentComplete = xhr.loaded / xhr.total * 100;
			console.log( Math.round(percentComplete, 2) + '% downloaded' );
		}
	};
	var onError = function ( xhr ) {
	};
		var loader = new THREE.OBJLoader(  );
		loader.load( 'models/globe.obj', function ( object ) {
			object.position.y = 0;
			object.position.z = 0;
			// object.rotation.z = Math.PI * (-1/6) ;
			// object.rotation.y = Math.PI * (-1/3) ;
			earth.add(object);
		}, onProgress, onError );
	// if(earth) {
	// 	var EarthMesh = new THREE.Mesh(earth);
	// 	var OceanMesh = new THREE.Mesh(sphere);
	// }
	renderer = new THREE.WebGLRenderer();
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	scene.background = new THREE.Color( 0x959595 );
	container.appendChild( renderer.domElement );
}
// function onDocumentMouseMove( event ) {
// 	mouseX = ( event.clientX - windowHalfX ) / 2;
// 	mouseY = ( event.clientY - windowHalfY ) / 2;
// }

function animate() {
	
	requestAnimationFrame( animate );
	controls.update();
	render();
}


function render() {
	material.uniforms[ 'time' ].value = .00025 * ( Date.now() - start );
	// camera.position.x += ( mouseX - camera.position.x ) * .05;
	// camera.position.y += ( - mouseY - camera.position.y ) * .05;
	// camera.lookAt( scene.position );
	// var timer = Date.now() * 0.001;
	  earth.rotation.y += 0.05
     // camera.position.x = Math.cos( timer ) * 200;
     // camera.position.z = Math.sin( timer ) * 200;
    // camera.lookAt( scene.position );

	renderer.render( scene, camera );
}




