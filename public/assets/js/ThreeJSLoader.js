var container, stats, controls;
var camera, scene, renderer, light, raycaster;
var theta = 0
var radius = 100
var mouse = new THREE.Vector2(1000000,1000000), INTERSECTED;
var loaded = false;
var HighlightMaterial;
var Mesh =[];
var cube;
var oldmaterial = [];
init()
animate()

function init(){
  camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.25, 20 );
  camera.position.set( - 2.8, 0, 6 );

  controls = new THREE.OrbitControls(camera);
  controls.target.set( 0, 0, 0);
  controls.update();



  scene = new THREE.Scene();

  light = new THREE.HemisphereLight( 0xbbbbff, 0x444422 );
  light.position.set( 0, 5, 0 );
  scene.add( light );

  var light = new THREE.DirectionalLight( 0xffffff, 1 );
  light.position.set(5,10,7.5)
  scene.add( light );

  // model
  var loader = new THREE.GLTFLoader()
  var modelurl = "https://foundationlearning.eu-gb.mybluemix.net/assets/Motherboard.glb" //document.getElementById("3DObject").value;
  loader.load( modelurl, function ( gltf ) {


    scene.add( gltf.scene );
    loaded = true;
    //document.getElementById('loading').style.display = "none";

    for(var x = 0; x < scene.children[2].children.length; x++){
      if(scene.children[2].children[x].children.length != 0){
        for(var i = 0; i < scene.children[2].children[x].children.length; i++){
          Mesh.push(scene.children[2].children[x].children[i])
        }
      }else{
        Mesh.push(scene.children[2].children[x])
      }
    }


  }, undefined , function ( e ) {

    console.error( e );

  } );


  raycaster = new THREE.Raycaster()

  renderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight);
  renderer.setClearColor (0xf5f7fa, 1);

  document.body.appendChild( renderer.domElement );
  document.addEventListener( 'mousemove', onDocumentMouseMove, false );
}




function onDocumentMouseMove( event ) {

  event.preventDefault();
  mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
  }

function render() {
  if( loaded == true)	{
  // find intersections
    raycaster.setFromCamera( mouse, camera );
    var intersects = raycaster.intersectObjects( Mesh );
    if ( intersects.length > 0 ) {
      if ( INTERSECTED != intersects[ 0 ].object ) {
        if ( INTERSECTED ){

           if(INTERSECTED.parent.name != "Scene"){
             for(var y = 0; y < INTERSECTED.parent.children.length; y++){
                  INTERSECTED.parent.children[y].material = oldmaterial[y];
              }
           }else{
             INTERSECTED.material.color.setHex( INTERSECTED.currentHex );
           }
        }

        INTERSECTED = intersects[ 0 ].object;
        INTERSECTED.currentHex = INTERSECTED.material.color.getHex();
        HighlightMaterial = INTERSECTED.material.clone();
        //HighlightMaterial.emissive.setHex(  0xff8c8c);
        HighlightMaterial.color.setHex(  0xff8c8c  );

        if(INTERSECTED.parent.name != "Scene"){
            oldmaterial = []
           for(var y = 0; y < INTERSECTED.parent.children.length; y++){
            oldmaterial.push(INTERSECTED.parent.children[y].material)

            INTERSECTED.parent.children[y].material = HighlightMaterial;
            $( "#selectedObj" ).val(INTERSECTED.parent.name)
            $( "#selectedObj" ).trigger('change')
         }
        }else{
          INTERSECTED.currentHex = INTERSECTED.material.color.getHex();
          INTERSECTED.material = HighlightMaterial;
          $( "#selectedObj" ).val(INTERSECTED.name)
          $( "#selectedObj" ).trigger('change')
        }
      }
    } else {
      if ( INTERSECTED ){
        INTERSECTED.material.color.setHex( INTERSECTED.currentHex );
        if(INTERSECTED.parent.name != "Scene"){
        for(var y = 0; y < INTERSECTED.parent.children.length; y++){
            INTERSECTED.parent.children[y].material = oldmaterial[y];
        }
        }
      }
      INTERSECTED = null;
    }

  }
  renderer.render( scene, camera );
 }


function animate() {

  requestAnimationFrame( animate );

  render();
  }
