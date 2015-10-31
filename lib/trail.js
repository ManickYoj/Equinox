Trail = class Trail {
  constructor(maxLength=50, sparsity=8) {
    this.maxLength = maxLength;
    this.sparsity = sparsity;
    this._sparsityCounter = 0;
    this.points = [];
  }

  update(newPoint) {
    // Return if this point is not added in a multiple of trail.sparsity runs
    this._sparsityCounter = (this._sparsityCounter + 1) % this.sparsity;
    if (this._sparsityCounter !== 0) return;

    // Add a new point and remove the last point if the maxLength has been exceeded
    this.points.push(EJSON.clone(newPoint));
    if (this.points.length === this.maxLength) this.points.shift();
  }
}
