var helpers = {
	  // Returns true if year is a leap year; otherwise false
  isLeapYear(utc){
      var y = utc ? utc.getUTCFullYear() : utc.getFullYear();
      return !(y % 4) && (y % 100) || !(y % 400) ? true : false;
  },

  //----------------------------------------------------------------------
  // Return the name of the month
  getNameOfMonth(utc) {
      var nameOfMonths = ['January','February','March','April','May','June','July','August','September','October','November','December'];
      var m = utc ? utc.getUTCMonth() : utc.getMonth();
      return nameOfMonths[m];
  },

  //----------------------------------------------------------------------
  // Return the number of days in the month
	getDaysInMonth (utc) {
		var m = utc ? utc.getUTCMonth() : utc.getMonth();
		// If feb.
		if (m == 1) {
			return isLeapYear(utc) ? 29 : 28;
		}
		// If Apr, Jun, Sep or Nov return 30; otherwise 31
		return (m == 3 || m == 5 || m == 8 || m == 10) ? 30 : 31;
	}

};