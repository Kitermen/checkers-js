class Ui {
    constructor() {
        this.header = window.document.createElement("header")
        this.headerCont = document.createElement("div")
        this.header.appendChild(this.headerCont)
        document.body.appendChild(this.header)
    }
    logowanie(clbk) {
        this.dialog = document.createElement("dialog")
        this.dialog.classList.add("dialog-login")
        document.body.appendChild(this.dialog)

        this.dialogCont = document.createElement("div")
        this.dialogCont.classList.add("dialog-cont")
        this.dialog.appendChild(this.dialogCont)

        this.input = window.document.createElement("input")
        this.input.placeholder = "Login"
        this.dialogCont.appendChild(this.input)
        
        this.buttonsCont = document.createElement("div")
        this.buttonsCont.classList.add("buttons-cont")
        this.dialogCont.appendChild(this.buttonsCont)

        this.loginButton = window.document.createElement("button")
        this.loginButton.innerText = "Graj"
        this.buttonsCont.appendChild(this.loginButton)

        this.resetButton = window.document.createElement("button")
        this.resetButton.innerText = "Reset graczy"
        this.buttonsCont.appendChild(this.resetButton)
        
        this.dialog.showModal()
        
        this.resetButton.addEventListener("click", () => {
            this.input.value = ""
            net.reset()
        })
        this.loginButton.addEventListener("click", () => {
            if (this.input.value != "") {
                this.header.style.display = "block"
                clbk(this.input.value, this.dialog)
            }
        })

    }
    bledy(kodbledu) {
        switch (kodbledu) {
            case 0:
                alert("taki sam login")
                break
            case 1:
                alert("za dużo uzytkownikow")
                break
        }

    }
    sukces(kodsukcesu, login) {
        switch (kodsukcesu) {
            case 1:
                this.headerCont.innerHTML += `<span style="color: white">Nick: ${login}</span><span style="color: white">Kolor pionków: biały</span>`
                break
            case 2:
                this.headerCont.innerHTML += `<span style="color: black">Nick: ${login}</span><span style="color: black">Kolor pionków: czarny</span>`
                break
        }

    }
    czekam() {
        this.waitPlayerCont = document.createElement("div")
        this.waitPlayerCont.classList.add("wait-player-cont")
        document.body.appendChild(this.waitPlayerCont)

        this.waitPlayer = document.createElement("div")
        this.waitPlayer.innerHTML = "Poczekaj aż drugi gracz się zaloguje"
        this.waitPlayerCont.appendChild(this.waitPlayer)

        this.ajaxLoader = document.createElement("img")
        this.ajaxLoader.classList.add("ajax-progress")
        this.waitPlayerCont.appendChild(this.ajaxLoader)        
    }

    zegarynka() {
        this.waitMoveCont = document.createElement("div")
        this.waitMoveCont.classList.add("wait-move-cont")
        document.body.appendChild(this.waitMoveCont)

        this.waitMove = document.createElement("div")
        this.waitMove.innerHTML = "Poczekaj na ruch drugiego gracza"
        this.waitMoveCont.classList.add("wait-move")
        this.waitMoveCont.appendChild(this.waitMove)

        this.counter = 6
        this.timer = document.createElement("div")
        this.timer.classList.add("timer")
        this.timer.innerHTML = this.counter
        this.waitMoveCont.appendChild(this.timer)

        this.counting = setInterval(() => {
            this.counter -= 1
            if (this.counter == 0) {
                clearInterval(this.zeg)
                this.waitMoveCont.remove()
                net.emitowanie("reqexchange")
                return
            }
            this.timer.innerHTML = this.counter
        }, 1000)

    }
}

