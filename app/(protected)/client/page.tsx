"use client";

import { useCurrentUser } from "@/hooks/use-current-user";

const ClientPage = () => {
  const user = useCurrentUser();

  return ( 
    <p>
	 {user?.email}
    </p>
   );
}
 
export default ClientPage;