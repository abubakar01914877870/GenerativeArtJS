export function txtNeon(context, txt, glowColor, txtX, txtY) {

    glow(context, glowColor, 400);
    text(txt, txtX, txtY);
    text(txt, txtX, txtY);
    glow(context, glowColor, 80);
    text(txt, txtX, txtY);
    text(txt, txtX, txtY);
    glow(context, glowColor, 12);
    text(txt, txtX, txtY);
    text(txt, txtX, txtY);


}

export function glow(context, glowColor, blurriness) {
    context.shadowBlur = blurriness;
    context.shadowColor = glowColor;
}