import { logout } from "../lib/actions/auth"


function LogOutButton() {

  return (
    <button className="text-red-500 bg-black rounded"  onClick={logout}>
      logout
    </button>
  );
}

export default LogOutButton
