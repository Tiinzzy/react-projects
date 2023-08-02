export const findTheObject = (obj, value) => {
    for (let i in obj) {
        if (Object.hasOwnProperty.call(obj, i)) {
            const innerObj = obj[i];
            for (let j in innerObj) {
                if (Object.hasOwnProperty.call(innerObj, j)) {
                    const innerValue = innerObj[j];
                    if (innerValue === value) {
                        return innerObj;
                    }
                }
            }
        }
    }
    return null;
};