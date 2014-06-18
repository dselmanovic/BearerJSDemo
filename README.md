BearerJSDemo
============

Demo application for using BearerJS.

Application is made in WebStorm so dont be surprized if you get project files as well. Feel free to clean it up for your own environment.

You can try the following:

Get token
```
POST http://localhost:3000/token
```

Get public (unsecured object)
```
http://localhost:3000/
```

Get some secure object. Make sure to send Authorization header with your token
```
http://localhost:3000/secure
```

Get another some public object. Check how MVC pattern is applied where you have your Model separated from route (controller)
```
http://localhost:3000/model
```

