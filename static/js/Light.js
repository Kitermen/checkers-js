class Light extends THREE.Mesh {
    //deklaracja dziedziczenia
    constructor() {
        super()
        //constructor three.mesh - wywołanie DZIEDZICZENIE

        this.geometry = new THREE.SphereGeometry(15, 64, 32)
        this.material = new THREE.MeshBasicMaterial({
            color: 0xFFFFFF,
            side: THREE.DoubleSide,
            wireframe: true,
            transparent: true,
            opacity: 1
        })
    }
}