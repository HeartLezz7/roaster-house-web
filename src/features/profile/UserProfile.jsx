import useAuth from "../../hooks/use-auth";

export default function UserProfile() {
  const { authUser } = useAuth();
  console.log(authUser);
  return (
    <div className="grid grid-row-2 gap-2">
      <div className="text-2xl">User profile</div>
      <div className="grid grid-rows-3 grid-cols-2 min-w-[600px] max-w-3xl gap-2">
        <div className="col-span-1 border rounded-xl py-2 px-3">
          {authUser.firstName}
        </div>
        <div className="col-span-1 border rounded-xl py-2 px-3">
          {authUser.lastName}
        </div>
        <div className="col-span-2 border rounded-xl py-2 px-3">
          {authUser.email}
        </div>
        <div className="col-span-2 border rounded-xl py-2 px-3">
          {authUser.phone}
        </div>
      </div>
    </div>
  );
}
