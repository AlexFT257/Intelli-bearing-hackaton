function lerpColor(color1, color2, t) {
    // Asegurarse de que el factor de interpolación está en el rango [0, 1]
    t = Math.max(0, Math.min(1, t));

    // Convertir colores hexadecimales a sus componentes RGB
    const c1 = hexToRgb(color1);
    const c2 = hexToRgb(color2);

    // Interpolación lineal de cada componente
    const r = Math.round(lerp(c1.r, c2.r, t));
    const g = Math.round(lerp(c1.g, c2.g, t));
    const b = Math.round(lerp(c1.b, c2.b, t));

    // Convertir de vuelta a formato hexadecimal
    return rgbToHex(r, g, b);
}

function lerp(a, b, t) {
    return a + (b - a) * t;
}

function hexToRgb(hex) {
    // Eliminar el carácter '#' si está presente
    hex = hex.replace(/^#/, '');
    if (hex.length === 3) {
        hex = hex.split('').map(char => char + char).join('');
    }
    const bigint = parseInt(hex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return { r, g, b };
}

function rgbToHex(r, g, b) {
    return '#' + [r, g, b].map(x => {
        const hex = x.toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    }).join('');
}

// Ejemplo de uso:
const color1 = "#ff0000";
const color2 = "#0000ff";
const t = 0.5; // Factor de interpolación (0.0 a 1.0)
const interpolatedColor = lerpColor(color1, color2, t);
console.log(interpolatedColor); // Debería imprimir un color púrpura intermedio
