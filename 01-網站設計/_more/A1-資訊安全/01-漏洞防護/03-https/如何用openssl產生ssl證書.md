# 如何用 openssl 產生證書

* 參考這篇 -- https://deviloper.in/ssl-certificate-in-nodejs

指令

```
openssl genrsa -out key.pem
openssl req -new -key key.pem
openssl x509 -req -days 365 -in csr.pem -signkey key.pem -out cert.pem
```

執行過程

```
(base) $ openssl genrsa -out key.pem
Generating RSA private key, 2048 bit long modulus
.+++
......................................+++
e is 65537 (0x10001)
(base) $ openssl req -new -key key.pem -out csr.pem
You are about to be asked to enter information that will be incorporated
into your certificate request.
What you are about to enter is what is called a Distinguished Name or a DN.
There are quite a few fields but you can leave some blank
For some fields there will be a default value,
If you enter '.', the field will be left blank.
-----
Country Name (2 letter code) []:tw
State or Province Name (full name) []:taiwan
Locality Name (eg, city) []:kinmen
Organization Name (eg, company) []:nqu
Organizational Unit Name (eg, section) []:csie
Common Name (eg, fully qualified host name) []:ccc
Email Address []:ccckmit@gmail.com

Please enter the following 'extra' attributes
to be sent with your certificate request
A challenge password []:
(base) nqucsie2022@Teacher-nqucsie2022deiMac 04-opensslGenCert %openssl x509 -req -days 365 -in csr.pem -signkey key.pem -out cert.pemm

Signature ok
subject=/C=tw/ST=taiwan/L=kinmen/O=nqu/OU=csie/CN=ccc/emailAddress=ccckmit@gmail.com
Getting Private key