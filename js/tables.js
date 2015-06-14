function render_tables(table_div)
{
    loader(table_div, function() {
	$.get('/mst/tables.mustache', function(template) {
	    load_moments(function(moments) {
		var rendered = Mustache.render(template, moments);
		$(table_div).html(rendered);

		moments.moments.forEach(function(moment) {
		    load_attendances_for(moment.id, function(attendances) {
			$.get('/mst/table_body.mustache', function(body_template) {
			    $('#table_'+moment.id).html(Mustache.render(body_template, attendances));
			});
		    });
		});
	    });
	});
    });
}

function render_summary(table_div)
{
    loader(table_div, function() {
	$.get('/mst/summary.mustache', function(template) {
	    load_moments(function(moments) {
		var rendered = Mustache.render(template, moments);
		$(table_div).html(rendered);
	    });
	});
    });
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
