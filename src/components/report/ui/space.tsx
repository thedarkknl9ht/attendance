const Space = ({ value }: { value?: number }) => (
  <div
    className="report-space"
    style={{ padding: `${value ?? 10}px` }}
  ></div>
);

export default Space;
