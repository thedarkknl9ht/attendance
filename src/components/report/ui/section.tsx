interface sectionProps {
  children?: React.ReactNode;
}

const Section = ({ children }: sectionProps) => (
  <div
    style={{
      display: "flex",
      flexWrap: "wrap",
      marginTop: 20,
    }}
  >
    {children}
  </div>
);

export default Section;
