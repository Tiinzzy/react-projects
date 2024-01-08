const G = 1000;

export function universeTick(bodies) {
    let updatedBodies = [];
    for (let b of bodies) {
        updatedBodies.push(calculateNextPosition(b, bodies));
    }
    return updatedBodies;
}

function calculateNextPosition(body, bodies) {
    let updatedBody = { ...body };

    for (let b of bodies) {
        if (b.id !== body.id) {
            let { dx, dy } = getBodiesDeltaPosition(body, b);
            updatedBody.dx += dx;
            updatedBody.dy += dy;
        }
    }

    updatedBody.x += updatedBody.dx;
    updatedBody.y += updatedBody.dy;

    // console.log(updatedBody);
    return updatedBody;
}


function getBodiesDeltaPosition(b1, b2) {
    let force = G * b1.m * b2.m / ((b1.x - b2.x) * (b1.x - b2.x) + (b1.y - b2.y) * (b1.y - b2.y));
    let displacement = force / b1.m;

    let alpha = Math.atan(Math.abs((b1.y - b2.y) / (b1.x - b2.x)));
    let dx = Math.abs(displacement * Math.cos(alpha)) * (b2.x < b1.x ? -1 : 1);
    let dy = Math.abs(displacement * Math.sin(alpha)) * (b2.y < b1.y ? -1 : 1);

    return { dx, dy }
}