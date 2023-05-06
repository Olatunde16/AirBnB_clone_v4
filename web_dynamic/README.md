# AirBnB clone - Web dynamic

![architecture](https://s3.amazonaws.com/intranet-projects-files/concepts/74/hbnb_step5.png)

## More Info
### Import JQuery
```
<head>
    <script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
</head>
```
### Before starting the project…
You will work on a codebase using Flasgger, you will need to install it locally first before starting the RestAPI:
```
$ sudo apt-get install -y python3-lxml
$ sudo pip3 install flask_cors # if it was not installed yet
$ sudo pip3 install flasgger
```
If the RestAPI is not starting, please read the error message. Based on the(ses) error message(s), you will have to troubleshoot potential dependencies issues.

Here some solutions:

**jsonschema exception**
```
$ sudo pip3 uninstall -y jsonschema 
$ sudo pip3 install jsonschema==3.0.1
```

**No module named 'pathlib2'**
```
$ sudo pip3 install pathlib2
```

### Expose ports from your Vagrant
In your Vagrantfile, add this line for each port forwarded
```
# I expose the port 5001 of my vm to the port 5001 on my computer
config.vm.network :forwarded_port, guest: 5001, host: 5001 
```
if you need to expose other ports, same line but you will need to replace the “guest port” (inside your vagrant) and your “host port” (outside your vagrant, used from your browser for example)

It’s important in your project, to use the AirBnB API with the port 5001

