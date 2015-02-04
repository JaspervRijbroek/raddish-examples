/**
 * This is the main component file
 * without this file raddish will not know if your component exists,
 * also this file will start the dispatcher.
 */

function MenuComponent(request, response) {
    ObjectManager.get('com://demo/menu.dispatcher.http')
        .then(function(dispatcher) {

            // Dispatch the request.
            dispatcher.dispatch(request, response);
        });
}

module.exports = MenuComponent;