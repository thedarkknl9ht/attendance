import logo from "~/assets/resources/logo.png";

const Logo = () => {
  return (
    <div
      className="header-logo"
      style={{
        marginInlineStart: 10,
        height: "100%",
      }}
    >
      <img
        src={logo}
        style={{
          width: 200,
          backgroundSize: "cover",
          verticalAlign: "middle",
          marginBottom: "10px",
        }}
      />
    </div>
  );
};

export default Logo;
