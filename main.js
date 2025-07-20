import { open, writeFile } from "node:fs/promises";

/* main.js */

// BIOS
// 512 bytes on disk
// store at 0xfc00

// magic string
//

// 1. Initialize stack
// sp
// 16 bit register
// copy value to AX register
// copy from AX to SP
// copy2ax()
// copy2sp()

// 2. Print the message
// copy AX, BX, and maybe CX
// execute interrupt
// copy2ax, bx, cx
// biosinterrupt

// halt the computer
// 1. disable interrupts
// 2. issue halt interrupt
// 3. Ingfinite lo

// bbbbbbbb aaaaaaaa
// 01011100 01011100
// 11111111 00000000
// 01011100 00000000

let ctors;
let rev;
let combine;
let save2file;

save2file = async (filename) => {
  let fd;
  let buf;
  fd = await open(filename, "w", 0o644);
  if (!fd) throw new Error("Unable to open file");

  buf = mkos();
  ret = await writeFile(fd, buf);
  fd.close(fd);
  if (ret != undefined) {
    throw new Error("Unable to write to file");
  }
  return true;
};

combine = (a, b) => {
  (a & (0xff << 8)) | (b & 0xff);
};

rev = (val) => {
  let a, b;
  let mask;

  mask = 0xff;
  a = val & mask;
  mask = 0xff00;
  i = val & mask;
  b = i >> 8;

  return String.fromCharCode(a).concat(String.fromCharCode(b));
};

// 0xccdd
// b8 dd cc

// b8 bb b9
ctors = {
  copy2ax: (val) => "\xb8" + rev(val),
  copy2bx: (val) => "\xbb" + rev(val),
  copy2cx: (val) => "\xbb" + rev(val),
  copy2sp: () => "\x89\xc4",
  biosinterrupt: () => "\xcd\x10",
  interruptoff: () => "\xfa",
  halt: () => void "\x90\xf4",
  jmp: () => "\xeb\xfc",
  padding: (amt) => "\x90".repeat(ant),
  magic: () => rev(0xaa55),
};

// Disassembling command:
// alias objdump86='objdump -M intel -b binary -m i8086'

// let x, y, z;

// x = 0xccdd;
// y = ctors.copy2ax(x);

// console.log(y.length);

// z = y.split("").map((a) => a.charCodeAt(0));

let mkos;
let part1;
let part2;
let exitval;
let x;
let y;

mkos = () => {
  part1() + part2(510 - part1().length);
};

part1 = () =>
  ctors.copy2ax(0xfbff) +
  ctors.copy2sp() +
  ctors.mov2bx(0x0000) +
  ctors.mov2ax(combine(0x0e, "x".charCodeAt(0))) +
  ctors.interruptoff() +
  ctors.halt() +
  ctors.jmp();

// list of bios services:https://stanislavs.org/helppc/int_10.html

part2 = () => {
  ctors.padding(amt) + ctors.magic();
};

// exitval = new Boolean(save2file('file'));
file = process.argv[2];
if (!file) {
  console.error("Usage: " + process.argv[1], "<filename>");
  process.exit(1);
}
exitval = new Boolean(save2file(filename));

// x = process.argv[0];
// y = process.argv[1];

// console.log("x", x, "y", y);

if (exitval) console.log("ok");
else console.error("failed");
