---
layout: post
title: K-sorted IDs
tags: [algorithms]
---

`K-ordered IDs` (or `K-sortable IDs`) are unique identifiers designed for distributed systems that are roughly ordered by 
creation time, ensuring elements are close to their correct chronological position. They often combine a timestamp (or some counter) 
with some metadata (like a host/machine ID) and some random bits to balance uniqueness.
Because of the random part the `K-ordered IDs` are not in strictly chronological order and two (or more) very close event could 
be out of order if sorted.

#### Main K-sorted IDs advantages
- Good database performance (if compared with random IDs like `UUIDv4`).
  - inserts are append-like instead of being scattered.
  - reduce index fragmentation.
  - improve cache locality.
  
  This significantly reduces write amplification and improves performance in B-tree-based storage engines (Postgres, MySQL) or
  LSM trees (Cassandra, RocksDB).

- No central coordination is required.
  - no global counter/coordinator (as for global autoincrement IDs).
  - easy to scale horizontally.
  - resilient to node failures.

- Timestamp and metadata parts can be used in logs and for debug.

#### Some K-sorted IDs drawbacks
- Such IDs are not strictly ordered.
- Host-specific clock drifts can contribute to the order of IDs.
- Collision probability while very low is not 0.

#### Popular K-ordered ID formats
- `KSUID` (K-sortable Unique ID): 160 bits (20 bytes) - 32-bit timestamp (seconds resolution) + 128-bit random, often encoded as a 
27-character `Base62` string. The timestamp uses a custom epoch starting May 13, 2014, allowing it to support timestamps 
until roughly the year 2150. Highly ordered and collision-resistant, often used in analytics (pioneered by Segment).

- `ULID` (Universally Unique Lexicographically Sortable Identifier): 128 bits (16 bytes) - 48-bit timestamp + 80-bit random.
Typically represented as a 26-character string using `Crockford's Base32` [0-9, A-H, J-K, M-N, P-Z], making it URL-safe and compact.
Compatible with UUIDs, providing better sortability.

- `Snowflake ID` (pioneered by Twitter): 64 bits (8 bytes) - 41-bit timestamp + 10-bit machine ID + 12-bit sequence.
The sign bit (1 bit) is unused or set to 0, ensuring the ID is a positive integer. Twitter's timestamp epoch starts November 4, 2010.
Machine ID (10 bits) - identifies the machine or process, allowing up to 1024 nodes to generate IDs without collisions.
Sequence Number (12 bits) - increments for IDs generated within the same millisecond on the same node, supporting 4096 IDs 
per millisecond per node. Optimized for size and speed, requiring machine coordination.
> NOTE: The `Snowflake ID` is listed here though it requires some coordination to ensure unique machine/process IDs.

- `Simpleflake ID` (lightweight, decentralized way to generate unique identifiers that are roughly time-ordered, inspired by 
Twitter's `Snowflake ID`): 64 bits (8 bytes) - 41-bit timestamp + 23-bit random value.

- `Flake ID` (pioneered by Boundary): 128 bits (16 bytes) - 64-bit timestamp + 48-bit machine ID + 16-bit sequence.
The whole idea is very similar to Twitter's `Snowflake ID` but it uses 128 bits instead of 64 bits. 
> NOTE: The machine ID coordination process is simpler (if it required at all) because machine's network MAC address 
> (which is 48 bits) is used.

- `UUIDv6` standard (see RFC9562) 128 bit UUID which can be used as a `K-ordered ID`. 
This UUID version is designed as a reordered version of `UUIDv1`, placing the timestamp in the most significant bits, 
which ensures that IDs generated in chronological order are lexicographically sortable by time.
This UUID uses a 64-bit timestamp (Gregorian time) + monotonic counter (14-bit) + machine/node ID (48-bit, can be MAC address).

- `UUIDv7` standard (see RFC9562) 128 bit UUID which can be used as a `K-ordered ID`.
This UUID is considered an improvement over `UUIDv6`. It uses a 48-bit timestamp (Unix timestamp in milliseconds) + 74-bit random value.
> NOTE: `UUIDv7` is generally preferred over `UUIDv6` for new applications because it uses standard Unix epoch time (milliseconds).
> It also offers better security, 74 random bits for uniqueness, and improved database index efficiency. 
> The `UUIDv6` is essentially a reordered `UUIDv1`, providing time-sortable IDs but still using legacy timestamp mechanism.

- `UUIDv8` standard (see RFC9562) 128 bit UUID which strictly speaking is not `K-ordered ID` but it was designed to represent
any vendor-specific use-cases so it can be customized to be `K-sorted ID` if required.
