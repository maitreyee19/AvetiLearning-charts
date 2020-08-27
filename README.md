## Overview
The application provides realtime Question Answer session for live classes hosted from youtube.
## How to use
### Local SetUp
#### 1. Clone the git repository
```
    git clone
```
#### 2. Install the dependencies
```
    npm install
```
#### 3. Start the local Node/Express Server  
```
    npm start
```


### Usage
#### Steps for Teacher
1. As Instructor   navigate to http://localhost:3000
1. from instructor page ,instructor has to provide the question number/id he wants to activate in the input field 
1. then instructor need to click question ready button to brodcast message to students that the question is coming up
1. Next Activate question will be clicked . This will activate the question on the students page
1. Then Instructor can Deactivate the question and student will get the notification about their answer.
1. Intructor will get the visualization of Answer statistics in Instructir page.

#### Steps for Student
1. As student will navigate to http://localhost:3000/16.html
1. Students need to put his/her name to participate in question Answer session if using for the 1st time . Otherwise it will pick from the local staorage
1. When student gets the question they can fill out the answer and submit
1. Student will get the feedback if the answer is right or not

### EC2 setup
  
1. Take EC2 Ubuntu Server
2. Make TCP port 80,443, 3000 open from 0.0.0.0:0
ssh to EC2 instance from a Terminal and follow below steps
    
3. Install Node 
``` 
    cd Downloads
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
    . ~/.nvm/nvm.sh
    nvm install node
 ```
4. Copy the git repository 

```
    mkdir QnA
    cd QnA
    git clone https://github.com/maitreyee19/AvetiLearning-charts.git
    cd AvetiLearning-charts
    npm install
    npm start
```

Make sure you can access "ec2url:3000" 

### Setup Apache reverse proxy 

```
    sudo apt-get install apache2
    cd /etc/apache2/sites-available/
    cp ~/QnA/AvetiLearning-charts/website.com.conf ~your_site~.conf
    sudo a2ensite ~your_site~.conf 
```

### setup certificate and ssl using letsencrypt
```
    sudo a2enmod proxy_http
    sudo a2enmod proxy_wstunnel
    sudo add-apt-repository ppa:certbot/certbot
    sudo apt install python-certbot-apache
    sudo certbot --apache -d ~your_site~.com -d www.~your_site~.com
    sudo certbot renew --dry-run
    sudo systemctl restart apache2

```

Setup is completed.

Now Go to https://~your_site~.com and you should see the administrator page... 


### Managing Node service using PM2

Use PM2 to start , monitor and auto restart if node server fails
```
 npm install pm2 -g
 cd ~/QnA/AvetiLearning-charts
 pm2 start server.js
 pm2 list
```

### how to restart server after deploying new changes

```
 cd ~/QnA/AvetiLearning-charts
 git pull   //pull latest code 
 npm install  //install the requirements
 npm start // start the node server using Node 
 -- or --
 pm2 restart 0
```


