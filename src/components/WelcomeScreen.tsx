const WelcomeScreen: React.FC<{ username: string; onLogout: () => void }> = (
  props
) => {
  return (
    <>
      <h1>{`Hi ${props.username}`}</h1>
      <div className="buttonContainer">
        <button onClick={props.onLogout}>Logout</button>
      </div>
    </>
  );
};

export default WelcomeScreen;
