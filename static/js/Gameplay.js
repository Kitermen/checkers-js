class Game {
    constructor() {
        this.playerReady = false
        this.kolorgracza = null
        this.scene = new THREE.Scene();
        
        this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 10000);
        this.camera.position.set(300, 200, 0)
        this.camera.lookAt(this.scene.position)
        
        this.renderer = new THREE.WebGLRenderer()
        this.renderer.setClearColor(0x000111)
        this.renderer.setSize(window.innerWidth, window.innerHeight)
        
        document.getElementById("root").append(this.renderer.domElement)

        this.container = new THREE.Object3D()
        this.scene.add(this.container)
        this.container2 = new THREE.Object3D()
        this.scene.add(this.container2)
        this.borderContainer = new THREE.Object3D()
        this.scene.add(this.borderContainer)
        this.lightContainer = new THREE.Object3D()
        this.scene.add(this.lightContainer)
        
        this.container.position.set(-70, 0, -70)
        this.container2.position.set(-70, 0, -70)
        this.borderContainer.position.set(0, -2, 0)
        this.lightContainer.position.set(0, 158, 0)
        

        window.addEventListener("resize", ()=>{
            this.camera.aspect = window.innerWidth / window.innerHeight
            this.camera.updateProjectionMatrix()
            this.renderer.setSize(window.innerWidth, window.innerHeight)
        })

        this.orbitControl = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.orbitControl.addEventListener("change", ()=>{
            this.renderer.render(this.scene, this.camera)
        })
            

        this.pionki = [
            [0, 2, 0, 2, 0, 2, 0, 2],
            [2, 0, 2, 0, 2, 0, 2, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 1, 0, 1, 0, 1, 0, 1],
            [1, 0, 1, 0, 1, 0, 1, 0]
        ]

        this.szachownica = [
            [0, 1, 0, 1, 0, 1, 0, 1],
            [1, 0, 1, 0, 1, 0, 1, 0],
            [0, 1, 0, 1, 0, 1, 0, 1],
            [1, 0, 1, 0, 1, 0, 1, 0],
            [0, 1, 0, 1, 0, 1, 0, 1],
            [1, 0, 1, 0, 1, 0, 1, 0],
            [0, 1, 0, 1, 0, 1, 0, 1],
            [1, 0, 1, 0, 1, 0, 1, 0]
        ]

        let pozycja = 20
        for (let j = 0; j < this.szachownica.length; j += 1) {
            for (let i = 0; i < this.szachownica.length; i += 1) {
                let cube
                this.szachownica[j][i] == 1 ? cube = new Tile("black", i, j) : cube = new Tile("white", i, j)
                this.container.add(cube)
                cube.position.x = pozycja * j
                cube.position.z = pozycja * i
            }
        }
        this.border = new Border()
        this.borderContainer.add(this.border)

        this.renderer.useLegacyLights = true;
        this.light = new THREE.PointLight(0xffffff, 2);
        this.scene.add(this.light);
        this.light.position.set(0, 44, 0);

        this.render()
    }

    render = () => {
        requestAnimationFrame(this.render)
        this.renderer.render(this.scene, this.camera)
        TWEEN.update()
    }
    
    renderpionki() {
        this.container2.clear()
        let pozycja = 20

        for (let i = 0; i < this.pionki.length; i += 1) {
            for (let j = 0; j < this.pionki.length; j += 1) {
                let pawn
                if (this.pionki[i][j] != 0) {
                    this.pionki[i][j] == 1 ? pawn = new Pawn("black", i, j) : pawn = new Pawn("white", i, j)
                    this.container2.add(pawn)
                    pawn.position.x = pozycja * j
                    pawn.position.z = pozycja * i
                }
            }
        }
    }
    cameraset(pozycja) {
        this.camera.position.set(pozycja.x, pozycja.y, pozycja.z)
        this.camera.lookAt(this.scene.position)
    }

    klik() {
        const raycaster = new THREE.Raycaster() // obiekt Raycastera symulujący "rzucanie" promieni
        const mouseVector = new THREE.Vector2() // ten wektor czyli pozycja w przestrzeni 2D na ekranie(x,y) wykorzystany będzie do określenie pozycji myszy na ekranie, a potem przeliczenia na pozycje 3D
        window.addEventListener("mousedown", (e) => {
            mouseVector.x = (e.clientX / window.innerWidth) * 2 - 1
            mouseVector.y = -(e.clientY / window.innerHeight) * 2 + 1
            raycaster.setFromCamera(mouseVector, this.camera);
            const intersects = raycaster.intersectObjects(this.scene.children)
            if (intersects.length > 0) {

                if (this.playerReady) {
                    if (this.kolorgracza == "white") {
                        if (intersects[0].object.pawnOrTile == "pawn") {
                            if (intersects[0].object.color == "white") {
                                this.container2.children.forEach(pawn => {
                                    if (pawn.material.color.getHex() == 0x00ff00) {
                                        pawn.material.color.setHex(0xeeeeee)
                                    }
                                });
                                intersects[0].object.material.color.setHex(0x00ff00)
                                this.ruchpionkow()

                            }
                        }
                    }
                    if (this.kolorgracza == "black") {
                        if (intersects[0].object.pawnOrTile == "pawn") {
                            if (intersects[0].object.color == "black") {
                                this.container2.children.forEach(pawn => {
                                    if (pawn.material.color.getHex() == 0x00ff00) {
                                        pawn.material.color.setHex(0xeeeeee)
                                    }
                                });
                                intersects[0].object.material.color.setHex(0x00ff00)
                                this.ruchpionkow()
                            }
                        }
                    }
                    this.container2.children.forEach(pawn => {
                        if (pawn.material.color.getHex() == 0x00ff00) {
                            if (intersects[0].object.pawnOrTile == "tile") {
                                if (intersects[0].object.material.color.getHex() == 0xffff00) {
                                    new TWEEN.Tween(pawn.position) // co
                                        .to({ x: intersects[0].object.position.x, z: intersects[0].object.position.z }, 500) // do jakiej pozycji, w jakim czasie
                                        .repeat(0) // liczba powtórzeń
                                        .easing(TWEEN.Easing.Sinusoidal.Out) // typ easingu (zmiana w czasie)
                                        .onComplete(() => {
                                            if (this.kolorgracza == "white") {
                                                pawn.material.color.setHex(0xeeeeee)
                                            }
                                            else {
                                                pawn.material.color.setHex(0x111111)
                                            }
                                            net.emitting("exchange", [
                                                {
                                                    rodzaj: "przesuniecie",
                                                    pozpoczr: pawn.idr,
                                                    pozkonr: intersects[0].object.idr,
                                                    pozpoczc: pawn.idc,
                                                    pozkonc: intersects[0].object.idc

                                                }
                                            ])
                                            this.pionki[intersects[0].object.idr][intersects[0].object.idc] = this.pionki[pawn.idr][pawn.idc]
                                            this.pionki[pawn.idr][pawn.idc] = 0
                                            pawn.idr = intersects[0].object.idr
                                            pawn.idc = intersects[0].object.idc
                                            console.log(this.pionki);
                                            this.playerReady = !this.playerReady
                                            this.resetTilesColor()
                                            ui.clockModal()
                                        })
                                        .start()


                                } else if (intersects[0].object.material.color.getHex() == 0xffa500) {
                                    new TWEEN.Tween(pawn.position) // co
                                        .to({ x: intersects[0].object.position.x, z: intersects[0].object.position.z }, 500) // do jakiej pozycji, w jakim czasie
                                        .repeat(0) // liczba powtórzeń
                                        .easing(TWEEN.Easing.Sinusoidal.Out) // typ easingu (zmiana w czasie)
                                        .onComplete(() => {
                                            if (this.kolorgracza == "white") {
                                                pawn.material.color.setHex(0xeeeeee)
                                            }
                                            else {
                                                pawn.material.color.setHex(0x111111)
                                            }
                                            const pozbitr = (pawn.idr + intersects[0].object.idr) / 2
                                            const pozbitc = (pawn.idc + intersects[0].object.idc) / 2
                                            net.emitting("exchange", [
                                                {
                                                    rodzaj: "zbicie",
                                                    pozpoczr: pawn.idr,
                                                    pozkonr: intersects[0].object.idr,
                                                    pozpoczc: pawn.idc,
                                                    pozkonc: intersects[0].object.idc,
                                                    pozbitr: pozbitr,
                                                    pozbitc: pozbitc
                                                }
                                            ])
                                            this.pionki[intersects[0].object.idr][intersects[0].object.idc] = this.pionki[pawn.idr][pawn.idc]
                                            this.pionki[pawn.idr][pawn.idc] = 0
                                            pawn.idr = intersects[0].object.idr
                                            pawn.idc = intersects[0].object.idc
                                            this.pionki[pozbitr][pozbitc] = 0
                                            console.log(pozbitr);
                                            console.log(pozbitc);
                                            for (let j = 0; j < this.container2.children.length; j++) {
                                                if (this.container2.children[j].idr == pozbitr && this.container2.children[j].idc == pozbitc) {
                                                    this.container2.children[j].removeFromParent()
                                                }
                                            }
                                            console.log(this.pionki);
                                            this.playerReady = !this.playerReady
                                            this.resetTilesColor()
                                            ui.clockModal()
                                        })
                                        .start()
                                }
                            }
                        }
                    })
                }
            }
        });

    }
    zmiany(zmiany) {
        clearInterval(ui.counting)
        ui.waitMoveCont.remove()
        for (let i = 0; i < zmiany.length; i++) {
            switch (zmiany[i].rodzaj) {
                case "przesuniecie": {
                    for (let j = 0; j < this.container2.children.length; j++) {
                        if (this.container2.children[j].idr == zmiany[i].pozpoczr && this.container2.children[j].idc == zmiany[i].pozpoczc) {
                            for (let k = 0; k < this.container.children.length; k++) {
                                if (this.container.children[k].idr == zmiany[i].pozkonr && this.container.children[k].idc == zmiany[i].pozkonc) {

                                    new TWEEN.Tween(this.container2.children[j].position) // co
                                        .to({ x: this.container.children[k].position.x, z: this.container.children[k].position.z }, 500) // do jakiej pozycji, w jakim czasie
                                        .repeat(0) // liczba powtórzeń
                                        .easing(TWEEN.Easing.Sinusoidal.Out) // typ easingu (zmiana w czasie)
                                        .onComplete(() => {
                                            this.pionki[this.container.children[k].idr][this.container.children[k].idc] = this.pionki[this.container2.children[j].idr][this.container2.children[j].idc]
                                            this.pionki[this.container2.children[j].idr][this.container2.children[j].idc] = 0
                                            this.container2.children[j].idr = this.container.children[k].idr
                                            this.container2.children[j].idc = this.container.children[k].idc
                                            this.playerReady = !this.playerReady
                                            console.log(this.pionki);
                                        })// funkcja po zakończeniu animacji
                                        .start()
                                    break
                                }
                            }
                            break
                        }
                    }
                }

                    break
                case "zbicie": {
                    for (let j = 0; j < this.container2.children.length; j++) {
                        if (this.container2.children[j].idr == zmiany[i].pozpoczr && this.container2.children[j].idc == zmiany[i].pozpoczc) {
                            for (let k = 0; k < this.container.children.length; k++) {
                                if (this.container.children[k].idr == zmiany[i].pozkonr && this.container.children[k].idc == zmiany[i].pozkonc) {

                                    new TWEEN.Tween(this.container2.children[j].position) // co
                                        .to({ x: this.container.children[k].position.x, z: this.container.children[k].position.z }, 500) // do jakiej pozycji, w jakim czasie
                                        .repeat(0) // liczba powtórzeń
                                        .easing(TWEEN.Easing.Sinusoidal.Out) // typ easingu (zmiana w czasie)
                                        .onComplete(() => {

                                            this.pionki[this.container.children[k].idr][this.container.children[k].idc] = this.pionki[this.container2.children[j].idr][this.container2.children[j].idc]
                                            this.pionki[this.container2.children[j].idr][this.container2.children[j].idc] = 0
                                            this.pionki[zmiany[i].pozbitr][zmiany[i].pozbitc] = 0
                                            this.container2.children[j].idr = this.container.children[k].idr
                                            this.container2.children[j].idc = this.container.children[k].idc
                                            for (let m = 0; m < this.container2.children.length; m++) {
                                                if (this.container2.children[m].idr == zmiany[i].pozbitr && this.container2.children[m].idc == zmiany[i].pozbitc) {
                                                    this.container2.children[m].removeFromParent()
                                                }
                                            }
                                            this.playerReady = !this.playerReady
                                            console.log(this.pionki);
                                        })// funkcja po zakończeniu animacji
                                        .start()
                                    break
                                }
                            }
                            break
                        }
                    }
                }
            }
        }
        if (zmiany.length == 0) {
            this.playerReady = !this.playerReady
        }
    }
    ruchpionkow() {
        this.resetTilesColor()
        for (let i = 0; i < this.container2.children.length; i++) {
            if (this.container2.children[i].material.color.getHex() == 0x00ff00) {
                this.pawn = this.container2.children[i]
                console.log(this.pawn.idr);
                console.log(this.pawn.idc);
                if (this.pawn.color == "white") {
                    if (this.pawn.idr + 1 < this.pionki.length && this.pawn.idc - 1 >= 0) {
                        if (this.pionki[this.pawn.idr + 1][this.pawn.idc - 1] == 0) {
                            this.container.children.forEach(tile => {
                                if (tile.idr == this.pawn.idr + 1 && tile.idc == this.pawn.idc - 1) {
                                    tile.material.color.setHex(0xffff00)
                                }
                            })
                        } 
                        else if (this.pionki[this.pawn.idr + 1][this.pawn.idc - 1] == 1) {
                            if (this.pawn.idr + 2 < this.pionki.length && this.pawn.idc - 2 < this.pionki.length) {
                                if (this.pionki[this.pawn.idr + 2][this.pawn.idc - 2] == 0) {
                                    this.container.children.forEach(tile => {
                                        if (tile.idr == this.pawn.idr + 2 && tile.idc == this.pawn.idc - 2) {
                                            tile.material.color.setHex(0xffa500)
                                        }
                                    })
                                }
                            }
                        }
                    }
                    if (this.pawn.idr + 1 < this.pionki.length && this.pawn.idc + 1 < this.pionki.length) {
                        if (this.pionki[this.pawn.idr + 1][this.pawn.idc + 1] == 0) {
                            this.container.children.forEach(tile => {
                                if (tile.idr == this.pawn.idr + 1 && tile.idc == this.pawn.idc + 1) {
                                    tile.material.color.setHex(0xffff00)
                                }
                            })
                        } 
                        else if (this.pionki[this.pawn.idr + 1][this.pawn.idc + 1] == 1) {
                            if (this.pawn.idr + 2 < this.pionki.length && this.pawn.idc + 2 >= 0) {
                                if (this.pionki[this.pawn.idr + 2][this.pawn.idc + 2] == 0) {
                                    this.container.children.forEach(tile => {
                                        if (tile.idr == this.pawn.idr + 2 && tile.idc == this.pawn.idc + 2) {
                                            tile.material.color.setHex(0xffa500)
                                        }
                                    })
                                }
                            }
                        }
                    }
                } 
                if (this.pawn.color == "black") {
                    if (this.pawn.idr - 1 >= 0 && this.pawn.idc - 1 >= 0) {
                        if (this.pionki[this.pawn.idr - 1][this.pawn.idc - 1] == 0) {
                            this.container.children.forEach(tile => {
                                if (tile.idr == this.pawn.idr - 1 && tile.idc == this.pawn.idc - 1) {
                                    tile.material.color.setHex(0xffff00)
                                }
                            })
                    }
                    else if (this.pionki[this.pawn.idr - 1][this.pawn.idc - 1] == 2) {
                            if (this.pawn.idr - 2 >= 0 && this.pawn.idc - 2 >= 0) {
                                if (this.pionki[this.pawn.idr - 2][this.pawn.idc - 2] == 0) {
                                    this.container.children.forEach(tile => {
                                        if (tile.idr == this.pawn.idr - 2 && tile.idc == this.pawn.idc - 2) {
                                            tile.material.color.setHex(0xffa500)
                                        }
                                    })
                                }
                            }
                        }
                    }
                    if (this.pawn.idr - 1 >= 0 && this.pawn.idc + 1 < this.pionki.length) {
                        if (this.pionki[this.pawn.idr - 1][this.pawn.idc + 1] == 0) {
                            this.container.children.forEach(tile => {
                                if (tile.idr == this.pawn.idr - 1 && tile.idc == this.pawn.idc + 1) {
                                    tile.material.color.setHex(0xffff00)
                                }
                            })
                        }
                        else if (this.pionki[this.pawn.idr - 1][this.pawn.idc + 1] == 2) {
                            if (this.pawn.idr - 2 >= 0 && this.pawn.idc + 2 < this.pionki.length) {
                                if (this.pionki[this.pawn.idr - 2][this.pawn.idc + 2] == 0) {
                                    this.container.children.forEach(tile => {
                                        if (tile.idr == this.pawn.idr - 2 && tile.idc == this.pawn.idc + 2) {
                                            tile.material.color.setHex(0xffa500)
                                        }
                                    })
                                }
                            }
                        }
                    }
                }
            }

        }
    }
    resetTilesColor() {
        this.container.children.forEach(tile => {
            if (tile.material.color.getHex() == 0xffff00 || tile.material.color.getHex() == 0xffa500) {
                tile.color == "white" ? tile.material.color.setHex(0xcccccc) : tile.material.color.setHex(0x333333)
            }
        })
    }

    resetPawnsColor() {
        this.container2.children.forEach(pawn => {
            if (pawn.material.color.getHex() == 0x00ff00) {
                pawn.color == "white" ? pawn.material.color.setHex(0xcccccc) : pawn.material.color.setHex(0x333333)
            }
        })
    }
}
