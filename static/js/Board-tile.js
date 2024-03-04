class Tile extends THREE.Mesh {
    //deklaracja dziedziczenia
    constructor(color, idr, idc) {
        super()
        //constructor three.mesh - wywołanie DZIEDZICZENIE
        this.color = color
        this.idr = idr
        this.idc = idc
        this.pawnOrTile = "tile"

        this.geometry = new THREE.BoxGeometry(20, 2, 20)
        this.material = new THREE.MeshPhongMaterial({
            side: THREE.DoubleSide,
            wireframe: false,
            opacity: 1,
            color: (color == "white") ? 0xcccccc : 0x333333,
            map: new THREE.TextureLoader().load(`./gfx/${this.color}.png`)
        })
    }
}
