const G = 1;
const FORWARD_SPEED = 0.5;
const FORWARD_DIRECTION = Math.PI / 4;

export function updateUniverse(universe) {
    return universe.map(body => nextState(body, universe));
}

function nextState(body, universe) {
    let newState = { ...body, vx: body.vx || 0, vy: body.vy || 0 };

    if (isLargerObjectInPair(body)) {
        applyForwardMotion(newState);
    }

    universe.forEach(otherBody => {
        if (otherBody.id !== body.id && !isPairedWith(body, otherBody)) {
            applyGravitationalForce(newState, otherBody);
        }
    });

    const pairedObject = findPairedObject(body, universe);
    if (pairedObject) {
        lockIntoOrbit(newState, pairedObject);
    }

    newState.x += newState.vx;
    newState.y += newState.vy;

    return newState;
}

function applyForwardMotion(body) {
    body.vx += FORWARD_SPEED * Math.cos(FORWARD_DIRECTION);
    body.vy += FORWARD_SPEED * Math.sin(FORWARD_DIRECTION);
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
        lockIntoOrbit(body, externalBody);
    }
}

function lockIntoOrbit(body, externalBody) {
    let distance = Math.sqrt((externalBody.x - body.x) ** 2 + (externalBody.y - body.y) ** 2);
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

function isWithinOrbitRange(body, externalBody, distance) {
    let orbitThreshold = externalBody.r * 5;
    return distance < orbitThreshold;
}

function isPairedWith(body, otherBody) {
    return Math.abs(body.id - otherBody.id) === 1;
}

function findPairedObject(body, universe) {
    return universe.find(otherBody => isPairedWith(body, otherBody));
}

function isLargerObjectInPair(body) {
    return body.id % 2 === 0;
}