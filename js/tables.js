var moments = JSON.parse('{"moments":[{"starttime":"16:00:00","max_count":7,"location":"Gasthuis","id":1,"endtime":"17:00:00","date":"2015-05-05"},{"starttime":"18:00:00","max_count":5,"location":"Gasthuis","id":2,"endtime":"20:00:00","date":"2015-05-05"},{"starttime":"16:00:00","max_count":6,"location":"Thuis","id":3,"endtime":"17:00:00","date":"2015-05-07"}]}');

function render_tables(table_div)
{
    loader(table_div,
	   function()
	   {
	       $.get('/mst/tables.mustache', function(template) {
		   var rendered = Mustache.render(template, moments);
		   $(table_div).html(rendered);
	       });
	   }
	  );
}

function render_summary(table_div)
{
    loader(table_div,
	   function()
	   {
	       $.get('/mst/summary.mustache', function(template) {
		   var rendered = Mustache.render(template, moments);
		   $(table_div).html(rendered);
	       });
	   }
	  );
}

function loader(div, render_func)
{
    $(div).html("<center><img id='loader' src='img/loader.gif' /></center>");
    render_func();
}

function transpose_table(table_id){
    $(table_id).each(function() {
        var $this = $(this);
        var newrows = [];
        $this.find("tr").each(function(){
            var i = 0;
            $(this).find("td").each(function(){
                i++;
                if(newrows[i] === undefined) { newrows[i] = $("<tr></tr>"); }
                newrows[i].append($(this));
            });
        });
        $this.find("tr").remove();
        $.each(newrows, function(){
            $this.append(this);
        });
    });

    return false;
}
