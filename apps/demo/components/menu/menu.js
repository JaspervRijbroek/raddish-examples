/**
 * This is the main component file
 * without this file raddish will not know if your component exists,
 * also this file will start the dispatcher.
 */

function MenuComponent(request, response) {
    ObjectManager.get('com://demo/menu.dispatcher.http')
        .then(function(dispatcher) {
            /**
             * After this method most of the magic is happening.
             * So when calling this component by url (/demo/menu)
             *
             * By default the system will look for a database table called menu_menus.
             * If this table doesn't exists then ofcourse an error is thrown.
             *
             * But if you go to this component by the url /home/menu/items
             * The system will look for the table menu_items.
             */

            // Dispatch the request.
            dispatcher.dispatch(request, response);
        });
}

module.exports = MenuComponent;