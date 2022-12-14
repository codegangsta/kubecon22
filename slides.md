autoscale: true
footer: @thecodegangsta
background-color: #1E1E1E
text: #A7ADB2, alignment(left), line-height(0.95), Inter
header: #ECEDEE, alignment(left), line-height(1), Inter Extra Bold
text-strong: #FFFFFF, Inter Bold 
header-strong: #32C9BF
list: bullet-character(•)
theme: Fira, 5
slide-transition: true
slidenumbers: true
build-lists: true

## **Connect all the things!** with NATS
#### Jeremy Saenz | Synadia
---

# Jeremy Saenz


[.column]
- Long time Gopher (@thecodegangsta)
- Author of **Martini**, **CLI**, **Negroni**, and more...
- Working @synadia on **NATS**
- Moved from Engineer -> Product and back again

[.column]
![inline 75%](https://avatars.githubusercontent.com/u/178316?v=4)

---

# NATS is adaptive... And so is this talk
guildcon22.vercel.app

---

## Rethinking Connectivity
### **Multi-cloud** and **Edge** computing is driving a massive transformation

---

# Limitations of Today's Technology

- **DNS/hostnames/IP** based discovery
- **Pull based** request/reply semantics
- **Perimeter based** security
- **Location-dependent** backends
- Many layers built on **HTTP 1:1** communication

---

## Introducing NATS

---

# Introducing NATS
NATS is an **open source**, **high performance** messaging system and **connective fabric**.

It aims to **simplify** the number of technologies you use for your services to communicate, while also **empowering** you to build systems that are **globally available**, **multi-cloud**, **multi-geo**, and **highly adaptive** to change and scale.

---

# Introducing NATS
- Location-independent addressing
- M:N communications
- Push and pull based
- Decentralized and secure multi-tenancy
- Intelligent persistence
- Global scale

---

# Introducing NATS
- **Server:** simple, small, easy to deploy Go binary
- **Client:** 40+ client libraries in various languages

---

## NATS Core

---

# NATS Core
* Fire and forget message publishing
* Very fast - Scales to millions of msg/s on a single instance
* Flexible subject based addressing with wildcards
* Payload agnostic

---

# NATS Core
* **Request** and **Reply**
* **Publish** and **Subscribe**
* **Fan In** and **Fan Out**
* **Load Balancing** via **Queue Groups**

---

## NATS Core Demo

---

## Choose your own adventure time

---

## NATS For Micro-service Architectures

---

# What makes a good architecture?
- Resilient
- Secure
- Observable
- Extensible
- Adaptive to change

___

# Resilience
- **Clients** self heal and reconnect to available servers automatically
- **Servers** protect themselves at all costs
- **Failover** to other Geos/Clouds is **automatic**
- **Load balancing** comes for **free**

___

# Secure Multi-tenancy
- **Decentralize** authentication and authorization
- **Isolate** NATS environments via **Accounts**
- **Share** streams and services between accounts
- **Enforce** resource limits for tenants
- **Create** permissions for each service without server changes

___

# Location Transparency
Location transparency is a key characteristic of service-oriented architecture.

Consumers of a service do not know a service's location until they locate it in the registry.

The lookup and dynamic binding to a service at runtime allows the service implementation to move from location to location without the client's knowledge.

---

# Location Transparency
- Free **Service Discovery** via subject based addressing
- **Easily move** services between cloud providers
- **Automatically** get routed to the closest responder
- **Traffic Shaping** and **Subject mapping**

___

# Observability
- **Observe traffic** in real time
- **Gather latency metrics** on each of your services via exports
- **Filter metrics ingestion** via subjects

___

# Multi-pattern development
- Synchronous **Request** and **Reply**
- Asynchronous **Publish** and **Subscribe**
- **Streaming** with NATS JetStream
    - Key/Value and Object store
- All with multi-language support!

___

## NATS at the Edge with Leaf Nodes

---

## NATS at a Global Scale

---

# Global Scale and Diversity
- **Single Server** - Millions of messages per sec. ~70GiB throughput
- **Clusters and Superclusters** - Fully meshed groups of servers that can span the globe
- **Leaf Nodes** - Extend a NATS system with your own private island

---

# Single Server

![inline](images/single_server.png)

---

# Cluster

![inline](images/3_node_cluster.png)

---

# 5 Node Cluster

![inline](images/5_node_cluster.png)

---

# Supercluster

![inline](images/supercluster.png)

---

# Leaf Node

![inline](images/leaf_node.png)

---

# Massive Scale

![inline](images/massive_scale.png)

---

## Persistence with NATS JetStream

---

# What is JetStream?
JetStream is a next-gen persistence layer built on top of NATS Core that allows temporal decoupling between subscribers and publishers.

It is multi-tenant, highly configurable and globally scalable.

---

# What is JetStream
- **Secure** data streams with **multiple consumer models**
- **Multiple streaming patterns** supported
- **Digital twins**/**replicated data**
- **Mux** and **Demux** data
- **Materialized views:** key/value and object stores

---

## JetStream Demo

---

**nats-whiteboard.onrender.com/?room=guildcon22**

---

# Resources

- https://nats.io
- https://rethink.synadia.com
- https://natsbyexample.com

---

# Questions?

