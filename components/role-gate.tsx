"use client";



import { useCurrentRole } from "@/hooks/use-current-role";
// import { FormError } from "@/components/form-error";


export const RoleGate = () => {
  const role = useCurrentRole();


    return (
      <p>{role && role}</p>
    )


};
