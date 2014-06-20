BearerJSDemo
============

Demo application for using BearerJS.

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

Get some secure object passing parameter in URL. Check how route is defined in bearerJS configuration to do this
```
http://localhost:3000/secure/5
```

Get another public object. Check how MVC pattern is applied where you have your Model separated from route (controller)
```
http://localhost:3000/model
```

