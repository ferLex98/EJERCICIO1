let randomTest = ""

function randomTel(){
    var pattern = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_'
    for (var i = 0; i < 5; i++) 
        randomTest+=pattern.charAt(Math.floor(Math.random()*pattern.length))
    return randomTest
}


export function getRandomValues(){
    return randomTel()
}

