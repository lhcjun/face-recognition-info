# face-recognition-info
### See Backend Code
&emsp;&emsp;[face-recognition-info-API](https://github.com/lhcjun/face-recognition-info-API)

### How to use
---
- Register / Sign in
- Detecting faces for info such as age, gender, cultural with both &ensp;**img url / local img**
  
![demo1](https://github.com/lhcjun/demo/blob/master/face-recognition-info/Facial%20Detective%201.gif)

- Updating **user's profile**
  
  ![demo2](https://github.com/lhcjun/demo/blob/master/face-recognition-info/Facial%20Detective%202.gif)



### Overview
---
<p>The app lets you detect multiple faces at once, and gets the info such as age, gender, cultural of all the faces.</p>
<p>FacialDetective allows you to submit the images with both url & computer files.<br>
It also takes advantage of authentication and session management using JSON web tokens.<br>
Users are able to update their profile through react portal at any time.</p>

Created with:
- React
- JWT authentication
- Redis
- PostgreSQL
- Docker
<p>... and more 😄!</p>

<p>ps. Since creditcard is required for adding heroku-redis add-ons in production, <br>
    &emsp; the production link here only shows the part without jwt😱. </p>
