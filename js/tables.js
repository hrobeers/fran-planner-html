var attendance_counts = []; // populated in table_body.mustache
var max_attendance_counts = []; // populated in render_tables

function render(summary_div, tables_div)
{
    loader(summary_div, function() { loader(tables_div, function() {

	load_moments(function(moments) {
	    render_summary(summary_div, moments);
	    render_tables(tables_div, moments);
	})

    })});
}

function render_tables(table_div, moments)
{
    $.get('mst/tables.mustache', function(template) {
	var rendered = Mustache.render(template, moments);
	$(table_div).html(rendered);

	moments.moments.forEach(function(moment) {
	    render_table_body(moment.id);
	    max_attendance_counts[moment.id] = moment.max_count;
	});
    });
}

function render_summary(table_div, moments)
{
    $.get('mst/summary.mustache', function(template) {
	var rendered = Mustache.render(template, moments);
	$(table_div).html(rendered);
    });
}

function render_table_body(moment_id)
{
    load_attendances_for(moment_id, function(attendances) {
	$.get('mst/table_body.mustache', function(body_template) {
	    $('#table_'+moment_id).html(Mustache.render(body_template, attendances));
	});
    });
}

function insert_attendance(moment_id)
{
    var new_attendance = {
	moment_id: moment_id,
	name: $('#input_name_' + moment_id).val(),
	count: $('#input_count_' + moment_id).val()
    };

    if (new_attendance.name === "")
	return;

    if (attendance_counts[moment_id] >= max_attendance_counts[moment_id])
    {
	var r = confirm("Het maximum aantal bezoekers is reeds bereikt." +
			"\nUiteraard zijn jullie nog steeds welkom, maar misschien past een andere datum ook?" +
			"\n\nKlik OK als jullie toch op deze datum willen komen." +
			"\nKlik Cancel als jullie een andere datum willen kiezen.");
	if (r != true) {
	    return;
	}
    }

    table_loader(moment_id);
    create_attendance(new_attendance, function() {
	render_table_body(moment_id);
    });
}

function remove_attendance(attendance_id, moment_id)
{
    table_loader(moment_id);
    delete_attendance(attendance_id, function() {
	render_table_body(moment_id);
    });
}

function loader(div, render_func)
{
    $(div).html("<center><img src='img/loader.gif'/></center>");
    render_func();
}

function table_loader(moment_id)
{
    $("#table_" + moment_id).html('<tr><td colspan="3"><center><img src="img/loader.gif"/></center></td></tr>');
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
