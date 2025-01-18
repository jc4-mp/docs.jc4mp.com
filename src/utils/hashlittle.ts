function rot(x: number, k: number): number {
  return (x << k) | (x >>> (32 - k));
}

function mix(a: number, b: number, c: number): [number, number, number] {
  a -= c;
  a ^= rot(c, 4);
  c += b;
  b -= a;
  b ^= rot(a, 6);
  a += c;
  c -= b;
  c ^= rot(b, 8);
  b += a;
  a -= c;
  a ^= rot(c, 16);
  c += b;
  b -= a;
  b ^= rot(a, 19);
  a += c;
  c -= b;
  c ^= rot(b, 4);
  b += a;
  return [a, b, c];
}

function final(a: number, b: number, c: number): [number, number, number] {
  c ^= b;
  c -= rot(b, 14);
  a ^= c;
  a -= rot(c, 11);
  b ^= a;
  b -= rot(a, 25);
  c ^= b;
  c -= rot(b, 16);
  a ^= c;
  a -= rot(c, 4);
  b ^= a;
  b -= rot(a, 14);
  c ^= b;
  c -= rot(b, 24);
  return [a, b, c];
}

export function hashlittle(key: string, initval: number = 0): number {
  let length = key.length;
  let a = 0xdeadbeef + length + initval;
  let b = a;
  let c = a;

  let i = 0;
  while (length > 12) {
    a +=
      key.charCodeAt(i) |
      (key.charCodeAt(i + 1) << 8) |
      (key.charCodeAt(i + 2) << 16) |
      (key.charCodeAt(i + 3) << 24);
    b +=
      key.charCodeAt(i + 4) |
      (key.charCodeAt(i + 5) << 8) |
      (key.charCodeAt(i + 6) << 16) |
      (key.charCodeAt(i + 7) << 24);
    c +=
      key.charCodeAt(i + 8) |
      (key.charCodeAt(i + 9) << 8) |
      (key.charCodeAt(i + 10) << 16) |
      (key.charCodeAt(i + 11) << 24);
    [a, b, c] = mix(a, b, c);
    i += 12;
    length -= 12;
  }

  switch (length) {
    case 12:
      c += key.charCodeAt(i + 11) << 24;
    case 11:
      c += key.charCodeAt(i + 10) << 16;
    case 10:
      c += key.charCodeAt(i + 9) << 8;
    case 9:
      c += key.charCodeAt(i + 8);
    case 8:
      b += key.charCodeAt(i + 7) << 24;
    case 7:
      b += key.charCodeAt(i + 6) << 16;
    case 6:
      b += key.charCodeAt(i + 5) << 8;
    case 5:
      b += key.charCodeAt(i + 4);
    case 4:
      a += key.charCodeAt(i + 3) << 24;
    case 3:
      a += key.charCodeAt(i + 2) << 16;
    case 2:
      a += key.charCodeAt(i + 1) << 8;
    case 1:
      a += key.charCodeAt(i);
      [a, b, c] = final(a, b, c);
  }

  return c >>> 0; // Convert to unsigned 32-bit integer
}
