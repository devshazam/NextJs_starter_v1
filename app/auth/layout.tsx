const AuthLayout = ({ 
  children
}: { 
  children: React.ReactNode
}) => {
  return ( 
    <div className="w-full h-screen flex flex-col items-center justify-center ">
		<div className="bg-gray-100 p-8 rounded-xl max-w-[360px] w-4/5">
      		{children}
		</div>
    </div>
   );
}
 
export default AuthLayout;