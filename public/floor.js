var fluidWidth = 512;
var fluidHeight = 512;
function Floor(z, color){
	this.texture = new THREE.WebGLRenderTarget( fluidWidth, fluidHeight, {depthBuffer: false, stencilBuffer:false, minFilter: THREE.LinearFilter, magFilter: THREE.NearestFilter,type: THREE.HalfFloatType,});
	this.textureBuffer = new THREE.WebGLRenderTarget( fluidWidth, fluidHeight, {depthBuffer: false, stencilBuffer:false, minFilter: THREE.LinearFilter, magFilter: THREE.NearestFilter,type: THREE.HalfFloatType,});
	var geometry = new THREE.PlaneGeometry( 50, 50 );
	var material = new THREE.MeshPhongMaterial({map: this.texture});
	var mesh = new THREE.Mesh( geometry, material );
	
	mesh.rotateX(-3.14/2);
	mesh.position.z = 0
	mesh.position.y = 0;
	mesh.castShadow = true;
	mesh.receiveShadow = true;
	this.obj = mesh;
	this.update = function(){

		this.obj.material.map = this.texture;

	}
	this.addColor = function(x, y, color){
		this.addDensityMaterial.uniforms.densitySource.value.x = 5.0;
        if(color == 1.0)
            this.addDensityMaterial.uniforms.densitySource.value.y = 1.0;
        else if(color == 2.0)
            this.addDensityMaterial.uniforms.densitySource.value.y = 2.0;
        else if (color == 3.0)
            this.addDensityMaterial.uniforms.densitySource.value.y = 3.0;
        this.addDensityMaterial.uniforms.densitySource.value.z = ((x)/50 + 0.5) * fluidWidth;
        this.addDensityMaterial.uniforms.densitySource.value.w = (1.0 - ((y)/50 + 0.5)) *  fluidHeight;


		this.addDensityMaterial.uniforms.bufferTexture.value = this.texture;

		renderer.render(this.addDensityScene,this.fluidCamera,this.textureBuffer,true);
		var tmp = this.texture;
		this.texture = this.textureBuffer;
		this.textureBuffer = tmp;

	}
	this.plane = new THREE.PlaneBufferGeometry( fluidWidth, fluidHeight );

	this.addDensityScene = new THREE.Scene();

	this.addDensityMaterial = new THREE.ShaderMaterial( {
	    uniforms: {
	     bufferTexture: { type: "t", value: this.texture },
	     res : {type: 'v2',value:new THREE.Vector2(fluidWidth,fluidWidth)},
	     densitySource: {type:"v4",value:new THREE.Vector4(0,0,0,0)},
	     densitySize: {type:"f",value:3.0},
	    },
	    fragmentShader: document.getElementById( 'AddDensityShader' ).innerHTML
	} );
	this.addDensityObject = new THREE.Mesh( this.plane, this.addDensityMaterial );

	this.addDensityScene.add(this.addDensityObject);
	this.fluidCamera = new THREE.OrthographicCamera( fluidWidth / - 2, fluidWidth / 2, fluidHeight / 2, fluidHeight / - 2, 1, 1000 );
	this.fluidCamera.position.z = 2;

	this.renderer = new THREE.WebGLRenderer();
	this.renderer.setSize(fluidWidth,fluidHeight)



	scene.add( this.obj );
}


