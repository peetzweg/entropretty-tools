import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion"
export const Web3Citizenship: React.FC = () => {
  return (
    <div className="flex w-full flex-col gap-10 self-center">
      <h2 className="leading-tight">
        <span className="keyword-sans font-semibold">Proof of Ink</span> ×{" "}
        <span className="keyword-serif">Web3 Citizenship</span>
      </h2>

      <div className="relative flex justify-center">
        <iframe
          className="aspect-video w-full"
          src="https://www.youtube-nocookie.com/embed/MrWioikibEI?si=WPziLWjrjIq2mfFI"
          title="Web3 Citizenship at web3summit"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          frameBorder={0}
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen={true}
        ></iframe>
      </div>

      <div>
        <h3 className="mb-5 text-xl">
          <span className="keyword-code">DIM1</span>{" "}
          <span className="keyword-sans font-semibold">Proof of Ink</span> |
          Digital Individuality Mechanism 1
        </h3>

        <ProofOfInkAccordion />
      </div>
    </div>
  )
}

const ProofOfInkAccordion = () => {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="what-is-proof-of-ink">
        <AccordionTrigger>What is Proof of Ink?</AccordionTrigger>
        <AccordionContent>
          <p>
            Proof of Ink is the first digital individuality mechanism being
            developed for the Polkadot ecosystem. It uses tattoos as a way to
            prove unique personhood in a digital system, offering a novel
            approach to digital identity verification.
          </p>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="how-it-works">
        <AccordionTrigger>How it Works</AccordionTrigger>
        <AccordionContent>
          <p>
            The process works as follows: Users receive a{" "}
            <span className="keyword-highlight">unique tattoo design</span>{" "}
            generated on-chain using trustless entropy. This tattoo must be
            placed in a{" "}
            <span className="keyword-highlight">
              specific location on the body
            </span>
            , which is the same for all participants. To verify their
            participation, users submit evidence of getting the tattoo via a{" "}
            <span className="keyword-highlight">3-minute video</span>. This
            evidence is then judged by existing citizens through a voting
            process called <span className="keyword-highlight">"mob rule"</span>
            .
          </p>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="key-features">
        <AccordionTrigger>Key Features</AccordionTrigger>
        <AccordionContent>
          <p>
            Key features of Proof of Ink include its design for{" "}
            <span className="keyword-highlight">
              privacy while proving individuality
            </span>
            , the use of a mobile app for design selection and evidence
            submission, and the fact that tattoo designs are{" "}
            <span className="keyword-highlight">
              generative art created from on-chain random seeds
            </span>
            . The system is open, allowing for community-contributed design
            families.
          </p>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="potential-benefits">
        <AccordionTrigger>Potential Benefits</AccordionTrigger>
        <AccordionContent>
          <p>
            The potential benefits of Proof of Ink are significant. It enables{" "}
            <span className="keyword-highlight">
              privacy-preserving airdrops and free services
            </span>
            , and could allow for free transactions (with limits) for proven
            individuals. Furthermore, it facilitates new forms of governance and
            economic experiments, and provides a basis for{" "}
            <span className="keyword-highlight">
              decentralized username systems
            </span>
            .
          </p>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="timeline">
        <AccordionTrigger>Timeline</AccordionTrigger>
        <AccordionContent>
          <p>
            Looking ahead, the basic system and app are aimed to launch in{" "}
            <span className="keyword-highlight">Q4 2024</span>. The roadmap also
            includes plans for two additional digital individuality mechanisms
            in 2025, indicating ongoing development and expansion of the
            concept.
          </p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
