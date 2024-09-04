import { Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <div className="flex min-h-screen w-full">
      <div className="hidden lg:flex items-center justify-center bg-black w-[60%] " style={{ backgroundImage: 'url("https://images.pexels.com/photos/3965545/pexels-photo-3965545.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")',backgroundSize: 'cover', backgroundPosition: 'center',backgroundRepeat:"no-repeat" }}>
        <div className="space-y-6 text-center text-primary-foreground w-[480px] h-20 bg-black bg-opacity-50 ">
          <h1 className="text-5xl font-extrabold tracking-tight text-white text-balance bg-black-200">
            Welcome to Savana
          </h1>
        </div>
      </div>
      <div className="flex flex-1 items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
        <Outlet />
      </div>
    </div>
  );
}

export default AuthLayout;
