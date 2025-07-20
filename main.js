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
let message;

message = "Hello from JS!";

save2file = async (msg, filename) => {
  let fd;
  let buf;
  fd = await open(filename, "w", 0o644);
  if (!fd) throw new Error("Unable to open file");

  buf = mkos(msg);
  ret = await writeFile(fd, buf, { encoding: "ascii" });
  fd.close(fd);
  if (ret != undefined) {
    throw new Error("Unable to write to file");
  }
  return true;
};

combine = (a, b) => ((a & 0xff) << 8) | (b & 0xff);

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
  copy2cx: (val) => "\xb9" + rev(val),
  copy2sp: () => "\x89\xc4",
  biosinterrupt: () => "\xcd\x10",
  interruptoff: () => "\xfa",
  halt: () => "\xf4",
  jmp: () => "\xeb\xfe",
  padding: (amt) => "\x90".repeat(amt),
  magic: () => rev(0xaa55),
  print: (str) => {
    str
      .concat("\r\n")
      .split("")
      .map(
        (x) =>
          ctors.copy2ax(combine(0x0e, x.charCodeAt(0))) + ctors.biosinterrupt
      )
      .concat(ctors.biosinterrupt())
      .join("");
  },
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

mkos = (msg) => {
  const p1 = part1(msg);
  const p2 = part2(510 - p1.length);
  return p1 + p2;
};

part1 = (msg) =>
  ctors.copy2ax(0x7c00) +
  ctors.copy2sp() +
  ctors.copy2bx(0x0007) +
  ctors.print(msg) +
  ctors.halt();

// list of bios services:https://stanislavs.org/helppc/int_10.html

part2 = (amt) => ctors.padding(amt) + ctors.magic();

// exitval = new Boolean(save2file('file'));
// file = process.argv[2];
// if (!file) {
//   console.error("Usage: " + process.argv[1], "<filename>");
//   process.exit(1);
// }
// exitval = new Boolean(save2file(filename));

// // x = process.argv[0];
// // y = process.argv[1];

// // console.log("x", x, "y", y);

// if (exitval) console.log("ok");
// else console.error("failed");

const main = async () => {
  const file = process.argv[2];
  if (!file) {
    console.error("Usage: node " + process.argv[1] + " <output_filename.bin>");
    process.exit(1);
  }

  console.log(`Building boot sector in "${file}"...`);

  const exitval = await save2file(message, file);

  if (exitval) {
    console.log("✅ OK");
  } else {
    console.error("❌ failed");
  }
};

main();
