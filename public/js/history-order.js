$(document).ready(function() {
    try {

        $('#history_table').DataTable({
            'language': {
                search: '<i class="fa fa-search fa-lg" aria-hidden="true"></i>',
                searchPlaceholder: 'Search',
            },
        });
    } catch (ex) {
        console.log('Cann\'t init table');
    }
});

