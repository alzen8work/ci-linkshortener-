console.log($(document.currentScript).attr('src')); //load url of the script

var ajaxObject;
var api_path = '';
//common functions

//default ajaxUsedFunction to overwrite if needed
var postRespondDone = function (e){
	if(typeof proj_dev !== 'undefined') console.log('||===> func :populateData()');
	console.log(e);
	if(typeof proj_dev !== 'undefined')	console.log('<===|| func :populateData()');
}
var postRespondFail = function (e){
	if(typeof proj_dev !== 'undefined') console.log('||===> func :populateData()');
	console.log(e);
	if(typeof proj_dev !== 'undefined')	console.log('<===|| func :populateData()');
}
var postRespondComplete = function (e){
	if(typeof proj_dev !== 'undefined') console.log('||===> func :populateData()');
	console.log(e);
	if(typeof proj_dev !== 'undefined')	console.log('<===|| func :populateData()');
}
//default ajaxUsedFunction
var populateData = function (e){
	if(typeof proj_dev !== 'undefined') console.log('||===> func :populateData()');
	console.log(e);
	if(typeof proj_dev !== 'undefined')	console.log('<===|| func :populateData()');
}

function placeURL(url) {
	if(typeof proj_dev !== 'undefined') console.log('||===> func :placeURL()');
	if(typeof url !== 'undefined')
	{
  	if(typeof proj_dev !== 'undefined')	console.log('<===|| func :placeURL()');
		return window.history.pushState("object or string", "Title", url);
	}
}
function countArray(array_elements) {
	if(typeof proj_dev !== 'undefined') console.log('||===> func :countArray()');
    array_elements.sort();
    var current = null;
    var cnt = 0;
    var countObj = {};
    
    for (var i = 0; i < array_elements.length; i++) {
        if (array_elements[i] != current) {
            if (cnt > 0) {
                // document.write(current + ' comes --> ' + cnt + ' times<br>');
                // console.log(current + ' comes --> ' + cnt + ' times<br>');
                countObj[current] = cnt;
            }
            current = array_elements[i];
            cnt = 1;
        } else {
            cnt++;
        }
    }
    if (cnt > 0) {
        // document.write(current + ' comes --> ' + cnt + ' times');
        // console.log(current + ' comes --> ' + cnt + ' times');
        countObj[current] = cnt;
    }
    
	if(typeof proj_dev !== 'undefined')	console.log('<===|| func :countArray()');
    return countObj;
}
function php_strtotime (text, now) {
	if(typeof proj_dev !== 'undefined') console.log('||===> func :php_strtotime()');
  var parsed
  var match
  var today
  var year
  var date
  var days
  var ranges
  var len
  var times
  var regex
  var i
  var fail = false
  if (!text) {
    return fail
  }
  // Unecessary spaces
  text = text.replace(/^\s+|\s+$/g, '')
    .replace(/\s{2,}/g, ' ')
    .replace(/[\t\r\n]/g, '')
    .toLowerCase()
  var pattern = new RegExp([
    '^(\\d{1,4})',
    '([\\-\\.\\/:])',
    '(\\d{1,2})',
    '([\\-\\.\\/:])',
    '(\\d{1,4})',
    '(?:\\s(\\d{1,2}):(\\d{2})?:?(\\d{2})?)?',
    '(?:\\s([A-Z]+)?)?$'
  ].join(''))
  match = text.match(pattern)
  if (match && match[2] === match[4]) {
    if (match[1] > 1901) {
      switch (match[2]) {
        case '-':
          // YYYY-M-D
          if (match[3] > 12 || match[5] > 31) {
            return fail
          }
          return new Date(match[1], parseInt(match[3], 10) - 1, match[5],
          match[6] || 0, match[7] || 0, match[8] || 0, match[9] || 0) / 1000
        case '.':
          // YYYY.M.D is not parsed by strtotime()
          return fail
        case '/':
          // YYYY/M/D
          if (match[3] > 12 || match[5] > 31) {
            return fail
          }
          return new Date(match[1], parseInt(match[3], 10) - 1, match[5],
          match[6] || 0, match[7] || 0, match[8] || 0, match[9] || 0) / 1000
      }
    } else if (match[5] > 1901) {
      switch (match[2]) {
        case '-':
          // D-M-YYYY
          if (match[3] > 12 || match[1] > 31) {
            return fail
          }
          return new Date(match[5], parseInt(match[3], 10) - 1, match[1],
          match[6] || 0, match[7] || 0, match[8] || 0, match[9] || 0) / 1000
        case '.':
          // D.M.YYYY
          if (match[3] > 12 || match[1] > 31) {
            return fail
          }
          return new Date(match[5], parseInt(match[3], 10) - 1, match[1],
          match[6] || 0, match[7] || 0, match[8] || 0, match[9] || 0) / 1000
        case '/':
          // M/D/YYYY
          if (match[1] > 12 || match[3] > 31) {
            return fail
          }
          return new Date(match[5], parseInt(match[1], 10) - 1, match[3],
          match[6] || 0, match[7] || 0, match[8] || 0, match[9] || 0) / 1000
      }
    } else {
      switch (match[2]) {
        case '-':
          // YY-M-D
          if (match[3] > 12 || match[5] > 31 || (match[1] < 70 && match[1] > 38)) {
            return fail
          }
          year = match[1] >= 0 && match[1] <= 38 ? +match[1] + 2000 : match[1]
          return new Date(year, parseInt(match[3], 10) - 1, match[5],
          match[6] || 0, match[7] || 0, match[8] || 0, match[9] || 0) / 1000
        case '.':
          // D.M.YY or H.MM.SS
          if (match[5] >= 70) {
            // D.M.YY
            if (match[3] > 12 || match[1] > 31) {
              return fail
            }
            return new Date(match[5], parseInt(match[3], 10) - 1, match[1],
            match[6] || 0, match[7] || 0, match[8] || 0, match[9] || 0) / 1000
          }
          if (match[5] < 60 && !match[6]) {
            // H.MM.SS
            if (match[1] > 23 || match[3] > 59) {
              return fail
            }
            today = new Date()
            return new Date(today.getFullYear(), today.getMonth(), today.getDate(),
            match[1] || 0, match[3] || 0, match[5] || 0, match[9] || 0) / 1000
          }
          // invalid format, cannot be parsed
          return fail
        case '/':
          // M/D/YY
          if (match[1] > 12 || match[3] > 31 || (match[5] < 70 && match[5] > 38)) {
            return fail
          }
          year = match[5] >= 0 && match[5] <= 38 ? +match[5] + 2000 : match[5]
          return new Date(year, parseInt(match[1], 10) - 1, match[3],
          match[6] || 0, match[7] || 0, match[8] || 0, match[9] || 0) / 1000
        case ':':
          // HH:MM:SS
          if (match[1] > 23 || match[3] > 59 || match[5] > 59) {
            return fail
          }
          today = new Date()
          return new Date(today.getFullYear(), today.getMonth(), today.getDate(),
          match[1] || 0, match[3] || 0, match[5] || 0) / 1000
      }
    }
  }
  // other formats and "now" should be parsed by Date.parse()
  if (text === 'now') {
    return now === null || isNaN(now)
      ? new Date().getTime() / 1000 | 0
      : now | 0
  }
  if (!isNaN(parsed = Date.parse(text))) {
    return parsed / 1000 | 0
  }
  
  pattern = new RegExp([
    '^([0-9]{4}-[0-9]{2}-[0-9]{2})',
    '[ t]',
    '([0-9]{2}:[0-9]{2}:[0-9]{2}(\\.[0-9]+)?)',
    '([\\+-][0-9]{2}(:[0-9]{2})?|z)'
  ].join(''))
  match = text.match(pattern)
  if (match) {
    // @todo: time zone information
    if (match[4] === 'z') {
      match[4] = 'Z'
    } else if (match[4].match(/^([+-][0-9]{2})$/)) {
      match[4] = match[4] + ':00'
    }
    if (!isNaN(parsed = Date.parse(match[1] + 'T' + match[2] + match[4]))) {
      return parsed / 1000 | 0
    }
  }
  date = now ? new Date(now * 1000) : new Date()
  days = {
    'sun': 0,
    'mon': 1,
    'tue': 2,
    'wed': 3,
    'thu': 4,
    'fri': 5,
    'sat': 6
  }
  ranges = {
    'yea': 'FullYear',
    'mon': 'Month',
    'day': 'Date',
    'hou': 'Hours',
    'min': 'Minutes',
    'sec': 'Seconds'
  }
  function lastNext (type, range, modifier) {
    var diff
    var day = days[range]
    if (typeof day !== 'undefined') {
      diff = day - date.getDay()
      if (diff === 0) {
        diff = 7 * modifier
      } else if (diff > 0 && type === 'last') {
        diff -= 7
      } else if (diff < 0 && type === 'next') {
        diff += 7
      }
      date.setDate(date.getDate() + diff)
    }
  }
  function process (val) {
    // @todo: Reconcile this with regex using \s, taking into account
    // browser issues with split and regexes
    var splt = val.split(' ')
    var type = splt[0]
    var range = splt[1].substring(0, 3)
    var typeIsNumber = /\d+/.test(type)
    var ago = splt[2] === 'ago'
    var num = (type === 'last' ? -1 : 1) * (ago ? -1 : 1)
    if (typeIsNumber) {
      num *= parseInt(type, 10)
    }
    if (ranges.hasOwnProperty(range) && !splt[1].match(/^mon(day|\.)?$/i)) {
      return date['set' + ranges[range]](date['get' + ranges[range]]() + num)
    }
    if (range === 'wee') {
      return date.setDate(date.getDate() + (num * 7))
    }
    if (type === 'next' || type === 'last') {
      lastNext(type, range, num)
    } else if (!typeIsNumber) {
      return false
    }
    return true
  }
  times = '(years?|months?|weeks?|days?|hours?|minutes?|min|seconds?|sec' +
    '|sunday|sun\\.?|monday|mon\\.?|tuesday|tue\\.?|wednesday|wed\\.?' +
    '|thursday|thu\\.?|friday|fri\\.?|saturday|sat\\.?)'
  regex = '([+-]?\\d+\\s' + times + '|' + '(last|next)\\s' + times + ')(\\sago)?'
  match = text.match(new RegExp(regex, 'gi'))
  if (!match) {
    return fail
  }
  for (i = 0, len = match.length; i < len; i++) {
    if (!process(match[i])) {
      return fail
    }
  }
  return (date.getTime() / 1000)
  
	if(typeof proj_dev !== 'undefined')	console.log('<===|| func :php_strtotime()');
}
function php_date (format, timestamp) {
	if(typeof proj_dev !== 'undefined') console.log('||===> func :php_date()');
  var jsdate, f
  // Keep this here (works, but for code commented-out below for file size reasons)
  // var tal= [];
  var txtWords = [
    'Sun', 'Mon', 'Tues', 'Wednes', 'Thurs', 'Fri', 'Satur',
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]
  var formatChr = /\\?(.?)/gi
  var formatChrCb = function (t, s) {
    return f[t] ? f[t]() : s
  }
  var _pad = function (n, c) {
    n = String(n)
    while (n.length < c) {
      n = '0' + n
    }
    return n
  }
  f = {
    // Day
    d: function () {
      // Day of month w/leading 0; 01..31
      return _pad(f.j(), 2)
    },
    D: function () {
      // Shorthand day name; Mon...Sun
      return f.l()
        .slice(0, 3)
    },
    j: function () {
      // Day of month; 1..31
      return jsdate.getDate()
    },
    l: function () {
      // Full day name; Monday...Sunday
      return txtWords[f.w()] + 'day'
    },
    N: function () {
      // ISO-8601 day of week; 1[Mon]..7[Sun]
      return f.w() || 7
    },
    S: function () {
      // Ordinal suffix for day of month; st, nd, rd, th
      var j = f.j()
      var i = j % 10
      if (i <= 3 && parseInt((j % 100) / 10, 10) === 1) {
        i = 0
      }
      return ['st', 'nd', 'rd'][i - 1] || 'th'
    },
    w: function () {
      // Day of week; 0[Sun]..6[Sat]
      return jsdate.getDay()
    },
    z: function () {
      // Day of year; 0..365
      var a = new Date(f.Y(), f.n() - 1, f.j())
      var b = new Date(f.Y(), 0, 1)
      return Math.round((a - b) / 864e5)
    },
    // Week
    W: function () {
      // ISO-8601 week number
      var a = new Date(f.Y(), f.n() - 1, f.j() - f.N() + 3)
      var b = new Date(a.getFullYear(), 0, 4)
      return _pad(1 + Math.round((a - b) / 864e5 / 7), 2)
    },
    // Month
    F: function () {
      // Full month name; January...December
      return txtWords[6 + f.n()]
    },
    m: function () {
      // Month w/leading 0; 01...12
      return _pad(f.n(), 2)
    },
    M: function () {
      // Shorthand month name; Jan...Dec
      return f.F()
        .slice(0, 3)
    },
    n: function () {
      // Month; 1...12
      return jsdate.getMonth() + 1
    },
    t: function () {
      // Days in month; 28...31
      return (new Date(f.Y(), f.n(), 0))
        .getDate()
    },
    // Year
    L: function () {
      // Is leap year?; 0 or 1
      var j = f.Y()
      return j % 4 === 0 & j % 100 !== 0 | j % 400 === 0
    },
    o: function () {
      // ISO-8601 year
      var n = f.n()
      var W = f.W()
      var Y = f.Y()
      return Y + (n === 12 && W < 9 ? 1 : n === 1 && W > 9 ? -1 : 0)
    },
    Y: function () {
      // Full year; e.g. 1980...2010
      return jsdate.getFullYear()
    },
    y: function () {
      // Last two digits of year; 00...99
      return f.Y()
        .toString()
        .slice(-2)
    },
    // Time
    a: function () {
      // am or pm
      return jsdate.getHours() > 11 ? 'pm' : 'am'
    },
    A: function () {
      // AM or PM
      return f.a()
        .toUpperCase()
    },
    B: function () {
      // Swatch Internet time; 000..999
      var H = jsdate.getUTCHours() * 36e2
      // Hours
      var i = jsdate.getUTCMinutes() * 60
      // Minutes
      // Seconds
      var s = jsdate.getUTCSeconds()
      return _pad(Math.floor((H + i + s + 36e2) / 86.4) % 1e3, 3)
    },
    g: function () {
      // 12-Hours; 1..12
      return f.G() % 12 || 12
    },
    G: function () {
      // 24-Hours; 0..23
      return jsdate.getHours()
    },
    h: function () {
      // 12-Hours w/leading 0; 01..12
      return _pad(f.g(), 2)
    },
    H: function () {
      // 24-Hours w/leading 0; 00..23
      return _pad(f.G(), 2)
    },
    i: function () {
      // Minutes w/leading 0; 00..59
      return _pad(jsdate.getMinutes(), 2)
    },
    s: function () {
      // Seconds w/leading 0; 00..59
      return _pad(jsdate.getSeconds(), 2)
    },
    u: function () {
      // Microseconds; 000000-999000
      return _pad(jsdate.getMilliseconds() * 1000, 6)
    },
    // Timezone
    e: function () {
      // Timezone identifier; e.g. Atlantic/Azores, ...
      // The following works, but requires inclusion of the very large
      // timezone_abbreviations_list() function.
      /*              return that.date_default_timezone_get();
       */
      var msg = 'Not supported (see source code of date() for timezone on how to add support)'
      throw new Error(msg)
    },
    I: function () {
      // DST observed?; 0 or 1
      // Compares Jan 1 minus Jan 1 UTC to Jul 1 minus Jul 1 UTC.
      // If they are not equal, then DST is observed.
      var a = new Date(f.Y(), 0)
      // Jan 1
      var c = Date.UTC(f.Y(), 0)
      // Jan 1 UTC
      var b = new Date(f.Y(), 6)
      // Jul 1
      // Jul 1 UTC
      var d = Date.UTC(f.Y(), 6)
      return ((a - c) !== (b - d)) ? 1 : 0
    },
    O: function () {
      // Difference to GMT in hour format; e.g. +0200
      var tzo = jsdate.getTimezoneOffset()
      var a = Math.abs(tzo)
      return (tzo > 0 ? '-' : '+') + _pad(Math.floor(a / 60) * 100 + a % 60, 4)
    },
    P: function () {
      // Difference to GMT w/colon; e.g. +02:00
      var O = f.O()
      return (O.substr(0, 3) + ':' + O.substr(3, 2))
    },
    T: function () {
      return 'UTC'
    },
    Z: function () {
      // Timezone offset in seconds (-43200...50400)
      return -jsdate.getTimezoneOffset() * 60
    },
    // Full Date/Time
    c: function () {
      // ISO-8601 date.
      return 'Y-m-d\\TH:i:sP'.replace(formatChr, formatChrCb)
    },
    r: function () {
      // RFC 2822
      return 'D, d M Y H:i:s O'.replace(formatChr, formatChrCb)
    },
    U: function () {
      // Seconds since UNIX epoch
      return jsdate / 1000 | 0
    }
  }
  var _date = function (format, timestamp) {
    jsdate = (timestamp === undefined ? new Date() // Not provided
      : (timestamp instanceof Date) ? new Date(timestamp) // JS Date()
      : new Date(timestamp * 1000) // UNIX timestamp (auto-convert to int)
    )
    return format.replace(formatChr, formatChrCb)
  }
  return _date(format, timestamp)
	if(typeof proj_dev !== 'undefined')	console.log('<===|| func :php_date()');
}
function insertParam(key, value) {
    key = encodeURI(key); value = encodeURI(value);

    var kvp = document.location.search.substr(1).split('&');

    var i=kvp.length; var x; while(i--) 
    {
        x = kvp[i].split('=');

        if (x[0]==key)
        {
            x[1] = value;
            kvp[i] = x.join('=');
            break;
        }
    }

    if(i<0) {kvp[kvp.length] = [key,value].join('=');}

    //this will reload the page, it's likely better to store this until finished
    document.location.search = kvp.join('&'); 
}
function hashRemove() {
	window.location.replace("#");
	// slice off the remaining '#' in HTML5:    
	if (typeof window.history.replaceState == 'function') {
	  history.replaceState({}, '', window.location.href.slice(0, -1));
	}
}
function showModal(target,url) {
	if(typeof proj_dev !== 'undefined') console.log('||===> func :showModal()');
	$(target).modal({
		backdrop: 'static',
		keyboard: false
	});
  
	$(target).on('shown.bs.modal', function (e) {			
		//some function
		console.log(url);
    if(typeof url !== 'undefined' || url !== ''){
	  	placeURL(url);
    }
	});	
	
	if(typeof proj_dev !== 'undefined') console.log('<===|| func :showModal()');
}
function hideModal(target,url) {
	console.log('||===> func :hideModal()');
	$(target).modal('hide');
	$(target).on('hidden.bs.modal', function (e) {			
		//some function
    if(typeof url !== 'undefined' || url !== ''){
	    placeURL(url);
    }
	});	
	console.log('<===|| func :hideModal()');
}
function ajaxGetRecord(doc_id,api_path) {
	if(typeof proj_dev !== 'undefined') console.log('||===> func :ajaxGetRecord()');
	ajaxObject = '';
	if(typeof doc_id !== 'undefined' && doc_id != '')
	{
		$.ajax({
			url: api_path+doc_id,
			dataType:"json",
			// data: { id:doc_id }, 
			// async: false,
		})
		.done(function(e) {
	  	// console.log( ".done" );
			// console.log(e.success);

			if(e.success){
				// console.log( "e.success" );
				// console.log(e);
				ajaxObject = e;
				populateData(e);
			}else{
				// console.log( "error" );
				// return_val = false;
			}
		})
		.fail(function() {
			console.log( "something went wrong" );
			// return_val = false;
		})
		.always(function() {
			console.log( "complete" );
		})
		;
	}
	if(typeof proj_dev !== 'undefined')	console.log('<===|| func :ajaxGetRecord()');
}
function ajaxPostRecord(serialData,custom_path) {
	var postURL	= ( typeof custom_path == 'undefined' || custom_path === '' ) ? base_url+controller+"/save_doc" : custom_path;

	$.ajax({
		type: "POST",
		// dataType:"json",
		url: postURL,
		data: serialData,  //?id = $_GET['id'] at php controller
		// data: $('#save_doc_cust').serialize(),
		// async: false,
	})
	.done(function(e) {
		console.log( ".done" );
		console.log(e);
		postRespondDone(e);
	})
	.fail(function(e) {
		console.log( "something went wrong" );
		postRespondFail(e);
	})
	.always(function(e) {
		console.log( "complete" );
		postRespondComplete(e);
	})
	;
}