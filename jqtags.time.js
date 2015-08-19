_tag_('jqtags.time', function (test) {

  var $ = _module_("jQuery");
  var moment = _module_("moment");
  return {
    tagName: "jq-time",
    events: {

    },
    accessors: {
      value: {
        type: "string",
        default: "",
        onChange: "setValue"
      },
      type: {
        type: "string",
        default: "DD/MM/YYYY"
      }
    },
    attachedCallback: function () {
      this.setValue();
    },
    setValue: function () {
      switch(this.$.type){
        case "DD/MM/YYYY":
          this.$.innerHTML = moment(parseInt(this.$.value)).format("D/MM/YYYY");
          break;
        case "MM/DD/YYYY":
          this.$.innerHTML = moment(parseInt(this.$.value)).format("MM/D/YYYY");
          break;
        case "chat-timestamp":
          if(moment().diff(parseInt(this.$.value), 'days') === 0){
            this.$.innerHTML = moment(parseInt(this.$.value)).format("h:mma");
          }
          else{
            this.$.innerHTML = moment(parseInt(this.$.value)).format("D/MM/YYYY, h:mma");
          }
          break;
        case "until":
          var timeUntil = moment(parseInt(this.$.value)).toNow(true).split(" ");
          this.$.innerHTML = timeUntil[0] + timeUntil[1].split("")[0];
          break;
      }

    }
  };

});
