const FORCE_SCALE = 100 / 1300;

export function getRedBallDirection(redCoord, blackCoord) {
    let dx = blackCoord.x - redCoord.x;
    let dy = blackCoord.y - redCoord.y;
    dx *= FORCE_SCALE;
    dy *= FORCE_SCALE;
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