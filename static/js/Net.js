class Net {
    constructor() {
        this.client = io();
        console.log(this.client)
        this.zalogowany = false
        this.gotowy = false
        this.client.on("response", () => {
            if (this.zalogowany == true) {
                this.client.off("response")
                ui.waitPlayerCont.remove()
                this.emitting("response")
                game.klik()
                this.gotowy = true
            }
        })
        this.client.on("exchange", (data) => {
            console.log(data)
            if (this.gotowy == true) {
                game.zmiany(data)
            }
        })

        this.client.on("reqexchange", () => {
            if (this.gotowy == true) {
                game.pom = false
                ui.clockModal()
                game.resetTilesColor()
                game.resetPawnsColor()
                net.emitting("exchange", [])
            }
        })
    }

    emitting(zdarzenie, data) {
        console.log(zdarzenie, data);
        this.client.emit(zdarzenie, data)
    }
    
    login(username, clbk) {
        const body = JSON.stringify(username)
        const headers = { "Content-Type": "application/json" }
        fetch("/user-add", { method: "post", body, headers }) 
            .then(response => response.json())
            .then(
                data => {
                    clbk(data);
                })
    }

    reset() {
        fetch("/Reset", { method: "post"})
            
    }
}