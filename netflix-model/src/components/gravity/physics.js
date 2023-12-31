export function updateUniverse(universe) {
    let nextUniverseState = [];
    for (let b of universe) {
        nextUniverseState.push(nextState(b, universe));
    }
    return nextUniverseState;
}

function nextState(body, universe) {
    let newState = { ...body }
    newState.x += newState.s * Math.cos(newState.a);
    newState.y -= newState.s * Math.sin(newState.a);

    for (let b of universe) {
        if (b.id !== newState.id) {
            applyExternalForce(newState, b);
        }
    }

    console.log(newState);
    return newState;
}

function applyExternalForce(body, extrnalBody) {
    const G = 1;
    let bodyMass = getMass(body.r);
    let distance = getDistanceSquared(body, extrnalBody);
    
    let attractionForce = G * getMass(extrnalBody.r) * bodyMass / distance;
    let deltaT = 1
    let speed = attractionForce * deltaT / bodyMass;
    let alpha = Math.atan((extrnalBody.y - body.y) / (extrnalBody.x - body.x));

    body.x += speed * Math.cos(alpha);;
    body.y -= speed * Math.sin(alpha);
    // body.a  = Math.atan((extrnalBody.y - body.y) / (extrnalBody.x - body.x));

    return body;
}

function getMass(r) {
    const weightPerVolume = 1;
    return 4 / 3 * Math.PI * r * r * r * weightPerVolume;
}

function getDistanceSquared(b1, b2) {
    return (b1.x - b2.x) ** 2 + (b1.y - b2.y) ** 2;
}