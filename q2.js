function convertToString(x) {
  x = ("" + x).padStart(4, "0");
  var h = x.substring(0, 2);
  var m = x.substring(2);
  return h + ":" + m;
}

function getAvailableTimeslots(notAvailableTimeslots) {
  var availableTimeslots = [];
  for (var i = 0; i <= 23; i++) {
    for (var j = 0; j <= 59; j++) {
      availableTimeslots.push(parseInt(i + "" + ("" + j).padStart(2, "0")));
    }
  }
  for (var i = 0; i < notAvailableTimeslots.length; i++) {
    var slices = notAvailableTimeslots[i].split(" ");
    var start = parseInt(slices[2].replace(":", ""));
    var end = parseInt(slices[3].replace(":", ""));
    for (var j = start; j <= end; j++) {
      var index = availableTimeslots.indexOf(j);
      if (index > -1) {
        availableTimeslots.splice(index, 1);
      }
    }
  }
  return availableTimeslots;
}

function isConsecutive(x, y) {
  x = ("" + x).padStart(4, "0");
  var xH = parseInt(x.substring(0, 2));
  var xM = parseInt(x.substring(2));
  y = ("" + y).padStart(4, "0");
  var yH = parseInt(y.substring(0, 2));
  var yM = parseInt(y.substring(2));
  return (xH + 1 == yH && xM == 59 && yM == 0) || Math.abs(x - y) == 1;
}

function getTimeslotSegments(timeslots) {
  var segments = [];
  var segment = [];
  for (var i = 0; i < timeslots.length - 1; i++) {
    var x = timeslots[i];
    var y = timeslots[i + 1];
    segment.push(x);
    if (!isConsecutive(x, y)) {
      segments.push(segment);
      segment = [];
    }
  }
  if (timeslots.length > 0) {
    segment.push(timeslots[timeslots.length - 1]);
  }
  segments.push(segment);
  return segments
}

function q2(notAvailableTimeslots, k) {
  var time = "-1";
  var timeslots = getAvailableTimeslots(notAvailableTimeslots);
  var segments = getTimeslotSegments(timeslots);
  for (var i = 0; i < segments.length; i++) {
    if (segments[i].length >= k) {
      time = convertToString(segments[i][0]);
      break;
    }
  }
  return time;
}

var array = [
  "A A 00:00 15:00",
  "B A 02:00 16:40",
  "C A 21:00 23:00",
  "D A 16:30 17:30",
  "B A 18:00 18:30",
];

console.log(q2(array, 120));
