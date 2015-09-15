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
      live: {
        type: "string"
      },
      format: {
        type: "string",
        default: "D/MM/YYYY"
      }
    },
    attachedCallback: function () {
      var self = this;
      this.setValue();
      if(this.$.live !== undefined){
        self.updateTime();
      }
    },
    updateTime : function(){
      var self= this;
      self.setValue();
      switch(self.currentDiff.unit){
        case "m":
          self.nextInterval = 30000;
          break;
        case "s":
          self.nextInterval = 1000;
          break;
        default:
          self.nextInterval = 2700000; //45 minutes
          break;
      }
      window.clearTimeout(self.timer);
      self.timer = window.setTimeout(function(){
        self.updateTime();
      },self.nextInterval);
    },
    detachedCallback: function(){
      window.clearTimeout(this.timer);
    },
    setValue: function () {    //for now assuming only two cases of time input: ISO and UTC
      var self = this;
      if(isNaN(this.$.value)){ //case for UTC time format
        this.dateTime = new Date(this.$.value);
      }
      else if(this.$.value === ""){
        this.dateTime = null;
      }
      else{                    //case for ISO date format
        this.dateTime = new Date(parseInt(this.$.value));
      }

      if(this.$.type !== "") {
        //custom types: they'll override format
        switch (this.$.type) {
          //chat-timestamp
          case "chat-timestamp":
            if (moment().startOf('day').diff(parseInt(this.$.value), 'hours') < 0) {
              this.$.innerHTML = moment(this.dateTime).format("h:mma");
            }
            else {
              this.$.innerHTML = moment(this.dateTime).format("dddd, DD/MM/YYYY, hh:mma");
            }
            break;
          //until
          case "until":
            var timeDiff = moment.duration(moment(this.dateTime).diff(moment()));
            self.timeDiffObj = {
              y: timeDiff.years(),
              M: timeDiff.months(),
              d: timeDiff.days(),
              h: timeDiff.hours(),
              m: timeDiff.minutes(),
              s: timeDiff.seconds()
            };
            self.currentDiff = {};
            for(var unit in self.timeDiffObj){
              self.currentDiff.time = self.timeDiffObj[unit];
              self.currentDiff.unit = unit;
//              console.log(self.currentDiff);
              if(self.timeDiffObj[unit] !== 0){
                if(self.timeDiffObj[unit] < 0){ // when time is in negativ => overdue
                  this.$.innerHTML = Math.abs(self.timeDiffObj[unit]) + unit;
                  $(this.$).prepend("<i class='icon icon_overdue' style='color: #cd5555;'></i>&nbsp");
                }
                else{                           // normal case
                  this.$.innerHTML = self.timeDiffObj[unit] + unit;
                }
                break;
              }
              else {
                this.$.innerHTML = "overdue";
              }
            }
            break;
        }
      }
      else{
        //format
        if(this.dateTime === null){
          this.$.innerHTML = "NOT SET";
        } else {
          this.$.innerHTML = moment(this.dateTime).format(this.$.format);
        }
      }
    }
  };

});
