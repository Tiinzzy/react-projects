const FORCE_SCALE = 200 / 1300;
const g = 9.81;

export function getRedBallDirection(redCoord, blackCoord, miu, mass, initForce) {
    let dx = 0;
    let dy = 0;

    if (blackCoord === null || redCoord === null) {
        return { dx, dy };
    }

    dx = blackCoord.x - redCoord.x;
    dy = blackCoord.y - redCoord.y;

    let velocity = initForce / mass;
    let alpha = Math.atan(Math.abs(dy / dx));

    dx = Math.abs(Math.cos(alpha) * velocity) * (blackCoord.x > redCoord.x ? -1 : 1);
    dy = Math.abs(Math.sin(alpha) * velocity) * (blackCoord.y > redCoord.y ? -1 : 1);

    console.log({ initForce, velocity, dx, dy, alpha: alpha / 3.14 * 180 });

    return { dx, dy };
}

export function getForce(redCoord, blackCoord) {
    if (blackCoord !== null && redCoord !== null) {
        let dx = blackCoord.x - redCoord.x;
        let dy = blackCoord.y - redCoord.y;
        let force = Math.sqrt(dx * dx + dy * dy);
        force *= FORCE_SCALE
        return Math.round(force);
    } else {
        return 0;
    }
}


export function getNewVelocity(oldVelocity, miu) {
    return oldVelocity - miu * g;
}

export function getVelocityVector(currentVelocity, currentDX, currentDY) {
    let alpha = Math.atan(Math.abs(currentDY / currentDX));
    let dx = Math.abs(Math.cos(alpha) * currentVelocity) * (currentDX < 0 ? -1 : 1);
    let dy = Math.abs(Math.sin(alpha) * currentVelocity) * (currentDY < 0 ? -1 : 1);
    return { dx, dy }
}