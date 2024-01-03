const G = 1;

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
    let orbitThreshold = externalBody.r * 5;
    return distance < orbitThreshold;
}

function lockIntoOrbit(body, externalBody, distance) {
    let orbitalVelocity = Math.sqrt(G * getMass(externalBody.r) / distance);
    let directionToExternalBody = Math.atan2(externalBody.y - body.y, externalBody.x - body.x);
    let orbitalDirection = directionToExternalBody + Math.PI / 2;

    body.vx = orbitalVelocity * Math.cos(orbitalDirection);
    body.vy = orbitalVelocity * Math.sin(orbitalDirection);
}

function getMass(r) {
    const weightPerVolume = 1;
    return 4 / 3 * Math.PI * r * r * r * weightPerVolume;
}