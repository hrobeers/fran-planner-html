function load_moments(callback)
{
    var moments;
    if (!config.mock_data)
    {
	$.get(config.ws_root + "/moments", function(data) {
	    callback(readify_moments(data));
	})
	.fail(function() {
	    alert( "error" );
	});
    }
    else
    {
	callback(readify_moments(mock_moments));
    }
}

function load_attendances_for(moment_id, callback)
{
    if (!config.mock_data)
    {
	$.get(config.ws_root + "/attendances?moment_id=" + moment_id, function(data) {
	    data.moment_id = moment_id;
	    callback(data);
	})
	.fail(function() {
	    alert( "error" );
	});
    }
    else
    {
	var coll = {
	    attendances: _.filter(mock_attendances.attendances, function(att){
		return att.moment_id == moment_id;
	    }),
	    moment_id: moment_id
	};
	callback(coll);
    }
}

function create_attendance(attendance, callback)
{
    if (!config.mock_data)
    {
	postJson(config.ws_root + "/attendances", { attendance: attendance })
	    .done(function(data) {
		callback();
	    });
    }
    else
    {
	mock_attendances.attendances.push(attendance);
	callback();
    }
}

function delete_attendance(attendance_id, callback)
{
    if (!config.mock_data)
    {
	ajaxDelete(config.ws_root + "/attendances/" + attendance_id)
	    .done(function(data) {
		callback();
	    });
    }
    else
    {
	mock_attendances.attendances =  _.filter(mock_attendances.attendances, function(att){
	    return att.id != attendance_id;
	});
	callback();
    }
}

function postJson(url, data) {
    return $.ajax({
        'type': 'POST',
        'url': url,
        'contentType': 'application/json',
        'data': JSON.stringify(data)
    });
};

function ajaxDelete(url) {
    return $.ajax({
        'type': 'DELETE',
        'url': url
    });
};

function readify_moments(moments) {
    moments.moments.forEach(function(moment) {
	moment.date = new Date(moment.date).toLocaleDateString();
	moment.starttime = moment.starttime.substring(0, moment.starttime.length - 3);
	moment.endtime = moment.endtime.substring(0, moment.endtime.length - 3);
    });
    return moments;
}

var mock_moments = JSON.parse('{"moments":[\
{"starttime":"16:00:00","max_count":7,"location":"Gasthuis","id":1,"endtime":"17:00:00","date":"2015-05-05"},\
{"starttime":"18:00:00","max_count":5,"location":"Gasthuis","id":2,"endtime":"20:00:00","date":"2015-05-05"},\
{"starttime":"16:00:00","max_count":6,"location":"Thuis","id":3,"endtime":"17:00:00","date":"2015-05-07"}]}');

var mock_attendances = JSON.parse('{"attendances":[\
{"name":"Bakeljau","moment_id":2,"id":1,"count":4},\
{"name":"Nonkel Jef","moment_id":2,"id":2,"count":2},\
{"name":"De kampioenen","moment_id":1,"id":3,"count":11},\
{"name":"Het spook","moment_id":3,"id":4,"count":0}]}');
