export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-[100vh] max-w-[100vw] bg-bg-dark p-4 flex justify-center">
      {/* {true ? ( */}
      <div className="bg-bg-card w-[32rem] h-fit py-6 px-10 rounded-xl border-[1px] border-white/20 mt-[10vh]">
        {children}
      </div>
      {/* ) : null} */}
    </div>
  );
}
