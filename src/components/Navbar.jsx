const Navbar = () => {
  return (
    <nav className="" aria-label="Main navigation">
      <div className=" bg-[radial-gradient(circle_at_top,#e5f2fb_0%,#dfeef8_30%,rgb(207, 226, 240)_100%)] px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-190">
          <h1 className="text-center text-[4.2rem] font-semibold tracking-[-0.08em] text-sky-400 drop-shadow-[0_1px_0_rgba(255,255,255,0.7)]">
            TaskFlow
          </h1>

          <p className="mt-2 text-center text-[1.7rem] font-medium text-slate-600/80">
            Organize your life, one task at a time
          </p>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
