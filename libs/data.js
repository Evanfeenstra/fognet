export default {
  supercomputer: {
    image: "/static/images/servers.jpeg",
    author: `David Sønstebø`,
    authorBio: `Founder of IOTA`,
    authorImg: `/static/icons/david.jpeg`,
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
        price: 10,
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
    author: `Robin Kohze`,
    authorBio: `Biochemist, R, Python, JS`,
    authorImg: `/static/icons/robin.jpeg`,
    title:
      "Introducing IOTA - A Crypto Currency (Bitcoin, Ethereum, Ripple Comparison)",
    content: [
      {
        type: "html",
        tag: "p",
        children:
          "IOTA - what is iota and how does iota cryptocurrency work? IOTA explained in a nutshell."
      },
      {
        type: "satoshi",
        type: `video`,
        price: 20,
        placeholder: "iota.jpg",
        content: `iota.mp4`,
        style: { height: 414 }
      },

      {
        type: "html",
        tag: "p",
        children:
          "This video was animated by a team of Cambridge University scientists. Since we perceive the off-blockchain solution not only as elegant but also necessary for any further crypto currency adaption, we created this video."
      }
    ]
  },
  iotastanglemeetsinternetthings: {
    image: "/static/images/iota-header.jpg",
    author: `Ian Allison`,
    authorBio: `Ian is a financial technology reporter at International Business Times with particular interests in crypto-economics and machine learning. `,
    authorImg: `/static/icons/ian-allison.png`,
    title:
      "IOTA's Tangle meets Internet of Things requirements better than any blockchain",
    content: [
      {
        type: "html",
        tag: "p",
        children:
          "It's not surprising that Internet of Things (IoT) transactional settlement and data transfer layer IOTA is a co-founding partner of IoT consortium the Trusted Internet of Things Alliance."
      },

      {
        type: "html",
        tag: "p",
        children:
          "As well as other blockchain IoT specialists like Filament and Chronicled, the new consortium features heavyweight industry players such as Bosch and Cisco."
      },
      {
        type: "html",
        tag: "p",
        children:
          "IOTA's Tangle ledger is a Directed Acyclic Graph(DAG), as opposed to a linear blockchain design, allowing the system to settle transactions with zero fees enabling devices to trade exact amounts of resources on-demand, as well as store data from sensors and dataloggers securely and verified on the ledger."
      },
      {
        type: "html",
        tag: "p",
        children:
          "IOTA founder David Sønstebø explained that big corporate entities such as Bosch and Cisco have tested the likes of Ethereum and are increasingly coming to the conclusion that it alone will not work for IoT; the next go-to ledger tends to be Hyperledger."
      },
      {
        type: "html",
        tag: "p",
        children: `"But Hyperledger has its own limitations and its own problems," said Sønstebø. "While it might be good for enterprise solutions in the future, it's ultimately a permissioned ledger, and that's the antithesis of IoT, which has to be open in order to realise its true potential."`
      },
      {
        type: "html",
        tag: "p",
        children: `"It can't be a closed ecosystem because that's literally the opposite of interoperability. The problem we are seeing with Hyperledger is that it's very corporate driven; it's the typical old school way of doing things, which is fine for certain use cases, but not open ecosystems. The only IoT use case that they have experimented with, as far as I know, is the shipping one, where you track the supply chain for provenance etc - even those pilot projects have not really amounted to anything other than headlines. That being said there could of course be overlap between permissioned blockchains like Hyperledger and permissionless IOTA, as long as they are used in their correct domains."`
      },
      {
        type: "html",
        tag: "p",
        children: `Sønstebø pointed to three things that prevent traditional blockchains from being useful in the IoT world: fees, scalability and throughput, and the rigidity of infrastructure.`
      },
      {
        type: "html",
        tag: "p",
        children: `Because public blockchains like Bitcoin are essentially used by two types of participants – users and validators – there will always be an issue of transaction fees. Validators are only running their systems to earn fees, and as blockchains become popular this leads to bottlenecks and higher fees.`
      },
      {
        type: "html",
        tag: "p",
        children: `This is fatal for a situation that involves processing micro-transactions between machines. "If I'm a sensor and I want to purchase storage, analytics or bandwidth, those transactions will most likely be something like one cent or two cents. Imagine paying dollar-plus fees to send one cent – that's not a good business model," said Sønstebø.`
      },
      {
        type: "html",
        tag: "p",
        children: `"This also prohibits using the ledger for data integrity because the beauty of a distributed ledger is of course that you get this tamper-proofing – but if I have to pay dollars for each data packet and I have billions of data packets that I want to send, there is no way to put it on the blockchain in real time."`
      },
      {
        type: "html",
        tag: "p",
        children: `The second issue is scaling or throughput: 10 or 20 transactions per second wouldn't even really cover one connected vehicle, said Sønstebø. "When you have millions or billions of devices that are sending insane quantities of data and transactions, 20 transactions per second [tx/s] globally is not feasible for any kind of real world deployment."`
      },
      {
        type: "satoshi",
        type: `text`,
        price: 45,
        content: `tanglemeets`,
        style: { height: 800 }
      },
      {
        type: "html",
        tag: "p",
        children: `Regarding the rigidness of blockchain infrastructure requirements, IOTA adopts partition tolerance and eventual consistency in the CAP theorem sense, which means the Tangle is a lot more malleable. "If you issue a transaction in a cluster that's not connected to the internet but instead just communicates with other devices via some local protocol, then you can still retain the integrity of that cluster and then when you connect back into the main internet," said Sønstebø. "You seamlessly get this entangled kind of web, and that makes it a lot more versatile and agile in IoT ecosystem."`
      }
    ]
  },
  etherreview: {
    image: "/static/images/etherreview.jpg",
    author: `Arthur Falls`,
    authorBio: `Generalist`,
    authorImg: `/static/icons/author.png`,
    title: "Ether Review #69 - IOTA & the Post-Blockchain Era",
    content: [
      {
        type: "satoshi",
        type: `audio`,
        price: 180,
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
  },
  innovationnorway: {
    image: "/static/images/norway-header.jpg",
    author: `Wilfried Pimenta`,
    authorBio: `Biz Dev @ IOTA `,
    authorImg: `/static/icons/pimenta.jpeg`,
    title: "IOTA launches DLT Research & Innovation Network from Norway",
    content: [
      {
        type: "html",
        tag: "p",
        children:
          "Norway has always been world leading in adopting digital technologies across both the public and private sectors and is now awaking to the potential of Distributed Ledger Technologies (DLT). The IOTA Foundation has teamed up with leading Norwegian clusters, research and academic institutions to create a new DLT research and innovation network."
      },
      {
        type: "html",
        tag: "p",
        children:
          "Taking its roots in 2016, the network took shape under the lead of Wilfried Pimenta of the IOTA Foundation through an open innovation process and a series of IOTA workshops hosted at partners facilities focused on the IOTA Tangle for eHealth."
      },
      {
        type: "satoshi",
        type: `image`,
        price: 50,
        placeholder: "norway-blurred.jpg",
        content: `norway.jpg`
      },
      {
        type: "html",
        tag: "p",
        children:
          "Initiated together with Oslo Medtech, Oslo Cancer Cluster, NTNU CCIS, The Norwegian Centre for E-Health Research and Alpha Venturi (network manager), the network has the ambition to grow as an international cross-industry network of research and academia experts involved with DLT research and innovation."
      },
      {
        type: "html",
        tag: "p",
        children:
          "David Sønstebø, the Founder of IOTA, who is originally from Norway and Wilfried Pimenta are both directly involved with key Norwegian and Nordic stakeholders, from both public and private sectors. Dr. Navin Ramachandran from the UCL Centre for Blockchain Technologies, and also a member of the IOTA Foundation, specialises in the use of distributed ledgers in healthcare. The new network will grow as a key contributor to the region’s transition to the digital economy."
      },
      {
        type: "html",
        tag: "p",
        children:
          "We will kickstart by addressing the eHealth opportunities through a series of workshops and events. The network will be launched on the 21st of June 2017 in Oslo at a joint event where DLT technologists, European eHealth experts from the partnership together with the EU Commission (DG CONNECT), Microsoft, SINTEF and the Digital Health Revolution initiative (Finland) will explore the potential for DLT in eHealth."
      }
    ]
  },
  ecosystem: {
    image: "/static/images/ecosystem-header.jpg",
    author: `David Sønstebø`,
    authorBio: `Founder of IOTA`,
    authorImg: `/static/icons/david.jpeg`,
    title: "IOTA Ecosystem Fund ($10 million USD)",
    content: [
      {
        type: "html",
        tag: "p",
        children:
          "Every great open source project has a great ecosystem surrounding it, in many ways it is the defining characteristic that separates a mediocre project from a great one. A thriving ecosystem is a prerequisite for long term success. In that spirit we are very happy to announce the ‘IOTA Ecosystem Fund’, which is valued north of $10,000,000. This fund is entirely dedicated towards fostering growth of IOTA through incentivizing participation in expanding and shaping the ecosystem."
      },
      {
        type: "satoshi",
        type: `image`,
        price: 100,
        placeholder: "ecosystem-library-blurred.jpg",
        content: `ecosystem-library.png`
      },
      {
        type: "html",
        tag: "p",
        children:
          "We firmly believe that a single demonstration outweighs a thousand presentations. A Proof of Concept takes a vision from the abstract idea realm and transforms it into a tangible concept others are inspired by in the real world, it conveys the vision better than any whitepaper, article or presentation ever could. If you are a developer, or a team of developers, this is your opportunity. Whether you are a Maker or a distributed ledger enthusiast we welcome you to explore the many possibilities of new applications that are possible to realize through IOTA’s unique distributed ledger technology. Whether it be something relatively simple like adding some sensors to a Raspberry Pi and making it useful through IOTA or something significantly more complex, the IOTA Ecosystem Fund exist to make it a reality."
      },
      {
        type: "satoshi",
        type: `image`,
        price: 50,
        placeholder: "ecosystem-poc-blurred.jpg",
        content: `ecosystem-poc.png`
      },
      {
        type: "html",
        tag: "p",
        children:
          "As elucidated in the public IOTA Development Roadmap, the engineering philosophy behind IOTA is one of modularity and pragmatism. Rather than attempting in vain to create a ‘all in one’ universal solution, which goes against all design and engineering principles, we instead keep the underlying ledger protocol as basic and efficient as possible and extend its utility through the IOTA eXtension Interface(IXI). Anyone can build an IXI module, whether it be for their own needs, due to there being a demand for it, or simply for the love of creating something useful."
      },
      {
        type: "html",
        tag: "p",
        children:
          "In addition to that, we also want to make the overall development of IOTA easier and widen its utility through libraries. If you have an idea for a library which you think is useful for the community, feel free to apply to get its development funded."
      },
      {
        type: "html",
        tag: "p",
        children: `If you are interested in applying for funding in any of these categories, head over to the F6S form. There you will simply have to fill out some basic questions, including the ones about the total desired budget for the project, its scope, description, timeline and so on.`
      }
    ]
  }
}
