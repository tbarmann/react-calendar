var helpers = {
	// Returns true if year is a leap year; otherwise false
  isLeapYear : function(utc) {
      var y = utc ? utc.getUTCFullYear() : utc.getFullYear();
      return !(y % 4) && (y % 100) || !(y % 400) ? true : false;
  },

  //----------------------------------------------------------------------
  // Return the name of the month
  getNameOfMonth : function(m) {
      var nameOfMonths = ['January','February','March','April','May','June','July','August','September','October','November','December'];
      return nameOfMonths[m];
  },

  //----------------------------------------------------------------------
  // Return the number of days in the month
	getDaysInMonth : function(utc) {
		var m = utc ? utc.getUTCMonth() : utc.getMonth();
		// If feb.
		if (m == 1) {
			return isLeapYear(utc) ? 29 : 28;
		}
		// If Apr, Jun, Sep or Nov return 30; otherwise 31
		return (m == 3 || m == 5 || m == 8 || m == 10) ? 30 : 31;
	},
	getCalendarMonthArray : function(month,year) {
		var weeks = [];
  		var d = new Date(year,month,1);
  		var begin_cell=d.getDay();
  		var end_day = helpers.getDaysInMonth(d);
  		var curr_day=1;
  		var cell_ptr=0;

  		while (curr_day<=end_day) {
  			days = [];
  			for (var j=0;j<7;j++) {
  				if ((cell_ptr<begin_cell)||(curr_day>end_day)) {
  					days.push(null);
  				}
  				else {
  					days.push(curr_day);
  					curr_day++;
  				}
  				cell_ptr++;
  			}
  			weeks.push(days);
  		}
  		return (weeks);
	}

};