const G = 2;
const R2D = 180 / Math.PI;
const D2R = Math.PI / 180;

export function getVectorDirectinLine(body) {
    let line = {
        x1: body.x,
        y1: body.y,
        x2: body.x + 8 * Math.cos(body.v.a),
        y2: body.y + 8 * Math.sin(body.v.a),
    }
    return line;
}

export function getForceVelocity(b1, b2) {
    let velocity = null;
    if (b1.id === b2.id) {
        let a = b1.v.a;
        let s = b1.v.s;
        let dx = b1.dx ? b1.dx : Math.abs(s * Math.cos(a * D2R));
        let dy = b1.dy ? b1.dy : Math.abs(s * Math.sin(a * D2R));
        velocity = { s, a, dx, dy };
    } else {
        let b2Force = G * b1.m * b2.m / ((b1.x - b2.x) ** 2 + (b1.y - b2.y) ** 2);
        let s = b2Force / b1.m;
        let dx = Math.abs(s * (b1.x - b2.x));
        let dy = Math.abs(s * (b1.y - b2.y));
        let a = Math.atan(Math.abs(dy / dx));

        if (b2.x < b1.x) {
            dx = -dx;
        }
        if (b2.y < b1.y) {
            dy = -dy;
        }
        a = a * R2D;
        velocity = { s, a, dx, dy };
    }
    return velocity;
}

export function updateBody(pBody, pBodies) {
    let body = JSON.parse(JSON.stringify(pBody));
    let bodies = JSON.parse(JSON.stringify(pBodies));
    if (!Array.isArray(bodies)) {
        bodies = [bodies];
    }

    let externalForces = [];
    for (let b of bodies) {
        externalForces.push(getForceVelocity(body, b));
    }

    let dx = 0;
    let dy = 0;
    for (let ef of externalForces) {
        dx += ef.dx;
        dy += ef.dy;
    }
    let a = Math.atan(Math.abs(dy / dx)) * R2D;
    let s = Math.sqrt(dx * dx + dy * dy)
    let velocity = { a, s, dx, dy };
    body.v = velocity;
    body.x = body.x + dx;
    body.y = body.y + dy;

    return body;
}

export function updateBodies(pBodies) {
    let bodies = JSON.parse(JSON.stringify(pBodies));
    let updatedBodies = [];
    for (let body of bodies) {
        updatedBodies.push(updateBody(body, bodies));
    }
    return updatedBodies;
}