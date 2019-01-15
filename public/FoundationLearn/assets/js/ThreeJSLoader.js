var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( $('#canvas').width(), $('#canvas').height());
document.getElementById("canvas").appendChild( renderer.domElement );

    var loader = new THREE.GLTFLoader();

     loader.load( 'file:///Users/jamie/Documents/Motherboard.glb', function ( gltf ) {

	    scene.add( gltf.scene );

    }, undefined, function ( error ) {

	console.error( error );

} );

function animate() {
	renderer.render( scene, camera );
}
animate();