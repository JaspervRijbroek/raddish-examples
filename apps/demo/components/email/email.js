function EmailComponent(request, response) {
    ObjectManager.get('com://demo/email.dispatcher.http')
        .then(function(dispatcher) {
            dispatcher.dispatch(request, response);
        });
}

module.exports = EmailComponent;