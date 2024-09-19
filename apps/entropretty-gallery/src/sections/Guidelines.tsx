export const Guidelines: React.FC = () => {
  return (
    <div className="flex w-full flex-col gap-10">
      <div className="flex w-full max-w-[960px] flex-col gap-10 self-center">
        <h2>{"× What makes a good procedural Tattoo?"}</h2>
        <div className="flex flex-col gap-3">
          <p>
            Designing a procedurally generated tattoo system introduces unique
            challenges beyond traditional tattoo design. The system must create
            distinct, visually appealing designs that adhere to tattoo best
            practices while ensuring each output is unique. This approach
            requires careful algorithm design to balance randomness with
            aesthetic coherence.
          </p>
          <p>Guidelines:</p>
          <p className="ml-10">
            × Design must work at sizes{" "}
            <span className="keyword-code">as small as 25mm x 25mm</span>
          </p>
          <p className="ml-10">
            × Use <span className="keyword-code">high contrast</span> colors or
            black and white
          </p>
          <p className="ml-10">
            × <span className="keyword-code">Avoid fine details</span>, use
            solid shapes and thick lines instead
          </p>

          <p className="ml-10">
            × Ensure each generated design is{" "}
            <span className="keyword-code">visually distinct</span> from others
          </p>
          <p className="ml-10">
            × Incorporate clear{" "}
            <span className="keyword-code">indicators of orientation</span> to
            differentiate rotated versions
          </p>
        </div>
      </div>
    </div>
  )
}
