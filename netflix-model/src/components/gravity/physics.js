const G = 1;

export function updateUniverse(universe) {
    return universe.map(body => nextState(body, universe));
}

function nextState(body, universe) {
    let newState = { ...body, vx: body.vx || 0, vy: body.vy || 0 };

    // Handling for single objects
    if (newState.s === 0 && newState.a === 0) {
        applyDefaultMotion(newState);
    }

    universe.forEach(otherBody => {
        if (otherBody.id !== body.id && !isPairedWith(body, otherBody)) {
            applyGravitationalForce(newState, otherBody);
        }
    });

    // Prioritize maintaining orbit with paired object
    const pairedObject = findPairedObject(body, universe);
    if (pairedObject) {
        lockIntoOrbit(newState, pairedObject);
    }

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

function isPairedWith(body, otherBody) {
    return Math.abs(body.id - otherBody.id) === 1;
}

function findPairedObject(body, universe) {
    return universe.find(otherBody => isPairedWith(body, otherBody));
}

function applyDefaultMotion(body) {
    // Logic to apply default motion for single objects
    // For example, a slow circular motion
    body.vx += 0.1;
    body.vy += 0.1;
}