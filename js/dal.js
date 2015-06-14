function load_moments(callback)
{
    var moments = mock_moments;
    callback(moments);
}

function load_attendances_for(moment_id, callback)
{
    var coll = {
	attendances: _.filter(mock_attendances.attendances, function(att){ return att.moment_id == moment_id; })
    };
    callback(coll);
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
