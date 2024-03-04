let game
let ui
let net
window.onload = () => {
    game = new Game();
    net = new Net();
    ui = new Ui();
    window.addEventListener("load", ()=>{
        console.log("LOOOOOL");
        fetch("/Reset", { method: "post"})
    })
    //modals = new Modals();
    ui.logowanie(function (inputvalue, dialogElement) {
        net.login({ login: inputvalue }, function (receivedData) {

            switch (receivedData.type) {
                case "error":
                    ui.bledy(receivedData.kodbledu)
                break;

                case "success": {
                    console.log("LLLL");
                    net.zalogowany = true
                    dialogElement.close()
                    ui.sukces(receivedData.playersNum, receivedData.login)
                    game.renderpionki()
                    ui.logModal()
                    if (receivedData.playersNum == 1) {
                        game.playerReady = true
                        game.kolorgracza = "white"
                        game.cameraset({x: 0, y: 100, z: -250})
                    }
                    else {
                        game.kolorgracza = "black"
                        game.playerReady = false;
                        game.cameraset({x: 0, y: 100, z: 250})
                        net.emitting("response")
                        ui.clockModal()
                    }
                }
                break;
            }
        })
    }
    )

}