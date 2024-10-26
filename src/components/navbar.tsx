import { Button, Menu, Modal } from "semantic-ui-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export const Navbar = () => {
  const isLoggedIn = localStorage.getItem("guest_session_id") !== null;
  const [showLogoutModal, setShowLogoutModal] = useState(false); // State to control the "Are you sure?" modal visibility

  const handleLogout = () => {
    // Remove the session and navigate to auth page
    localStorage.removeItem("guest_session_id");
    navigate("/auth");
  };

  const navigate = useNavigate();

  return (
    <Menu fixed="top" size="huge">
      <Menu.Item as={Link} to="/" style={{ fontSize: "1.5rem" }}>
        Home
      </Menu.Item>

      <Menu.Item as={Link} to="/rated" style={{ fontSize: "1.5rem" }}>
        Rated
      </Menu.Item>

      <Menu.Menu position="right">
        {isLoggedIn ? (
          <Menu.Item
            as={Button}
            style={{ fontSize: "1.5rem" }}
            onClick={() => setShowLogoutModal(true)} // Show modal on logout click
          >
            Logout
          </Menu.Item>
        ) : (
          <Menu.Item as={Link} to="/auth" style={{ fontSize: "1.5rem" }}>
            Log In
          </Menu.Item>
        )}
      </Menu.Menu>
      {/* Modal for Logout Confirmation */}
      <Modal
        open={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        size="small"
      >
        <Modal.Header>Confirm Logout</Modal.Header>
        <Modal.Content>
          <p>
            All your ratings will be erased. Are you sure you want to log out?
          </p>
        </Modal.Content>
        <Modal.Actions>
          <Button
            onClick={() => setShowLogoutModal(false)}
            style={{ background: "green", color: "white" }}
          >
            No, Keep Ratings
          </Button>
          <Button
            negative
            onClick={() => {
              handleLogout();
              setShowLogoutModal(false);
            }}
          >
            Yes, Log Out
          </Button>
        </Modal.Actions>
      </Modal>
    </Menu>
  );
};
