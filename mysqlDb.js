//Connect to mysql db
//Myql Db Schema
/* 
Go to mysql command prompt
mysql -u username -p
enter password

SHOW DATABASES;  

create database blog;
use blog;

*/

//create user table
/* 
 CREATE TABLE user(  
    id int NOT NULL AUTO_INCREMENT,  
    name varchar(100) NOT NULL,  
    email varchar(100) NOT NULL, 
    password varchar(255) NOT NULL,  
    countryCode varchar(10),
    phoneNumber int NOT NULL,
    userId varchar(50) NOT NULL
    OTP int,
    otpDateTime TIMESTAMP  DATETIME,
    createdDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    PRIMARY KEY (id)  
);  

DESCRIBE user_table;  

*/

//create category table
/* 
 CREATE TABLE category(  
    id int NOT NULL AUTO_INCREMENT,  
    categoryName varchar(50) NOT NULL,  
    createdDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    PRIMARY KEY (id)  
);  

*/

//create subcategory table
/* 
 CREATE TABLE subcategory(  
    id int NOT NULL AUTO_INCREMENT,  
    subcategoryName varchar(50) NOT NULL, 
    categoryId int NOT NULL
    createdDate DEFAULT CURRENT_TIMESTAMP
    INDEX par_ind (categoryId),
    FOREIGN KEY (categoryId)
        REFERENCES category(id)
        ON DELETE CASCADE 
    PRIMARY KEY (id)  
);  

*/
//create blog post table
/* 
CREATE TABLE post (
    id INT NOT NULL AUTO_INCREMENT,
    title varchar(100) NOT NULL, 
    description TEXT NOT NULL, 
    image varchar(250) NOT NULL, 
    youtubeLink varchar(100) NOT NULL, 
    webLink varchar(100) NOT NULL, 
    doc varchar(100) NOT NULL, 
    brand varchar(45) NOT NULL, 
    model varchar(45) NOT NULL, 
    categoryId INT NOT NULL,
    subcategoryId INT NOT NULL,
    userId INT NOT NULL,
    createdDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   
    PRIMARY KEY(id),
    INDEX (categoryId, subcategoryId),
    INDEX (userId),

    FOREIGN KEY (categoryId, subcategoryId)
      REFERENCES subcategory(categoryId, id)
      ON UPDATE CASCADE ON DELETE RESTRICT,

    FOREIGN KEY (userId)
      REFERENCES user_table(id)
) 

*/

//create comment table
/* 
 CREATE TABLE comment(  
    id int NOT NULL AUTO_INCREMENT,  
    comment varchar(255) NOT NULL,
    postId int NOT NULL,  
    createdDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    INDEX par_ind (postId),
    FOREIGN KEY (postId)
        REFERENCES post_table(id)
        ON DELETE CASCADE 
    PRIMARY KEY (id)  
);  

*/
//create reply table
/* 
 CREATE TABLE reply(  
    id INT NOT NULL AUTO_INCREMENT,  
    reply varchar(255) NOT NULL,  
    commentId INT NOT NULL, 
    createdDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    INDEX par_ind (commentId),
    FOREIGN KEY (commentId)
        REFERENCES comment(id)
        ON DELETE CASCADE 
    
    PRIMARY KEY (id)  
);  





Katyayani Mahamaye Mahayoginyadheeshwari 
Nand gopsutam Devi patim Me Kuru te Namah
*/