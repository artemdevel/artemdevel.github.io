---
layout: post
title: DNS records
---

## Some DNS related commands (Ubuntu/Linux)
Query `A` DNS record for a domain
```shell
dig google.com
```
```
google.com.		300	IN	A	216.58.209.14
```
Query `PTR` DNS record (reverse `A` query)
```shell
dig -x 216.58.209.14
```
```
14.209.58.216.in-addr.arpa. 2572 IN	PTR	waw02s18-in-f14.1e100.net.
14.209.58.216.in-addr.arpa. 2572 IN	PTR	sof01s12-in-f14.1e100.net.
```
Query `MX` record for a domain (or any other record by name)
```shell
dig google.com mx
```
```
google.com.		166	IN	MX	10 smtp.google.com.
```
```shell
dig google.com aaaa
```
```
google.com.		300	IN	AAAA	2a00:1450:401b:808::200e
```
Use a specific server to query DNS
```shell
dig google.com @1.1.1.1
```
```
google.com.		298	IN	A	142.250.203.206
```
Query all DNS records for a domain
```shell
dig google.com ANY
```
```
google.com.		300	IN	A	142.250.203.206
google.com.		300	IN	AAAA	2a00:1450:401b:810::200e
google.com.		3600	IN	TXT	"MS=E4A68B9AB2BB9670BCE15412F62916164C0B20BB"
google.com.		21600	IN	NS	ns1.google.com.
google.com.		3600	IN	TXT	"docusign=05958488-4752-4ef2-95eb-aa7ba8a3bd0e"
google.com.		60	IN	SOA	ns1.google.com. dns-admin.google.com. 480306866 900 900 1800 60
google.com.		3600	IN	TXT	"onetrust-domain-verification=de01ed21f2fa4d8781cbc3ffb89cf4ef"
google.com.		3600	IN	TXT	"v=spf1 include:_spf.google.com ~all"
google.com.		3600	IN	TXT	"google-site-verification=TV9-DBe4R80X4v0M4U_bd_J9cpOJM0nikft0jAgjmsQ"
google.com.		3600	IN	TXT	"globalsign-smime-dv=CDYX+XFHUw2wml6/Gb8+59BsH31KzUr6c1l2BPvqKX8="
google.com.		21600	IN	NS	ns4.google.com.
google.com.		3600	IN	TXT	"docusign=1b0a6754-49b1-4db5-8540-d2c12664b289"
google.com.		3600	IN	TXT	"atlassian-domain-verification=5YjTmWmjI92ewqkx2oXmBaD60Td9zWon9r6eakvHX6B77zzkFQto8PQ9QsKnbf4I"
google.com.		300	IN	MX	10 smtp.google.com.
google.com.		21600	IN	CAA	0 issue "pki.goog"
google.com.		21600	IN	TYPE65	\# 13 00010000010006026832026833
google.com.		3600	IN	TXT	"google-site-verification=wD8N7i1JTNTkezJ49swvWW48f8_9xveREV4oB-0Hf5o"
google.com.		3600	IN	TXT	"facebook-domain-verification=22rm551cu4k0ab0bxsw536tlds4h95"
google.com.		3600	IN	TXT	"apple-domain-verification=30afIBcvSuDV2PLX"
google.com.		21600	IN	NS	ns3.google.com.
google.com.		21600	IN	NS	ns2.google.com.
google.com.		3600	IN	TXT	"webexdomainverification.8YX6G=6e6922db-e3e6-4a36-904e-a805c28087fa"
```
NOTE: `TYPE65` is something not yet completely standardised for the high-speed Internet.

## Most commonly used DNS records

| DNS record | Description         |
|------------|---------------------|
| `A`        | IPv4 address        |
| `AAAA`     | IPv6 address        |
| `CNAME`    | Canonical name      |
| `MX`       | Mail exchange       |
| `NS`       | Name server         |
| `TXT`      | Human-readable text |
    
## All DNS records currently in use

| DNS record   | Description                                                   |
|--------------|---------------------------------------------------------------|
| `A`          | `IPv4` address                                                |
| `AAAA`       | `IPv6` address                                                |
| `AFSDB`      | `AFS` database location                                       |
| `APL`        | Address prefix list                                           |
| `AXFR`       | Authoritative zone transfer                                   |
| `CAA`        | Certification authority authorization                         |
| `CDNSKEY`    | Child copy of a `DNSKEY`                                      |
| `CDS`        | Child copy of DS                                              |
| `CERT`       | Cryptographic certificate                                     |
| `CNAME`      | Canonical name                                                |
| `CSYNC`      | Child-to-parent synchronization                               |
| `DHCID`      | `DHCP` identifier                                             |
| `DLV`        | `DNSSEC` look aside validation                                |
| `DNAME`      | Delegation name                                               |
| `DNSKEY`     | Cryptographic key for `DNSSEC`                                |
| `DS`         | Delegation signer                                             |
| `EUI48`      | `MAC` address (`EUI-48`)                                      |
| `EUI64`      | `MAC` address (`EUI-64`)                                      |
| `HINFO`      | Host information                                              |
| `HIP`        | Host identification protocol                                  |
| `HTTPS`      | `HTTPS` binding                                               |
| `IPSECKEY`   | Cryptographic key for `IPsec`                                 |
| `IXFR`       | Incremental zone transfer                                     |
| `KEY`        | Cryptographic key for `DNSSEC` (obsoleted by `DNSKEY`)        |
| `KX`         | Key exchange                                                  |
| `LOC`        | Geographical location                                         |
| `MX`         | Mail exchange                                                 |
| `NAPTR`      | naming authority pointer                                      |
| `NS`         | Name server                                                   |
| `NSEC3`      | Next secure (version 3)                                       |
| `NSEC3PARAM` | Parameter for `NSEC3`                                         |
| `NSEC`       | Next secure (obsoleted by `NSEC3`)                            |
| `NXT`        | `DNSSEC` key (obsoleted by `NSEC`)                            |
| `OPENPGPKEY` | Public key for `OpenPGP`                                      |
| `OPT`        | `EDNS` option                                                 |
| `PTR`        | Canonical name pointer                                        |
| `RP`         | Responsible person                                            |
| `RRSIG`      | Resource record signature for `DNSSEC`                        |
| `SIG`        | Resource record signature for `DNSSEC` (obsoleted by `RRSIG`) |
| `SMIMEA`     | `S/MIME` association                                          |
| `SOA`        | Start of authority                                            |
| `SSHFP`      | Public key fingerprint for `SSH`                              |
| `SVCB`       | Service binding                                               |
| `SRV`        | Service locator                                               |
| `TA`         | Trust authorities for `DNSSEC`                                |
| `TKEY`       | Transaction key                                               |
| `TLSA`       | Certificate association for `TLS`                             |
| `TSIG`       | Transaction signature                                         |
| `TXT`        | Human-readable text                                           |
| `URI`        | Uniform resource identifier                                   |
| `ZONEMD`     | Message digest for DNS zones                                  |
