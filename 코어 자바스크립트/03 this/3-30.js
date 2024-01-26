var report = {
  sum: 0,
  count: 0,
  add: function () {
    var args = Array.prototype.slice.call(arguments);
    args.forEach(function (enrty) {
      // 배열 순회하며 콜백함수 실행
      this.sum += enrty;
      ++this.count;
      console.log("this", this);
    }, this); // 콜백함수 내부에서의 this는 add 메서드에서의 this를 가리킴
  },
  average: function () {
    return this.sum / this.count;
  },
};
report.add(60, 85, 95);
console.log(report.sum, report.count, report.average()); // 240 3 80
