/*________________ Written by Vincent Paul V _______________*/

/*                  HTML DOC Declarations:                  */

const crank = document.getElementById("crank");
const crank_rad = document.getElementById("crank_rad");
const connectingRod = document.getElementById("connecting-rod");
const connecting_rod = document.getElementById("connecting_rod");
const thetha2 = document.getElementById("thetha2_val");
const pin = document.getElementById("pin");
const piston = document.getElementById("piston");
const angularVelocity = 2 * Math.PI;

/*                       Functions:                       */

/* crank_rad Numeric Input: */

function numeric_crank_rad()
{
    var crankLength = parseInt(crank_rad.value);
    crank.setAttribute("x2",crankLength);
    pin.setAttribute("cx",crankLength);
    var min_val = crank_rad.value*2.5;
    var max_val = crank_rad.value*6;
    var connectingRodLength = parseInt(connecting_rod.value);
    connecting_rod.setAttribute("min",min_val);
    connecting_rod.setAttribute("value",min_val);
    connecting_rod.setAttribute("max",max_val);
    connectingRod.setAttribute("x1",crankLength);
    var piston_val = connectingRodLength + crankLength;
    connectingRod.setAttribute("x2",piston_val);
    piston.setAttribute("transform", `translate(${piston_val}, 0)`);
}

/* connecting_rod Numeric Input: */

function numeric_connectingrod_length()
{
    var crankLength = parseInt(crank_rad.value);
    var connectingRodLength = parseInt(connecting_rod.value);
    var min_val_crank = connectingRodLength*(1/6);
    var max_val_crank = connectingRodLength*(2/5);
    crank_rad.setAttribute("min",min_val_crank);
    crank_rad.setAttribute("value",max_val_crank);
    crank_rad.setAttribute("max",max_val_crank);
    connectingRod.setAttribute("x1",crankLength);
    piston_val = connectingRodLength+crankLength;
    connectingRod.setAttribute("x2",connectingRodLength+crankLength);
    piston.setAttribute("transform", `translate(${piston_val}, 0)`)
}

/* Loop Animation: */

function animate(time)
{
    const crankLength = parseInt(crank_rad.value);
    const connectingRodLength = parseInt(connecting_rod.value);
    const timeSeconds = time / 1000;
    const angle = angularVelocity * timeSeconds;

    const xPin = crankLength * Math.cos(angle);
    const yPin = crankLength * Math.sin(angle);

    crank.setAttribute("x2", xPin);
    crank.setAttribute("y2", yPin);

    pin.setAttribute("cx", xPin);
    pin.setAttribute("cy", yPin);

    connectingRod.setAttribute("x1", xPin);
    connectingRod.setAttribute("y1", yPin);

    const piston_val = crankLength * Math.cos(angle) + Math.sqrt(connectingRodLength ** 2 - (crankLength * Math.sin(angle)) ** 2)

    connectingRod.setAttribute("x2", piston_val);
    piston.setAttribute("transform", `translate(${piston_val}, 0)`);

    reqAnim = window.requestAnimationFrame(animate);
}

/* Animation Frame (Based on thetha2_val): */

function animate_frame(time)
{
    const crankLength = parseInt(crank_rad.value);
    const connectingRodLength = parseInt(connecting_rod.value);
    const timeSeconds = time / 1000;
    const angle = angularVelocity - parseInt(document.getElementById("thetha2_val").value)*(angularVelocity/360);
    
    const xPin = crankLength * Math.cos(angle);
    const yPin = crankLength * Math.sin(angle);

    crank.setAttribute("x2", xPin);
    crank.setAttribute("y2", yPin);

    pin.setAttribute("cx", xPin);
    pin.setAttribute("cy", yPin);

    connectingRod.setAttribute("x1", xPin);
    connectingRod.setAttribute("y1", yPin);

    var piston_val = crankLength * Math.cos(angle) + Math.sqrt(connectingRodLength ** 2 - (crankLength * Math.sin(angle)) ** 2)

    connectingRod.setAttribute("x2", piston_val);
    piston.setAttribute("transform", `translate(${piston_val}, 0)`);

    reqAnim_frame = window.requestAnimationFrame(animate_frame);
    document.getElementById("main").innerHTML = Math.round(piston_val * 100) / 100;
}

/* Start Animation: */

function startAnimation()
{
    window.requestAnimationFrame(animate);
    document.getElementById("thetha2_val").disabled = true;
}

/* Stop Animation: */

function stopAnimation()
{
    window.cancelAnimationFrame(reqAnim);
    document.getElementById("thetha2_val").disabled = false;
    animate_frame();
}



