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
        default: ""
      },
      format: {
        type: "string",
        default: "D/MM/YYYY"
      }
    },
    attachedCallback: function () {
      this.setValue();
    },
    setValue: function () {    //for now assuming only two cases of time input: ISO and UTC
      if(isNaN(this.$.value)){ //case for UTC time format
        this.dateTime = new Date(this.$.value);
      }
      else{                    //case for ISO date format
        this.dateTime = new Date(parseInt(this.$.value));
      }
      if(this.$.type !== "") {
        //custom types: they'll override format
        switch (this.$.type) {
          case "chat-timestamp":
            if (moment().diff(parseInt(this.$.value), 'days') === 0) {
              this.$.innerHTML = moment(this.dateTime).format("h:mma");
            }
            else {
              this.$.innerHTML = moment(this.dateTime).format("D/MM/YYYY, h:mma");
            }
            break;
          case "until":
            var timeUntil = moment(this.dateTime).toNow(true).split(" ");
            this.$.innerHTML = moment(this.dateTime).toNow(true) === "Invalid date" ? "-" : timeUntil[0] + timeUntil[1].split("")[0];
            break;
        }
      }
      else{
        //format
        this.$.innerHTML = moment(this.dateTime).format(this.$.format);
      }
    }
  };

});
