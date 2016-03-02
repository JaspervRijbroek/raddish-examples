/**
 * This is the incoming part of com_aooliation.
 * The dispatcher of this component will be quite magical.
 */
function ApplicationComponent(request, response) {
    ObjectManager.get('com://teemr/application.dispatcher.http')
        .then(function(dispatcher) {
            dispatcher.dispatch(request, response);
        });
}

module.exports = ApplicationComponent;