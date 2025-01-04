---
layout: post
title: Use OpenSSL to encrypt and decrypt files
---

#### OpenSSL
`OpenSSL` can be quite handy if it is required to encrypt a file.
One of reasons to use `OpenSSL` is because it is pre-installed in many (or maybe on all) Linux-based systems
and also can be installed on macOS or Windows. Other than that other tools can be used such as `GPG` or `age` etc.

Two approaches are possible:
1) encrypt a file with a symmetric key
2) encrypt a file with an asymmetric key

#### Encrypt and decrypt file with a symmetric key
A file can be encrypted with the following command:
```shell
openssl enc -aes-256-cbc -a -salt -pbkdf2 -iter 20000 -in secret_file.txt -out secret_file.enc
```
`-a` is optional and means that the encrypted output should be encoded in Base64  
`-salt` is also optional though it is recommended to use it to make the encryption stronger  
`-iter` is used for PBKDF2 key derivation and it is recommended to have larger than 10000  
If this command is executed then the password interactive prompt will be shown 
otherwise it is possible to use the `-k` option with a password string.

The decryption is similar:
```shell
openssl enc -d -aes-256-cbc -a -salt -pbkdf2 -iter 20000 -in secret_file.enc -out secret_file.txt
```
Note that if `-a`, `-salt` options were used for the encryption then they should be used for the decryption as well.
Also the `-iter` value for PBKDF2 must be the same as for the encryption. 

#### Encrypt and decrypt file with an asymmetric key
In case of the asymmetric encryption two parties are involved. Let's call them traditionally Alice and Bob.
Both parties must create their public and private key pairs in advance and exchange their public keys.

Use this command to create a private key for Alice:
```shell
openssl genrsa -aes128 -out alice_private.pem 1024
```
Note that during the key creation the pass phrase will be prompted and this phrase must be used for all operations.

After the private key is created the public key must be created using the private key:
```shell
openssl rsa -in alice_private.pem -pubout > alice_public.pem
```

It is possible to print various private key parameters using following command:
```shell
openssl rsa -in alice_private.pem -noout -text
```
and do the same for the public key:
```shell
openssl rsa -in public_alice.pem -pubin -noout -text
```

Bob must create his own private and public key pair in a similar fashion (this part is omitted).
The part about how Alice and Bob exchange their public keys is also omitted.

To encrypt the file Alice uses Bob's public key. To decrypt the file Bob uses his private key.
If Bob sends a file to Alice then he uses Alice's public key and she uses her private key to decrypt the file.
```shell
openssl pkeyutl -encrypt -inkey bob_public.pem -pubin -in secret_file.txt -out secret_file.enc
```
```shell
openssl pkeyutl -decrypt -inkey bob_private.pem -in secret_file.enc > secret_file.txt
```
Note that in commands above `pkeyutl` is used. In older `OpenSLL` versions `rsautl` must be used (and it is deprecated now).

#### Misc tips
Generate a random key
```shell
openssl rand -base64 256 > secret.key
```

Encrypt and decrypt data using the key file as a parameter
```shell
openssl enc -aes-256-cbc -a -salt -in secret_file.txt -out secret_file.enc -pass file:$HOME/path/to/secret.key
openssl enc -d -aes-256-cbc -a -salt -in secret_file.enc -out secret_file.txt -pass file:$HOME/path/to/secret.key
```