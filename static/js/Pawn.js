class Pawn extends THREE.Mesh {
    //deklaracja dziedziczenia
    constructor(color, idr, idc) {
        super()
        //constructor three.mesh - wywołanie DZIEDZICZENIE
        this.color = color
        this.idr = idr
        this.idc = idc
        this.pawnOrTile = "pawn"

        this.geometry = new THREE.CylinderGeometry(7, 7, 8)
        this.material = new THREE.MeshPhongMaterial({
            side: THREE.DoubleSide,
            wireframe: false,
            shininess: 0.8,
            specular: 0xFFFFFF,
            reflectivity: 1,
            refractionRatio: 1,
            color: (color == "white") ? 0xDDDDDD : 0x111111,
            map: new THREE.TextureLoader().load(`./gfx/${this.color}.png`)
        })

    }
}