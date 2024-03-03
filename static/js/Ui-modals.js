class Modals{
    constructor(){}
    czekam() {
        this.czekajdiv = document.createElement("div")
        this.czekajdiv.classList.add("czekajdiv")
        this.czekajdiv.innerHTML = "Czekaj na ruch przeciwnika"
        document.body.appendChild(this.czekajdiv)
    }

    zegarynka() {
        this.timer = document.createElement("div")
        this.czekajdiv2 = document.createElement("div")
        this.czekajdiv2.classList.add("czekajdiv")
        this.czekajdiv2.innerHTML = "Czekaj na ruch przeciwnika"
        this.czekajdiv2.appendChild(this.timer)
        document.body.appendChild(this.czekajdiv2)
        this.licznik = 6
        this.timer.innerHTML = this.licznik

        this.zeg = setInterval(() => {
            this.licznik -= 1
            if (this.licznik == 0) {
                clearInterval(this.zeg)
                this.czekajdiv2.remove()
                net.emitowanie("reqexchange")
                return
            }
            this.timer.innerHTML = this.licznik
        }, 1000)

    }
}    