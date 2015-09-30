Number.prototype.padZeros = function (places=4) {
  let output = String(this);
  while (output.length < places) output = "0" + output;
  return output;
}
