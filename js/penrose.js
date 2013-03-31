var renderer, camera, settings, materials, bodyGeometry;

init();
animate();

function init() {
	renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);
	
	camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 1000);
	camera.position.z = 7;
	
	controls = new THREE.OrbitControls( camera, renderer.domElement );
	controls.addEventListener( 'change', render );

	window.addEventListener( 'resize', onWindowResize, false );

	var Settings = function () {
		this.modelListSelect = document.getElementById("modelList");
		this.isStereographicCheckbox = document.getElementById("isStereographic");
		this.isInvertingCheckbox = document.getElementById("isInverting");
	};
	
	materials = [
		new THREE.MeshLambertMaterial( { 
			color: 0x222222, 
			side: THREE.DoubleSide,
			shading: THREE.FlatShading, 
			transparent: true,  
			opacity: 0.5
		} ),
		new THREE.MeshBasicMaterial( { 
			color: 0xEEEEEE, 
			shading: THREE.FlatShading, 
			wireframe: true
		} )
	];
	
	
	var loader = new THREE.OBJLoader();
	loader.addEventListener( 'load', function ( event ) {
		bodyGeometry = event.content;
		var scale = 0.025;
		bodyGeometry.scale.set(scale, scale, scale);
		bodyGeometry.position.y = -2.2;
	});
	
    loader.load( "resources/obj/penrose-body.obj" );
	
	settings = new Settings();	
}

function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );
}

function animate() {
	requestAnimationFrame( animate, renderer.domElement );

	render();
	controls.update();
	//stats.update();
}

function render() {
	var time = new Date().getTime() / 1000;
	var scene = new THREE.Scene();
	
	
//	var shape = THREE.SceneUtils.createMultiMaterialObject( bodyGeometry, materials );
//	shape.overdraw = true;
	scene.add(bodyGeometry.clone());
	
	// sphere
//	var sphere = new THREE.Mesh(new THREE.CubeGeometry(200, 200, 200), new THREE.MeshLambertMaterial({color: 0x0000ff}));
	//sphere.overdraw = true;
	//scene.add(sphere);
	
	// add subtle ambient lighting
	var ambientLight = new THREE.AmbientLight(0x555555);
	scene.add(ambientLight);
	
	// add directional light source
	var directionalLight = new THREE.DirectionalLight(0xffffff);
	directionalLight.position.set(1, 1, 1).normalize();
	scene.add(directionalLight);

	renderer.render( scene, camera );
}
