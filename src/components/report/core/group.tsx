interface groupProps {
  width?: string;
  children: React.ReactNode;
}

const Group = ({ width, children }: groupProps) => (
  <div style={{ width }}>{children}</div>
);

export default Group;
