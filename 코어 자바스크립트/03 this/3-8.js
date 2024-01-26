var obj = {
  methodA: function () {
    console.log(this);
  },
  inner: {
    InnerMethodB: function () {
      console.log(this);
    },
  },
};
obj.methodA();
