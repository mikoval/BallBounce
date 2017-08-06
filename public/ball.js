function Ball(x, z, color){
	this.direction = new THREE.Vector3( 0, 0, -1 );
	this.position = new THREE.Vector3(x, 3.0, z);
	this.velocity = new THREE.Vector3(0, 0, 0);
	this.rotation = 0;
	this.orientation =  new THREE.Quaternion();
	this.radius = 3;
	if(color == 0xFF0000){
		this.pathColor = 1;
	}
	if(color == 0x00FF00){
		this.pathColor = 2;
	}
	if(color == 0x0000FF){
		this.pathColor = 3;
	}
	

	var geometry = new THREE.SphereGeometry(this.radius, 16,16);
	
	
	var material = new THREE.MeshPhongMaterial({color:color, overdraw: 0.5});
	var mesh = new THREE.Mesh(geometry, material);
	mesh.position.x = this.position.x;
	mesh.position.y = this.position.y;
	mesh.position.z = this.position.z;
	mesh.castShadow = true;
	mesh.receiveShadow = true;

	this.obj = mesh;
	scene.add( this.obj );

	this.update= function(){
		
		this.velocity.y -= 0.3;
		this.velocity.multiplyScalar(0.99)
		if(this.velocity.length() >8.0)
			this.velocity.normalize().multiplyScalar(8.0);

		this.position = this.position.add(this.velocity.clone().multiplyScalar(0.1));
		this.changed = true;
		var ret = {};
		if(this.position.y < 3){
			this.position.y = 3;
			this.velocity.y *= -0.6;
			ret.hit = true;
		}
		if(this.position.x > 22.25){
			this.position.x = 22.25;
			this.velocity.x *= -0.6;
			
		}
		if(this.position.x < -22.25){
			this.position.x = -22.25;
			this.velocity.x *= -0.6;
		}
		if(this.position.z < -22.25){
			this.position.z = -22.25;
			this.velocity.z *= -0.6;
		}
		if(this.position.z > 22.25){
			this.position.z = 22.25;
			this.velocity.z *= -0.6;
		}





		var mesh = this.obj;
		mesh.position.x = this.position.x;
		mesh.position.y = this.position.y;
		mesh.position.z = this.position.z;
		mesh.rotation.setFromQuaternion(this.orientation);

		return ret;
	}
	
	
}
