function ApplicationComponent(request, response) {
    ObjectManager.get('com://teemr/application.dispatcher.http')
        .then(function(dispatcher) {
            dispatcher.dispatch(request, response);
        });
}

module.exports = ApplicationComponent;