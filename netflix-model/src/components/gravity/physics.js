// export function updateUniverse(universe) {
//     let nextUniverseState = [];
//     for (let b of universe) {
//         nextUniverseState.push(nextState(b, universe));
//     }
//     return nextUniverseState;
// }

// function nextState(body, universe) {
//     let newState = { ...body }
//     newState.x += newState.s * Math.cos(newState.a);
//     newState.y -= newState.s * Math.sin(newState.a);

//     for (let b of universe) {
//         if (b.id !== newState.id) {
//             applyExternalForce(newState, b);
//         }
//     }

//     console.log(newState);
//     return newState;
// }

// function applyExternalForce(body, extrnalBody) {
//     const G = 6.67430e-11;
//     let bodyMass = getMass(body.r);
//     let distance = getDistanceSquared(body, extrnalBody);

//     let attractionForce = G * getMass(extrnalBody.r) * bodyMass / distance;
//     let deltaT = 1
//     let speed = attractionForce * deltaT / bodyMass;
//     let dx = extrnalBody.x - body.x;
//     let dy = extrnalBody.y - body.y;
//     let alpha = Math.atan(dy, dx);

//     body.x += speed * Math.cos(alpha);;
//     body.y -= speed * Math.sin(alpha);
//     // body.a  = Math.atan((extrnalBody.y - body.y) / (extrnalBody.x - body.x));

//     return body;
// }

// function getMass(r) {
//     const weightPerVolume = 1;
//     return 4 / 3 * Math.PI * r * r * r * weightPerVolume;
// }

// function getDistanceSquared(b1, b2) {
//     return (b1.x - b2.x) ** 2 + (b1.y - b2.y) ** 2;
// }

const G = 1; // Adjust as needed for your scale

export function updateUniverse(universe) {
    console.log(1)
    return universe.map(body => nextState(body, universe));
}

function nextState(body, universe) {
    let newState = { ...body, vx: body.vx || 0, vy: body.vy || 0 };

    universe.forEach(otherBody => {
        if (otherBody.id !== body.id) {
            applyGravitationalForce(newState, otherBody);
        }
    });

    newState.x += newState.vx;
    newState.y += newState.vy;

    return newState;
}

function applyGravitationalForce(body, externalBody) {
    let dx = externalBody.x - body.x;
    let dy = externalBody.y - body.y;
    let distanceSquared = dx * dx + dy * dy;
    let distance = Math.sqrt(distanceSquared);
    let forceDirection = Math.atan2(dy, dx);

    let forceMagnitude = G * getMass(externalBody.r) * getMass(body.r) / distanceSquared;
    let acceleration = forceMagnitude / getMass(body.r);

    body.vx += Math.cos(forceDirection) * acceleration;
    body.vy += Math.sin(forceDirection) * acceleration;

    if (isWithinOrbitRange(body, externalBody, distance)) {
        lockIntoOrbit(body, externalBody, distance);
    }
}

function isWithinOrbitRange(body, externalBody, distance) {
    // Simple example: lock into orbit if within a certain range
    let orbitThreshold = externalBody.r * 5; // Example threshold, adjust as needed
    return distance < orbitThreshold;
}

function lockIntoOrbit(body, externalBody, distance) {
    let orbitalVelocity = Math.sqrt(G * getMass(externalBody.r) / distance);
    let directionToExternalBody = Math.atan2(externalBody.y - body.y, externalBody.x - body.x);
    let orbitalDirection = directionToExternalBody + Math.PI / 2; // Perpendicular to the direction

    body.vx = orbitalVelocity * Math.cos(orbitalDirection);
    body.vy = orbitalVelocity * Math.sin(orbitalDirection);
}

function getMass(r) {
    const weightPerVolume = 1; // Adjust as needed
    return 4 / 3 * Math.PI * r * r * r * weightPerVolume;
}