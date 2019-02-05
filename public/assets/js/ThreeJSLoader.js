var container, stats, controls;
var camera, scene, renderer, light, raycaster;
var theta = 0
var radius = 100
var mouse = new THREE.Vector2(), INTERSECTED;
var loaded = false;
var HighlightMaterial;
var cube;
init();
animate();


function init(){
  camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.25, 20 );
  camera.position.set( - 2.8, 0.9, 2.7 );

  controls = new THREE.OrbitControls(camera);
  controls.target.set( 0, 0, 0);
  controls.update();



  scene = new THREE.Scene();
  light = new THREE.HemisphereLight( 0xbbbbff, 0x444422 );
  light.position.set( 0, 5, 0 );
  scene.add( light );

  var light = new THREE.PointLight( 0xffffff, 1, 100 );
  light.position.set( 0, 1.6, 0 );
  scene.add( light );


  // model
  var loader = new THREE.GLTFLoader()
  var modelurl = document.getElementById("3DObject").value;
  loader.load( modelurl, function ( gltf ) {


    scene.add( gltf.scene );
    loaded = true;
    document.getElementById('loading').style.display = "none";
    console.log( scene.children[2].children)

  }, undefined , function ( e ) {

    console.error( e );

  } );


  raycaster = new THREE.Raycaster()

  renderer = new THREE.WebGLRenderer();
  renderer.setSize( $('#canvas').width(), $('#canvas').height());
  renderer.setClearColor (0xf5f7fa, 1);

  document.getElementById("canvas").appendChild( renderer.domElement );
  document.addEventListener( 'mousemove', onDocumentMouseMove, false );
  console.log(scene.children);
}




function onDocumentMouseMove( event ) {

  event.preventDefault();
  mouse.x = ( event.clientX  / window.innerWidth ) * 2 - 1;
  mouse.y = - ( event.clientY / window.innerHeight ) * 2 -1;

  }

function render() {
if( loaded == true)	{
  // find intersections
  raycaster.setFromCamera( mouse, camera );
  var intersects = raycaster.intersectObjects( scene.children[2].children );
  if ( intersects.length > 0 ) {
    if ( INTERSECTED != intersects[ 0 ].object ) {
      if ( INTERSECTED ) INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );
      INTERSECTED = intersects[ 0 ].object;
      INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex();
      HighlightMaterial = INTERSECTED.material.clone();
      HighlightMaterial.emissive.setHex( 0xff0000 );
      INTERSECTED.material = HighlightMaterial;
    }
  } else {
    if ( INTERSECTED ) INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );
    INTERSECTED = null;
  }
}
  renderer.render( scene, camera );
  }


function animate() {

  requestAnimationFrame( animate );

  render();
  }
