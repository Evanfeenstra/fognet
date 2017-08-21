export default {
  supercomputer: {
    image: "/static/images/servers.jpeg",
    title:
      "IOTA, Luxoft and St. Petersburg Polytechnic University supercompute the Tangle",
    content: [
      { type: "html", tag: "h2", children: `Supercomputing IOTA` },
      {
        type: "html",
        tag: "p",
        children: `IOTA is working with software titan Luxoft and a great team at the Peter
        the Great St. Petersburg Polytechnic University who possesses a 1.1
        PetaFLOP supercomputer. We are utilizing this talent and these immense
        computational resources to research different scenarios and topologies
        of the IOTA Tangle in order to optimize the protocol and explore the
        full underlying potential of the technology in great depth.`
      },
      {
        type: "satoshi",
        type: `image`,
        price: 50000,
        placeholder: "front-server-blurred.jpg",
        content: `front-server.jpeg`
      },
      {
        type: "html",
        tag: "p",
        children: `Given the nature of the sheer breakthrough in distributed ledger
        technology that the Tangle represents, these tests and their results
        will be very valuable from both an academic, but also practical
        perspective. With confirmation of current results we can move towards
        standardization of the protocol itself.`
      },
      {
        type: "html",
        tag: "p",
        children: `We also intend to collaborate with this great team and their
        supercomputer on future IXI modules on top of IOTA, but that is news for
        another day.`
      }
    ]
  },
  tangle: {
    image: "/static/images/tangle.jpg",
    title: "This is IOTA. A brief overview of the tangle",
    content: [
      {
        type: "satoshi",
        type: `video`,
        price: 390000,
        placeholder: "iota.png",
        content: `iota.mp4`,
        style: { height: 414 }
      },
      {
        type: "html",
        tag: "p",
        children:
          "IOTA is also developing a novel standard for embedding minuscule ASIC chips in all IoT devices. These chips perform nominal proof-of-work hashes in order to prevent spam and Sybil attacks, and because the network is partition-tolerant and only eventually consistent, brute force hashing attacks are prevented."
      },
      {
        type: "html",
        tag: "p",
        children:
          "With a transaction volume limited only by the speed of light, IOTA is a promising new solution to the limitations presented by blockchains."
      }
    ]
  },
  etherreview: {
    image: "/static/images/etherreview.jpg",
    title: "Ether Review #69 - IOTA & the Post-Blockchain Era",
    content: [
      {
        type: "satoshi",
        type: `audio`,
        price: 50000,
        content: `etherreview.mp3`,
        description: `Interview with Davo Sønstebø`
      },
      {
        type: "html",
        tag: "p",
        children:
          "David Sønstebø, co-founder of IOTA, discusses this next-generation post-blockchain platform designed to serve as the backbone for the Internet-of-Things (IoT)."
      },
      {
        type: "html",
        tag: "p",
        children:
          "IOTA is a groundbreaking new open-source distributed ledger that does not use a blockchain. Its innovative new quantum-proof protocol, known as the Tangle, gives rise to unique new features like zero fees, infinite scalability, fast transactions, secure data transfer and many others."
      },
      {
        type: "html",
        tag: "p",
        children:
          "Because the Tangle uses a Directed Acyclic Graph (DAG) instead of a blockchain, users automatically act as validators, allowing transaction validation to become an intrinsic property of utilising the network. Each transaction requires the sender to verify two previous transactions, resulting in infinite scalability while avoiding the validation centralization that is common with existing consensus mechanisms."
      },
      {
        type: "html",
        tag: "p",
        children:
          "IOTA is also developing a novel standard for embedding minuscule ASIC chips in all IoT devices. These chips perform nominal proof-of-work hashes in order to prevent spam and Sybil attacks, and because the network is partition-tolerant and only eventually consistent, brute force hashing attacks are prevented."
      },
      {
        type: "html",
        tag: "p",
        children:
          "With a transaction volume limited only by the speed of light, IOTA is a promising new solution to the limitations presented by blockchains."
      }
    ]
  }
}
