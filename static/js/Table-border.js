class Border extends THREE.Mesh {
    //deklaracja dziedziczenia
    constructor() {
        super()
        //constructor three.mesh - wywołanie DZIEDZICZENIE

        this.geometry = new THREE.BoxGeometry(170, 5, 170);
        this.material = new THREE.MeshPhongMaterial({ 
            map: new THREE.TextureLoader().load("./gfx/border.jpg"),
            side: THREE.DoubleSide, 
            color: 0x964B00,
            transparent: false,
            wireframe: false,
        })
    }
}