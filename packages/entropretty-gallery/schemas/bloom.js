const t = "#000";
function e(t, e) {
  return (t[Math.floor(e / 8) % 4] >> e % 8) & 1;
}
function o(t, o = 0, r = 32) {
  let l = 0;
  for (let n = o; n < r; ++n) l = ((l << 1) | e(t, n)) >>> 0;
  return l;
}
function r(e, o, r, l, n, a) {
  e.save();
  let i = o;
  e.fillStyle = a;
  for (let o = 0; o < i; o++)
    e.beginPath(),
      e.moveTo(0, 0),
      e.quadraticCurveTo(-n + l, r, 0, 1),
      e.quadraticCurveTo(n + l, r, 0, 0),
      e.lineTo(0, 1),
      (e.lineWidth = 0.02),
      (e.strokeStyle = t),
      e.fill(),
      e.rotate((2 * Math.PI) / i);
  e.restore();
}
const l = {
  draw: function (t, e) {
    let l = (function (t, e) {
      let r = [],
        l = 0;
      for (let n = 0; n < e; ++n) {
        let a = Math.round((32 * (n + 1)) / e);
        r.push(o(t, l, a)), (l = a);
      }
      return r;
    })(e, 16);
    t.translate(50, 50), t.scale(50, 50);
    for (let e = 0; e < 4; e++)
      t.scale(0.7, -0.7),
        r(
          t,
          l[4 * e] + 6,
          (l[4 * e + 1] + 1) / 5,
          (l[4 * e + 2] - 1) / 8,
          (l[4 * e + 3] + 1) / 9,
          `rgba(${64 * e}, ${64 * e}, ${64 * e}, 1.0)`
        );
  },
  name: "Bloom",
  artist: "gavofyork.dot",
};
export { l as schema };
