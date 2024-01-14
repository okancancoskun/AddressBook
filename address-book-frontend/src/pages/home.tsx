import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
export const Home = (): JSX.Element => {
  const navigate = useNavigate();
  return (
    <div
      style={{
        margin: "auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <div>
        <p className="text-white-alpha-90 text-3xl text-center">
          Join Address Book
        </p>
        <div className="grid">
          <div className="col">
            <Button
              label="Login"
              onClick={() => navigate("/login")}
              icon="pi pi-arrow-right"
            />
          </div>
          <div className="col">
            <Button
              label="Register"
              onClick={() => navigate("/register")}
              icon="pi pi-user"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
