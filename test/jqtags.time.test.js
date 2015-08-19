define({
  name : 'jqtags.time.test',
  extend : "spamjs.view"
}).as(function(demo){
	
	module("jqtags.tab");

  return{
    src: [
      "test.html"
    ],
    _init_: function () {
      this.$$.loadView({
        src: this.path("test.html")
      });
    }
  };

	
});