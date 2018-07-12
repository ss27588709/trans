var FakeTranslationArray = require('./constants/fakeTranslations');
var translate = require('./translator');
var multipart = require('connect-multiparty');


module.exports = function(app){
    
    app.get('/api/fakeTranslation', function(req, res){
        res.json(FakeTranslationArray);
    });
    
    app.get('/api/fakeTranslation/:id', function(req, res){
        if(!req.params.id || req.params.id > FakeTranslationArray.length){
            res.sendStatus(400);
            return;
        }
       res.json(FakeTranslationArray[req.params.id]);
    });
var multipartMiddleware = multipart();
    app.post('/api/translate',multipartMiddleware, function(req, res){
        if(!req.body.text){
            res.sendStatus(400);
            return;
        }

        translate(req.query.to, 'en', req.body.text)
            .then(function (resp){
                res.send(resp);
            });
        });
}